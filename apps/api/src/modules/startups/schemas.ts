import { z } from 'zod';
export const StartupMetricsUpdateSchema = z.object({ mrr: z.number().optional(), users: z.number().optional(), growthRate: z.number().optional() });
