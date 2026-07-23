import { Request, Response } from 'express';
import { NotificationService } from './service';
const service = new NotificationService();
export class NotificationController {
  async getNotifications(req: Request, res: Response) {
    try {
      const result = await service.getNotifications();
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async markAsRead(req: Request, res: Response) {
    try {
      const result = await service.markAsRead((req.params.id as string));
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
}
