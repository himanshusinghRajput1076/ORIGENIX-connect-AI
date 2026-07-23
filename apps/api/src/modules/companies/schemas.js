"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyFilterSchema = exports.CompanyUpdateSchema = exports.CompanyCreateSchema = void 0;
const zod_1 = require("zod");
exports.CompanyCreateSchema = zod_1.z.object({ name: zod_1.z.string(), industry: zod_1.z.string(), location: zod_1.z.string() });
exports.CompanyUpdateSchema = exports.CompanyCreateSchema.partial();
exports.CompanyFilterSchema = zod_1.z.object({ industry: zod_1.z.string().optional(), location: zod_1.z.string().optional() });
