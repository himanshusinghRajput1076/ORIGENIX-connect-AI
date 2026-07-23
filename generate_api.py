import os

base_dir = r"J:\Origenix Connect AI\origenix-connectai\apps\api\src\modules"

def create_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')

# USERS
users_schemas = """
import { z } from 'zod';
export const UserRegisterSchema = z.object({ email: z.string().email(), password: z.string().min(6), name: z.string().min(2) });
export const UserLoginSchema = z.object({ email: z.string().email(), password: z.string() });
export const UserUpdateSchema = z.object({ name: z.string().min(2).optional(), avatar: z.string().url().optional() });
"""
users_repo = """
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class UserRepository {
  async findByEmail(email: string) { return prisma.user.findUnique({ where: { email } }); }
  async create(data: any) { return prisma.user.create({ data }); }
  async findById(id: string) { return prisma.user.findUnique({ where: { id } }); }
  async update(id: string, data: any) { return prisma.user.update({ where: { id }, data }); }
}
"""
users_service = """
import { UserRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new UserRepository();
export class UserService {
  async register(data: z.infer<typeof schemas.UserRegisterSchema>) {
    const existing = await repo.findByEmail(data.email);
    if (existing) throw new Error('Email already in use');
    return repo.create(data);
  }
  async login(data: z.infer<typeof schemas.UserLoginSchema>) {
    const user = await repo.findByEmail(data.email);
    if (!user || user.password !== data.password) throw new Error('Invalid credentials');
    return user;
  }
  async getProfile(id: string) {
    const user = await repo.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }
  async updateProfile(id: string, data: z.infer<typeof schemas.UserUpdateSchema>) {
    return repo.update(id, data);
  }
}
"""
users_controller = """
import { Request, Response } from 'express';
import { UserService } from './service';
import * as schemas from './schemas';
const service = new UserService();
export class UserController {
  async register(req: Request, res: Response) {
    try {
      const parsed = schemas.UserRegisterSchema.parse(req.body);
      const result = await service.register(parsed);
      res.status(201).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async login(req: Request, res: Response) {
    try {
      const parsed = schemas.UserLoginSchema.parse(req.body);
      const result = await service.login(parsed);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(401).json({ success: false, error: e.message }); }
  }
  async getProfile(req: Request, res: Response) {
    try {
      const result = await service.getProfile(req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(404).json({ success: false, error: e.message }); }
  }
  async updateProfile(req: Request, res: Response) {
    try {
      const parsed = schemas.UserUpdateSchema.parse(req.body);
      const result = await service.updateProfile(req.params.id, parsed);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
}
"""
users_router = """
import { Router } from 'express';
import { UserController } from './controller';
const router = Router();
const controller = new UserController();
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/:id', controller.getProfile);
router.patch('/:id', controller.updateProfile);
export default router;
"""

# Companies
companies_schemas = """
import { z } from 'zod';
export const CompanyCreateSchema = z.object({ name: z.string(), industry: z.string(), location: z.string() });
export const CompanyUpdateSchema = CompanyCreateSchema.partial();
export const CompanyFilterSchema = z.object({ industry: z.string().optional(), location: z.string().optional() });
"""
companies_repo = """
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class CompanyRepository {
  async findAll(filters: any) { return prisma.company.findMany({ where: filters }); }
  async findById(id: string) { return prisma.company.findUnique({ where: { id } }); }
  async create(data: any) { return prisma.company.create({ data }); }
  async update(id: string, data: any) { return prisma.company.update({ where: { id }, data }); }
  async delete(id: string) { return prisma.company.delete({ where: { id } }); }
}
"""
companies_service = """
import { CompanyRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new CompanyRepository();
export class CompanyService {
  async getCompanies(filters: z.infer<typeof schemas.CompanyFilterSchema>) { return repo.findAll(filters); }
  async getCompanyById(id: string) {
    const res = await repo.findById(id);
    if (!res) throw new Error('Company not found');
    return res;
  }
  async createCompany(data: z.infer<typeof schemas.CompanyCreateSchema>) { return repo.create(data); }
  async updateCompany(id: string, data: z.infer<typeof schemas.CompanyUpdateSchema>) { return repo.update(id, data); }
  async deleteCompany(id: string) { return repo.delete(id); }
}
"""
companies_controller = """
import { Request, Response } from 'express';
import { CompanyService } from './service';
import * as schemas from './schemas';
const service = new CompanyService();
export class CompanyController {
  async getCompanies(req: Request, res: Response) {
    try {
      const filters = schemas.CompanyFilterSchema.parse(req.query);
      const result = await service.getCompanies(filters);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async getCompanyById(req: Request, res: Response) {
    try {
      const result = await service.getCompanyById(req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(404).json({ success: false, error: e.message }); }
  }
  async createCompany(req: Request, res: Response) {
    try {
      const data = schemas.CompanyCreateSchema.parse(req.body);
      const result = await service.createCompany(data);
      res.status(201).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async updateCompany(req: Request, res: Response) {
    try {
      const data = schemas.CompanyUpdateSchema.parse(req.body);
      const result = await service.updateCompany(req.params.id, data);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async deleteCompany(req: Request, res: Response) {
    try {
      await service.deleteCompany(req.params.id);
      res.status(204).send();
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
}
"""
companies_router = """
import { Router } from 'express';
import { CompanyController } from './controller';
const router = Router();
const controller = new CompanyController();
router.get('/', controller.getCompanies);
router.get('/:id', controller.getCompanyById);
router.post('/', controller.createCompany);
router.patch('/:id', controller.updateCompany);
router.delete('/:id', controller.deleteCompany);
export default router;
"""

