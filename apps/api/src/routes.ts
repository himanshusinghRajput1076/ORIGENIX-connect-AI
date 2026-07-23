import { Router } from 'express';
import usersRouter from './modules/users/router';
import companiesRouter from './modules/companies/router';
import investorsRouter from './modules/investors/router';
import foundersRouter from './modules/founders/router';
import startupsRouter from './modules/startups/router';
import searchRouter from './modules/search/router';
import crmRouter from './modules/crm/router';
import notificationsRouter from './modules/notifications/router';
import aiRouter from './modules/ai/router';
import linkedinRouter from './modules/linkedin/router';

const router: Router = Router();

router.use('/api/users', usersRouter);
router.use('/api/companies', companiesRouter);
router.use('/api/investors', investorsRouter);
router.use('/api/founders', foundersRouter);
router.use('/api/startups', startupsRouter);
router.use('/api/search', searchRouter);
router.use('/api/crm', crmRouter);
router.use('/api/notifications', notificationsRouter);
router.use('/api/ai', aiRouter);
router.use('/api/linkedin', linkedinRouter);

export default router;
