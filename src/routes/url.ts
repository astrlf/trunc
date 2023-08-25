import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { deleteShort, toShort, fromShort } from '../controllers/index.js';
import { reply, redirect } from '../lib/index.js';

const url = Router();

url.get('/:slug', ({ params: { slug } }, res) => {
  if (!slug) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'id is required' });

  return fromShort(slug)
    .then(({ url }) => redirect(res, url))
    .catch(({ message }) => reply(res, StatusCodes.BAD_REQUEST, { message }));
});

url.post('/', ({ body: { url, custom } }, res) => {
  if (!url) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'url is required' });

  return toShort(url, custom)
    .then((data) => reply(res, StatusCodes.OK, { message: 'shortened successfully', data }))
    .catch(({ message }) => reply(res, StatusCodes.BAD_REQUEST, { message }));
});

// JSON should be snake_case, not camelCase
url.delete('/', ({ body: { slug, deletion_key } }, res) => {
  if (!slug) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'slug is required' });
  if (!deletion_key) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'deletion key is required' });

  return deleteShort(slug, deletion_key)
    .then(() => reply(res, StatusCodes.OK, { message: `deleted ${slug} successfully` })) // purposefully hide data
    .catch(({ message }) => reply(res, StatusCodes.BAD_REQUEST, { message }));
});

export { url };
