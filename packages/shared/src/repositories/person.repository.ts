import { collections } from '../db/firebase';
import { Investor, Founder } from '@origenix/database';

export interface PersonFilterOptions {
  query?: string;
  role?: string;
  industry?: string;
  location?: string;
  limit?: number;
  offset?: number;
}

export class PersonRepository {
  static async search(options: PersonFilterOptions = {}): Promise<{ items: (Investor | Founder)[]; total: number }> {
    return { items: [], total: 0 };
  }

  static async findById(id: string, type: 'investor' | 'founder'): Promise<Investor | Founder | null> {
    const coll = type === 'investor' ? collections.investors : collections.founders;
    if (!coll) return null;
    const doc = await coll.doc(id).get();
    return doc.exists ? (doc.data() as any) : null;
  }
}
