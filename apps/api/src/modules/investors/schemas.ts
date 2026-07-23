import { z } from 'zod';
export const InvestorFilterSchema = z.object({ industry: z.string().optional(), location: z.string().optional(), checkSize: z.coerce.number().optional() });
