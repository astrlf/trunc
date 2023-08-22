import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { fromShort } from '../controllers/index.js';

const home = Router();

home
  .get('/', (_, res) => res.status(StatusCodes.OK).json({ message: 'pong' }))
  .get('/:slug', async (req, res) => {
    if (!req.params.slug) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'id is required' });

    return res //
      .status(StatusCodes.PERMANENT_REDIRECT)
      .redirect(await fromShort(req.params.slug));
  });

export { home };
