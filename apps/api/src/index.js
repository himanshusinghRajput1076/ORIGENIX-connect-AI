"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const ai_1 = require("@origenix/ai");
const shared_1 = require("@origenix/shared");
const error_middleware_js_1 = require("./middleware/error.middleware.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Security Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express_1.default.json({ limit: "1mb" }));
// Healthcheck Route
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Origenix Connect AI Core API",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
    });
});
// Search People Endpoint
app.get("/api/v1/search/people", async (req, res, next) => {
    try {
        const { query, role, industry, location, page, limit } = req.query;
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 20;
        const result = await shared_1.PersonRepository.search({
            query: query,
            role: role,
            industry: industry,
            location: location,
            limit: limitNum,
            offset: (pageNum - 1) * limitNum,
        });
        res.json({ success: true, page: pageNum, total: result.total, data: result.items });
    }
    catch (err) {
        next(err);
    }
});
// Search Companies Endpoint
app.get("/api/v1/search/companies", async (req, res, next) => {
    try {
        const { query, stage, industry, location, page, limit } = req.query;
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 20;
        const result = await shared_1.CompanyRepository.search({
            query: query,
            stage: stage,
            industry: industry,
            location: location,
            limit: limitNum,
            offset: (pageNum - 1) * limitNum,
        });
        res.json({ success: true, page: pageNum, total: result.total, data: result.items });
    }
    catch (err) {
        next(err);
    }
});
// AI Outreach Generation Endpoint
app.post("/api/v1/ai/outreach", async (req, res, next) => {
    try {
        const result = await (0, ai_1.generatePersonalizedOutreach)(req.body);
        res.json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
});
// AI Matching Endpoint
app.post("/api/v1/ai/matching", async (req, res, next) => {
    try {
        const result = (0, ai_1.calculateMatchScore)({
            investor: req.body.investor || { id: "inv1", name: "VC", industries: ["ai-ml"], preferredStages: ["Seed"] },
            startup: req.body.startup || { id: "stg1", name: "Startup", industry: "ai-ml", stage: "Seed" },
        });
        res.json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
});
// LinkedIn API Connect Endpoint
app.post("/api/v1/linkedin/connect", async (req, res, next) => {
    try {
        const validated = shared_1.LinkedInConnectSchema.parse(req.body);
        const result = await shared_1.IntegrationRepository.saveLinkedInConnection("usr_admin_1", validated);
        res.json({
            success: true,
            message: "LinkedIn connection state encrypted & persisted",
            data: {
                targetProfileUrl: validated.targetProfileUrl,
                status: "CONNECTED",
                scopes: validated.scopes,
                lastSyncedAt: new Date().toISOString(),
            },
        });
    }
    catch (err) {
        next(err);
    }
});
// Real-Time Market Signals Stream Endpoint
app.get("/api/v1/data/real-time", async (req, res, next) => {
    try {
        const [startups, news] = await Promise.all([
            (0, shared_1.fetchLiveTrendingStartups)(),
            (0, shared_1.fetchLiveFundingNews)(),
        ]);
        res.json({
            success: true,
            timestamp: new Date().toISOString(),
            data: {
                liveStartupsCount: startups.length,
                liveStartups: startups,
                liveFundingNews: news,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
// Error Handler Middleware
app.use(error_middleware_js_1.errorHandler);
// Server Listen
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(` 🚀 Origenix Connect AI API running on port ${PORT} `);
    console.log(`==================================================`);
});
