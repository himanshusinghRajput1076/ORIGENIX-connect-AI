import { NotificationRepository } from './repository';
const repo = new NotificationRepository();
export class NotificationService {
  async getNotifications() { return repo.findAll(); }
  async markAsRead(id: string) { return repo.markAsRead(id); }
}
