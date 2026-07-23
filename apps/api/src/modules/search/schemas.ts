import { z } from 'zod';
export const GlobalSearchSchema = z.object({ q: z.string().min(1), category: z.string().optional() });