# Investors
investors_schemas = """
import { z } from 'zod';
export const InvestorFilterSchema = z.object({ industry: z.string().optional(), location: z.string().optional(), checkSize: z.coerce.number().optional() });
"""
investors_repo = """
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class InvestorRepository {
  async findAll(filters: any) { return prisma.investor.findMany({ where: filters }); }
  async findById(id: string) { return prisma.investor.findUnique({ where: { id } }); }
}
"""
investors_service = """
import { InvestorRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new InvestorRepository();
export class InvestorService {
  async getInvestors(filters: z.infer<typeof schemas.InvestorFilterSchema>) { return repo.findAll(filters); }
  async getInvestorById(id: string) {
    const res = await repo.findById(id);
    if (!res) throw new Error('Investor not found');
    return res;
  }
}
"""
investors_controller = """
import { Request, Response } from 'express';
import { InvestorService } from './service';
import * as schemas from './schemas';
const service = new InvestorService();
export class InvestorController {
  async getInvestors(req: Request, res: Response) {
    try {
      const filters = schemas.InvestorFilterSchema.parse(req.query);
      const result = await service.getInvestors(filters);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async getInvestorById(req: Request, res: Response) {
    try {
      const result = await service.getInvestorById(req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(404).json({ success: false, error: e.message }); }
  }
}
"""
investors_router = """
import { Router } from 'express';
import { InvestorController } from './controller';
const router = Router();
const controller = new InvestorController();
router.get('/', controller.getInvestors);
router.get('/:id', controller.getInvestorById);
export default router;
"""

# Founders
founders_schemas = """
import { z } from 'zod';
export const FounderFilterSchema = z.object({ techStack: z.string().optional(), location: z.string().optional() });
"""
founders_repo = """
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class FounderRepository {
  async findAll(filters: any) { return prisma.founder.findMany({ where: filters }); }
  async findById(id: string) { return prisma.founder.findUnique({ where: { id } }); }
}
"""
founders_service = """
import { FounderRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new FounderRepository();
export class FounderService {
  async getFounders(filters: z.infer<typeof schemas.FounderFilterSchema>) { return repo.findAll(filters); }
  async getFounderById(id: string) {
    const res = await repo.findById(id);
    if (!res) throw new Error('Founder not found');
    return res;
  }
}
"""
founders_controller = """
import { Request, Response } from 'express';
import { FounderService } from './service';
import * as schemas from './schemas';
const service = new FounderService();
export class FounderController {
  async getFounders(req: Request, res: Response) {
    try {
      const filters = schemas.FounderFilterSchema.parse(req.query);
      const result = await service.getFounders(filters);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async getFounderById(req: Request, res: Response) {
    try {
      const result = await service.getFounderById(req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(404).json({ success: false, error: e.message }); }
  }
}
"""
founders_router = """
import { Router } from 'express';
import { FounderController } from './controller';
const router = Router();
const controller = new FounderController();
router.get('/', controller.getFounders);
router.get('/:id', controller.getFounderById);
export default router;
"""

