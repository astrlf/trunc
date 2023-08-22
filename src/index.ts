// remove once v20.6.0 lands
// https://twitter.com/kom_256/status/1692225622091706389
import 'dotenv/config';
import express, { json, urlencoded } from 'express';

import { Logger } from './lib/index.js';
import { home, url } from './routes/index.js';
import { error } from './middleware/index.js';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';
      PORT?: number;
    }
  }
}

process.env.PORT ??= 3000;
process.env.NODE_ENV ??= 'development';

const logger = Logger.instance('trunc');
const server = express();

logger.info(`running in ${process.env.NODE_ENV} mode`);

server
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(error)

server
  .use(home)
  .use(url)

server.listen(process.env.PORT, () => {
  logger.success(`listening on port ${process.env.PORT}`);
});