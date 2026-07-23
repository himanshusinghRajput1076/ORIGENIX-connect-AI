import { StartupRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new StartupRepository();
export class StartupService {
  async getStartups() { return repo.findAll(); }
  async getStartupById(id: string) {
    const res = await repo.findById(id);
    if (!res) throw new Error('Startup not found');
    return res;
  }
  async updateMetrics(id: string, data: z.infer<typeof schemas.StartupMetricsUpdateSchema>) { return repo.updateMetrics(id, data); }
}
