export declare class InvestorRepository {
    findAll(filters: any): Promise<{
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
    }[]>;
    findById(id: string): Promise<{
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
    } | null>;
}
