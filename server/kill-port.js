
import { createServer } from 'net';
import { exit } from 'process';

async function killPort(port) {
  return new Promise((resolve) => {
    // First try to create a server on the port
    const server = createServer();
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy. Attempting to free it...`);
        // Try to end any existing connections
        server.close();
        server.listen(port, '0.0.0.0');
      }
    });

    server.on('listening', () => {
      server.close();
      console.log(`Port ${port} is now available`);
      resolve(true);
    });

    // Initial attempt to listen
    server.listen(port, '0.0.0.0');
  });
}

// When run directly
if (process.argv[1].endsWith('kill-port.js')) {
  killPort(5000).then(() => exit(0)).catch(() => exit(1));
}

export { killPort };
