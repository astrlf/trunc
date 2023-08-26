import { z } from 'zod';
import { pino } from 'pino';
import { PrismaClient } from '@prisma/client';
import express from 'express';

const config = z
  .object({
    NODE_ENV: z.enum(['DEVELOPMENT', 'PRODUCTION']).default('DEVELOPMENT'),
    PINO_LOG_LEVEL: z.string().default('debug'),

    PORT: z.number().positive().default(3000),
  })
  .parse(process.env);

const prisma = new PrismaClient();
const logger = pino({ name: 'trunc', level: config.PINO_LOG_LEVEL });
const server = express();

export { config, logger, server, prisma };
