import { z } from 'zod';
export const CompanyCreateSchema = z.object({ name: z.string(), industry: z.string(), location: z.string() });
export const CompanyUpdateSchema = CompanyCreateSchema.partial();
export const CompanyFilterSchema = z.object({ industry: z.string().optional(), location: z.string().optional() });
