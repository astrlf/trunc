import { z } from 'zod';
import express from 'express';

import { Logger } from './index.js';
import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
    }
  }
}

const env = z.object({
  NODE_ENV: z.string().default('DEVELOPMENT'),

  PORT: z.number().positive().default(3000),
});

const config = env.parse(process.env);

const logger = Logger.instance('trunc');
const prisma = new PrismaClient();
const server = express();

export { config, logger, server, prisma as database };
