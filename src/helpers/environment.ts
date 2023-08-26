import { z } from 'zod';
import { pino } from 'pino';
import { PrismaClient } from '@prisma/client';
import express from 'express';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
    }
  }
}

const env = z.object({
  NODE_ENV: z.enum(['DEVELOPMENT', 'PRODUCTION']).default('DEVELOPMENT'),
  PINO_LOG_LEVEL: z.string().default('debug'),

  PORT: z.number().positive().default(3000),
});

const config = env.parse(process.env);
console.log(config.PINO_LOG_LEVEL);

const logger = pino({ name: 'trunc', level: config.PINO_LOG_LEVEL });
const prisma = new PrismaClient();
const server = express();

export { config, logger, server, prisma };
