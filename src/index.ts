// remove once v20.6.0 lands
// https://twitter.com/kom_256/status/1692225622091706389
import 'dotenv/config';

import { json, urlencoded, static as serve } from 'express';
import { resolve } from 'node:path';

import { config, logger, server } from './helpers/index.js';
import { url } from './routes/index.js';

logger.info(`running in ${config.NODE_ENV} mode`);

server
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(serve(resolve(process.cwd(), 'public')))
  .use(url);

server.listen(config.PORT, () => {
  logger.success(`listening on port ${config.PORT}`);
});
