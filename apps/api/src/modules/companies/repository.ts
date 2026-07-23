import { collections } from '@origenix/database';

export class CompaniesRepository {
  async findAll(filters?: any) {
    if (!collections.companies) return [];
    const snapshot = await collections.companies.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findById(id: string) {
    if (!collections.companies) return null;
    const doc = await collections.companies.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async create(data: any) {
    if (!collections.companies) return { id: 'mock', ...data };
    const ref = await collections.companies.add({ ...data, createdAt: new Date() });
    return { id: ref.id, ...data };
  }

  async update(id: string, data: any) {
    if (!collections.companies) return { id, ...data };
    await collections.companies.doc(id).update({ ...data, updatedAt: new Date() });
    return { id, ...data };
  }

  async delete(id: string) {
    if (!collections.companies) return true;
    await collections.companies.doc(id).delete();
    return true;
  }
}
