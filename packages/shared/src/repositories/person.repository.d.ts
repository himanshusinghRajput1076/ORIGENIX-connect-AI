import { Investor, Founder } from '@origenix/database';
export interface PersonFilterOptions {
    query?: string;
    role?: string;
    industry?: string;
    location?: string;
    limit?: number;
    offset?: number;
}
export declare class PersonRepository {
    static search(options?: PersonFilterOptions): Promise<{
        items: (Investor | Founder)[];
        total: number;
    }>;
    static findById(id: string, type: 'investor' | 'founder'): Promise<Investor | Founder | null>;
}
