// remove once v20.6.0 lands
// https://twitter.com/kom_256/status/1692225622091706389
import 'dotenv/config';

import { json, urlencoded } from 'express';

import { config, logger, server } from './lib/index.js';
import { home, url } from './routes/index.js';

logger.info(`running in ${config.NODE_ENV} mode`);

server
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(home)
  .use(url)
  .listen(config.PORT, () => {
    logger.success(`listening on port ${config.PORT}`);
  });
