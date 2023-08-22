import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { toShort } from '../controllers/index.js';

export const url = Router()
  .post('/:url', async (req, res) => {
    const short = await toShort(req.params.url);

    res.status(StatusCodes.OK).json({ short });
  })
