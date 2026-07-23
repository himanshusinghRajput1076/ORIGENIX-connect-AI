import { z } from 'zod';
export declare const InvestorFilterSchema: z.ZodObject<{
    industry: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    checkSize: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    industry?: string | undefined;
    location?: string | undefined;
    checkSize?: number | undefined;
}, {
    industry?: string | undefined;
    location?: string | undefined;
    checkSize?: number | undefined;
}>;
