import { z } from 'zod';
export declare const FounderFilterSchema: z.ZodObject<{
    techStack: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    location?: string | undefined;
    techStack?: string | undefined;
}, {
    location?: string | undefined;
    techStack?: string | undefined;
}>;
