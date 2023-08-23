import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { fromShort } from '../controllers/index.js';
import { redirect, reply } from '../lib/index.js';

const home = Router();

home
  .get('/', (_, res) => res.status(StatusCodes.OK).json({ message: 'pong' }))
  .get('/:slug', ({ params: { slug } }, res) => {
    if (!slug) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'id is required' });

    return fromShort(slug)
      .then(({ url }) => redirect(res, url))
      .catch(({ message }) => reply(res, StatusCodes.BAD_REQUEST, { message }));
  });

export { home };
