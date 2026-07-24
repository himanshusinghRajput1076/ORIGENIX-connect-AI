export declare class AIService {
    static analyzeEntity(payload: {
        entityId: string;
        entityType: "COMPANY" | "INVESTOR" | "FOUNDER" | "STARTUP";
        name: string;
        stage: string;
        industries: string[];
        location: string;
    }): Promise<import("@origenix/ai").AnalysisResult>;
    static computeMatching(payload: {
        investor: {
            name: string;
            industries: string[];
            location: string;
        };
        startup: {
            name: string;
            industries: string[];
            location: string;
            stage: string;
        };
    }): import("@origenix/ai").MatchScoreResult;
    static generateOutreach(payload: {
        recipientName: string;
        recipientRole: string;
        companyName: string;
        pitchSummary: string;
        outreachType: "cold_email" | "intro_request" | "partnership" | "investment_ask";
        tone: "formal" | "casual" | "concise" | "persuasive";
    }): Promise<import("@origenix/ai").OutreachDraftResult>;
    static getSectorTrends(): {
        sector: string;
        momentumScore: number;
        growthRate: string;
    }[];
}
