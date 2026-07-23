import { Request, Response } from 'express';
import { StartupService } from './service';
import * as schemas from './schemas';
const service = new StartupService();
export class StartupController {
  async getStartups(req: Request, res: Response) {
    try {
      const result = await service.getStartups();
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async getStartupById(req: Request, res: Response) {
    try {
      const result = await service.getStartupById((req.params.id as string));
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(404).json({ success: false, error: e.message }); }
  }
  async updateMetrics(req: Request, res: Response) {
    try {
      const data = schemas.StartupMetricsUpdateSchema.parse(req.body);
      const result = await service.updateMetrics((req.params.id as string), data);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
}
