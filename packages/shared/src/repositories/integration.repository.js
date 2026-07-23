"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedInIntegrationRepository = void 0;
const firebase_1 = require("../db/firebase");
class LinkedInIntegrationRepository {
    static async findByUserAndTarget(userId, targetProfileUrl) {
        if (!firebase_1.collections.linkedinIntegrations)
            return null;
        const snap = await firebase_1.collections.linkedinIntegrations.where('userId', '==', userId).where('targetProfileUrl', '==', targetProfileUrl).get();
        return snap.empty ? null : snap.docs[0].data();
    }
    static async createOrUpdate(userId, input) {
        if (!firebase_1.collections.linkedinIntegrations)
            return null;
        const existing = await this.findByUserAndTarget(userId, input.targetProfileUrl);
        if (existing) {
            await firebase_1.collections.linkedinIntegrations.doc(existing.id).update({ ...input, updatedAt: new Date() });
            return existing;
        }
        else {
            const ref = await firebase_1.collections.linkedinIntegrations.add({ userId, ...input, createdAt: new Date() });
            return { id: ref.id, userId, ...input };
        }
    }
    static async disconnect(userId, targetProfileUrl) {
        if (!firebase_1.collections.linkedinIntegrations)
            return false;
        const snap = await firebase_1.collections.linkedinIntegrations.where('userId', '==', userId).where('targetProfileUrl', '==', targetProfileUrl).get();
        if (!snap.empty) {
            await snap.docs[0].ref.delete();
            return true;
        }
        return false;
    }
}
exports.LinkedInIntegrationRepository = LinkedInIntegrationRepository;
