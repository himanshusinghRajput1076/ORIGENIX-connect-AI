import * as schemas from './schemas';
import { z } from 'zod';
export declare class CRMService {
    getContacts(): Promise<never[]>;
    updateContactStage(id: string, data: z.infer<typeof schemas.UpdateStageSchema>): Promise<null>;
    addNote(contactId: string, data: z.infer<typeof schemas.AddNoteSchema>): Promise<boolean>;
    getNotes(contactId: string): Promise<never[]>;
}
