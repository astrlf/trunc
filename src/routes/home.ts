import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { fromShort } from '../controllers/index.js';

const home = Router();

home.get('/:id', (req, res) => res.status(StatusCodes.PERMANENT_REDIRECT).redirect(fromShort(req.params.id)));

export { home };