import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { deleteShort, toShort } from '../controllers/index.js';
import { logger } from '../lib/index.js';

const url = Router();

url
  .post('/', (req, res) => {
    if (!req.body.url) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'url is required' });

    return toShort(req.body.url)
      .then((data) => {
        logger.info(`shortened ${req.body.url} to ${data.slug}`);
        res.status(StatusCodes.OK).json({ message: 'shortened successfully', data });
      })
      .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ message: error.message }));
  })
  .delete('/:slug', (req, res) => {
    if (!req.params.slug) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'slug is required' });
    if (!req.body.deletionKey) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'deletion key is required' });

    return deleteShort(req.params.slug, req.body.deletionKey)
      .then(({ slug, url }) => {
        logger.info(`deleted ${slug} originally ${url}`);
        res.status(StatusCodes.OK).json({ message: `deleted ${slug} (${url}) successfully` });
      })
      .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ message: error.message }));
  });

export { url };
