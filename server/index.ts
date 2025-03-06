import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import './kill-port.cjs';
import { registerRoutes } from './routes';

const app = express();
const port = process.env.PORT || 5000;

// Configure for production
const productionConfig = {
  trustProxy: app.set('trust proxy', 1),
  security: app.disable('x-powered-by'),
  json: app.use(express.json({ limit: '50mb' })),
  urlencoded: app.use(express.urlencoded({ extended: true, limit: '50mb' })),
  cors: app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Connection', 'keep-alive');
    next();
  }),
  errorHandler: app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  })
};

// Create HTTP server with timeouts
const server = createServer(app);
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

// Enhanced WebSocket configuration
const wss = new WebSocketServer({ 
  server,
  path: '/ws-feed',
  perMessageDeflate: {
    zlibDeflateOptions: { chunkSize: 1024, memLevel: 7, level: 3 },
    zlibInflateOptions: { chunkSize: 10 * 1024 },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    serverMaxWindowBits: 10,
    concurrencyLimit: 10,
    threshold: 1024
  },
  clientTracking: true,
  maxPayload: 1024 * 1024
});

// Health check interval
const healthCheckInterval = setInterval(() => {
  wss.clients.forEach((ws: any) => {
    if (!ws.isAlive) {
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

// WebSocket event handlers
wss.on('error', console.error);
wss.on('connection', (ws: any) => {
  console.log('Client connected to WebSocket');
  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('error', console.error);
  ws.on('close', () => console.log('Client disconnected'));
});

// Register routes and health check endpoint
registerRoutes(app);
app.get('/health', (req, res) => {
  res.send({
    uptime: process.uptime(),
    status: 'UP',
    timestamp: Date.now()
  });
});

// Start server
server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
  console.log('Access URL:', `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
}).on('error', (error) => {
  console.error('Server failed to start:', error);
  if ((error as any).code === 'EADDRINUSE') {
    console.log('Port is in use, attempting to kill existing process...');
    import('./kill-port.cjs');
  }
  process.exit(1);
});

// Consolidated error handlers and graceful shutdown
const errorHandlers = {
  SIGTERM: () => {
    clearInterval(healthCheckInterval);
    wss.clients.forEach(client => client.terminate());
    wss.close(() => console.log('WebSocket server closed'));
    server.close(() => console.log('Server shutdown completed'));
  },
  uncaughtException: console.error,
  unhandledRejection: console.error
};

process.on('SIGTERM', errorHandlers.SIGTERM);
process.on('uncaughtException', errorHandlers.uncaughtException);
process.on('unhandledRejection', errorHandlers.unhandledRejection);