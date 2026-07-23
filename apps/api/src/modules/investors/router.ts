import { Router } from 'express';
import { InvestorController } from './controller';
const router: Router = Router();
const controller = new InvestorController();
router.get('/', controller.getInvestors);
router.get('/:id', controller.getInvestorById);
export default router;
