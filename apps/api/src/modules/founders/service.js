"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FounderService = void 0;
const repository_1 = require("./repository");
const repo = new repository_1.FounderRepository();
class FounderService {
    async getFounders(filters) { return repo.findAll(filters); }
    async getFounderById(id) {
        const res = await repo.findById(id);
        if (!res)
            throw new Error('Founder not found');
        return res;
    }
}
exports.FounderService = FounderService;
