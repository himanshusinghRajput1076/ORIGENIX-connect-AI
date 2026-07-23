"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRepository = void 0;
class SearchRepository {
    async findAll(filters) { return []; }
    async findById(id) { return null; }
    async create(data) { return { id: 'mock', ...data }; }
    async update(id, data) { return { id, ...data }; }
    async delete(id) { return true; }
    async searchAcrossAll(query, category) { return { companies: [], investors: [], founders: [], startups: [] }; }
}
exports.SearchRepository = SearchRepository;
