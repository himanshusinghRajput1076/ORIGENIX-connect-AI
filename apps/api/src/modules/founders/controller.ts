import { Request, Response } from 'express';
import { FounderService } from './service';
import * as schemas from './schemas';
const service = new FounderService();
export class FounderController {
  async getFounders(req: Request, res: Response) {
    try {
      const filters = schemas.FounderFilterSchema.parse((req.query as any));
      const result = await service.getFounders(filters);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async getFounderById(req: Request, res: Response) {
    try {
      const result = await service.getFounderById((req.params.id as string));
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(404).json({ success: false, error: e.message }); }
  }
}
