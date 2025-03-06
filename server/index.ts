import express from "express";
import next from "next";
import { registerRoutes } from "./routes";
import { seedUsers } from "./seedUsers";
import { createTables } from './createTables';
import { wsManager, clearHangingWebSocketPorts } from './websocket-utils';

const dev = process.env.NODE_ENV !== 'production';
const app = express();
const nextApp = next({ dev, dir: './client/src' });
const handle = nextApp.getRequestHandler();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine); // Use console.log for logging
    }
  });

  next();
});


(async () => {
  try {
    console.log('=== SERVER STARTUP DIAGNOSTIC LOGS ===');
    console.log('Setting environment variables...');
    // Set default environment variables if not provided
    process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres';
    process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'dev_session_secret';

    // Don't assign to NODE_ENV directly as it's a read-only property in some environments
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'development';
    }

    console.log('Current NODE_ENV:', process.env.NODE_ENV);
    console.log('Preparing Next.js app...');

    try {
      await nextApp.prepare();
      console.log('Next.js app prepared successfully');
    } catch (nextError) {
      console.error('ERROR preparing Next.js app:', nextError);
      throw nextError;
    }

    // Initialize database and clear ports
    console.log('Clearing hanging WebSocket ports...');
    await clearHangingWebSocketPorts();

    console.log('Initializing database tables...');
    await createTables();
    console.log('Database tables initialized successfully');

    console.log('Seeding initial users...');
    await seedUsers();
    console.log('Users seeded successfully');

    // Register API routes
    console.log('Registering API routes...');
    await registerRoutes(app);
    console.log('API routes registered successfully');

    // Handle all other routes with Next.js
    console.log('Setting up Next.js request handler for all routes...');
    app.all('*', (req, res) => {
      return handle(req, res);
    });

    const port = parseInt(process.env.PORT || "5000", 10);
    console.log(`Attempting to start server on port ${port}...`);

    const server = app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${port}`);
    });

    console.log('Setting up WebSocket manager...');
    // Setup WebSocket
    server.on('upgrade', (req: any, socket: any, head: any) => {
      const handled = wsManager.handleUpgrade(req, socket, head);
      if (!handled) {
        socket.destroy();
      }
    });
    wsManager.initialize(server);
    console.log('WebSocket manager initialized successfully');

    // Global error handlers (moved from original)
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
    });

    // Graceful shutdown (moved from original)
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      wsManager.cleanup();
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully');
      wsManager.cleanup();
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

    // Set up error handler for express (moved from original)
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      console.error("Server error:", err);
    });

    server.on('error', (error: Error) => {
      console.error('Server error:', error);
    });


  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
})();