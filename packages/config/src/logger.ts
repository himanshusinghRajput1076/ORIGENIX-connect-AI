export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  debug: (message: string, context?: Record<string, unknown>) => void;
  info: (message: string, context?: Record<string, unknown>) => void;
  warn: (message: string, context?: Record<string, unknown>) => void;
  error: (message: string, context?: Record<string, unknown>) => void;
}

export function createLogger(prefix: string): Logger {
  const log = (level: LogLevel, message: string, context?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] [${prefix}] ${message}`;
    
    switch (level) {
      case 'debug':
        console.log(formattedMessage, context ? context : '');
        break;
      case 'info':
        console.info(formattedMessage, context ? context : '');
        break;
      case 'warn':
        console.warn(formattedMessage, context ? context : '');
        break;
      case 'error':
        console.error(formattedMessage, context ? context : '');
        break;
    }
  };

  return {
    debug: (message: string, context?: Record<string, unknown>) => log('debug', message, context),
    info: (message: string, context?: Record<string, unknown>) => log('info', message, context),
    warn: (message: string, context?: Record<string, unknown>) => log('warn', message, context),
    error: (message: string, context?: Record<string, unknown>) => log('error', message, context),
  };
}
