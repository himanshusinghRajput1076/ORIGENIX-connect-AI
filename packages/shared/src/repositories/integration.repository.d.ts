import { LinkedInConnectInput } from '../validation';
export declare class LinkedInIntegrationRepository {
    static findByUserAndTarget(userId: string, targetProfileUrl: string): Promise<any | null>;
    static createOrUpdate(userId: string, input: LinkedInConnectInput): Promise<any>;
    static disconnect(userId: string, targetProfileUrl: string): Promise<boolean>;
}
