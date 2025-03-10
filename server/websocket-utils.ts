import { WebSocketServer, WebSocket } from 'ws';
import { log } from './vite';

/**
 * WebSocket utility for managing HMR connections
 * Provides proper initialization, cleanup, and monitoring
 */
export class WebSocketManager {
  private wss: WebSocketServer | null = null;
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private reconnectInterval: NodeJS.Timeout | null = null;
  private clients = new Set<WebSocket>();
  private path: string;
  private isReconnecting = false;
  private retryCount: number | null = null;

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
        clientTracking: true,
        perMessageDeflate: {
          zlibDeflateOptions: {
            chunkSize: 1024,
            memLevel: 7,
            level: 3
          },
          zlibInflateOptions: { chunkSize: 10 * 1024 },
          clientNoContextTakeover: true,
          serverNoContextTakeover: true,
          threshold: 1024
        },
        maxPayload: 1024 * 1024 // 1MB max payload
      });

      this.wss.on('error', (error) => {
        console.error('[WebSocket Error]:', error);
        // Notify clients of connection issues
        this.wss?.clients.forEach(client => {
          client.send(JSON.stringify({ type: 'error', message: 'Connection issue detected' }));
        });
        if (!this.isReconnecting) {
          this.isReconnecting = true;
          this.retryCount = (this.retryCount || 0) + 1;

          if (this.retryCount > 5) {
            console.error('[WebSocket] Max retries exceeded, forcing server restart');
            this.forceRestart(server);
            return;
          }

          const backoffDelay = Math.min(1000 * Math.pow(2, this.retryCount - 1), 10000);
          setTimeout(async () => {
            try {
              await this.cleanup();
              await clearHangingWebSocketPorts();
              this.wss = await this.initialize(server);
              this.retryCount = 0;
              console.log('[WebSocket] Recovery successful');
            } catch (e) {
              console.error('[WebSocket Recovery Failed]:', e);
              if (e.code === 'EADDRINUSE') {
                await clearHangingWebSocketPorts();
              }
            } finally {
              this.isReconnecting = false;
            }
          }, backoffDelay);
        }
      });

      // Monitor connection health
      setInterval(() => {
        this.wss.clients.forEach((client) => {
          if (!client.isAlive) {
            client.terminate();
            return;
          }
          client.isAlive = false;
          client.ping();
        });
      }, 30000);

      this.wss.on('connection', (ws) => {
        console.log('[WebSocket Connected] Client connected to path:', this.path);

        ws.on('error', (error) => {
          console.error('[WebSocket Client Error]:', error);
        });

        // Send initial connection success message
        if (this.path === '/hmr/') {
          ws.send(JSON.stringify({ type: 'connected' }));
        }
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

    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
      this.reconnectInterval = null;
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

  private async forceRestart(server: Server) {
    this.cleanup();
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    server.close();
    // Restart the server here.  Implementation depends on your server setup.
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