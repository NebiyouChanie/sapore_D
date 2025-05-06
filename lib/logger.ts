// lib/logger.ts
import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.simple()
  ),
  transports: [
    new transports.File({ filename: 'logs/app.log' }),
    new transports.Console()
  ],
});

export default logger;
