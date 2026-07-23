import { z } from 'zod';
export declare const ConnectSchema: z.ZodObject<{
    targetProfileUrl: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    targetProfileUrl: string;
    message?: string | undefined;
}, {
    targetProfileUrl: string;
    message?: string | undefined;
}>;
export declare const SendMessageSchema: z.ZodObject<{
    targetProfileUrl: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    targetProfileUrl: string;
    message: string;
}, {
    targetProfileUrl: string;
    message: string;
}>;
export declare const GetProfileSchema: z.ZodObject<{
    targetProfileUrl: z.ZodString;
}, "strip", z.ZodTypeAny, {
    targetProfileUrl: string;
}, {
    targetProfileUrl: string;
}>;
