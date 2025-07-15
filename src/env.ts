import { z } from 'zod';

const envSchema = z.object({
  API_PORT: z.coerce.number().default(3333),
  API_HOST: z.string().default('localhost'),
});

export const env = envSchema.parse(process.env);