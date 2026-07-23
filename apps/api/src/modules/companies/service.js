"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const repository_1 = require("./repository");
const repo = new repository_1.CompanyRepository();
class CompanyService {
    async getCompanies(filters) { return repo.findAll(filters); }
    async getCompanyById(id) {
        const res = await repo.findById(id);
        if (!res)
            throw new Error('Company not found');
        return res;
    }
    async createCompany(data) { return repo.create(data); }
    async updateCompany(id, data) { return repo.update(id, data); }
    async deleteCompany(id) { return repo.delete(id); }
}
exports.CompanyService = CompanyService;
