"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfileSchema = exports.SendMessageSchema = exports.ConnectSchema = void 0;
const zod_1 = require("zod");
exports.ConnectSchema = zod_1.z.object({
    targetProfileUrl: zod_1.z.string().url(),
    message: zod_1.z.string().optional()
});
exports.SendMessageSchema = zod_1.z.object({
    targetProfileUrl: zod_1.z.string().url(),
    message: zod_1.z.string().min(1)
});
exports.GetProfileSchema = zod_1.z.object({
    targetProfileUrl: zod_1.z.string().url()
});
