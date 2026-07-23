"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupRepository = void 0;
class StartupRepository {
    async findAll(filters) { return []; }
    async findById(id) { return null; }
    async create(data) { return { id: 'mock', ...data }; }
    async updateMetrics(id, metrics) { return null; }
    async update(id, data) { return { id, ...data }; }
    async delete(id) { return true; }
}
exports.StartupRepository = StartupRepository;
