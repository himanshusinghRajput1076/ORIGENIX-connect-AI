import { collections } from '@origenix/database';

export class UserRepository {
  async findAll(filters?: any) { return []; }
  async findById(id: string) { return null; }
  async create(data: any) { return { id: 'mock', ...data }; }
  async update(id: string, data: any) { return { id, ...data }; }
  async delete(id: string) { return true; }
  async findByEmail(email: string): Promise<any> { return null; }
}
