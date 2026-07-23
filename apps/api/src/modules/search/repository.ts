import { collections } from '@origenix/database';

export class SearchRepository {
  async findAll(filters?: any) {
    if (!collections.search) return [];
    const snapshot = await collections.search.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findById(id: string) {
    if (!collections.search) return null;
    const doc = await collections.search.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async create(data: any) {
    if (!collections.search) return { id: 'mock', ...data };
    const ref = await collections.search.add({ ...data, createdAt: new Date() });
    return { id: ref.id, ...data };
  }

  async update(id: string, data: any) {
    if (!collections.search) return { id, ...data };
    await collections.search.doc(id).update({ ...data, updatedAt: new Date() });
    return { id, ...data };
  }

  async async searchAcrossAll(query: string, category?: string) { return { companies: [], investors: [], founders: [], startups: [] }; }

  delete(id: string) {
    if (!collections.search) return true;
    await collections.search.doc(id).delete();
    return true;
  }
}
