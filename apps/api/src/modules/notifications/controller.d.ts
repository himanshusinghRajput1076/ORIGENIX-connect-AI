import { Request, Response } from 'express';
export declare class NotificationController {
    getNotifications(req: Request, res: Response): Promise<void>;
    markAsRead(req: Request, res: Response): Promise<void>;
}
