import { z } from 'zod';
export declare const UpdateStageSchema: z.ZodObject<{
    stage: z.ZodString;
}, "strip", z.ZodTypeAny, {
    stage: string;
}, {
    stage: string;
}>;
export declare const AddNoteSchema: z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
}, {
    content: string;
}>;
