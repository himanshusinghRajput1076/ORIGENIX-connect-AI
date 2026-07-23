export interface ActivityRecord {
    timestamp: Date;
    action: string;
    entityId: string;
    value: number;
}

export class TrendAggregator {
    aggregateByDay(records: ActivityRecord[]): Record<string, number> {
        return records.reduce((acc, record) => {
            const day = record.timestamp.toISOString().split('T')[0];
            acc[day] = (acc[day] || 0) + record.value;
            return acc;
        }, {} as Record<string, number>);
    }
}

export function calculateMarketInterestMomentum(historicalInterest: number[], currentInterest: number): number {
    if (historicalInterest.length === 0) return 0;
    const avgHistorical = historicalInterest.reduce((a, b) => a + b, 0) / historicalInterest.length;
    if (avgHistorical === 0) return 100;
    
    return ((currentInterest - avgHistorical) / avgHistorical) * 100;
}

export class SearchMetricsTracker {
    private metrics: Record<string, number> = {};

    trackSearch(term: string): void {
        const normalized = term.toLowerCase().trim();
        this.metrics[normalized] = (this.metrics[normalized] || 0) + 1;
    }

    getTopSearches(limit: number = 10): Array<{term: string, count: number}> {
        return Object.entries(this.metrics)
            .map(([term, count]) => ({ term, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }
}
