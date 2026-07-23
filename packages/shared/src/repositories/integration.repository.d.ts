import { LinkedInConnectInput } from "../validation";
export declare class IntegrationRepository {
    /**
     * Save or update LinkedIn Integration state with AES-256-GCM encryption.
     */
    static saveLinkedInConnection(userId: string, input: LinkedInConnectInput): Promise<any>;
    /**
     * Fetch active integration status for a user.
     */
    static getLinkedInConnection(userId: string, targetProfileUrl: string): Promise<any>;
    /**
     * Disconnect LinkedIn integration.
     */
    static disconnectLinkedInConnection(userId: string, targetProfileUrl: string): Promise<any>;
}
