"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FounderRepository = void 0;
class FounderRepository {
    async findAll(filters) { return []; }
    async findById(id) { return null; }
    async create(data) { return { id: 'mock', ...data }; }
    async update(id, data) { return { id, ...data }; }
    async delete(id) { return true; }
}
exports.FounderRepository = FounderRepository;
