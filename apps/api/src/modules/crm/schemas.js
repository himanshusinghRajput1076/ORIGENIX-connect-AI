"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNoteSchema = exports.UpdateStageSchema = void 0;
const zod_1 = require("zod");
exports.UpdateStageSchema = zod_1.z.object({ stage: zod_1.z.string() });
exports.AddNoteSchema = zod_1.z.object({ content: zod_1.z.string().min(1) });
