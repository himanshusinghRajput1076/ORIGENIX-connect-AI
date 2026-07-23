import { CRMRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new CRMRepository();
export class CRMService {
  async getContacts() { return repo.findContacts(); }
  async updateContactStage(id: string, data: z.infer<typeof schemas.UpdateStageSchema>) { return repo.updateStage(id, data.stage); }
  async addNote(contactId: string, data: z.infer<typeof schemas.AddNoteSchema>) { return repo.addNote(contactId, data.content); }
  async getNotes(contactId: string) { return repo.getNotes(contactId); }
}
