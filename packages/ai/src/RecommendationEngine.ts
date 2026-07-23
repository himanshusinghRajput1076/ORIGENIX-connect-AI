export class RecommendationEngine {
  public async recommend(targetId: string, type: 'startup' | 'investor'): Promise<any[]> {
    return [
      { id: 'rec_1', reason: 'High domain overlap' },
      { id: 'rec_2', reason: 'Previous successful exits in similar sector' }
    ];
  }
}
