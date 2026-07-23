import { Router } from 'express';
import { LinkedInController } from './controller';

const router: Router = Router();
const controller = new LinkedInController();

router.post('/connect', controller.connect);
router.post('/message', controller.sendMessage);
router.get('/profile', controller.getProfile);

export default router;
