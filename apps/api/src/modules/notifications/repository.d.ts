export declare class NotificationRepository {
    findAll(filters?: any): Promise<never[]>;
    findById(id: string): Promise<null>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<boolean>;
    markAsRead(id: string): Promise<null>;
}
