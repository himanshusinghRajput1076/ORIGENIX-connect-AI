export declare class NotificationService {
    getNotifications(): Promise<{
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        id: string;
        title: string;
        createdAt: Date;
        userId: string;
        isRead: boolean;
        link: string | null;
    }[]>;
    markAsRead(id: string): Promise<{
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        id: string;
        title: string;
        createdAt: Date;
        userId: string;
        isRead: boolean;
        link: string | null;
    }>;
}
