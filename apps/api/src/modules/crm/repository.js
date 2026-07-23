"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRMRepository = void 0;
class CRMRepository {
    async findAll(filters) { return []; }
    async findById(id) { return null; }
    async create(data) { return { id: 'mock', ...data }; }
    async update(id, data) { return { id, ...data }; }
    async delete(id) { return true; }
    async findContacts() { return []; }
    async updateStage(id, stage) { return null; }
    async addNote(contactId, content) { return true; }
    async getNotes(contactId) { return []; }
}
exports.CRMRepository = CRMRepository;
