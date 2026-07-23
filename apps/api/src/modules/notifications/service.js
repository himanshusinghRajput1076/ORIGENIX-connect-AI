"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const repository_1 = require("./repository");
const repo = new repository_1.NotificationRepository();
class NotificationService {
    async getNotifications() { return repo.findAll(); }
    async markAsRead(id) { return repo.markAsRead(id); }
}
exports.NotificationService = NotificationService;
