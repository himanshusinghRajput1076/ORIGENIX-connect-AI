"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutreachGenerateSchema = exports.MatchComputeSchema = exports.AnalyzeEntitySchema = void 0;
const zod_1 = require("zod");
exports.AnalyzeEntitySchema = zod_1.z.object({
    entityId: zod_1.z.string().min(1),
    entityType: zod_1.z.enum(["COMPANY", "INVESTOR", "FOUNDER", "STARTUP"]),
    name: zod_1.z.string().min(1),
    stage: zod_1.z.string().optional().default("Seed"),
    industries: zod_1.z.array(zod_1.z.string()).optional().default(["AI & ML"]),
    location: zod_1.z.string().optional().default("India"),
});
exports.MatchComputeSchema = zod_1.z.object({
    investor: zod_1.z.object({
        id: zod_1.z.string().optional(),
        name: zod_1.z.string(),
        industries: zod_1.z.array(zod_1.z.string()),
        location: zod_1.z.string(),
    }),
    startup: zod_1.z.object({
        id: zod_1.z.string().optional(),
        name: zod_1.z.string(),
        industries: zod_1.z.array(zod_1.z.string()),
        location: zod_1.z.string(),
        stage: zod_1.z.string().default("Seed"),
    }),
});
exports.OutreachGenerateSchema = zod_1.z.object({
    recipientName: zod_1.z.string().min(1),
    recipientRole: zod_1.z.string().default("VC Investor"),
    companyName: zod_1.z.string().min(1),
    pitchSummary: zod_1.z.string().min(10),
    outreachType: zod_1.z.enum(["cold_email", "intro_request", "partnership", "investment_ask"]).default("cold_email"),
    tone: zod_1.z.enum(["formal", "casual", "concise", "persuasive"]).default("persuasive"),
});
