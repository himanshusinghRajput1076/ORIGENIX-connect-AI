import { collections } from '@origenix/database';

export class UsersRepository {
  async findAll(filters?: any) {
    if (!collections.users) return [];
    const snapshot = await collections.users.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findById(id: string) {
    if (!collections.users) return null;
    const doc = await collections.users.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async create(data: any) {
    if (!collections.users) return { id: 'mock', ...data };
    const ref = await collections.users.add({ ...data, createdAt: new Date() });
    return { id: ref.id, ...data };
  }

  async update(id: string, data: any) {
    if (!collections.users) return { id, ...data };
    await collections.users.doc(id).update({ ...data, updatedAt: new Date() });
    return { id, ...data };
  }

  async async findByEmail(email: string) {
    if (!collections.users) return null;
    const snapshot = await collections.users.where("email", "==", email).limit(1).get();
    return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  }

  delete(id: string) {
    if (!collections.users) return true;
    await collections.users.doc(id).delete();
    return true;
  }
}
