import * as schemas from './schemas';
import { z } from 'zod';
export declare class CRMService {
    getContacts(): Promise<{
        stage: import("@prisma/client").$Enums.ContactStage;
        name: string;
        id: string;
        email: string | null;
        linkedinUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        leadScore: number;
        phone: string | null;
        companyName: string | null;
        notes: string | null;
        temperature: import("@prisma/client").$Enums.LeadTemp;
    }[]>;
    updateContactStage(id: string, data: z.infer<typeof schemas.UpdateStageSchema>): Promise<{
        stage: import("@prisma/client").$Enums.ContactStage;
        name: string;
        id: string;
        email: string | null;
        linkedinUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        leadScore: number;
        phone: string | null;
        companyName: string | null;
        notes: string | null;
        temperature: import("@prisma/client").$Enums.LeadTemp;
    }>;
    addNote(contactId: string, data: z.infer<typeof schemas.AddNoteSchema>): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        content: string;
        contactId: string;
    }>;
    getNotes(contactId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        content: string;
        contactId: string;
    }[]>;
}
