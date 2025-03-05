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

    // Use PORT environment variable or fallback to 8080 for deployments
    const port = process.env.PORT || 8080;
    const maxRetries = 6; // Increased from 3 to 6 retries
    let currentRetry = 0;

    console.log(`Using standard port ${port} for Replit applications...`);

    // Add a pre-flight check for port availability
    console.log(`Preparing to start server on port ${port}...`);

    // Function to start the server with retry logic
    const startServerWithRetry = (retries = maxRetries) => {
      console.log(`Attempt ${maxRetries - retries + 1}/${maxRetries}: Starting server on port ${port}...`);

      // Implement a healthcheck timeout to give the server more time to start
      const healthcheckTimeout = 5000; // 5 seconds timeout for server health check

      const serverInstance = server.listen(port, "0.0.0.0", () => {
        console.log(`Server is running at http://0.0.0.0:${port}`);
      });

      serverInstance.on('listening', () => {
        console.log(`Server successfully running on http://0.0.0.0:${port}`);

        // Clean up any potential zombie processes
        try {
          console.log('Server started successfully. Checking for any zombie processes...');
          // This will be handled by the child_process exec below
        } catch (err) {
          console.log('No zombie processes found.');
        }
      });

      serverInstance.on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE' && retries > 0) {
          console.log(`Port ${port} in use, waiting 3 seconds before retry... (${retries} attempts left)`);
          serverInstance.close();

          // Try to forcefully release the port
          try {
            const { execSync } = require('child_process');
            console.log(`Attempting to force release port ${port}...`);
            // Try multiple commands to release the port, depending on what's available
            try {
              execSync(`kill-port ${port} || true`);
            } catch (e) {
              console.log('kill-port not available, trying alternative methods');
            }

            try {
              execSync(`fuser -k ${port}/tcp || true`);
            } catch (e) {
              console.log('fuser not available, trying alternative methods');
            }

            console.log(`Waiting for port ${port} to be released...`);
          } catch (err) {
            console.error('Error attempting to release port:', err);
          }

          // Wait 3 seconds before retrying to ensure the port is released
          setTimeout(() => startServerWithRetry(retries - 1), 3000);
        } else {
          console.error('Server failed to start:', error);
          if (retries <= 0) {
            console.error(`Maximum retry attempts (${maxRetries}) reached. Unable to start server.`);
            console.error('Please restart the Replit or contact support if this issue persists.');
          } else {
            console.error('Attempting different approach to start server...');

            // Try a different approach on the last attempt
            if (retries === 1) {
              try {
                const { execSync } = require('child_process');
                console.log('Trying to kill ALL Node.js processes and restart...');
                execSync('pkill -f node || true');
                setTimeout(() => {
                  console.log('Restarting server after killing all Node.js processes...');
                  startServerWithRetry(retries - 1);
                }, 5000);
              } catch (killErr) {
                console.error('Failed to restart:', killErr);
                process.exit(1);
              }
            } else {
              // Wait longer between retries as we near the end of attempts
              const delay = (maxRetries - retries + 1) * 2000;
              setTimeout(() => startServerWithRetry(retries - 1), delay);
            }
          }
        }
      });
    };

    // Handle server errors properly
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Attempting to force release...`);
        try {
          const { execSync } = require('child_process');
          console.log('Running port kill commands...');
          try {
            execSync('npx kill-port 5000 || true');
          } catch (e) {
            console.log('npx kill-port failed, trying alternatives');
          }

          try {
            execSync('fuser -k 5000/tcp || true');
          } catch (e) {
            console.log('fuser failed, trying alternatives');
          }

          console.log('Waiting 5 seconds for port to be released...');
          setTimeout(() => {
            console.log('Attempting to restart server...');
            startServerWithRetry(maxRetries);
          }, 5000);
        } catch (err) {
          console.error('Failed to release port. Please restart the repl.');
          console.error('Error details:', err);
          process.exit(1);
        }
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });

    // Start the initial attempt
    startServerWithRetry(maxRetries);
  } catch (error) {
    console.error('Fatal error starting server:', error);
    process.exit(1);
  }
})();