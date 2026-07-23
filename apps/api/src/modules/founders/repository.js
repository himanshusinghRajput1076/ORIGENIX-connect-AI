"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FounderRepository = void 0;
const database_1 = require("@origenix/database");
class FounderRepository {
    async findAll(filters) { return database_1.prisma.founder.findMany({ where: filters }); }
    async findById(id) { return database_1.prisma.founder.findUnique({ where: { id } }); }
}
exports.FounderRepository = FounderRepository;
