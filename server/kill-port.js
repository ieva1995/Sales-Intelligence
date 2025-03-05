
import { createServer } from 'net';

async function killPort(port) {
  console.log(`Attempting to free port ${port}...`);
  
  return new Promise((resolve) => {
    const server = createServer()
      .once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${port} is in use, attempting to free it...`);
          server.close();
          resolve(false);
        }
      })
      .once('listening', () => {
        server.close();
        console.log(`Port ${port} is now available`);
        resolve(true);
      })
      .listen(port, '0.0.0.0');
  });
}

// Execute if this file is run directly
if (process.argv[1] === import.meta.url) {
  killPort(5000);
}

export { killPort };
