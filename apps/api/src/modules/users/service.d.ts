import * as schemas from './schemas';
import { z } from 'zod';
export declare class UserService {
    register(data: z.infer<typeof schemas.UserRegisterSchema>): Promise<{
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
        id: string;
        email: string;
        linkedinUrl: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        passwordHash: string;
    }>;
    login(data: z.infer<typeof schemas.UserLoginSchema>): Promise<{
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
        id: string;
        email: string;
        linkedinUrl: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        passwordHash: string;
    }>;
    getProfile(id: string): Promise<{
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
        id: string;
        email: string;
        linkedinUrl: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        passwordHash: string;
    }>;
    updateProfile(id: string, data: z.infer<typeof schemas.UserUpdateSchema>): Promise<{
        role: import("@prisma/client").$Enums.UserRole;
        name: string;
        id: string;
        email: string;
        linkedinUrl: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        passwordHash: string;
    }>;
}
