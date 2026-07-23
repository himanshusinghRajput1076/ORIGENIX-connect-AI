import { collections } from '@origenix/database';

export class CRMRepository {
  async findAll(filters?: any) { return []; }
  async findById(id: string) { return null; }
  async create(data: any) { return { id: 'mock', ...data }; }
  async update(id: string, data: any) { return { id, ...data }; }
  async delete(id: string) { return true; }
  async findContacts() { return []; }
  async updateStage(id: string, stage: string) { return null; }
  async addNote(contactId: string, content: string) { return true; }
  async getNotes(contactId: string) { return []; }
}
