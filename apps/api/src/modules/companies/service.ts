import { CompanyRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new CompanyRepository();
export class CompanyService {
  async getCompanies(filters: z.infer<typeof schemas.CompanyFilterSchema>) { return repo.findAll(filters); }
  async getCompanyById(id: string) {
    const res = await repo.findById(id);
    if (!res) throw new Error('Company not found');
    return res;
  }
  async createCompany(data: z.infer<typeof schemas.CompanyCreateSchema>) { return repo.create(data); }
  async updateCompany(id: string, data: z.infer<typeof schemas.CompanyUpdateSchema>) { return repo.update(id, data); }
  async deleteCompany(id: string) { return repo.delete(id); }
}
