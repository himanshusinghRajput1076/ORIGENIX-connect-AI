import * as schemas from './schemas';
import { z } from 'zod';
export declare class StartupService {
    getStartups(): Promise<{
        id: string;
        companyId: string;
        createdAt: Date;
        updatedAt: Date;
        fundingRaised: number;
        targetRaise: number | null;
        currentStage: import("@prisma/client").$Enums.FundingStage;
        pitchDeckUrl: string | null;
        tractionMetrics: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    getStartupById(id: string): Promise<{
        id: string;
        companyId: string;
        createdAt: Date;
        updatedAt: Date;
        fundingRaised: number;
        targetRaise: number | null;
        currentStage: import("@prisma/client").$Enums.FundingStage;
        pitchDeckUrl: string | null;
        tractionMetrics: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    updateMetrics(id: string, data: z.infer<typeof schemas.StartupMetricsUpdateSchema>): Promise<{
        id: string;
        companyId: string;
        createdAt: Date;
        updatedAt: Date;
        fundingRaised: number;
        targetRaise: number | null;
        currentStage: import("@prisma/client").$Enums.FundingStage;
        pitchDeckUrl: string | null;
        tractionMetrics: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
