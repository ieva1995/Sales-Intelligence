import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { log } from './vite';

/**
 * WebSocket utility for managing HMR connections
 * Provides proper initialization, cleanup, and monitoring
 */
export class WebSocketManager {
  private wss: WebSocketServer | null = null;
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private clients = new Set<WebSocket>();
  private path: string;

  constructor(path: string = '/hmr/') {
    this.path = path;
  }

  /**
   * Initialize WebSocket server with proper error handling
   */
  initialize(server: Server): WebSocketServer | null {
    try {
      // Clean up any existing instance first
      this.cleanup();

      log(`Initializing WebSocket server on path ${this.path}`, 'ws-manager');

      this.wss = new WebSocketServer({ 
        server,
        path: this.path,
        clientTracking: true 
      });

      // Handle connection events
      this.wss.on('connection', (ws: WebSocket) => {
        log(`New WebSocket client connected, total: ${this.wss?.clients.size || 0}`, 'ws-manager');
        this.clients.add(ws);

        ws.on('close', () => {
          log(`WebSocket client disconnected, remaining: ${this.wss?.clients.size || 0}`, 'ws-manager');
          this.clients.delete(ws);
        });

        ws.on('error', (error) => {
          log(`WebSocket client error: ${error.message}`, 'ws-manager');
          this.clients.delete(ws);
        });
      });

      // Server-wide error handling
      this.wss.on('error', (error) => {
        log(`WebSocket server error: ${error.message}`, 'ws-manager');
      });

      this.wss.on('close', () => {
        log('WebSocket server closed', 'ws-manager');
        this.cleanup();
      });

      // Set up health check interval
      this.startHealthCheck();

      return this.wss;
    } catch (error) {
      log(`Failed to initialize WebSocket server: ${(error as Error).message}`, 'ws-manager');
      return null;
    }
  }

  /**
   * Start health check interval to monitor WebSocket connections
   */
  private startHealthCheck() {
    this.healthCheckInterval = setInterval(() => {
      if (this.wss) {
        const clientCount = this.wss.clients.size;
        log(`WebSocket health check: ${clientCount} active connections`, 'ws-manager');
      }
    }, 30000); // Check every 30 seconds
  }

  /**
   * Broadcast a message to all connected clients
   */
  broadcast(message: string | object) {
    if (!this.wss) return;

    const data = typeof message === 'string' ? message : JSON.stringify(message);

    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  /**
   * Handle WebSocket upgrade requests
   */
  handleUpgrade(req: any, socket: any, head: any) {
    if (!this.wss) return false;

    if (req.url?.startsWith(this.path)) {
      this.wss.handleUpgrade(req, socket, head, (ws) => {
        this.wss?.emit('connection', ws, req);
      });
      return true;
    }
    return false;
  }

  /**
   * Get WebSocket server instance
   */
  getServer(): WebSocketServer | null {
    return this.wss;
  }

  /**
   * Get client count
   */
  getClientCount(): number {
    return this.wss?.clients.size || 0;
  }

  /**
   * Cleanup all resources
   */
  cleanup() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }

    if (this.wss) {
      try {
        this.wss.clients.forEach(client => {
          try {
            client.terminate();
          } catch (err) {
            // Ignore errors when terminating clients
          }
        });

        this.wss.close();
        log('WebSocket server successfully closed', 'ws-manager');
      } catch (error) {
        log(`Error closing WebSocket server: ${(error as Error).message}`, 'ws-manager');
      }
      this.wss = null;
    }

    this.clients.clear();
  }
}

// Export singleton instance
export const wsManager = new WebSocketManager('/hmr/');

/**
 * Utility function to close any hanging WebSocket ports
 * This can be used at server startup to ensure clean state
 */
export async function clearHangingWebSocketPorts() {
  try {
    // Use dynamic import to avoid require errors in different environments.
    const { execSync } = await import('child_process');
    log('Clearing any hanging WebSocket ports...', 'ws-manager');

    // Try to kill processes on the HMR port
    try {
      execSync('npx kill-port 24678 || true');
      log('Cleared port 24678 (HMR WebSocket)', 'ws-manager');
    } catch (err) {
      // Ignore errors, continue with other methods
    }

    log('Waiting for ports to be fully released...', 'ws-manager');
    await new Promise(resolve => setTimeout(resolve, 1000));

    return true;
  } catch (error) {
    log(`Error clearing WebSocket ports: ${(error as Error).message}`, 'ws-manager');
    return false;
  }
}