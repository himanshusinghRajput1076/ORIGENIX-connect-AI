"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonRepository = void 0;
const prisma_1 = require("../db/prisma");
class PersonRepository {
    /**
     * Search investors & founders with multi-faceted filtering & pagination.
     */
    static async search(options = {}) {
        const { query, industry, location, minLeadScore = 0, limit = 20, offset = 0 } = options;
        const whereClause = {};
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
                prisma_1.prisma.investor.findMany({
                    where: whereClause,
                    take: limit,
                    skip: offset,
                    include: { company: true },
                }),
                prisma_1.prisma.founder.findMany({
                    where: { ...whereClause, leadScore: { gte: minLeadScore } },
                    take: limit,
                    skip: offset,
                    include: { company: true },
                }),
            ]);
            const items = [...investors, ...founders];
            return { items, total: items.length };
        }
        catch (err) {
            console.error("[PersonRepository.search] Database query error:", err);
            return { items: [], total: 0 };
        }
    }
    /**
     * Fetch a single founder or investor profile by ID.
     */
    static async findById(id) {
        try {
            const investor = await prisma_1.prisma.investor.findUnique({
                where: { id },
                include: { company: true },
            });
            if (investor)
                return investor;
            return await prisma_1.prisma.founder.findUnique({
                where: { id },
                include: { company: true },
            });
        }
        catch (err) {
            console.error("[PersonRepository.findById] Error:", err);
            return null;
        }
    }
    /**
     * Fetch a profile by LinkedIn URL.
     */
    static async findByLinkedInUrl(linkedinUrl) {
        try {
            const investor = await prisma_1.prisma.investor.findFirst({
                where: { linkedinUrl },
                include: { company: true },
            });
            if (investor)
                return investor;
            return await prisma_1.prisma.founder.findFirst({
                where: { linkedinUrl },
                include: { company: true },
            });
        }
        catch (err) {
            console.error("[PersonRepository.findByLinkedInUrl] Error:", err);
            return null;
        }
    }
}
exports.PersonRepository = PersonRepository;
