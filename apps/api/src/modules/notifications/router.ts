import { Router } from 'express';
import { NotificationController } from './controller';
const router: Router = Router();
const controller = new NotificationController();
router.get('/', controller.getNotifications);
router.patch('/:id/read', controller.markAsRead);
export default router;
