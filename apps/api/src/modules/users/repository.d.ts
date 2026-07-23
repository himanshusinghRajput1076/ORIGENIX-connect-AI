export declare class UserRepository {
    findAll(filters?: any): Promise<never[]>;
    findById(id: string): Promise<null>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<boolean>;
    findByEmail(email: string): Promise<any>;
}
