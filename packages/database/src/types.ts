export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  VIEWER = 'VIEWER'
}

export enum CompanyType {
  STARTUP = 'STARTUP',
  VC_FIRM = 'VC_FIRM',
  ANGEL_SYNDICATE = 'ANGEL_SYNDICATE',
  CORPORATE_VC = 'CORPORATE_VC',
  ACCELERATOR = 'ACCELERATOR',
  FAMILY_OFFICE = 'FAMILY_OFFICE',
  PE_FIRM = 'PE_FIRM',
  ENTERPRISE = 'ENTERPRISE'
}

export enum FundingStage {
  PRE_SEED = 'PRE_SEED',
  SEED = 'SEED',
  ANGEL = 'ANGEL',
  SERIES_A = 'SERIES_A',
  SERIES_B = 'SERIES_B',
  SERIES_C = 'SERIES_C',
  SERIES_D_PLUS = 'SERIES_D_PLUS',
  GROWTH = 'GROWTH',
  PRE_IPO = 'PRE_IPO',
  PUBLIC = 'PUBLIC',
  BOOTSTRAPPED = 'BOOTSTRAPPED',
  ACQUIRED = 'ACQUIRED'
}

export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEUTRAL = 'NEUTRAL',
  NEGATIVE = 'NEGATIVE'
}

export enum EntityType {
  COMPANY = 'COMPANY',
  INVESTOR = 'INVESTOR',
  FOUNDER = 'FOUNDER',
  STARTUP = 'STARTUP'
}

export enum ContactStage {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  MEETING_SCHEDULED = 'MEETING_SCHEDULED',
  TERM_SHEET = 'TERM_SHEET',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST'
}

export enum LeadTemp {
  HOT = 'HOT',
  WARM = 'WARM',
  COLD = 'COLD'
}

export enum NotificationType {
  NEW_MATCH = 'NEW_MATCH',
  FUNDING_ALERT = 'FUNDING_ALERT',
  OUTREACH_REPLY = 'OUTREACH_REPLY',
  SYSTEM = 'SYSTEM'
}

export interface User {
  id?: string;
  email: string;
  name: string;
  passwordHash?: string; // May be omitted since using Firebase Auth
  role: UserRole;
  avatar?: string | null;
  linkedinUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id?: string;
  name: string;
  tagline?: string | null;
  description?: string | null;
  type: CompanyType;
  stage: FundingStage;
  industries: string[];
  location: string;
  website?: string | null;
  linkedinUrl?: string | null;
  foundedYear?: number | null;
  teamSize?: number | null;
  totalFunding?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Investor {
  id?: string;
  name: string;
  title: string;
  email?: string | null;
  linkedinUrl?: string | null;
  avatar?: string | null;
  bio?: string | null;
  companyId: string;
  location: string;
  industries: string[];
  investmentMin?: number | null;
  investmentMax?: number | null;
  investmentCount: number;
  matchScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Founder {
  id?: string;
  name: string;
  title: string;
  email?: string | null;
  linkedinUrl?: string | null;
  avatar?: string | null;
  bio?: string | null;
  companyId: string;
  location: string;
  industries: string[];
  foundedCompanies: string[];
  leadScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Startup {
  id?: string;
  companyId: string;
  fundingRaised: number;
  targetRaise?: number | null;
  currentStage: FundingStage;
  pitchDeckUrl?: string | null;
  tractionMetrics?: any | null; // Json mapping
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyPost {
  id?: string;
  companyId: string;
  title: string;
  content: string;
  source: string;
  sourceUrl?: string | null;
  publishedAt: Date;
  sentiment?: Sentiment | null;
  createdAt: Date;
}

export interface AiAnalysis {
  id?: string;
  entityId: string;
  entityType: EntityType;
  analysisType: string;
  result: any; // Json mapping
  confidence: number;
  generatedAt: Date;
  companyId?: string | null;
}

export interface Contact {
  id?: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  linkedinUrl?: string | null;
  companyName?: string | null;
  notes?: string | null;
  stage: ContactStage;
  leadScore: number;
  temperature: LeadTemp;
  createdAt: Date;
  updatedAt: Date;
}

export interface CrmNote {
  id?: string;
  contactId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface SavedSearch {
  id?: string;
  userId: string;
  name: string;
  query: string;
  filters: any; // Json mapping
  notifyOnNew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id?: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link?: string | null;
  createdAt: Date;
}

export interface LinkedInIntegration {
  id?: string;
  userId: string;
  targetProfileUrl: string;
  encryptedClientId: string;
  encryptedSecret: string;
  scopes: string[];
  status: string;
  lastSyncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
