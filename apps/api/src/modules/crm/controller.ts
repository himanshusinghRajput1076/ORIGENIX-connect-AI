import { Request, Response } from 'express';
import { CRMService } from './service';
import * as schemas from './schemas';
const service = new CRMService();
export class CRMController {
  async getContacts(req: Request, res: Response) {
    try {
      const result = await service.getContacts();
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async updateContactStage(req: Request, res: Response) {
    try {
      const data = schemas.UpdateStageSchema.parse(req.body);
      const result = await service.updateContactStage((req.params.id as string), data);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async addNote(req: Request, res: Response) {
    try {
      const data = schemas.AddNoteSchema.parse(req.body);
      const result = await service.addNote((req.params.id as string), data);
      res.status(201).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async getNotes(req: Request, res: Response) {
    try {
      const result = await service.getNotes((req.params.id as string));
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
}
