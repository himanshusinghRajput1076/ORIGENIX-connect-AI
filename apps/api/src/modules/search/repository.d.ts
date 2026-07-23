export declare class SearchRepository {
    searchAcrossAll(query: string, category?: string): Promise<{
        companies: {
            type: import("@origenix/database").$Enums.CompanyType;
            stage: import("@origenix/database").$Enums.FundingStage;
            location: string;
            name: string;
            id: string;
            linkedinUrl: string | null;
            industries: string[];
            createdAt: Date;
            updatedAt: Date;
            tagline: string | null;
            description: string | null;
            website: string | null;
            foundedYear: number | null;
            teamSize: number | null;
            totalFunding: number | null;
        }[];
        investors: {
            location: string;
            name: string;
            id: string;
            title: string;
            email: string | null;
            linkedinUrl: string | null;
            avatar: string | null;
            bio: string | null;
            companyId: string;
            industries: string[];
            investmentMin: number | null;
            investmentMax: number | null;
            investmentCount: number;
            matchScore: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        founders: {
            location: string;
            name: string;
            id: string;
            title: string;
            email: string | null;
            linkedinUrl: string | null;
            avatar: string | null;
            bio: string | null;
            companyId: string;
            industries: string[];
            createdAt: Date;
            updatedAt: Date;
            foundedCompanies: string[];
            leadScore: number;
        }[];
        startups: {
            id: string;
            companyId: string;
            createdAt: Date;
            updatedAt: Date;
            fundingRaised: number;
            targetRaise: number | null;
            currentStage: import("@origenix/database").$Enums.FundingStage;
            pitchDeckUrl: string | null;
            tractionMetrics: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    }>;
}
