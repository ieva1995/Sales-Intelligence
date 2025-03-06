import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import './kill-port.cjs';
import { registerRoutes } from './routes';

const app = express();
const port = process.env.PORT || 5000;

// Configure for production
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Connection', 'keep-alive');
  next();
});

// Add error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Create HTTP server
const server = createServer(app);

// Configure server timeouts
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

// Error handling for server
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.log('Port is in use, attempting to kill existing process...');
    import('./kill-port.cjs');
  }
});

// Handle process termination gracefully
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server shutdown completed');
  });
});

// Keep the process alive
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});

// Enhanced WebSocket configuration for deployments
const wss = new WebSocketServer({ 
  server,
  path: '/ws-feed',
  perMessageDeflate: false,
  clientTracking: true,
  maxPayload: 1024 * 1024,
  backlog: 100,
  verifyClient: (info, cb) => {
    cb(true);
  }
});

// Basic error handling
wss.on('error', (error) => {
  console.error('WebSocket server error:', error);
});

// Connection handling
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('error', (error) => {
    console.error('Client connection error:', error);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Health check and connection monitoring
const healthCheckInterval = setInterval(() => {
  wss.clients.forEach((ws: any) => {
    if (!ws.isAlive) {
      console.log('Terminating inactive connection');
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('listening', () => {
  console.log('WebSocket server is listening');
});

// Cleanup on shutdown
process.on('SIGTERM', () => {
  clearInterval(healthCheckInterval);
  wss.close(() => {
    console.log('WebSocket server closed');
  });
});


// Ensure proper WebSocket cleanup
process.on('SIGTERM', () => {
  wss.clients.forEach(client => {
    client.terminate();
  });
  wss.close();
  server.close();
});

// Handle connection errors
wss.on('error', (error) => {
  console.error('WebSocket server error:', error);
});

// Connection handling with ping/pong
wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');
  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('error', console.error);
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