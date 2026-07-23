import { collections } from '@origenix/database';

export class StartupRepository {
  async findAll(filters?: any) { return []; }
  async findById(id: string) { return null; }
  async create(data: any) { return { id: 'mock', ...data }; }
  async updateMetrics(id: string, metrics: any) { return null; }
  async update(id: string, data: any) { return { id, ...data }; }
  async delete(id: string) { return true; }
}
