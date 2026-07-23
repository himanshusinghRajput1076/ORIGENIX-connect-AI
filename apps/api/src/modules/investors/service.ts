import { InvestorRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new InvestorRepository();
export class InvestorService {
  async getInvestors(filters: z.infer<typeof schemas.InvestorFilterSchema>) { return repo.findAll(filters); }
  async getInvestorById(id: string) {
    const res = await repo.findById(id);
    if (!res) throw new Error('Investor not found');
    return res;
  }
}
