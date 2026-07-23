export interface MatchInput {
    investor: {
        id: string;
        name: string;
        industries: string[];
        preferredStages: string[];
        investmentMin?: number;
        investmentMax?: number;
    };
    startup: {
        id: string;
        name: string;
        industry: string;
        stage: string;
        targetRaiseAmount?: number;
        recentSignalScore?: number;
    };
}
export interface MatchResult {
    score: number;
    temperature: "HOT" | "WARM" | "COLD";
    breakdown: {
        industryMatch: number;
        stageMatch: number;
        checkSizeMatch: number;
        signalScore: number;
    };
    rationale: string;
}
/**
 * Investor <-> Startup AI Matching Engine.
 * Calculates multi-weighted compatibility matrix.
 */
export declare function calculateMatchScore(input: MatchInput): MatchResult;
