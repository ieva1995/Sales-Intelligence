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

// Initialize HTTP tunnel
const tunnelConfig = {
  host: '0.0.0.0',
  port: 8000,
  secure: true
};

// Error handling will be done at the Express level
const app = express();

// Rate limiting with higher limits and proper proxy trust
app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // increased limit
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again in 15 minutes'
});

// Security middleware
app.use(helmet());
app.use(limiter);
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.urlencoded({ extended: false }));

// Security headers with relaxed CSP for development
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Updated CSP with necessary permissions for modern web applications
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' ws: wss:; object-src 'none'"
  );

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

    // Define an array of ports to try
    const ports = [5000, 3000, 8080, 4000];
    let portIndex = 0;
    let serverStarted = false;

    // Function to try starting the server on a specific port
    function tryPort(port: number) {
      console.log(`Attempting to start server on port ${port}...`);

      // Attempt to start server with better error handling
      server.listen({
        port,
        host: "0.0.0.0",
        reusePort: true,
      }, () => {
        serverStarted = true;
        log(`Server running on port ${port}`);
        console.log(`🚀 Server is running at http://localhost:${port}`);
      });
    }

    // Handle server errors properly
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${ports[portIndex]} is already in use.`);
        portIndex++;

        if (portIndex < ports.length) {
          // Try the next port
          tryPort(ports[portIndex]);
        } else {
          console.error('All ports are in use. Please free a port manually or restart your workspace.');
          console.error('To free ports, you can run: bash server/kill-port.sh');
          process.exit(1);
        }
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });

    // Start with the first port
    tryPort(ports[portIndex]);

  } catch (error) {
    console.error('Fatal error starting server:', error);
    process.exit(1);
  }
})();