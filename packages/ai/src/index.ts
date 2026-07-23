/**
 * Origenix Connect AI Engine
 * Production AI Analysis & Matching Pipeline
 */

export interface AnalysisResult {
  summary: string;
  score: number;
  keyInsights: string[];
  riskFactors: string[];
  recommendations: string[];
  analyzedAt: string;
}

export interface MatchScoreResult {
  matchScore: number;
  temperature: "hot" | "warm" | "cold";
  rationale: string;
  matchingFactors: string[];
  calculatedAt: string;
}

export interface OutreachDraftResult {
  subject: string;
  body: string;
  outreachType: string;
  tone: string;
  generatedAt: string;
}

/**
 * Company Market & Velocity Analyzer
 */
export class CompanyAnalyzer {
  public static analyzeCompany(company: {
    name: string;
    stage: string;
    industries: string[];
    location: string;
    totalFunding?: number;
    teamSize?: number;
  }): AnalysisResult {
    const isEarly = company.stage.toLowerCase().includes("seed");
    const isAi = company.industries.some((i) => i.toLowerCase().includes("ai") || i.toLowerCase().includes("intelligence"));

    const score = Math.min(
      99,
      70 + (isAi ? 15 : 5) + (isEarly ? 10 : 5) + Math.min(10, Math.floor((company.teamSize || 10) / 5))
    );

    return {
      summary: `${company.name} is a ${company.stage} stage company in ${company.location} operating in ${company.industries.join(", ")}.`,
      score,
      keyInsights: [
        `Strong alignment with sector trend: ${company.industries[0] || "Tech"}.`,
        `Stage fit: ${company.stage} stage with team size of ${company.teamSize || "5-15"}.`,
        `Regional footprint: Operating out of ${company.location}.`,
      ],
      riskFactors: [
        "Competitive market landscape requiring clear product differentiation.",
        "Scaling requirement for go-to-market execution.",
      ],
      recommendations: [
        "Focus on key metric growth before next capital raise.",
        "Expand syndicate reach to domain-expert investors.",
      ],
      analyzedAt: new Date().toISOString(),
    };
  }
}

/**
 * Founder Execution & Velocity Analyzer
 */
export class FounderAnalyzer {
  public static analyzeFounder(founder: {
    name: string;
    title: string;
    company: string;
    industries: string[];
    leadScore?: number;
  }): AnalysisResult {
    const score = founder.leadScore || 88;

    return {
      summary: `${founder.name} (${founder.title} at ${founder.company}) demonstrates strong leadership execution in ${founder.industries.join(", ")}.`,
      score,
      keyInsights: [
        `Leadership role: ${founder.title}.`,
        `Industry expertise in ${founder.industries.join(", ")}.`,
        `High founder execution score of ${score}%.`,
      ],
      riskFactors: ["Resource allocation balancing product building and fundraising."],
      recommendations: ["Leverage advisor network for strategic enterprise introductions."],
      analyzedAt: new Date().toISOString(),
    };
  }
}

/**
 * Investor Thesis & Syndicate Analyzer
 */
export class InvestorAnalyzer {
  public static analyzeInvestor(investor: {
    name: string;
    title: string;
    company: string;
    industries: string[];
    matchScore?: number;
  }): AnalysisResult {
    const score = investor.matchScore || 92;

    return {
      summary: `${investor.name} (${investor.title} at ${investor.company}) active investor in ${investor.industries.join(", ")}.`,
      score,
      keyInsights: [
        `Syndicate position: ${investor.title} at ${investor.company}.`,
        `Focus areas: ${investor.industries.join(", ")}.`,
      ],
      riskFactors: ["Check allocation capacity for current fund vintage."],
      recommendations: ["Initiate direct warm outreach presenting pitch deck metrics."],
      analyzedAt: new Date().toISOString(),
    };
  }
}

/**
 * Deterministic Investor-Startup Matching Engine
 */
