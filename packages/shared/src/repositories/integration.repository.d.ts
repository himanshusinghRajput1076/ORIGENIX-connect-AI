import { LinkedInConnectInput } from "../validation";
export declare class IntegrationRepository {
    /**
     * Save or update LinkedIn Integration state with AES-256-GCM encryption.
     */
    static saveLinkedInConnection(userId: string, input: LinkedInConnectInput): Promise<{
        targetProfileUrl: string;
        status: string;
        scopes: string[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        encryptedClientId: string;
        encryptedSecret: string;
        lastSyncedAt: Date;
    } | null>;
    /**
     * Fetch active integration status for a user.
     */
    static getLinkedInConnection(userId: string, targetProfileUrl: string): Promise<{
        decryptedClientId: string;
        targetProfileUrl: string;
        status: string;
        scopes: string[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        encryptedClientId: string;
        encryptedSecret: string;
        lastSyncedAt: Date;
    } | null>;
    /**
     * Disconnect LinkedIn integration.
     */
    static disconnectLinkedInConnection(userId: string, targetProfileUrl: string): Promise<{
        targetProfileUrl: string;
        status: string;
        scopes: string[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        encryptedClientId: string;
        encryptedSecret: string;
        lastSyncedAt: Date;
    } | null>;
}
