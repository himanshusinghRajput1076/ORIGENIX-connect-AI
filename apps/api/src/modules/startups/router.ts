import { Router } from 'express';
import { StartupController } from './controller';
const router: Router = Router();
const controller = new StartupController();
router.get('/', controller.getStartups);
router.get('/:id', controller.getStartupById);
router.patch('/:id/metrics', controller.updateMetrics);
export default router;
