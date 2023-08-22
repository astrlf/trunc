import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Logger } from '../lib/index.js';

const logger = Logger.instance('trunc');

/**
 * A middleware to handle error reporting,
 * both console and request response.
 */
function error(err: Error, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err.message, err);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: err.message,
  });
}

export { error };
