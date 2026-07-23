import { type OutreachRequestInput } from "@origenix/shared";
export interface GeneratedOutreachMessage {
    subject: string;
    body: string;
    confidenceScore: number;
    tokensUsed: number;
    metadata: {
        targetPerson: string;
        targetCompany: string;
        tone: string;
        generatedAt: string;
    };
}
/**
 * Production AI Outreach Generator Engine.
 * Validates inputs with Zod, sanitizes string content, and drafts structured messages.
 */
export declare function generatePersonalizedOutreach(rawInput: OutreachRequestInput): Promise<GeneratedOutreachMessage>;
