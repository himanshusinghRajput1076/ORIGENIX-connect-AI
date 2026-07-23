export enum DealStage {
    LEAD = 'LEAD',
    CONTACTED = 'CONTACTED',
    QUALIFIED = 'QUALIFIED',
    PROPOSAL = 'PROPOSAL',
    NEGOTIATION = 'NEGOTIATION',
    CLOSED_WON = 'CLOSED_WON',
    CLOSED_LOST = 'CLOSED_LOST'
}

export const STAGE_TRANSITIONS: Record<DealStage, DealStage[]> = {
    [DealStage.LEAD]: [DealStage.CONTACTED, DealStage.CLOSED_LOST],
    [DealStage.CONTACTED]: [DealStage.QUALIFIED, DealStage.CLOSED_LOST],
    [DealStage.QUALIFIED]: [DealStage.PROPOSAL, DealStage.CLOSED_LOST],
    [DealStage.PROPOSAL]: [DealStage.NEGOTIATION, DealStage.CLOSED_LOST],
    [DealStage.NEGOTIATION]: [DealStage.CLOSED_WON, DealStage.CLOSED_LOST],
    [DealStage.CLOSED_WON]: [],
    [DealStage.CLOSED_LOST]: []
};

export function canTransitionStage(current: DealStage, target: DealStage): boolean {
    return STAGE_TRANSITIONS[current].includes(target);
}

export enum LeadTemperature {
    HOT = 'HOT',
    WARM = 'WARM',
    COLD = 'COLD'
}

export interface LeadMetrics {
    activityScore: number;
    matchScore: number;
    checkSizeAligned: boolean;
}

export function computeLeadTemperature(metrics: LeadMetrics): LeadTemperature {
    let score = (metrics.activityScore * 0.4) + (metrics.matchScore * 0.4);
    if (metrics.checkSizeAligned) {
        score += 20;
    }

    if (score >= 80) return LeadTemperature.HOT;
    if (score >= 50) return LeadTemperature.WARM;
    return LeadTemperature.COLD;
}

export interface PipelineAnalytics {
    totalDeals: number;
    valueByStage: Record<DealStage, number>;
}

export function computePipelineAnalytics(deals: { stage: DealStage; value: number }[]): PipelineAnalytics {
    const valueByStage = Object.values(DealStage).reduce((acc, stage) => {
        acc[stage as DealStage] = 0;
        return acc;
    }, {} as Record<DealStage, number>);
    
    deals.forEach(deal => {
        valueByStage[deal.stage] += deal.value;
    });

    return {
        totalDeals: deals.length,
        valueByStage
    };
}
