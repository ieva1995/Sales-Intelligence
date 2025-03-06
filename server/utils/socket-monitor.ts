
import { exec } from 'child_process';

export async function killHangingSockets(port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`lsof -i :${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`, (error) => {
      if (error && error.code !== 1) {
        console.error('Error killing hanging sockets:', error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

export function checkPortAvailability(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const net = require('net');
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    server.listen(port, '0.0.0.0');
  });
}
