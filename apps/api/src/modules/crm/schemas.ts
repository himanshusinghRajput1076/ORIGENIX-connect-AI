import { z } from 'zod';
export const UpdateStageSchema = z.object({ stage: z.string() });
export const AddNoteSchema = z.object({ content: z.string().min(1) });
