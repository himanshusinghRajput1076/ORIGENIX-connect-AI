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
    if (!user || user.passwordHash !== data.password) throw new Error('Invalid credentials');
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
