import { Request, Response } from 'express';
import { InvestorService } from './service';
import * as schemas from './schemas';
const service = new InvestorService();
export class InvestorController {
  async getInvestors(req: Request, res: Response) {
    try {
      const filters = schemas.InvestorFilterSchema.parse((req.query as any));
      const result = await service.getInvestors(filters);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async getInvestorById(req: Request, res: Response) {
    try {
      const result = await service.getInvestorById((req.params.id as string));
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(404).json({ success: false, error: e.message }); }
  }
}
