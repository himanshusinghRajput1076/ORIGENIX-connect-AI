"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRepository = void 0;
const firebase_1 = require("../db/firebase");
class CompanyRepository {
    static async search(options = {}) {
        return { items: [], total: 0 };
    }
    static async findById(id) {
        if (!firebase_1.collections.companies)
            return null;
        const doc = await firebase_1.collections.companies.doc(id).get();
        return doc.exists ? doc.data() : null;
    }
}
exports.CompanyRepository = CompanyRepository;
