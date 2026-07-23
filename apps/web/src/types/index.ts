// ============================================================
// Origenix Connect AI — Core Type Definitions
// ============================================================

// ---- Enums & Constants ----

export type PersonRole =
  | "investor"
  | "founder"
  | "co-founder"
  | "vc"
  | "angel"
  | "entrepreneur"
  | "advisor"
  | "accelerator";

export type FundingStage =
  | "pre-seed"
  | "seed"
  | "series-a"
  | "series-b"
  | "series-c"
  | "series-d"
  | "growth"
  | "ipo"
  | "acquired";

export type CompanyType =
  | "startup"
  | "vc-firm"
  | "accelerator"
  | "angel-group"
  | "corporate"
  | "non-profit";

export type Industry =
  | "ai-ml"
  | "fintech"
  | "healthtech"
  | "edtech"
  | "saas"
  | "e-commerce"
  | "biotech"
  | "climate"
  | "cybersecurity"
  | "web3"
  | "robotics"
  | "gaming"
  | "media"
  | "real-estate"
  | "logistics"
  | "food-beverage"
  | "deep-tech"
  | "enterprise"
  | "consumer"
  | "other";

export type LeadTemperature = "hot" | "warm" | "cold";

export type OutreachType =
  | "cold-email"
  | "intro-request"
  | "partnership"
  | "investment-ask"
  | "follow-up";

export type ActivityType =
  | "funding-round"
  | "product-launch"
  | "news-mention"
  | "blog-post"
  | "hire"
  | "partnership"
  | "award"
  | "acquisition";

// ---- Core Entities ----

export interface Person {
  id: string;
  name: string;
  title: string;
  roles: PersonRole[];
  avatar?: string;
  bio: string;
  location: string;
  company: string;
  companyId: string;
  email?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  industries: Industry[];
  investmentRange?: { min: number; max: number };
  investmentCount?: number;
  foundedCompanies?: string[];
  tags: string[];
  leadScore?: number;
  leadTemp?: LeadTemperature;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  tagline: string;
  description: string;
  type: CompanyType;
  stage: FundingStage;
  industries: Industry[];
  location: string;
  foundedYear: number;
  website?: string;
  linkedin?: string;
  twitter?: string;
  teamSize: number;
  totalFunding: number;
  fundingRounds: FundingRound[];
  founders: string[]; // Person IDs
  activities: ActivityEvent[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FundingRound {
  id: string;
  companyId: string;
  stage: FundingStage;
  amount: number;
  date: Date;
  leadInvestor?: string;
  investors: string[];
  valuation?: number;
  source?: string;
}

export interface ActivityEvent {
  id: string;
  entityId: string;
  entityType: "person" | "company";
  type: ActivityType;
  title: string;
  description: string;
  url?: string;
  date: Date;
  source: string;
}

export interface LeadScore {
  personId: string;
  score: number;
  temperature: LeadTemperature;
  factors: ScoreFactor[];
  matchedCriteria: string[];
  generatedAt: Date;
}

export interface ScoreFactor {
  name: string;
  weight: number;
  score: number;
  reason: string;
}

export interface OutreachMessage {
  id: string;
  targetPersonId: string;
  type: OutreachType;
  subject: string;
  body: string;
  tone: "formal" | "casual" | "concise";
  status: "draft" | "sent" | "replied" | "bounced";
  createdAt: Date;
  sentAt?: Date;
}

// ---- Search ----

export interface SearchFilters {
  query: string;
  roles?: PersonRole[];
  industries?: Industry[];
  stages?: FundingStage[];
  locations?: string[];
  investmentMin?: number;
  investmentMax?: number;
  teamSizeMin?: number;
  teamSizeMax?: number;
  entityType?: "people" | "companies" | "all";
  sortBy?: "relevance" | "funding" | "recency" | "score";
  page?: number;
  limit?: number;
}

export interface SearchResult {
  type: "person" | "company";
  person?: Person;
  company?: Company;
  matchScore: number;
  highlights: string[];
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  query: string;
  facets: SearchFacets;
}

export interface SearchFacets {
  roles: { value: string; count: number }[];
  industries: { value: string; count: number }[];
  stages: { value: string; count: number }[];
  locations: { value: string; count: number }[];
}

// ---- Dashboard ----

export interface DashboardMetrics {
  totalLeads: number;
  totalLeadsChange: number;
  matchRate: number;
  matchRateChange: number;
  outreachSent: number;
  outreachSentChange: number;
  responseRate: number;
  responseRateChange: number;
}

export interface TrendDataPoint {
  date: string;
  value: number;
  label?: string;
}

// ---- UI Helpers ----

export const INDUSTRY_LABELS: Record<Industry, string> = {
  "ai-ml": "AI & Machine Learning",
  fintech: "FinTech",
  healthtech: "HealthTech",
  edtech: "EdTech",
  saas: "SaaS",
  "e-commerce": "E-Commerce",
  biotech: "BioTech",
  climate: "Climate Tech",
  cybersecurity: "Cybersecurity",
  web3: "Web3 & Blockchain",
  robotics: "Robotics",
  gaming: "Gaming",
  media: "Media & Entertainment",
  "real-estate": "Real Estate Tech",
  logistics: "Logistics & Supply Chain",
  "food-beverage": "Food & Beverage",
  "deep-tech": "Deep Tech",
  enterprise: "Enterprise",
  consumer: "Consumer",
  other: "Other",
};

export const STAGE_LABELS: Record<FundingStage, string> = {
  "pre-seed": "Pre-Seed",
  seed: "Seed",
  "series-a": "Series A",
  "series-b": "Series B",
  "series-c": "Series C",
  "series-d": "Series D+",
  growth: "Growth",
  ipo: "IPO",
  acquired: "Acquired",
};

export const ROLE_LABELS: Record<PersonRole, string> = {
  investor: "Investor",
  founder: "Founder",
  "co-founder": "Co-Founder",
  vc: "VC Partner",
  angel: "Angel Investor",
  entrepreneur: "Entrepreneur",
  advisor: "Advisor",
  accelerator: "Accelerator",
};

export const STAGE_COLORS: Record<FundingStage, string> = {
  "pre-seed": "#8b5cf6",
  seed: "#06b6d4",
  "series-a": "#10b981",
  "series-b": "#3b82f6",
  "series-c": "#f59e0b",
  "series-d": "#ef4444",
  growth: "#ec4899",
  ipo: "#6366f1",
  acquired: "#64748b",
};
