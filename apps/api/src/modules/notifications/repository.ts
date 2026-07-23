import { prisma } from '@origenix/database';
export class NotificationRepository {
  async findAll() { return prisma.notification.findMany(); }
  async markAsRead(id: string) { return prisma.notification.update({ where: { id }, data: { isRead: true } }); }
}
