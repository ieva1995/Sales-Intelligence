import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import './kill-port.cjs';
import { registerRoutes } from './routes';
import config from './config';
import logger from './utils/logger';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current file location for ES modules (replacement for __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();

// Create HTTP server with configured timeouts
const server = createServer(app);
server.keepAliveTimeout = config.server.timeouts.server;
server.headersTimeout = config.server.timeouts.headers;

// Error handling for server
server.on('error', (error: any) => {
  if (error.code === 'EADDRINUSE') {
    logger.error(`Port ${config.server.port} is in use. Attempting to reconnect...`);
    setTimeout(() => {
      server.close();
      server.listen(config.server.port);
    }, 1000);
  } else {
    logger.error(`Server error: ${error.message}`);
  }
});

// Configure Express middleware
app.use(express.json({ limit: config.server.limits.json }));
app.use(express.urlencoded({ extended: true, limit: config.server.limits.urlencoded }));

// CORS configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.server.cors.origin);
  res.header('Access-Control-Allow-Methods', config.server.cors.methods);
  res.header('Access-Control-Allow-Headers', config.server.cors.allowedHeaders);
  res.header('Connection', 'keep-alive');

  // Request timeout
  res.setTimeout(config.server.timeouts.request, () => {
    logger.warn(`Request timeout after ${config.server.timeouts.request}ms`, 'request');
    res.status(408).send('Request timeout');
  });

  next();
});

// Initialize WebSocket server on the same HTTP server instance
const wss = new WebSocketServer({
  server,
  path: config.websocket.path,
  clientTracking: true,
  perMessageDeflate: config.websocket.compression
});

// WebSocket health check interval
const healthCheckInterval = setInterval(() => {
  logger.debug('Running WebSocket health check', 'websocket');
  wss.clients.forEach((ws: any) => {
    if (!ws.isAlive) {
      logger.debug('Terminating inactive WebSocket connection', 'websocket');
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, config.websocket.pingInterval);

// WebSocket event handlers
wss.on('error', (error) => {
  logger.error(`WebSocket Server Error: ${error.message}`, 'websocket');
});

wss.on('connection', (ws: any) => {
  const clientIp = ws._socket?.remoteAddress || 'unknown';
  logger.info(`WebSocket client connected from ${clientIp}`, 'websocket');

  ws.send(JSON.stringify({ type: 'connected', message: 'Successfully connected to SalesBoost AI' }));
  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('error', (err: Error) => {
    logger.error(`WebSocket client error: ${err.message}`, 'websocket');
  });

  ws.on('close', () => {
    logger.info(`WebSocket client disconnected from ${clientIp}`, 'websocket');
  });
});

// Serve static assets directly
app.use(express.static(join(__dirname, '../dist/client')));

// Simple health check endpoint for monitoring
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    uptime: process.uptime(),
    port: config.server.port,
    timestamp: Date.now(),
    memory: process.memoryUsage(),
    host: req.headers.host
  });
});

// Register all application routes
registerRoutes(app);

// Start server
server.listen(config.server.port, () => {
  logger.info(`Server running on ${config.urls.getServerUrl()}`);
  logger.info(`Access URL: ${config.urls.getPublicUrl()}`);
}).on('error', (error: any) => {
  logger.error(`Server failed to start: ${error.message}`);
  if (error.code === 'EADDRINUSE') {
    logger.info('Port is in use, attempting to kill existing process...');
    try {
      import('./kill-port.cjs');
    } catch (e) {
      logger.error(`Failed to kill port: ${(e as Error).message}`);
    }
  } else {
    process.exit(1);
  }
});

// Error handlers and graceful shutdown
const errorHandlers = {
  SIGTERM: () => {
    logger.info('SIGTERM received, shutting down gracefully');
    clearInterval(healthCheckInterval);
    wss.clients.forEach(client => client.terminate());
    wss.close(() => logger.info('WebSocket server closed'));
    server.close(() => logger.info('HTTP server closed'));
    process.exit(0);
  },
  uncaughtException: (error: Error) => {
    logger.error(`Uncaught Exception: ${error.message}\n${error.stack}`);
  },
  unhandledRejection: (reason: any) => {
    logger.error(`Unhandled Promise Rejection: ${reason}`);
  }
};

process.on('SIGTERM', errorHandlers.SIGTERM);
process.on('uncaughtException', errorHandlers.uncaughtException);
process.on('unhandledRejection', errorHandlers.unhandledRejection);

// Export for testing
export { app, server, wss };