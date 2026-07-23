import { Router } from 'express';
import { CRMController } from './controller';
const router: Router = Router();
const controller = new CRMController();
router.get('/contacts', controller.getContacts);
router.patch('/contacts/:id/stage', controller.updateContactStage);
router.post('/contacts/:id/notes', controller.addNote);
router.get('/contacts/:id/notes', controller.getNotes);
export default router;
