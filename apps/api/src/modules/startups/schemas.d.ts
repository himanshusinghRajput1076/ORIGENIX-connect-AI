import { z } from 'zod';
export declare const StartupMetricsUpdateSchema: z.ZodObject<{
    mrr: z.ZodOptional<z.ZodNumber>;
    users: z.ZodOptional<z.ZodNumber>;
    growthRate: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    mrr?: number | undefined;
    users?: number | undefined;
    growthRate?: number | undefined;
}, {
    mrr?: number | undefined;
    users?: number | undefined;
    growthRate?: number | undefined;
}>;
