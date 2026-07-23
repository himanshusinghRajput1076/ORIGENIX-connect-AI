"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorService = void 0;
const repository_1 = require("./repository");
const repo = new repository_1.InvestorRepository();
class InvestorService {
    async getInvestors(filters) { return repo.findAll(filters); }
    async getInvestorById(id) {
        const res = await repo.findById(id);
        if (!res)
            throw new Error('Investor not found');
        return res;
    }
}
exports.InvestorService = InvestorService;
