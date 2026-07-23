import { prisma } from "../db/firebase";
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

export class PersonRepository {
  /**
   * Search investors & founders with multi-faceted filtering & pagination.
   */
  static async search(options: PersonFilterOptions = {}): Promise<{ items: (Investor | Founder)[]; total: number }> {
    const { query, industry, location, minLeadScore = 0, limit = 20, offset = 0 } = options;

    const whereClause: any = {};

    if (query && query.trim() !== "") {
      whereClause.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { title: { contains: query, mode: "insensitive" } },
        { bio: { contains: query, mode: "insensitive" } },
      ];
    }

    if (industry && industry !== "all") {
      whereClause.industries = { has: industry };
    }

    if (location && location !== "all") {
      whereClause.location = { contains: location, mode: "insensitive" };
    }

    try {
      const [investors, founders] = await Promise.all([
        collections.investor.findMany({
          where: whereClause,
          take: limit,
          skip: offset,
          include: { company: true },
        }),
        collections.founder.findMany({
          where: { ...whereClause, leadScore: { gte: minLeadScore } },
          take: limit,
          skip: offset,
          include: { company: true },
        }),
      ]);

      const items = [...investors, ...founders];
      return { items, total: items.length };
    } catch (err) {
      console.error("[PersonRepository.search] Database query error:", err);
      return { items: [], total: 0 };
    }
  }

  /**
   * Fetch a single founder or investor profile by ID.
   */
  static async findById(id: string): Promise<Investor | Founder | null> {
    try {
      const investor = await collections.investor.findUnique({
        where: { id },
        include: { company: true },
      });
      if (investor) return investor;

      return await collections.founder.findUnique({
        where: { id },
        include: { company: true },
      });
    } catch (err) {
      console.error("[PersonRepository.findById] Error:", err);
      return null;
    }
  }

  /**
   * Fetch a profile by LinkedIn URL.
   */
  static async findByLinkedInUrl(linkedinUrl: string): Promise<Investor | Founder | null> {
    try {
      const investor = await collections.investor.findFirst({
        where: { linkedinUrl },
        include: { company: true },
      });
      if (investor) return investor;

      return await collections.founder.findFirst({
        where: { linkedinUrl },
        include: { company: true },
      });
    } catch (err) {
      console.error("[PersonRepository.findByLinkedInUrl] Error:", err);
      return null;
    }
  }
}
