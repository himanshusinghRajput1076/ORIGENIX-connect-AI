export declare class LinkedInService {
    connectToProfile(userId: string, targetProfileUrl: string, message?: string): Promise<{
        success: boolean;
        targetProfileUrl: string;
        action: string;
        message: string | undefined;
    }>;
    sendMessage(userId: string, targetProfileUrl: string, message: string): Promise<{
        success: boolean;
        targetProfileUrl: string;
        action: string;
        message: string;
    }>;
    getProfileDetails(targetProfileUrl: string): Promise<{
        success: boolean;
        data: {
            profileUrl: string;
            name: string;
            headline: string;
            location: string;
            connections: string;
        };
    }>;
}
