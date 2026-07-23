import { z } from "zod";
export declare const AnalyzeEntitySchema: z.ZodObject<{
    entityId: z.ZodString;
    entityType: z.ZodEnum<["COMPANY", "INVESTOR", "FOUNDER", "STARTUP"]>;
    name: z.ZodString;
    stage: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    industries: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    location: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    stage: string;
    location: string;
    name: string;
    entityId: string;
    entityType: "COMPANY" | "INVESTOR" | "FOUNDER" | "STARTUP";
    industries: string[];
}, {
    name: string;
    entityId: string;
    entityType: "COMPANY" | "INVESTOR" | "FOUNDER" | "STARTUP";
    stage?: string | undefined;
    location?: string | undefined;
    industries?: string[] | undefined;
}>;
export declare const MatchComputeSchema: z.ZodObject<{
    investor: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        industries: z.ZodArray<z.ZodString, "many">;
        location: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        location: string;
        name: string;
        industries: string[];
        id?: string | undefined;
    }, {
        location: string;
        name: string;
        industries: string[];
        id?: string | undefined;
    }>;
    startup: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        industries: z.ZodArray<z.ZodString, "many">;
        location: z.ZodString;
        stage: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        stage: string;
        location: string;
        name: string;
        industries: string[];
        id?: string | undefined;
    }, {
        location: string;
        name: string;
        industries: string[];
        stage?: string | undefined;
        id?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    investor: {
        location: string;
        name: string;
        industries: string[];
        id?: string | undefined;
    };
    startup: {
        stage: string;
        location: string;
        name: string;
        industries: string[];
        id?: string | undefined;
    };
}, {
    investor: {
        location: string;
        name: string;
        industries: string[];
        id?: string | undefined;
    };
    startup: {
        location: string;
        name: string;
        industries: string[];
        stage?: string | undefined;
        id?: string | undefined;
    };
}>;
export declare const OutreachGenerateSchema: z.ZodObject<{
    recipientName: z.ZodString;
    recipientRole: z.ZodDefault<z.ZodString>;
    companyName: z.ZodString;
    pitchSummary: z.ZodString;
    outreachType: z.ZodDefault<z.ZodEnum<["cold_email", "intro_request", "partnership", "investment_ask"]>>;
    tone: z.ZodDefault<z.ZodEnum<["formal", "casual", "concise", "persuasive"]>>;
}, "strip", z.ZodTypeAny, {
    outreachType: "cold_email" | "intro_request" | "partnership" | "investment_ask";
    tone: "formal" | "casual" | "concise" | "persuasive";
    recipientName: string;
    recipientRole: string;
    companyName: string;
    pitchSummary: string;
}, {
    recipientName: string;
    companyName: string;
    pitchSummary: string;
    outreachType?: "cold_email" | "intro_request" | "partnership" | "investment_ask" | undefined;
    tone?: "formal" | "casual" | "concise" | "persuasive" | undefined;
    recipientRole?: string | undefined;
}>;
