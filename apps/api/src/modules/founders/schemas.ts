import { z } from 'zod';
export const FounderFilterSchema = z.object({ techStack: z.string().optional(), location: z.string().optional() });