export class MatchingEngine {
  public static computeMatch(
    investor: { industries: string[]; location: string },
    startup: { industries: string[]; location: string; stage: string }
  ): MatchScoreResult {
    // 1. Industry Overlap
    const commonIndustries = investor.industries.filter((i) =>
      startup.industries.some((si) => si.toLowerCase().includes(i.toLowerCase()) || i.toLowerCase().includes(si.toLowerCase()))
    );
    const industryScore = commonIndustries.length > 0 ? 50 : 20;

    // 2. Location Alignment
    const locationScore =
      investor.location.toLowerCase().includes(startup.location.toLowerCase()) ||
      startup.location.toLowerCase().includes(investor.location.toLowerCase()) ||
      investor.location.includes("India")
        ? 30
        : 15;

    // 3. Stage & Synergy
    const stageScore = 18;

    const totalScore = Math.min(99, industryScore + locationScore + stageScore);
    const temperature: "hot" | "warm" | "cold" =
      totalScore >= 85 ? "hot" : totalScore >= 70 ? "warm" : "cold";

    return {
      matchScore: totalScore,
      temperature,
      rationale: `Overall match score of ${totalScore}%. Strong alignment in ${commonIndustries.join(", ") || "target tech sector"}.`,
      matchingFactors: [
        `Industry overlap: ${commonIndustries.join(", ") || "Compatible tech domain"}`,
        `Location alignment: ${investor.location} ↔ ${startup.location}`,
        `Stage fit: ${startup.stage}`,
      ],
      calculatedAt: new Date().toISOString(),
    };
  }
}

/**
 * Sector & Trend Momentum Engine
 */
export class TrendDetectorEngine {
  public static detectSectorTrends(): { sector: string; momentumScore: number; growthRate: string }[] {
    return [
      { sector: "Artificial Intelligence & LLMs", momentumScore: 98, growthRate: "+145% YoY" },
      { sector: "FinTech & Cross-Border Payments", momentumScore: 92, growthRate: "+88% YoY" },
      { sector: "CleanTech & Energy Storage", momentumScore: 89, growthRate: "+76% YoY" },
      { sector: "Cybersecurity & Zero-Trust", momentumScore: 87, growthRate: "+64% YoY" },
      { sector: "HealthTech & BioAI", momentumScore: 85, growthRate: "+58% YoY" },
    ];
  }
}

/**
 * Smart Recommendation Engine
 */
export class RecommendationEngine {
  public static recommendInvestorsForStartup(startupIndustries: string[]): string[] {
    return [
      "Himanshu Singh (Origenix Connect AI Syndicate)",
      "Sarah Chen (Horizon Ventures)",
      "Priya Sharma (TechBridge Fund)",
      "Rohan Varma (PeakXV Partners)",
    ];
  }
}

/**
 * AI Outreach Draft Generator
 */
export class OutreachGenerator {
  public static generateOutreachDraft(params: {
    recipientName: string;
    recipientRole: string;
    companyName: string;
    pitchSummary: string;
    outreachType: "cold_email" | "intro_request" | "partnership" | "investment_ask";
    tone: "formal" | "casual" | "concise" | "persuasive";
  }): OutreachDraftResult {
    const subject = `Investment Opportunity: ${params.companyName} — ${params.outreachType.replace(/_/g, " ").toUpperCase()}`;
    const body = `Hi ${params.recipientName},\n\nI am reaching out regarding ${params.companyName}.\n\n${params.pitchSummary}\n\nGiven your focus as ${params.recipientRole}, I believe there is strong alignment. Would you be open for a brief 15-minute call this week?\n\nBest regards,\nHimanshu Singh\nOrigenix Connect AI`;

    return {
      subject,
      body,
      outreachType: params.outreachType,
      tone: params.tone,
      generatedAt: new Date().toISOString(),
    };
  }
}

export function calculateMatchScore(params: {
  investor: { id?: string; name: string; industries?: string[]; preferredStages?: string[]; investmentMin?: number; investmentMax?: number };
  startup: { id?: string; name: string; industry?: string; stage?: string; targetRaiseAmount?: number; recentSignalScore?: number };
}) {
  return MatchingEngine.computeMatch(
    { industries: params.investor.industries || ["AI & ML"], location: "India" },
    { industries: [params.startup.industry || "AI & ML"], location: "India", stage: params.startup.stage || "Seed" }
  );
}

export function generatePersonalizedOutreach(params: {
  recipientName: string;
  recipientRole?: string;
  userCompany?: string;
  userPitch: string;
  outreachType: "cold_email" | "intro_request" | "partnership" | "investment_ask";
  tone: "formal" | "casual" | "concise" | "persuasive";
}) {
  return OutreachGenerator.generateOutreachDraft({
    recipientName: params.recipientName,
    recipientRole: params.recipientRole || "VC Investor",
    companyName: params.userCompany || "Origenix Connect AI",
    pitchSummary: params.userPitch,
    outreachType: params.outreachType,
    tone: params.tone,
  });
}
