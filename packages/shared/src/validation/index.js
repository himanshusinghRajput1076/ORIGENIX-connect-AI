"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadScoreRequestSchema = exports.SearchQuerySchema = exports.OutreachRequestSchema = exports.LinkedInConnectSchema = exports.LinkedInProfileUrlSchema = void 0;
const zod_1 = require("zod");
// Strict LinkedIn Profile URL validator
exports.LinkedInProfileUrlSchema = zod_1.z
    .string()
    .trim()
    .regex(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/, "Invalid LinkedIn profile URL format. Must be like https://www.linkedin.com/in/username");
// LinkedIn API Credentials & Connection Validation
exports.LinkedInConnectSchema = zod_1.z.object({
    targetProfileUrl: exports.LinkedInProfileUrlSchema,
    clientId: zod_1.z.string().min(4, "Client ID must be at least 4 characters").max(100),
    clientSecret: zod_1.z.string().min(8, "Client secret must be at least 8 characters").max(200),
    scopes: zod_1.z.array(zod_1.z.string()).min(1, "At least one scope must be selected"),
});
// AI Outreach Request Validator
exports.OutreachRequestSchema = zod_1.z.object({
    targetPersonId: zod_1.z.string().uuid("Invalid target person ID format").or(zod_1.z.string().min(1)),
    targetPersonName: zod_1.z.string().min(1, "Target person name required"),
    targetCompany: zod_1.z.string().min(1, "Target company required"),
    outreachType: zod_1.z.enum(["cold_email", "intro_request", "partnership", "investment_ask"]),
    tone: zod_1.z.enum(["formal", "casual", "concise", "persuasive"]),
    userPitch: zod_1.z
        .string()
        .trim()
        .min(10, "Pitch description must be at least 10 characters")
        .max(2000, "Pitch description cannot exceed 2000 characters"),
});
// Search Filter & Query Validator
exports.SearchQuerySchema = zod_1.z.object({
    query: zod_1.z.string().trim().max(200).optional().default(""),
    role: zod_1.z.enum(["all", "investor", "founder", "co-founder", "vc", "angel", "entrepreneur"]).optional().default("all"),
    industry: zod_1.z.string().optional().default("all"),
    stage: zod_1.z.string().optional().default("all"),
    location: zod_1.z.string().optional().default("India"),
    page: zod_1.z.number().int().positive().optional().default(1),
    limit: zod_1.z.number().int().min(1).max(100).optional().default(20),
});
// Lead Scoring Request Validator
exports.LeadScoreRequestSchema = zod_1.z.object({
    personId: zod_1.z.string().min(1),
    industryWeight: zod_1.z.number().min(0).max(100).default(30),
    stageWeight: zod_1.z.number().min(0).max(100).default(30),
    activityWeight: zod_1.z.number().min(0).max(100).default(40),
});
