import { prisma } from '@origenix/database';
export class CRMRepository {
  async findContacts() { return prisma.contact.findMany(); }
  async updateStage(id: string, stage: any) { return prisma.contact.update({ where: { id }, data: { stage } }); }
  async addNote(contactId: string, content: string) { return prisma.crmNote.create({ data: { contactId, content, userId: 'system' } }); }
  async getNotes(contactId: string) { return prisma.crmNote.findMany({ where: { contactId } }); }
}
