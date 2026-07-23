import express from "express";
import cors from "cors";
import helmet from "helmet";
import { 
  generatePersonalizedOutreach, 
  calculateMatchScore 
} from "@origenix/ai";
import { 
  LinkedInConnectSchema, 
  PersonRepository, 
  CompanyRepository, 
  IntegrationRepository, 
  fetchLiveTrendingStartups, 
  fetchLiveFundingNews 
} from "@origenix/shared";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Security Middleware
app.use(helmet());
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json({ limit: "1mb" }));

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
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 20;

    const result = await PersonRepository.search({
      query: query as string,
      role: role as string,
      industry: industry as string,
      location: location as string,
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
    });

    res.json({ success: true, page: pageNum, total: result.total, data: result.items });
  } catch (err) {
    next(err);
  }
});

// Search Companies Endpoint
app.get("/api/v1/search/companies", async (req, res, next) => {
  try {
    const { query, stage, industry, location, page, limit } = req.query;
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 20;

    const result = await CompanyRepository.search({
      query: query as string,
      stage: stage as string,
      industry: industry as string,
      location: location as string,
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
    });

    res.json({ success: true, page: pageNum, total: result.total, data: result.items });
  } catch (err) {
    next(err);
  }
});

// AI Outreach Generation Endpoint
app.post("/api/v1/ai/outreach", async (req, res, next) => {
  try {
    const result = await generatePersonalizedOutreach(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
});

// AI Matching Endpoint
app.post("/api/v1/ai/matching", async (req, res, next) => {
  try {
    const result = calculateMatchScore({
      investor: req.body.investor || { id: "inv1", name: "VC", industries: ["ai-ml"], preferredStages: ["Seed"] },
      startup: req.body.startup || { id: "stg1", name: "Startup", industry: "ai-ml", stage: "Seed" },
    });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
});

// LinkedIn API Connect Endpoint
app.post("/api/v1/linkedin/connect", async (req, res, next) => {
  try {
    const validated = LinkedInConnectSchema.parse(req.body);
    const result = await IntegrationRepository.saveLinkedInConnection("usr_admin_1", validated);
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
  } catch (err) {
    next(err);
  }
});

// Real-Time Market Signals Stream Endpoint
app.get("/api/v1/data/real-time", async (req, res, next) => {
  try {
    const [startups, news] = await Promise.all([
      fetchLiveTrendingStartups(),
      fetchLiveFundingNews(),
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
  } catch (err) {
    next(err);
  }
});

// Error Handler Middleware
app.use(errorHandler);

// Server Listen
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` 🚀 Origenix Connect AI API running on port ${PORT} `);
  console.log(`==================================================`);
});
