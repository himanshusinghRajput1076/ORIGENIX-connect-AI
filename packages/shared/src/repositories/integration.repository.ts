import { prisma } from "../db/firebase";
import { encryptSecret, decryptSecret } from "../security/encryption";
import { LinkedInConnectInput } from "../validation";

export class IntegrationRepository {
  /**
   * Save or update LinkedIn Integration state with AES-256-GCM encryption.
   */
  static async saveLinkedInConnection(
    userId: string,
    input: LinkedInConnectInput
  ) {
    const encryptedClientId = encryptSecret(input.clientId);
    const encryptedSecret = encryptSecret(input.clientSecret);

    try {
      return await collections.linkedInIntegration.upsert({
        where: {
          userId_targetProfileUrl: {
            userId,
            targetProfileUrl: input.targetProfileUrl,
          },
        },
        update: {
          encryptedClientId,
          encryptedSecret,
          scopes: input.scopes,
          status: "CONNECTED",
          lastSyncedAt: new Date(),
        },
        create: {
          userId,
          targetProfileUrl: input.targetProfileUrl,
          encryptedClientId,
          encryptedSecret,
          scopes: input.scopes,
          status: "CONNECTED",
          lastSyncedAt: new Date(),
        },
      });
    } catch (err) {
      console.error("[IntegrationRepository.saveLinkedInConnection] Error:", err);
      return null;
    }
  }

  /**
   * Fetch active integration status for a user.
   */
  static async getLinkedInConnection(userId: string, targetProfileUrl: string) {
    try {
      const record = await collections.linkedInIntegration.findUnique({
        where: {
          userId_targetProfileUrl: {
            userId,
            targetProfileUrl,
          },
        },
      });

      if (!record) return null;

      return {
        ...record,
        decryptedClientId: decryptSecret(record.encryptedClientId),
      };
    } catch (err) {
      console.error("[IntegrationRepository.getLinkedInConnection] Error:", err);
      return null;
    }
  }

  /**
   * Disconnect LinkedIn integration.
   */
  static async disconnectLinkedInConnection(userId: string, targetProfileUrl: string) {
    try {
      return await collections.linkedInIntegration.update({
        where: {
          userId_targetProfileUrl: {
            userId,
            targetProfileUrl,
          },
        },
        data: {
          status: "DISCONNECTED",
        },
      });
    } catch (err) {
      console.error("[IntegrationRepository.disconnectLinkedInConnection] Error:", err);
      return null;
    }
  }
}
