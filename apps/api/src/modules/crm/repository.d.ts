export declare class CRMRepository {
    findContacts(): Promise<{
        stage: import("@origenix/database").$Enums.ContactStage;
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
        temperature: import("@origenix/database").$Enums.LeadTemp;
    }[]>;
    updateStage(id: string, stage: any): Promise<{
        stage: import("@origenix/database").$Enums.ContactStage;
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
        temperature: import("@origenix/database").$Enums.LeadTemp;
    }>;
    addNote(contactId: string, content: string): Promise<{
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
