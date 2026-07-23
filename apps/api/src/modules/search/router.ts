import { Router } from 'express';
import { SearchController } from './controller';
const router: Router = Router();
const controller = new SearchController();
router.get('/', controller.search);
export default router;
