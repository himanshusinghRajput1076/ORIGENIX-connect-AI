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
      const result = await service.getProfile((req.params.id as string));
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(404).json({ success: false, error: e.message }); }
  }
  async updateProfile(req: Request, res: Response) {
    try {
      const parsed = schemas.UserUpdateSchema.parse(req.body);
      const result = await service.updateProfile((req.params.id as string), parsed);
      res.status(200).json({ success: true, data: result });
    } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
  }
}
