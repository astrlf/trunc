import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { toShort } from '../controllers/index.js';

const url = Router();

url.post('/:url', async (req, res) => {
  const short = await toShort(req.params.url);

  res.status(StatusCodes.OK).json({ short });
});

export { url };
