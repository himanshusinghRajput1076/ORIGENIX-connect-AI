export declare class StartupRepository {
    findAll(filters?: any): Promise<never[]>;
    findById(id: string): Promise<null>;
    create(data: any): Promise<any>;
    updateMetrics(id: string, metrics: any): Promise<null>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<boolean>;
}
