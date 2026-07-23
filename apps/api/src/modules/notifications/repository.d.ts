export declare class NotificationRepository {
    findAll(): Promise<{
        message: string;
        type: import("@origenix/database").$Enums.NotificationType;
        id: string;
        title: string;
        createdAt: Date;
        userId: string;
        isRead: boolean;
        link: string | null;
    }[]>;
    markAsRead(id: string): Promise<{
        message: string;
        type: import("@origenix/database").$Enums.NotificationType;
        id: string;
        title: string;
        createdAt: Date;
        userId: string;
        isRead: boolean;
        link: string | null;
    }>;
}
