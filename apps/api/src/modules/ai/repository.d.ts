export declare class AiRepository {
    findAll(filters?: any): Promise<never[]>;
    findById(id: string): Promise<null>;
    static saveAnalysis(data: any): Promise<null>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<boolean>;
}
