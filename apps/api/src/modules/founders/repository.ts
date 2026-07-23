import { collections } from '@origenix/database';

export class FoundersRepository {
  async findAll(filters?: any) {
    if (!collections.founders) return [];
    const snapshot = await collections.founders.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findById(id: string) {
    if (!collections.founders) return null;
    const doc = await collections.founders.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async create(data: any) {
    if (!collections.founders) return { id: 'mock', ...data };
    const ref = await collections.founders.add({ ...data, createdAt: new Date() });
    return { id: ref.id, ...data };
  }

  async update(id: string, data: any) {
    if (!collections.founders) return { id, ...data };
    await collections.founders.doc(id).update({ ...data, updatedAt: new Date() });
    return { id, ...data };
  }

  async delete(id: string) {
    if (!collections.founders) return true;
    await collections.founders.doc(id).delete();
    return true;
  }
}
