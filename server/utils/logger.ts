/**
 * Centralized logging utility for the SalesBoost AI platform
 * Provides consistent logging interface throughout the application
 */

import { loggingConfig } from '../config';

// Log levels
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Simple timestamp function
const timestamp = (): string => {
  return new Date().toISOString();
};

// Format log message with context
const formatMessage = (level: LogLevel, message: string, context?: string): string => {
  const prefix = context ? `[${context}]` : '';
  const ts = loggingConfig.timestamp ? `[${timestamp()}]` : '';
  return `${ts} ${level.toUpperCase()} ${prefix} ${message}`;
};

// Log to console with appropriate level
const log = (level: LogLevel, message: string, context?: string): void => {
  const formattedMessage = formatMessage(level, message, context);
  
  switch (level) {
    case 'debug':
      if (loggingConfig.level === 'debug') {
        console.debug(formattedMessage);
      }
      break;
    case 'info':
      console.info(formattedMessage);
      break;
    case 'warn':
      console.warn(formattedMessage);
      break;
    case 'error':
      console.error(formattedMessage);
      break;
  }
};

// Export specific log level functions
export const debug = (message: string, context?: string): void => {
  log('debug', message, context);
};

export const info = (message: string, context?: string): void => {
  log('info', message, context);
};

export const warn = (message: string, context?: string): void => {
  log('warn', message, context);
};

export const error = (message: string, context?: string): void => {
  log('error', message, context);
};

export default {
  debug,
  info,
  warn,
  error
};
