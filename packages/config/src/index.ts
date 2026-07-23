import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables from .env file if it exists
dotenv.config();

const AppConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  MONGODB_URL: z.string().optional(),
  QDRANT_URL: z.string().default('http://localhost:6333'),
  ENCRYPTION_SECRET: z.string().min(16, 'ENCRYPTION_SECRET must be at least 16 characters'),
  LINKEDIN_CLIENT_ID: z.string().optional(),
  LINKEDIN_CLIENT_SECRET: z.string().optional(),
  LINKEDIN_REDIRECT_URI: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  JWT_SECRET: z.string().min(8, 'JWT_SECRET must be at least 8 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  PORT: z.coerce.number().default(3000),
  API_PORT: z.coerce.number().default(4000),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

export function loadConfig(): AppConfig {
  try {
    return AppConfigSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Configuration validation error:', JSON.stringify(error.format(), null, 2));
      process.exit(1);
    }
    throw error;
  }
}

export const config = loadConfig();
