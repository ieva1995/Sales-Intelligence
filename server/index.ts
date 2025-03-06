import express from 'express';
import { createServer } from 'http';
import './kill-port.cjs'; // Import the kill-port script

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, "0.0.0.0", () => {
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

server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;
server.timeout = 120000;