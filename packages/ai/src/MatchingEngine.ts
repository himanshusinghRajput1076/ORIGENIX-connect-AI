export interface MatchingResult {
  score: number;
  temperature: string;
  matchingFactors: string[];
}

export class MatchingEngine {
  public async computeMatch(startupId: string, investorId: string): Promise<MatchingResult> {
    return {
      score: 92,
      temperature: 'Hot',
      matchingFactors: ['Sector alignment', 'Stage match', 'Geographic proximity']
    };
  }
}
