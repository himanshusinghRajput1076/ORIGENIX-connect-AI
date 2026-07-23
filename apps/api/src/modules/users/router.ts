import { Router } from 'express';
import { UserController } from './controller';
const router: Router = Router();
const controller = new UserController();
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/:id', controller.getProfile);
router.patch('/:id', controller.updateProfile);
export default router;
