import * as schemas from './schemas';
import { z } from 'zod';
export declare class FounderService {
    getFounders(filters: z.infer<typeof schemas.FounderFilterSchema>): Promise<{
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
    }[]>;
    getFounderById(id: string): Promise<{
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
    }>;
}
