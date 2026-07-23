"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const ai_1 = require("@origenix/ai");
const repository_1 = require("./repository");
class AIService {
    static async analyzeEntity(payload) {
        let result;
        if (payload.entityType === "COMPANY" || payload.entityType === "STARTUP") {
            result = ai_1.CompanyAnalyzer.analyzeCompany(payload);
        }
        else if (payload.entityType === "FOUNDER") {
            result = ai_1.FounderAnalyzer.analyzeFounder({
                name: payload.name,
                title: "Founder & Tech Lead",
                company: "Origenix Connect AI",
                industries: payload.industries,
            });
        }
        else {
            result = ai_1.InvestorAnalyzer.analyzeInvestor({
                name: payload.name,
                title: "Managing Partner",
                company: "Horizon Ventures",
                industries: payload.industries,
            });
        }
        try {
            await repository_1.AIRepository.saveAnalysis({
                entityId: payload.entityId,
                entityType: payload.entityType,
                analysisType: "MARKET_INTELLIGENCE",
                result,
                confidence: result.score / 100,
            });
        }
        catch (err) {
            console.warn("[AIService] Save to DB warning:", err);
        }
        return result;
    }
    static computeMatching(payload) {
        return ai_1.MatchingEngine.computeMatch(payload.investor, payload.startup);
    }
    static generateOutreach(payload) {
        return ai_1.OutreachGenerator.generateOutreachDraft(payload);
    }
    static getSectorTrends() {
        return ai_1.TrendDetectorEngine.detectSectorTrends();
    }
}
exports.AIService = AIService;
