import { Request, Response } from 'express';
import { SearchService } from './service';
import * as schemas from './schemas';
const service = new SearchService();
export class SearchController {
  async search(req: Request, res: Response) {
    try {
      const params = schemas.GlobalSearchSchema.parse((req.query as any));
      const result = await service.globalSearch(params);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
}
