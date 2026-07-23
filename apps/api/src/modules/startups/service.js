"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupService = void 0;
const repository_1 = require("./repository");
const repo = new repository_1.StartupRepository();
class StartupService {
    async getStartups() { return repo.findAll(); }
    async getStartupById(id) {
        const res = await repo.findById(id);
        if (!res)
            throw new Error('Startup not found');
        return res;
    }
    async updateMetrics(id, data) { return repo.updateMetrics(id, data); }
}
exports.StartupService = StartupService;
