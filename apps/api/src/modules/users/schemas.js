"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateSchema = exports.UserLoginSchema = exports.UserRegisterSchema = void 0;
const zod_1 = require("zod");
exports.UserRegisterSchema = zod_1.z.object({ email: zod_1.z.string().email(), password: zod_1.z.string().min(6), name: zod_1.z.string().min(2) });
exports.UserLoginSchema = zod_1.z.object({ email: zod_1.z.string().email(), password: zod_1.z.string() });
exports.UserUpdateSchema = zod_1.z.object({ name: zod_1.z.string().min(2).optional(), avatar: zod_1.z.string().url().optional() });
