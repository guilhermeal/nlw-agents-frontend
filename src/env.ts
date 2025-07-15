import { z } from 'zod';

const envSchema = z.object({
  VITE_API_PORT: z.coerce.number().default(80),
  VITE_API_HOST: z.string().default('http://localhost'),
});

// ✅ Usar import.meta.env em vez de process.env
export const env = envSchema.parse(import.meta.env);

// Usage
export const apiUrl = `http://${env.VITE_API_HOST}:${env.VITE_API_PORT}`;