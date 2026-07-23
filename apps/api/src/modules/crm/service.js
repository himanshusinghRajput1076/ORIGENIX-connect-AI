"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRMService = void 0;
const repository_1 = require("./repository");
const repo = new repository_1.CRMRepository();
class CRMService {
    async getContacts() { return repo.findContacts(); }
    async updateContactStage(id, data) { return repo.updateStage(id, data.stage); }
    async addNote(contactId, data) { return repo.addNote(contactId, data.content); }
    async getNotes(contactId) { return repo.getNotes(contactId); }
}
exports.CRMService = CRMService;
