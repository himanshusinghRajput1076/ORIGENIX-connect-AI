"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRepository = void 0;
const database_1 = require("@origenix/database");
class SearchRepository {
    async searchAcrossAll(query, category) {
        const filters = category ? { category } : {};
        return {
            companies: await database_1.prisma.company.findMany({ where: { name: { contains: query } } }),
            investors: await database_1.prisma.investor.findMany({ where: { name: { contains: query } } }),
            founders: await database_1.prisma.founder.findMany({ where: { name: { contains: query } } }),
            startups: await database_1.prisma.startup.findMany({ where: { company: { name: { contains: query } } } })
        };
    }
}
exports.SearchRepository = SearchRepository;
