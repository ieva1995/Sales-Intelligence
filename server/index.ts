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

// Global promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
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
    // Clear any lingering processes before starting - check if we can detect and reset
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      process.exit(0);
    });

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

    // Set up Vite in development or serve static files in production
    console.log('Setting up Vite middleware...');
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }
    console.log('Vite middleware setup complete');

    // Return to the standard port 5000 as required by Replit
    const port = 5000;
    console.log(`Using standard port ${port} for Replit applications...`);

    // Add a pre-flight check for port availability
    console.log(`Preparing to start server on port ${port}...`);

    // Function to start the server with retry logic
    function startServerWithRetry(retries = 3) {
      console.log(`Attempting to bind to port ${port}...`);
      
      server.listen({
        port,
        host: "0.0.0.0",
        reusePort: true,
      }, () => {
        log(`Server running on port ${port}`);
      }).on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE' && retries > 0) {
          console.log(`Port ${port} in use, retrying in 1s... (${retries} attempts left)`);
          setTimeout(() => startServerWithRetry(retries - 1), 1000);
        } else {
          console.error('Server failed to start:', error);
          process.exit(1);
        }
      });
    }

    // Handle server errors properly
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Attempting to force release...`);
        try {
          const { execSync } = require('child_process');
          execSync('fuser -k 5000/tcp || true');
          setTimeout(() => {
            startServerWithRetry();
          }, 1000);
        } catch (err) {
          console.error('Failed to release port. Please restart the repl.');
          process.exit(1);
        }
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });

    // Start the initial attempt
    startServerWithRetry();
  } catch (error) {
    console.error('Fatal error starting server:', error);
    process.exit(1);
  }
})();