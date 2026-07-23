import { Request, Response } from 'express';
import { CompanyService } from './service';
import * as schemas from './schemas';
const service = new CompanyService();
export class CompanyController {
  async getCompanies(req: Request, res: Response) {
    try {
      const filters = schemas.CompanyFilterSchema.parse((req.query as any));
      const result = await service.getCompanies(filters);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async getCompanyById(req: Request, res: Response) {
    try {
      const result = await service.getCompanyById((req.params.id as string));
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(404).json({ success: false, error: e.message }); }
  }
  async createCompany(req: Request, res: Response) {
    try {
      const data = schemas.CompanyCreateSchema.parse(req.body);
      const result = await service.createCompany(data);
      res.status(201).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async updateCompany(req: Request, res: Response) {
    try {
      const data = schemas.CompanyUpdateSchema.parse(req.body);
      const result = await service.updateCompany((req.params.id as string), data);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async deleteCompany(req: Request, res: Response) {
    try {
      await service.deleteCompany((req.params.id as string));
      res.status(204).send();
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
}
