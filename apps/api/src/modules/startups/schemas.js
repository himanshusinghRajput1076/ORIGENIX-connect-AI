"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupMetricsUpdateSchema = void 0;
const zod_1 = require("zod");
exports.StartupMetricsUpdateSchema = zod_1.z.object({ mrr: zod_1.z.number().optional(), users: zod_1.z.number().optional(), growthRate: zod_1.z.number().optional() });
