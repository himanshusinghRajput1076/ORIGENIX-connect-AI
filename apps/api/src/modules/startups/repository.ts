import { collections } from '@origenix/database';

export class StartupsRepository {
  async findAll(filters?: any) {
    if (!collections.startups) return [];
    const snapshot = await collections.startups.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findById(id: string) {
    if (!collections.startups) return null;
    const doc = await collections.startups.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async create(data: any) {
    if (!collections.startups) return { id: 'mock', ...data };
    const ref = await collections.startups.add({ ...data, createdAt: new Date() });
    return { id: ref.id, ...data };
  }

  async update(id: string, data: any) {
    if (!collections.startups) return { id, ...data };
    await collections.startups.doc(id).update({ ...data, updatedAt: new Date() });
    return { id, ...data };
  }

  async delete(id: string) {
    if (!collections.startups) return true;
    await collections.startups.doc(id).delete();
    return true;
  }
}
