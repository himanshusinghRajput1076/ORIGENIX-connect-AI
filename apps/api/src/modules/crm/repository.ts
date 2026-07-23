import { collections } from '@origenix/database';

export class CrmRepository {
  async findAll(filters?: any) {
    if (!collections.crm) return [];
    const snapshot = await collections.crm.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findById(id: string) {
    if (!collections.crm) return null;
    const doc = await collections.crm.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async create(data: any) {
    if (!collections.crm) return { id: 'mock', ...data };
    const ref = await collections.crm.add({ ...data, createdAt: new Date() });
    return { id: ref.id, ...data };
  }

  async update(id: string, data: any) {
    if (!collections.crm) return { id, ...data };
    await collections.crm.doc(id).update({ ...data, updatedAt: new Date() });
    return { id, ...data };
  }

  async async findContacts() { return this.findAll(); }
  async updateStage(id: string, stage: string) { return this.update(id, { stage }); }
  async addNote(contactId: string, content: string) { if(collections.crmNotes) await collections.crmNotes.add({contactId, content, userId: "system"}); return true; }
  async getNotes(contactId: string) { if(!collections.crmNotes) return []; const snap = await collections.crmNotes.where("contactId", "==", contactId).get(); return snap.docs.map(d => d.data()); }

  delete(id: string) {
    if (!collections.crm) return true;
    await collections.crm.doc(id).delete();
    return true;
  }
}
