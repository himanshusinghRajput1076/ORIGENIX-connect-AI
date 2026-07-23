import { collections } from '@origenix/database';

export class NotificationsRepository {
  async findAll(filters?: any) {
    if (!collections.notifications) return [];
    const snapshot = await collections.notifications.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findById(id: string) {
    if (!collections.notifications) return null;
    const doc = await collections.notifications.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async create(data: any) {
    if (!collections.notifications) return { id: 'mock', ...data };
    const ref = await collections.notifications.add({ ...data, createdAt: new Date() });
    return { id: ref.id, ...data };
  }

  async update(id: string, data: any) {
    if (!collections.notifications) return { id, ...data };
    await collections.notifications.doc(id).update({ ...data, updatedAt: new Date() });
    return { id, ...data };
  }

  async async markAsRead(id: string) { return this.update(id, { isRead: true }); }

  delete(id: string) {
    if (!collections.notifications) return true;
    await collections.notifications.doc(id).delete();
    return true;
  }
}
