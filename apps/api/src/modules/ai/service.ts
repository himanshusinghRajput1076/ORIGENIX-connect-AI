import { 
  CompanyAnalyzer, 
  FounderAnalyzer, 
  InvestorAnalyzer, 
  MatchingEngine, 
  TrendDetectorEngine, 
  OutreachGenerator 
} from "@origenix/ai";
import { AIRepository } from "./repository";

export class AIService {
  public static async analyzeEntity(payload: {
    entityId: string;
    entityType: "COMPANY" | "INVESTOR" | "FOUNDER" | "STARTUP";
    name: string;
    stage: string;
    industries: string[];
    location: string;
  }) {
    let result;
    if (payload.entityType === "COMPANY" || payload.entityType === "STARTUP") {
      result = CompanyAnalyzer.analyzeCompany(payload);
    } else if (payload.entityType === "FOUNDER") {
      result = FounderAnalyzer.analyzeFounder({
        name: payload.name,
        title: "Founder & Tech Lead",
        company: "Origenix Connect AI",
        industries: payload.industries,
      });
    } else {
      result = InvestorAnalyzer.analyzeInvestor({
        name: payload.name,
        title: "Managing Partner",
        company: "Horizon Ventures",
        industries: payload.industries,
      });
    }

    try {
      await AIRepository.saveAnalysis({
        entityId: payload.entityId,
        entityType: payload.entityType,
        analysisType: "MARKET_INTELLIGENCE",
        result,
        confidence: result.score / 100,
      });
    } catch (err) {
      console.warn("[AIService] Save to DB warning:", err);
    }

    return result;
  }

  public static computeMatching(payload: {
    investor: { name: string; industries: string[]; location: string };
    startup: { name: string; industries: string[]; location: string; stage: string };
  }) {
    return MatchingEngine.computeMatch(payload.investor, payload.startup);
  }

  public static generateOutreach(payload: {
    recipientName: string;
    recipientRole: string;
    companyName: string;
    pitchSummary: string;
    outreachType: "cold_email" | "intro_request" | "partnership" | "investment_ask";
    tone: "formal" | "casual" | "concise" | "persuasive";
  }) {
    return OutreachGenerator.generateOutreachDraft(payload);
  }

  public static getSectorTrends() {
    return TrendDetectorEngine.detectSectorTrends();
  }
}
