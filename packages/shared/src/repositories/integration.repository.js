"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationRepository = void 0;
const prisma_1 = require("../db/prisma");
const encryption_1 = require("../security/encryption");
class IntegrationRepository {
    /**
     * Save or update LinkedIn Integration state with AES-256-GCM encryption.
     */
    static async saveLinkedInConnection(userId, input) {
        const encryptedClientId = (0, encryption_1.encryptSecret)(input.clientId);
        const encryptedSecret = (0, encryption_1.encryptSecret)(input.clientSecret);
        try {
            return await prisma_1.prisma.linkedInIntegration.upsert({
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
        }
        catch (err) {
            console.error("[IntegrationRepository.saveLinkedInConnection] Error:", err);
            return null;
        }
    }
    /**
     * Fetch active integration status for a user.
     */
    static async getLinkedInConnection(userId, targetProfileUrl) {
        try {
            const record = await prisma_1.prisma.linkedInIntegration.findUnique({
                where: {
                    userId_targetProfileUrl: {
                        userId,
                        targetProfileUrl,
                    },
                },
            });
            if (!record)
                return null;
            return {
                ...record,
                decryptedClientId: (0, encryption_1.decryptSecret)(record.encryptedClientId),
            };
        }
        catch (err) {
            console.error("[IntegrationRepository.getLinkedInConnection] Error:", err);
            return null;
        }
    }
    /**
     * Disconnect LinkedIn integration.
     */
    static async disconnectLinkedInConnection(userId, targetProfileUrl) {
        try {
            return await prisma_1.prisma.linkedInIntegration.update({
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
        }
        catch (err) {
            console.error("[IntegrationRepository.disconnectLinkedInConnection] Error:", err);
            return null;
        }
    }
}
exports.IntegrationRepository = IntegrationRepository;
