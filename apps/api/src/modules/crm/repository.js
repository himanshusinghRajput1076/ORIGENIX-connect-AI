"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRMRepository = void 0;
const database_1 = require("@origenix/database");
class CRMRepository {
    async findContacts() { return database_1.prisma.contact.findMany(); }
    async updateStage(id, stage) { return database_1.prisma.contact.update({ where: { id }, data: { stage } }); }
    async addNote(contactId, content) { return database_1.prisma.crmNote.create({ data: { contactId, content, userId: 'system' } }); }
    async getNotes(contactId) { return database_1.prisma.crmNote.findMany({ where: { contactId } }); }
}
exports.CRMRepository = CRMRepository;
