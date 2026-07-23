"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
class NotificationRepository {
    async findAll(filters) { return []; }
    async findById(id) { return null; }
    async create(data) { return { id: 'mock', ...data }; }
    async update(id, data) { return { id, ...data }; }
    async delete(id) { return true; }
    async markAsRead(id) { return null; }
}
exports.NotificationRepository = NotificationRepository;
