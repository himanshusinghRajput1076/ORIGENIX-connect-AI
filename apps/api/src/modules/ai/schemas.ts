import { z } from "zod";

export const AnalyzeEntitySchema = z.object({
  entityId: z.string().min(1),
  entityType: z.enum(["COMPANY", "INVESTOR", "FOUNDER", "STARTUP"]),
  name: z.string().min(1),
  stage: z.string().optional().default("Seed"),
  industries: z.array(z.string()).optional().default(["AI & ML"]),
  location: z.string().optional().default("India"),
});

export const MatchComputeSchema = z.object({
  investor: z.object({
    id: z.string().optional(),
    name: z.string(),
    industries: z.array(z.string()),
    location: z.string(),
  }),
  startup: z.object({
    id: z.string().optional(),
    name: z.string(),
    industries: z.array(z.string()),
    location: z.string(),
    stage: z.string().default("Seed"),
  }),
});

export const OutreachGenerateSchema = z.object({
  recipientName: z.string().min(1),
  recipientRole: z.string().default("VC Investor"),
  companyName: z.string().min(1),
  pitchSummary: z.string().min(10),
  outreachType: z.enum(["cold_email", "intro_request", "partnership", "investment_ask"]).default("cold_email"),
  tone: z.enum(["formal", "casual", "concise", "persuasive"]).default("persuasive"),
});
