import { FounderRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new FounderRepository();
export class FounderService {
  async getFounders(filters: z.infer<typeof schemas.FounderFilterSchema>) { return repo.findAll(filters); }
  async getFounderById(id: string) {
    const res = await repo.findById(id);
    if (!res) throw new Error('Founder not found');
    return res;
  }
}
