import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { seedUsers } from "./seedUsers";
import { createTables } from './createTables'; // Added import for database table creation

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
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server?.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
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
    const server = await registerRoutes(app);
    console.log('Routes registered successfully');

    // Set up error handler for express
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      console.error("Server error:", err);
    });

    // Kill any existing processes on the Vite ports
    await new Promise(async (resolve) => {
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
    if (app.get("env") === "development") {
      let retries = 5;
      while (retries > 0) {
        try {
          await setupVite(app, server);
          console.log('Development server with Vite HMR enabled');
          break;
        } catch (error) {
          console.error(`Vite setup attempt failed, ${retries - 1} retries remaining:`, error);
          retries--;
          if (retries === 0) {
            console.log('Falling back to static serving mode');
            serveStatic(app);
          }
          await new Promise(resolve => setTimeout(resolve, 5000));
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

    server.listen(port, "0.0.0.0", () => {
      console.log(`Server successfully running on http://0.0.0.0:${port}`);
    }).on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
          console.error(`Port ${port} is already in use.  Attempting to release...`);
          // Add port release logic here if needed (similar to original code)
          console.error('Failed to release port. Please restart the repl.');
          process.exit(1);
      } else {
          console.error('Server error:', error);
          process.exit(1);
      }
    });
  } catch (error) {
    console.error('Fatal error starting server:', error);
    process.exit(1);
  }
})();