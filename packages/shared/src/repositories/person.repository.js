"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonRepository = void 0;
const firebase_1 = require("../db/firebase");
class PersonRepository {
    static async search(options = {}) {
        return { items: [], total: 0 };
    }
    static async findById(id, type) {
        const coll = type === 'investor' ? firebase_1.collections.investors : firebase_1.collections.founders;
        if (!coll)
            return null;
        const doc = await coll.doc(id).get();
        return doc.exists ? doc.data() : null;
    }
}
exports.PersonRepository = PersonRepository;
