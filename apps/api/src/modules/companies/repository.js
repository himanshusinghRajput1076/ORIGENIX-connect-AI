"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRepository = void 0;
const database_1 = require("@origenix/database");
class CompanyRepository {
    async findAll(filters) { return database_1.prisma.company.findMany({ where: filters }); }
    async findById(id) { return database_1.prisma.company.findUnique({ where: { id } }); }
    async create(data) { return database_1.prisma.company.create({ data }); }
    async update(id, data) { return database_1.prisma.company.update({ where: { id }, data }); }
    async delete(id) { return database_1.prisma.company.delete({ where: { id } }); }
}
exports.CompanyRepository = CompanyRepository;
