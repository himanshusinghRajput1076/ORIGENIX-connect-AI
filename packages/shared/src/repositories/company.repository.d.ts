import { Company } from '@origenix/database';
export interface CompanyFilterOptions {
    query?: string;
    stage?: string;
    industry?: string;
    location?: string;
    limit?: number;
    offset?: number;
}
export declare class CompanyRepository {
    static search(options?: CompanyFilterOptions): Promise<{
        items: Company[];
        total: number;
    }>;
    static findById(id: string): Promise<Company | null>;
}
