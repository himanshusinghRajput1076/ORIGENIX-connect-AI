import { prisma } from "../db/firebase";
import { Company, FundingStage } from "@origenix/database";

export interface CompanyFilterOptions {
  query?: string;
  stage?: string;
  industry?: string;
  location?: string;
  limit?: number;
  offset?: number;
}

export class CompanyRepository {
  /**
   * Search companies with filtering & pagination.
   */
  static async search(options: CompanyFilterOptions = {}): Promise<{ items: Company[]; total: number }> {
    const { query, stage, industry, location, limit = 20, offset = 0 } = options;

    const whereClause: any = {};

    if (query && query.trim() !== "") {
      whereClause.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { tagline: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    if (stage && stage !== "all") {
      const enumStage = stage.toUpperCase() as FundingStage;
      whereClause.stage = enumStage;
    }

    if (industry && industry !== "all") {
      whereClause.industries = { has: industry };
    }

    if (location && location !== "all") {
      whereClause.location = { contains: location, mode: "insensitive" };
    }

    try {
      const [items, total] = await Promise.all([
        collections.company.findMany({
          where: whereClause,
          orderBy: { totalFunding: "desc" },
          take: limit,
          skip: offset,
          include: { investors: true, founders: true, startups: true },
        }),
        collections.company.count({ where: whereClause }),
      ]);

      return { items, total };
    } catch (err) {
      console.error("[CompanyRepository.search] Error:", err);
      return { items: [], total: 0 };
    }
  }

  /**
   * Find company by ID.
   */
  static async findById(id: string): Promise<Company | null> {
    try {
      return await collections.company.findUnique({
        where: { id },
        include: { investors: true, founders: true, startups: true, posts: true, aiAnalysis: true },
      });
    } catch (err) {
      console.error("[CompanyRepository.findById] Error:", err);
      return null;
    }
  }
}
