import { collections } from '../db/firebase';
import { Company, FundingStage } from '@origenix/database';

export interface CompanyFilterOptions {
  query?: string;
  stage?: string;
  industry?: string;
  location?: string;
  limit?: number;
  offset?: number;
}

export class CompanyRepository {
  static async search(options: CompanyFilterOptions = {}): Promise<{ items: Company[]; total: number }> {
    return { items: [], total: 0 };
  }

  static async findById(id: string): Promise<Company | null> {
    if (!collections.companies) return null;
    const doc = await collections.companies.doc(id).get();
    return doc.exists ? (doc.data() as Company) : null;
  }
}
