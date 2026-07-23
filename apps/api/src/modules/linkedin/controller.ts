import { Request, Response } from 'express';
import { LinkedInService } from './service';
import * as schemas from './schemas';

const service = new LinkedInService();

export class LinkedInController {
  async connect(req: Request, res: Response) {
    try {
      const data = schemas.ConnectSchema.parse(req.body);
      const userId = 'system'; // Replace with actual req.user.id in a real app
      const result = await service.connectToProfile(userId, data.targetProfileUrl, data.message);
      res.status(200).json(result);
    } catch (e: any) {
      res.status(400).json({ success: false, error: e.message });
    }
  }

  async sendMessage(req: Request, res: Response) {
    try {
      const data = schemas.SendMessageSchema.parse(req.body);
      const userId = 'system';
      const result = await service.sendMessage(userId, data.targetProfileUrl, data.message);
      res.status(200).json(result);
    } catch (e: any) {
      res.status(400).json({ success: false, error: e.message });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const data = schemas.GetProfileSchema.parse(req.query);
      const result = await service.getProfileDetails(data.targetProfileUrl);
      res.status(200).json(result);
    } catch (e: any) {
      res.status(400).json({ success: false, error: e.message });
    }
  }
}
