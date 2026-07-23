"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiRepository = void 0;
class AiRepository {
    async findAll(filters) { return []; }
    async findById(id) { return null; }
    async saveAnalysis(data) { return null; }
    async create(data) { return { id: 'mock', ...data }; }
    async update(id, data) { return { id, ...data }; }
    async delete(id) { return true; }
}
exports.AiRepository = AiRepository;
