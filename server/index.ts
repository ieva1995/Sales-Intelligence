import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { seedUsers } from "./seedUsers";
import { createTables } from './createTables'; // Added import for database table creation
import { wsManager, clearHangingWebSocketPorts } from './websocket-utils'; // Import WebSocket manager

const app = express();
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

      log(logLine);
    }
  });

  next();
});

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Prevent crash, but log the error
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Prevent crash, but log the error
});

// Handle shutdown gracefully
let server: any = null;

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  wsManager.cleanup();
  server?.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  wsManager.cleanup();
  server?.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

(async () => {
  try {
    // Set default environment variables if not provided
    process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres';
    process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'dev_session_secret';
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    // Clear any hanging WebSocket ports
    await clearHangingWebSocketPorts();

    // Initialize database tables
    console.log('Initializing database tables...');
    await createTables();
    console.log('Database tables initialized successfully');

    // Seed initial users
    console.log('Seeding initial users...');
    await seedUsers();
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error during initialization:', error);
  }

  try {
    // Register routes and create server
    console.log('Registering routes and creating HTTP server...');
    server = await registerRoutes(app);
    console.log('Routes registered successfully');

    // Set up error handler for express
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      console.error("Server error:", err);
    });

    // Kill any existing processes on the Vite ports
    await new Promise<void>(async (resolve) => {
      const { default: killPort } = await import('kill-port');
      await Promise.all([
        killPort(24678).catch(() => {}),  // Vite WebSocket port
        killPort(5173).catch(() => {})    // Vite dev server port
      ]);
      resolve();
    });

    // Set up proper error handlers for the server
    server.on('error', (error: Error) => {
      console.error('Server error:', error);
    });

    // Set up Vite in development or serve static files in production
    console.log('Setting up Vite middleware...');
    const MAX_VITE_SETUP_ATTEMPTS = 3;
    let viteSetupAttempts = 0;
    let viteSuccess = false;

    // Setup WebSocket upgrade handler
    server.on('upgrade', (req: any, socket: any, head: any) => {
      // Let our WebSocket manager handle the upgrade
      const handled = wsManager.handleUpgrade(req, socket, head);

      if (!handled) {
        // Close the connection if not handled
        socket.destroy();
      }
    });

    if (app.get("env") === "development") {
      while (viteSetupAttempts < MAX_VITE_SETUP_ATTEMPTS && !viteSuccess) {
        try {
          viteSetupAttempts++;
          console.log(`Vite setup attempt ${viteSetupAttempts}/${MAX_VITE_SETUP_ATTEMPTS}...`);

          await setupVite(app, server);
          console.log('Development server with Vite HMR enabled');

          // Initialize WebSocket manager with the server
          wsManager.initialize(server);

          // Monitor active clients
          setInterval(() => {
            const clientCount = wsManager.getClientCount();
            console.log(`Active HMR connections: ${clientCount}`);
          }, 30000);

          viteSuccess = true;
        } catch (error) {
          console.error(`Vite setup attempt ${viteSetupAttempts} failed:`, error);

          if (viteSetupAttempts < MAX_VITE_SETUP_ATTEMPTS) {
            console.log(`Waiting before retry...`);
            await new Promise(resolve => setTimeout(resolve, 3000));
          } else {
            console.log('Maximum Vite setup attempts reached, falling back to static serving mode');
            serveStatic(app);
          }
        }
      }
    } else {
      serveStatic(app);
      console.log('Production static server enabled on port', process.env.PORT || 8080);
    }

    app.get('*', (req, res, next) => {
      if (req.path.includes('.') || req.path.startsWith('/api')) {
        next();
      } else {
        res.sendFile('index.html', { root: './dist' });
      }
    });
    console.log('Vite middleware setup complete');

    const port = process.env.PORT || 8080;
    console.log(`Starting server on port ${port}...`);

    const startServer = () => {
      server.listen(port, "0.0.0.0", () => {
        console.log(`Server successfully running on http://0.0.0.0:${port}`);
      }).on('error', async (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
          console.error(`Port ${port} is already in use. Waiting 5 seconds before retry...`);
          await new Promise(resolve => setTimeout(resolve, 5000));
          server.close();
          startServer();
        } else {
          console.error('Server error:', error);
          process.exit(1);
        }
      });
    };

    startServer();
  } catch (error) {
    console.error('Fatal error starting server:', error);
    process.exit(1);
  }
})();