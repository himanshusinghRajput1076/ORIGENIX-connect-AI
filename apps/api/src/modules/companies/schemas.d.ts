import { z } from 'zod';
export declare const CompanyCreateSchema: z.ZodObject<{
    name: z.ZodString;
    industry: z.ZodString;
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    industry: string;
    location: string;
    name: string;
}, {
    industry: string;
    location: string;
    name: string;
}>;
export declare const CompanyUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    industry: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    industry?: string | undefined;
    location?: string | undefined;
    name?: string | undefined;
}, {
    industry?: string | undefined;
    location?: string | undefined;
    name?: string | undefined;
}>;
export declare const CompanyFilterSchema: z.ZodObject<{
    industry: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    industry?: string | undefined;
    location?: string | undefined;
}, {
    industry?: string | undefined;
    location?: string | undefined;
}>;
