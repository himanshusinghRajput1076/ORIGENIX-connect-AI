"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processBackgroundSignalsJob = processBackgroundSignalsJob;
const ai_1 = require("@origenix/ai");
const shared_1 = require("@origenix/shared");
console.log("==================================================");
console.log(" [Worker] Origenix Connect AI Background Worker   ");
console.log("==================================================");
/**
 * Background job to process public activity signals & re-score leads
 */
async function processBackgroundSignalsJob() {
    console.log("[Worker] Polling permitted activity signals...");
    const targetUrl = "https://www.linkedin.com/in/himanshusingh88";
    const validUrl = shared_1.LinkedInProfileUrlSchema.safeParse(targetUrl);
    if (validUrl.success) {
        console.log(`[Worker] Validated target profile: ${validUrl.data}`);
    }
    const sampleMatch = (0, ai_1.calculateMatchScore)({
        investor: {
            id: "inv_horizon",
            name: "Horizon Ventures",
            industries: ["ai-ml", "saas", "fintech"],
            preferredStages: ["Seed", "Series A"],
            investmentMin: 500000,
            investmentMax: 5000000,
        },
        startup: {
            id: "stg_connectai",
            name: "Origenix Connect AI",
            industry: "ai-ml",
            stage: "Seed",
            targetRaiseAmount: 2000000,
            recentSignalScore: 95,
        },
    });
    console.log(`[Worker] Computed Match Score: ${sampleMatch.matchScore}% (${sampleMatch.temperature.toUpperCase()})`);
    console.log(`[Worker] Rationale: ${sampleMatch.rationale}`);
}
processBackgroundSignalsJob().catch(console.error);
