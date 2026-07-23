import { z } from 'zod';

export const ConnectSchema = z.object({
  targetProfileUrl: z.string().url(),
  message: z.string().optional()
});

export const SendMessageSchema = z.object({
  targetProfileUrl: z.string().url(),
  message: z.string().min(1)
});

export const GetProfileSchema = z.object({
  targetProfileUrl: z.string().url()
});
