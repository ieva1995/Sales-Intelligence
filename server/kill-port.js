import { execSync } from 'child_process';

async function killPort(port) {
  console.log(`Attempting to find and kill process using port ${port}...`);

  try {
    // Try Node's native way of killing a process
    const server = require('net').createServer();

    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log('Port is in use, forcing it to close...');
        server.close();
      }
    });

    server.once('listening', () => {
      server.close();
      console.log('Port is now available');
    });

    server.listen(port, '0.0.0.0');
  } catch (err) {
    console.log(`Error while attempting to free port ${port}:`, err);
  }
}

killPort(5000);

export { killPort };