# Startups
startups_schemas = """
import { z } from 'zod';
export const StartupMetricsUpdateSchema = z.object({ mrr: z.number().optional(), users: z.number().optional(), growthRate: z.number().optional() });
"""
startups_repo = """
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class StartupRepository {
  async findAll() { return prisma.startup.findMany(); }
  async findById(id: string) { return prisma.startup.findUnique({ where: { id } }); }
  async updateMetrics(id: string, data: any) { return prisma.startup.update({ where: { id }, data }); }
}
"""
startups_service = """
import { StartupRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new StartupRepository();
export class StartupService {
  async getStartups() { return repo.findAll(); }
  async getStartupById(id: string) {
    const res = await repo.findById(id);
    if (!res) throw new Error('Startup not found');
    return res;
  }
  async updateMetrics(id: string, data: z.infer<typeof schemas.StartupMetricsUpdateSchema>) { return repo.updateMetrics(id, data); }
}
"""
startups_controller = """
import { Request, Response } from 'express';
import { StartupService } from './service';
import * as schemas from './schemas';
const service = new StartupService();
export class StartupController {
  async getStartups(req: Request, res: Response) {
    try {
      const result = await service.getStartups();
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async getStartupById(req: Request, res: Response) {
    try {
      const result = await service.getStartupById(req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(404).json({ success: false, error: e.message }); }
  }
  async updateMetrics(req: Request, res: Response) {
    try {
      const data = schemas.StartupMetricsUpdateSchema.parse(req.body);
      const result = await service.updateMetrics(req.params.id, data);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
}
"""
startups_router = """
import { Router } from 'express';
import { StartupController } from './controller';
const router = Router();
const controller = new StartupController();
router.get('/', controller.getStartups);
router.get('/:id', controller.getStartupById);
router.patch('/:id/metrics', controller.updateMetrics);
export default router;
"""

# Search
search_schemas = """
import { z } from 'zod';
export const GlobalSearchSchema = z.object({ q: z.string().min(1), category: z.string().optional() });
"""
search_repo = """
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class SearchRepository {
  async searchAcrossAll(query: string, category?: string) {
    const filters = category ? { category } : {};
    return {
      companies: await prisma.company.findMany({ where: { name: { contains: query }, ...filters } }),
      investors: await prisma.investor.findMany({ where: { name: { contains: query }, ...filters } }),
      founders: await prisma.founder.findMany({ where: { name: { contains: query }, ...filters } }),
      startups: await prisma.startup.findMany({ where: { name: { contains: query }, ...filters } })
    };
  }
}
"""
search_service = """
import { SearchRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new SearchRepository();
export class SearchService {
  async globalSearch(params: z.infer<typeof schemas.GlobalSearchSchema>) {
    return repo.searchAcrossAll(params.q, params.category);
  }
}
"""
search_controller = """
import { Request, Response } from 'express';
import { SearchService } from './service';
import * as schemas from './schemas';
const service = new SearchService();
export class SearchController {
  async search(req: Request, res: Response) {
    try {
      const params = schemas.GlobalSearchSchema.parse(req.query);
      const result = await service.globalSearch(params);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
}
"""
search_router = """
import { Router } from 'express';
import { SearchController } from './controller';
const router = Router();
const controller = new SearchController();
router.get('/', controller.search);
export default router;
"""

