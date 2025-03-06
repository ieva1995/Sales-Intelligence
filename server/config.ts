/**
 * Centralized configuration for the SalesBoost AI platform
 * This serves as the single source of truth for configuration values across the application
 */

// Environment detection
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development' || !isProduction;

// Server configuration
export const serverConfig = {
  // Port configuration - always use 5000 as the standard Replit port
  port: parseInt(process.env.PORT || '5000', 10),
  
  // Server timeout settings
  timeouts: {
    server: 65000, // keep-alive timeout
    headers: 66000, // headers timeout
    request: 30000,  // individual request timeout
  },
  
  // CORS settings
  cors: {
    origin: '*', // For development; restrict in production
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  },
  
  // Content limits
  limits: {
    json: '50mb',
    urlencoded: '50mb',
  },
};

// WebSocket configuration
export const websocketConfig = {
  path: '/ws-feed',
  pingInterval: 30000, // WebSocket ping interval for health check
  compression: {
    zlibOptions: { 
      chunkSize: 1024, 
      level: 3 
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
  },
};

// Logging configuration
export const loggingConfig = {
  level: isDevelopment ? 'debug' : 'info',
  timestamp: true,
};

// Application URLs
export const appUrls = {
  getServerUrl: () => `http://0.0.0.0:${serverConfig.port}`,
  getPublicUrl: () => {
    if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
      return `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
    }
    return `http://localhost:${serverConfig.port}`;
  }
};

// Export a single config object for convenience
export const config = {
  server: serverConfig,
  websocket: websocketConfig,
  logging: loggingConfig,
  urls: appUrls,
  isProduction,
  isDevelopment,
};

export default config;
