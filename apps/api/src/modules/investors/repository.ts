import { collections } from '@origenix/database';

export class InvestorsRepository {
  async findAll(filters?: any) {
    if (!collections.investors) return [];
    const snapshot = await collections.investors.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findById(id: string) {
    if (!collections.investors) return null;
    const doc = await collections.investors.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async create(data: any) {
    if (!collections.investors) return { id: 'mock', ...data };
    const ref = await collections.investors.add({ ...data, createdAt: new Date() });
    return { id: ref.id, ...data };
  }

  async update(id: string, data: any) {
    if (!collections.investors) return { id, ...data };
    await collections.investors.doc(id).update({ ...data, updatedAt: new Date() });
    return { id, ...data };
  }

  async delete(id: string) {
    if (!collections.investors) return true;
    await collections.investors.doc(id).delete();
    return true;
  }
}
