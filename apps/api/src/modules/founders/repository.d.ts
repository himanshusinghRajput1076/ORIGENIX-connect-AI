export declare class FounderRepository {
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
        createdAt: Date;
        updatedAt: Date;
        foundedCompanies: string[];
        leadScore: number;
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
        createdAt: Date;
        updatedAt: Date;
        foundedCompanies: string[];
        leadScore: number;
    } | null>;
}
