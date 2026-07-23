export declare class CRMRepository {
    findAll(filters?: any): Promise<never[]>;
    findById(id: string): Promise<null>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<boolean>;
    findContacts(): Promise<never[]>;
    updateStage(id: string, stage: string): Promise<null>;
    addNote(contactId: string, content: string): Promise<boolean>;
    getNotes(contactId: string): Promise<never[]>;
}
