"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorFilterSchema = void 0;
const zod_1 = require("zod");
exports.InvestorFilterSchema = zod_1.z.object({ industry: zod_1.z.string().optional(), location: zod_1.z.string().optional(), checkSize: zod_1.z.coerce.number().optional() });
