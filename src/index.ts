// remove once v20.6.0 lands
// https://twitter.com/kom_256/status/1692225622091706389
import 'dotenv/config';

import { json, urlencoded } from 'express';

import { config, database, logger, server } from './lib/environment.js';
import { home, url } from './routes/index.js';
import { error } from './middleware/index.js';

logger.info(`running in ${config.NODE_ENV} mode`);

server
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(error);

server //
  .use(home)
  .use(url);

server.listen(config.PORT, () => {
  logger.success(`listening on port ${config.PORT}`);
});
