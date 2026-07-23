"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalSearchSchema = void 0;
const zod_1 = require("zod");
exports.GlobalSearchSchema = zod_1.z.object({ q: zod_1.z.string().min(1), category: zod_1.z.string().optional() });
