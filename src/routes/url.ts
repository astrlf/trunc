import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { toShort } from '../controllers/index.js';

const url = Router();

url.post('/:url', (req, res) => {
  if (!req.params.url) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'url is required' });

  return toShort(req.params.url)
    .then((slug) => res.status(StatusCodes.OK).json({ message: 'shortened successfully', data: { url: slug } }))
    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ message: error.message }));
});

export { url };
