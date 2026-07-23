import { z } from 'zod';
export declare const GlobalSearchSchema: z.ZodObject<{
    q: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    q: string;
    category?: string | undefined;
}, {
    q: string;
    category?: string | undefined;
}>;
