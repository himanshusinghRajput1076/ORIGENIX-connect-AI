import * as schemas from './schemas';
import { z } from 'zod';
export declare class InvestorService {
    getInvestors(filters: z.infer<typeof schemas.InvestorFilterSchema>): Promise<{
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
    getInvestorById(id: string): Promise<{
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
    }>;
}
