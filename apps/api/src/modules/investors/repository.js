"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorRepository = void 0;
const database_1 = require("@origenix/database");
class InvestorRepository {
    async findAll(filters) { return database_1.prisma.investor.findMany({ where: filters }); }
    async findById(id) { return database_1.prisma.investor.findUnique({ where: { id } }); }
}
exports.InvestorRepository = InvestorRepository;
