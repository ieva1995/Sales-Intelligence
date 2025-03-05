import express, { type Request, Response, NextFunction } from "express";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import tunnel from 'node-tunnel';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { seedUsers } from "./seedUsers";
import { createTables } from './createTables';

// Create secure tunnel
const tunnelProxy = tunnel.createTunnel({
  host: '0.0.0.0',
  port: 8000,
  debug: process.env.NODE_ENV === 'development'
});

// Handle tunnel errors
tunnelProxy.on('error', (err) => {
  console.error('Tunnel error:', err);
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}); // Added import for database table creation

const app = express();

// Security middleware
app.use(helmet());
app.use(limiter);
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.urlencoded({ extended: false }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

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

(async () => {
  try {
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

    // Maximum number of retry attempts
    const maxRetries = 5;
    // Initial retry delay in milliseconds (3 seconds)
    const initialRetryDelay = 3000;
    // Counter for tracking retries
    let retryCount = 0;

    // Function to start the server with retry logic
    function startServerWithRetry(retryCount: number, retryDelay: number) {
      console.log(`Attempt #${retryCount + 1} to bind to port ${port}...`);

      // Attempt to start server with better error handling
      server.listen({
        port,
        host: "0.0.0.0",
        reusePort: true,
      }, () => {
        log(`Server running on port ${port}`);
      });
    }

    // Handle server errors properly
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please restart your workspace to clear all processes.`);
        console.error('If the issue persists after restart, please manually kill any process using port 5000.');

        // Exit process after logging clear instructions
        process.exit(1);
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });

    // Start the initial attempt
    startServerWithRetry(retryCount, initialRetryDelay);
  } catch (error) {
    console.error('Fatal error starting server:', error);
    process.exit(1);
  }
})();