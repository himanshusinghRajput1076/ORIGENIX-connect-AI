"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FounderFilterSchema = void 0;
const zod_1 = require("zod");
exports.FounderFilterSchema = zod_1.z.object({ techStack: zod_1.z.string().optional(), location: zod_1.z.string().optional() });
