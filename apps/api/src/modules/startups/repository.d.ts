export declare class StartupRepository {
    findAll(): Promise<{
        id: string;
        companyId: string;
        createdAt: Date;
        updatedAt: Date;
        fundingRaised: number;
        targetRaise: number | null;
        currentStage: import("@origenix/database").$Enums.FundingStage;
        pitchDeckUrl: string | null;
        tractionMetrics: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        companyId: string;
        createdAt: Date;
        updatedAt: Date;
        fundingRaised: number;
        targetRaise: number | null;
        currentStage: import("@origenix/database").$Enums.FundingStage;
        pitchDeckUrl: string | null;
        tractionMetrics: import("@prisma/client/runtime/library").JsonValue | null;
    } | null>;
    updateMetrics(id: string, data: any): Promise<{
        id: string;
        companyId: string;
        createdAt: Date;
        updatedAt: Date;
        fundingRaised: number;
        targetRaise: number | null;
        currentStage: import("@origenix/database").$Enums.FundingStage;
        pitchDeckUrl: string | null;
        tractionMetrics: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
