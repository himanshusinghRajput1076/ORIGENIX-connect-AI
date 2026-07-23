import { Investor, Founder } from "@origenix/database";
export interface PersonFilterOptions {
    query?: string;
    role?: string;
    industry?: string;
    location?: string;
    minLeadScore?: number;
    limit?: number;
    offset?: number;
}
export declare class PersonRepository {
    /**
     * Search investors & founders with multi-faceted filtering & pagination.
     */
    static search(options?: PersonFilterOptions): Promise<{
        items: (Investor | Founder)[];
        total: number;
    }>;
    /**
     * Fetch a single founder or investor profile by ID.
     */
    static findById(id: string): Promise<Investor | Founder | null>;
    /**
     * Fetch a profile by LinkedIn URL.
     */
    static findByLinkedInUrl(linkedinUrl: string): Promise<Investor | Founder | null>;
}
