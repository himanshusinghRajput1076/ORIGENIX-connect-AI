"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const database_1 = require("@origenix/database");
class NotificationRepository {
    async findAll() { return database_1.prisma.notification.findMany(); }
    async markAsRead(id) { return database_1.prisma.notification.update({ where: { id }, data: { isRead: true } }); }
}
exports.NotificationRepository = NotificationRepository;
