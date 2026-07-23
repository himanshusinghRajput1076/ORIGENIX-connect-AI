export declare class SearchRepository {
    findAll(filters?: any): Promise<never[]>;
    findById(id: string): Promise<null>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<boolean>;
    searchAcrossAll(query: string, category?: string): Promise<{
        companies: never[];
        investors: never[];
        founders: never[];
        startups: never[];
    }>;
}