# CRM
crm_schemas = """
import { z } from 'zod';
export const UpdateStageSchema = z.object({ stage: z.string() });
export const AddNoteSchema = z.object({ content: z.string().min(1) });
"""
crm_repo = """
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class CRMRepository {
  async findContacts() { return prisma.contact.findMany(); }
  async updateStage(id: string, stage: string) { return prisma.contact.update({ where: { id }, data: { stage } }); }
  async addNote(contactId: string, content: string) { return prisma.note.create({ data: { contactId, content } }); }
  async getNotes(contactId: string) { return prisma.note.findMany({ where: { contactId } }); }
}
"""
crm_service = """
import { CRMRepository } from './repository';
import * as schemas from './schemas';
import { z } from 'zod';
const repo = new CRMRepository();
export class CRMService {
  async getContacts() { return repo.findContacts(); }
  async updateContactStage(id: string, data: z.infer<typeof schemas.UpdateStageSchema>) { return repo.updateStage(id, data.stage); }
  async addNote(contactId: string, data: z.infer<typeof schemas.AddNoteSchema>) { return repo.addNote(contactId, data.content); }
  async getNotes(contactId: string) { return repo.getNotes(contactId); }
}
"""
crm_controller = """
import { Request, Response } from 'express';
import { CRMService } from './service';
import * as schemas from './schemas';
const service = new CRMService();
export class CRMController {
  async getContacts(req: Request, res: Response) {
    try {
      const result = await service.getContacts();
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async updateContactStage(req: Request, res: Response) {
    try {
      const data = schemas.UpdateStageSchema.parse(req.body);
      const result = await service.updateContactStage(req.params.id, data);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async addNote(req: Request, res: Response) {
    try {
      const data = schemas.AddNoteSchema.parse(req.body);
      const result = await service.addNote(req.params.id, data);
      res.status(201).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async getNotes(req: Request, res: Response) {
    try {
      const result = await service.getNotes(req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
}
"""
crm_router = """
import { Router } from 'express';
import { CRMController } from './controller';
const router = Router();
const controller = new CRMController();
router.get('/contacts', controller.getContacts);
router.patch('/contacts/:id/stage', controller.updateContactStage);
router.post('/contacts/:id/notes', controller.addNote);
router.get('/contacts/:id/notes', controller.getNotes);
export default router;
"""

# Notifications
notifications_schemas = """
import { z } from 'zod';
export const MarkAsReadSchema = z.object({});
"""
notifications_repo = """
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class NotificationRepository {
  async findAll() { return prisma.notification.findMany(); }
  async markAsRead(id: string) { return prisma.notification.update({ where: { id }, data: { read: true } }); }
}
"""
notifications_service = """
import { NotificationRepository } from './repository';
const repo = new NotificationRepository();
export class NotificationService {
  async getNotifications() { return repo.findAll(); }
  async markAsRead(id: string) { return repo.markAsRead(id); }
}
"""
notifications_controller = """
import { Request, Response } from 'express';
import { NotificationService } from './service';
const service = new NotificationService();
export class NotificationController {
  async getNotifications(req: Request, res: Response) {
    try {
      const result = await service.getNotifications();
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
  async markAsRead(req: Request, res: Response) {
    try {
      const result = await service.markAsRead(req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
}
"""
notifications_router = """
import { Router } from 'express';
import { NotificationController } from './controller';
const router = Router();
const controller = new NotificationController();
router.get('/', controller.getNotifications);
router.patch('/:id/read', controller.markAsRead);
export default router;
"""

all_modules = {
    'users': [users_schemas, users_repo, users_service, users_controller, users_router],
    'companies': [companies_schemas, companies_repo, companies_service, companies_controller, companies_router],
    'investors': [investors_schemas, investors_repo, investors_service, investors_controller, investors_router],
    'founders': [founders_schemas, founders_repo, founders_service, founders_controller, founders_router],
    'startups': [startups_schemas, startups_repo, startups_service, startups_controller, startups_router],
    'search': [search_schemas, search_repo, search_service, search_controller, search_router],
    'crm': [crm_schemas, crm_repo, crm_service, crm_controller, crm_router],
    'notifications': [notifications_schemas, notifications_repo, notifications_service, notifications_controller, notifications_router]
}

files = ['schemas.ts', 'repository.ts', 'service.ts', 'controller.ts', 'router.ts']

for mod, contents in all_modules.items():
    for f, content in zip(files, contents):
        create_file(os.path.join(base_dir, mod, f), content)

routes_content = """
import { Router } from 'express';
import usersRouter from './modules/users/router';
import companiesRouter from './modules/companies/router';
import investorsRouter from './modules/investors/router';
import foundersRouter from './modules/founders/router';
import startupsRouter from './modules/startups/router';
import searchRouter from './modules/search/router';
import crmRouter from './modules/crm/router';
import notificationsRouter from './modules/notifications/router';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/companies', companiesRouter);
router.use('/api/investors', investorsRouter);
router.use('/api/founders', foundersRouter);
router.use('/api/startups', startupsRouter);
router.use('/api/search', searchRouter);
router.use('/api/crm', crmRouter);
router.use('/api/notifications', notificationsRouter);

export default router;
"""
create_file(r"J:\Origenix Connect AI\origenix-connectai\apps\api\src\routes.ts", routes_content)
print("Done!")
