import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import './kill-port.cjs';
import { registerRoutes } from './routes';

const app = express();
const port = process.env.PORT || 5000;

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create HTTP server
const server = createServer(app);

// Enhanced WebSocket configuration for deployments
const wss = new WebSocketServer({ 
  server,
  path: '/ws-feed',
  perMessageDeflate: false, // Disable compression for better stability
  clientTracking: true,
  maxPayload: 1024 * 1024 // 1MB max payload
});

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');
  ws.on('error', console.error);
});

// Register all routes
registerRoutes(app);

// Start the server with increased timeouts
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
  console.log('Access URL:', `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
}).on('error', (error) => {
  console.error('Server failed to start:', error);
  if (error.code === 'EADDRINUSE') {
    console.log('Port is in use, attempting to kill existing process...');
    import('./kill-port.cjs');
  }
  process.exit(1);
});

// Add health check endpoint
app.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    status: 'UP',
    timestamp: Date.now()
  };
  try {
    res.send(healthcheck);
  } catch (e) {
    healthcheck.status = 'DOWN';
    res.status(503).send();
  }
});

// Monitor server events
server.on('close', () => {
  console.log('Server closed');
});

server.on('connection', (socket) => {
  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});