import { z } from "zod";

// Strict LinkedIn Profile URL validator
export const LinkedInProfileUrlSchema = z
  .string()
  .trim()
  .regex(
    /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
    "Invalid LinkedIn profile URL format. Must be like https://www.linkedin.com/in/username"
  );

// LinkedIn API Credentials & Connection Validation
export const LinkedInConnectSchema = z.object({
  targetProfileUrl: LinkedInProfileUrlSchema,
  clientId: z.string().min(4, "Client ID must be at least 4 characters").max(100),
  clientSecret: z.string().min(8, "Client secret must be at least 8 characters").max(200),
  scopes: z.array(z.string()).min(1, "At least one scope must be selected"),
});

// AI Outreach Request Validator
export const OutreachRequestSchema = z.object({
  targetPersonId: z.string().uuid("Invalid target person ID format").or(z.string().min(1)),
  targetPersonName: z.string().min(1, "Target person name required"),
  targetCompany: z.string().min(1, "Target company required"),
  outreachType: z.enum(["cold_email", "intro_request", "partnership", "investment_ask"]),
  tone: z.enum(["formal", "casual", "concise", "persuasive"]),
  userPitch: z
    .string()
    .trim()
    .min(10, "Pitch description must be at least 10 characters")
    .max(2000, "Pitch description cannot exceed 2000 characters"),
});

// Search Filter & Query Validator
export const SearchQuerySchema = z.object({
  query: z.string().trim().max(200).optional().default(""),
  role: z.enum(["all", "investor", "founder", "co-founder", "vc", "angel", "entrepreneur"]).optional().default("all"),
  industry: z.string().optional().default("all"),
  stage: z.string().optional().default("all"),
  location: z.string().optional().default("India"),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(20),
});

// Lead Scoring Request Validator
export const LeadScoreRequestSchema = z.object({
  personId: z.string().min(1),
  industryWeight: z.number().min(0).max(100).default(30),
  stageWeight: z.number().min(0).max(100).default(30),
  activityWeight: z.number().min(0).max(100).default(40),
});

export type LinkedInConnectInput = z.infer<typeof LinkedInConnectSchema>;
export type OutreachRequestInput = z.infer<typeof OutreachRequestSchema>;
export type SearchQueryInput = z.infer<typeof SearchQuerySchema>;
export type LeadScoreRequestInput = z.infer<typeof LeadScoreRequestSchema>;
