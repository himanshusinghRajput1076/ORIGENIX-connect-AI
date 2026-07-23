import { z } from "zod";
export declare const LinkedInProfileUrlSchema: z.ZodString;
export declare const LinkedInConnectSchema: z.ZodObject<{
    targetProfileUrl: z.ZodString;
    clientId: z.ZodString;
    clientSecret: z.ZodString;
    scopes: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    targetProfileUrl: string;
    clientId: string;
    clientSecret: string;
    scopes: string[];
}, {
    targetProfileUrl: string;
    clientId: string;
    clientSecret: string;
    scopes: string[];
}>;
export declare const OutreachRequestSchema: z.ZodObject<{
    targetPersonId: z.ZodUnion<[z.ZodString, z.ZodString]>;
    targetPersonName: z.ZodString;
    targetCompany: z.ZodString;
    outreachType: z.ZodEnum<["cold_email", "intro_request", "partnership", "investment_ask"]>;
    tone: z.ZodEnum<["formal", "casual", "concise", "persuasive"]>;
    userPitch: z.ZodString;
}, "strip", z.ZodTypeAny, {
    targetPersonId: string;
    targetPersonName: string;
    targetCompany: string;
    outreachType: "cold_email" | "intro_request" | "partnership" | "investment_ask";
    tone: "formal" | "casual" | "concise" | "persuasive";
    userPitch: string;
}, {
    targetPersonId: string;
    targetPersonName: string;
    targetCompany: string;
    outreachType: "cold_email" | "intro_request" | "partnership" | "investment_ask";
    tone: "formal" | "casual" | "concise" | "persuasive";
    userPitch: string;
}>;
export declare const SearchQuerySchema: z.ZodObject<{
    query: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    role: z.ZodDefault<z.ZodOptional<z.ZodEnum<["all", "investor", "founder", "co-founder", "vc", "angel", "entrepreneur"]>>>;
    industry: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    stage: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    location: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    query: string;
    role: "all" | "investor" | "founder" | "co-founder" | "vc" | "angel" | "entrepreneur";
    industry: string;
    stage: string;
    location: string;
    page: number;
    limit: number;
}, {
    query?: string | undefined;
    role?: "all" | "investor" | "founder" | "co-founder" | "vc" | "angel" | "entrepreneur" | undefined;
    industry?: string | undefined;
    stage?: string | undefined;
    location?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const LeadScoreRequestSchema: z.ZodObject<{
    personId: z.ZodString;
    industryWeight: z.ZodDefault<z.ZodNumber>;
    stageWeight: z.ZodDefault<z.ZodNumber>;
    activityWeight: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    personId: string;
    industryWeight: number;
    stageWeight: number;
    activityWeight: number;
}, {
    personId: string;
    industryWeight?: number | undefined;
    stageWeight?: number | undefined;
    activityWeight?: number | undefined;
}>;
export type LinkedInConnectInput = z.infer<typeof LinkedInConnectSchema>;
export type OutreachRequestInput = z.infer<typeof OutreachRequestSchema>;
export type SearchQueryInput = z.infer<typeof SearchQuerySchema>;
export type LeadScoreRequestInput = z.infer<typeof LeadScoreRequestSchema>;
