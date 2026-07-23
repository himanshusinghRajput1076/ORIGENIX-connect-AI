import * as schemas from './schemas';
import { z } from 'zod';
export declare class UserService {
    register(data: z.infer<typeof schemas.UserRegisterSchema>): Promise<any>;
    login(data: z.infer<typeof schemas.UserLoginSchema>): Promise<any>;
    getProfile(id: string): Promise<never>;
    updateProfile(id: string, data: z.infer<typeof schemas.UserUpdateSchema>): Promise<any>;
}
