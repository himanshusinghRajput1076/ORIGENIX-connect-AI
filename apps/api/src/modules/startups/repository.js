"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupRepository = void 0;
const database_1 = require("@origenix/database");
class StartupRepository {
    async findAll() { return database_1.prisma.startup.findMany(); }
    async findById(id) { return database_1.prisma.startup.findUnique({ where: { id } }); }
    async updateMetrics(id, data) { return database_1.prisma.startup.update({ where: { id }, data }); }
}
exports.StartupRepository = StartupRepository;
