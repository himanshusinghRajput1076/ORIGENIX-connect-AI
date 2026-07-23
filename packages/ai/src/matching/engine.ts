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
  score: number; // 0 - 100
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
export function calculateMatchScore(input: MatchInput): MatchResult {
  const { investor, startup } = input;

  // 1. Industry Match Score (35%)
  const hasDirectIndustryMatch = investor.industries.some(
    (ind) => ind.toLowerCase() === startup.industry.toLowerCase()
  );
  const industryScore = hasDirectIndustryMatch ? 100 : 30;

  // 2. Stage Match Score (30%)
  const hasStageMatch = investor.preferredStages.some(
    (stg) => stg.toLowerCase() === startup.stage.toLowerCase()
  );
  const stageScore = hasStageMatch ? 100 : 40;

  // 3. Check Size Match Score (20%)
  let checkSizeScore = 80;
  if (
    startup.targetRaiseAmount &&
    investor.investmentMin &&
    investor.investmentMax
  ) {
    if (
      startup.targetRaiseAmount >= investor.investmentMin &&
      startup.targetRaiseAmount <= investor.investmentMax
    ) {
      checkSizeScore = 100;
    } else {
      checkSizeScore = 50;
    }
  }

  // 4. Signal Score (15%)
  const signalScore = startup.recentSignalScore ?? 75;

  // Weighted total score calculation
  const totalScore = Math.round(
    industryScore * 0.35 +
      stageScore * 0.3 +
      checkSizeScore * 0.2 +
      signalScore * 0.15
  );

  let temperature: "HOT" | "WARM" | "COLD" = "COLD";
  if (totalScore >= 80) {
    temperature = "HOT";
  } else if (totalScore >= 60) {
    temperature = "WARM";
  }

  let rationale = `Overall match of ${totalScore}%. `;
  if (hasDirectIndustryMatch && hasStageMatch) {
    rationale += `Strong alignment in ${startup.industry} sector and ${startup.stage} stage.`;
  } else if (hasDirectIndustryMatch) {
    rationale += `Direct sector fit in ${startup.industry}, stage requires review.`;
  } else {
    rationale += `Adjacent sector match; potential diversification opportunity.`;
  }

  return {
    score: totalScore,
    temperature,
    breakdown: {
      industryMatch: industryScore,
      stageMatch: stageScore,
      checkSizeMatch: checkSizeScore,
      signalScore,
    },
    rationale,
  };
}
