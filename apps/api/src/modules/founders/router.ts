import { Router } from 'express';
import { FounderController } from './controller';
const router: Router = Router();
const controller = new FounderController();
router.get('/', controller.getFounders);
router.get('/:id', controller.getFounderById);
export default router;
