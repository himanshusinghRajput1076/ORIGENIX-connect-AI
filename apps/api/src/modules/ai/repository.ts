import { collections } from '@origenix/database';

export class AiRepository {
  async findAll(filters?: any) {
    if (!collections.ai) return [];
    const snapshot = await collections.ai.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findById(id: string) {
    if (!collections.ai) return null;
    const doc = await collections.ai.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async create(data: any) {
    if (!collections.ai) return { id: 'mock', ...data };
    const ref = await collections.ai.add({ ...data, createdAt: new Date() });
    return { id: ref.id, ...data };
  }

  async update(id: string, data: any) {
    if (!collections.ai) return { id, ...data };
    await collections.ai.doc(id).update({ ...data, updatedAt: new Date() });
    return { id, ...data };
  }

  async delete(id: string) {
    if (!collections.ai) return true;
    await collections.ai.doc(id).delete();
    return true;
  }
}
