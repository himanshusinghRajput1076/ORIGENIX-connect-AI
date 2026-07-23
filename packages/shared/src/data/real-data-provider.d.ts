/**
 * Production Real-Time Data Integration Provider
 * Strict Data Authenticity Engine: Displays only authentic public platform data
 * (Name, Verified Title, Company, Official Photo, Public LinkedIn/GitHub Handle, Contact Details).
 */
export interface LiveStartupData {
    id: string;
    name: string;
    tagline: string;
    productHuntUrl?: string;
    votesCount: number;
    featuredAt: string;
    topics: string[];
    makerName: string;
    makerProfileUrl: string;
    source: "ProductHunt" | "GitHub" | "SEC_EDGAR" | "NewsAPI";
    location?: string;
}
export interface LiveInvestorData {
    id: string;
    name: string;
    title: string;
    company: string;
    location: string;
    industries: string[];
    matchScore: number;
    linkedin: string;
    avatar: string;
    bio: string;
    isRealTime: boolean;
}
export interface LiveFounderData {
    id: string;
    name: string;
    title: string;
    company: string;
    location: string;
    industries: string[];
    leadScore: number;
    linkedin: string;
    avatar: string;
    bio: string;
    isRealTime: boolean;
}
export interface LiveFundingNewsData {
    id: string;
    companyName: string;
    amount: string;
    round: string;
    investors: string[];
    summary: string;
    publishedAt: string;
    sourceUrl: string;
}
/**
 * Fetches live trending tech startups from GitHub API.
 */
export declare function fetchLiveTrendingStartups(): Promise<LiveStartupData[]>;
/**
 * Fetches live VC investors data from public registries.
 */
export declare function fetchLiveInvestors(location?: string, industry?: string): Promise<LiveInvestorData[]>;
/**
 * Fetches live founder profile data from GitHub API & verified public records.
 */
export declare function fetchLiveFounders(location?: string, query?: string): Promise<LiveFounderData[]>;
/**
 * Fetches live funding news and public filings.
 */
export declare function fetchLiveFundingNews(): Promise<LiveFundingNewsData[]>;
