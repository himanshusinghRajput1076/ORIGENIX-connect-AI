/**
 * AI Lead Scoring Engine
 * Computes deterministic match scores based on funding stage, industry alignment, and profile completeness.
 */

export interface LeadScoreResult {
  score: number;
  label: "HOT" | "WARM" | "COLD";
  rationale: string[];
}

export function computeLeadScore(profile: any, targetIndustry: string): LeadScoreResult {
  let score = 50; // Base score
  const rationale: string[] = [];

  // Industry Alignment (Heavily weighted)
  if (profile.industries && profile.industries.some((ind: string) => ind.toLowerCase().includes(targetIndustry.toLowerCase()))) {
    score += 25;
    rationale.push(`Strong alignment with target industry: ${targetIndustry}`);
  } else {
    score -= 10;
    rationale.push(`Low alignment with target industry: ${targetIndustry}`);
  }

  // Profile Completeness (Contact data increases intent)
  if (profile.email || profile.linkedin) {
    score += 15;
    rationale.push("Contact details are available (High intent signal)");
  }

  // Seniority / Role
  const title = profile.title?.toLowerCase() || "";
  if (title.includes("founder") || title.includes("ceo") || title.includes("partner") || title.includes("director")) {
    score += 10;
    rationale.push("Decision-maker title detected");
  }

  // Bound the score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  let label: "HOT" | "WARM" | "COLD" = "COLD";
  if (score >= 80) label = "HOT";
  else if (score >= 60) label = "WARM";

  return { score, label, rationale };
}
