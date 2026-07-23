import { collections } from '../db/firebase';
import { LinkedInConnectInput } from '../validation';

export class LinkedInIntegrationRepository {
  static async findByUserAndTarget(userId: string, targetProfileUrl: string): Promise<any | null> {
    if (!collections.linkedinIntegrations) return null;
    const snap = await collections.linkedinIntegrations.where('userId', '==', userId).where('targetProfileUrl', '==', targetProfileUrl).get();
    return snap.empty ? null : snap.docs[0].data();
  }

  static async saveLinkedInConnection(userId: string, input: any) { return null; }
  static async createOrUpdate(userId: string, input: LinkedInConnectInput): Promise<any> {
    if (!collections.linkedinIntegrations) return null;
    const existing = await this.findByUserAndTarget(userId, input.targetProfileUrl);
    if (existing) {
      await collections.linkedinIntegrations.doc(existing.id).update({ ...input, updatedAt: new Date() });
      return existing;
    } else {
      const ref = await collections.linkedinIntegrations.add({ userId, ...input, createdAt: new Date() });
      return { id: ref.id, userId, ...input };
    }
  }

  static async disconnect(userId: string, targetProfileUrl: string): Promise<boolean> {
    if (!collections.linkedinIntegrations) return false;
    const snap = await collections.linkedinIntegrations.where('userId', '==', userId).where('targetProfileUrl', '==', targetProfileUrl).get();
    if (!snap.empty) {
      await snap.docs[0].ref.delete();
      return true;
    }
    return false;
  }
}
