"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const service_1 = require("./service");
const service = new service_1.NotificationService();
class NotificationController {
    async getNotifications(req, res) {
        try {
            const result = await service.getNotifications();
            res.status(200).json({ success: true, data: result });
        }
        catch (e) {
            res.status(400).json({ success: false, error: e.message });
        }
    }
    async markAsRead(req, res) {
        try {
            const result = await service.markAsRead(req.params.id);
            res.status(200).json({ success: true, data: result });
        }
        catch (e) {
            res.status(400).json({ success: false, error: e.message });
        }
    }
}
exports.NotificationController = NotificationController;
