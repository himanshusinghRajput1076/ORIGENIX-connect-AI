import { z } from 'zod';
export const UserRegisterSchema = z.object({ email: z.string().email(), password: z.string().min(6), name: z.string().min(2) });
export const UserLoginSchema = z.object({ email: z.string().email(), password: z.string() });
export const UserUpdateSchema = z.object({ name: z.string().min(2).optional(), avatar: z.string().url().optional() });
