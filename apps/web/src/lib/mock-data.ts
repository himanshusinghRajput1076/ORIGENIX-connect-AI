// ============================================================
// Origenix Connect AI — Mock / Demo Data
// ============================================================

import type {
  Person,
  Company,
  FundingRound,
  ActivityEvent,
  DashboardMetrics,
  TrendDataPoint,
  SearchResult,
} from "@/types";

// ---- People (Investors, Founders, VCs) ----

export const mockPeople: Person[] = [
  {
    id: "p0",
    name: "Himanshu Singh",
    title: "Founder & Tech Lead",
    roles: ["founder", "entrepreneur", "investor"],
    bio: "Founder & Tech Lead at Origenix Connect AI.",
    location: "Bengaluru, KA, India",
    company: "Origenix Connect AI",
    companyId: "c1",
    email: "contact@origenix.ai",
    website: "https://github.com/himanshusinghRajput1076/ORIGENIX-connect-AI",
    linkedin: "https://www.linkedin.com/in/himanshusingh88",
    industries: ["ai-ml", "saas", "fintech"],
    tags: ["founder", "ai-architect", "connect-ai-lead"],
    leadScore: 99,
    leadTemp: "hot",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2025-07-22"),
  },
  {
    id: "p1",
    name: "Sarah Chen",
    title: "Managing Partner",
    roles: ["vc", "investor"],
    bio: "Managing Partner at Horizon Ventures. 15+ years in venture capital. Led investments in 40+ startups across AI, fintech, and deep tech. Former Goldman Sachs VP.",
    location: "San Francisco, CA",
    company: "Horizon Ventures",
    companyId: "c1",
    email: "sarah@horizonvc.com",
    website: "https://horizonvc.com",
    linkedin: "https://linkedin.com/in/sarachen",
    twitter: "https://twitter.com/sarachen_vc",
    industries: ["ai-ml", "fintech", "deep-tech"],
    investmentRange: { min: 500000, max: 10000000 },
    investmentCount: 42,
    tags: ["early-stage", "board-member", "female-founder-ally"],
    leadScore: 92,
    leadTemp: "hot",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-06-20"),
  },
  {
    id: "p2",
    name: "Marcus Johnson",
    title: "CEO & Founder",
    roles: ["founder", "entrepreneur"],
    bio: "Serial entrepreneur and CEO of NeuralFlow. Previously founded DataPulse (acquired by Microsoft for $120M). MIT Computer Science PhD. Passionate about AI democratization.",
    location: "New York, NY",
    company: "NeuralFlow",
    companyId: "c2",
    email: "marcus@neuralflow.ai",
    website: "https://neuralflow.ai",
    linkedin: "https://linkedin.com/in/marcusjohnson",
    twitter: "https://twitter.com/marcusj_ai",
    industries: ["ai-ml", "saas", "enterprise"],
    foundedCompanies: ["NeuralFlow", "DataPulse"],
    tags: ["serial-entrepreneur", "ai-expert", "mit"],
    leadScore: 88,
    leadTemp: "hot",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2025-07-01"),
  },
  {
    id: "p3",
    name: "Elena Rodriguez",
    title: "General Partner",
    roles: ["vc", "investor"],
    bio: "General Partner at BlueShift Capital. Focuses on Series A-B investments in healthcare and biotech. Former McKinsey engagement manager. Harvard MBA.",
    location: "Boston, MA",
    company: "BlueShift Capital",
    companyId: "c3",
    email: "elena@blueshiftcap.com",
    website: "https://blueshiftcap.com",
    linkedin: "https://linkedin.com/in/elenarodriguez",
    industries: ["healthtech", "biotech", "ai-ml"],
    investmentRange: { min: 2000000, max: 25000000 },
    investmentCount: 28,
    tags: ["healthcare-focus", "series-a", "board-member"],
    leadScore: 85,
    leadTemp: "hot",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2025-06-15"),
  },
  {
    id: "p4",
    name: "James Park",
    title: "Co-Founder & CTO",
    roles: ["co-founder", "entrepreneur"],
    bio: "Co-founder and CTO of CryptoVault, a next-gen digital asset security platform. Ex-Google senior engineer. Stanford CS graduate. Open source contributor.",
    location: "Austin, TX",
    company: "CryptoVault",
    companyId: "c4",
    email: "james@cryptovault.io",
    website: "https://cryptovault.io",
    linkedin: "https://linkedin.com/in/jamespark",
    twitter: "https://twitter.com/jpark_crypto",
    industries: ["web3", "cybersecurity", "fintech"],
    foundedCompanies: ["CryptoVault"],
    tags: ["technical-founder", "ex-google", "stanford"],
    leadScore: 76,
    leadTemp: "warm",
    createdAt: new Date("2024-04-12"),
    updatedAt: new Date("2025-05-30"),
  },
  {
    id: "p5",
    name: "Aisha Patel",
    title: "Angel Investor & Advisor",
    roles: ["angel", "advisor"],
    bio: "Active angel investor with 60+ investments. Advisor to 15 startups. Former VP of Product at Salesforce. Focuses on SaaS and enterprise software.",
    location: "Seattle, WA",
    company: "Independent",
    companyId: "c5",
    email: "aisha@aishapatel.com",
    website: "https://aishapatel.com",
    linkedin: "https://linkedin.com/in/aishapatel",
    industries: ["saas", "enterprise", "ai-ml"],
    investmentRange: { min: 25000, max: 500000 },
    investmentCount: 63,
    tags: ["angel-investor", "saas-expert", "mentor"],
    leadScore: 81,
    leadTemp: "hot",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2025-07-10"),
  },
  {
    id: "p6",
    name: "David Okafor",
    title: "Founder & CEO",
    roles: ["founder", "entrepreneur"],
    bio: "Building GreenGrid — the next-generation clean energy management platform. Previous experience at Tesla and SpaceX. Passionate about sustainable technology.",
    location: "Los Angeles, CA",
    company: "GreenGrid",
    companyId: "c6",
    email: "david@greengrid.energy",
    website: "https://greengrid.energy",
    linkedin: "https://linkedin.com/in/davidokafor",
    twitter: "https://twitter.com/david_greengrid",
    industries: ["climate", "deep-tech", "enterprise"],
    foundedCompanies: ["GreenGrid"],
    tags: ["climate-tech", "ex-tesla", "impact"],
    leadScore: 73,
    leadTemp: "warm",
    createdAt: new Date("2024-05-08"),
    updatedAt: new Date("2025-06-28"),
  },
  {
    id: "p7",
    name: "Lisa Wang",
    title: "Partner",
    roles: ["vc", "investor"],
    bio: "Partner at Apex Ventures. Leads investments in edtech and consumer. Former Andreessen Horowitz associate. Wharton MBA. Published author on startup ecosystems.",
    location: "Palo Alto, CA",
    company: "Apex Ventures",
    companyId: "c7",
    email: "lisa@apexventures.com",
    website: "https://apexventures.com",
    linkedin: "https://linkedin.com/in/lisawang",
    industries: ["edtech", "consumer", "saas"],
    investmentRange: { min: 1000000, max: 15000000 },
    investmentCount: 35,
    tags: ["edtech-focus", "consumer", "thought-leader"],
    leadScore: 79,
    leadTemp: "warm",
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2025-07-05"),
  },
  {
    id: "p8",
    name: "Ryan Mitchell",
    title: "Co-Founder & CEO",
    roles: ["co-founder", "entrepreneur"],
    bio: "Co-Founder & CEO of HealthPilot, an AI-driven health analytics platform. Former Johnson & Johnson digital health lead. Johns Hopkins biomedical engineering.",
    location: "Chicago, IL",
    company: "HealthPilot",
    companyId: "c8",
    email: "ryan@healthpilot.io",
    website: "https://healthpilot.io",
    linkedin: "https://linkedin.com/in/ryanmitchell",
    industries: ["healthtech", "ai-ml", "biotech"],
    foundedCompanies: ["HealthPilot"],
    tags: ["health-ai", "ex-jnj", "data-driven"],
    leadScore: 71,
    leadTemp: "warm",
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2025-06-22"),
  },
  {
    id: "p9",
    name: "Priya Sharma",
    title: "Managing Director",
    roles: ["vc", "investor"],
    bio: "Managing Director at TechBridge Fund. $500M AUM. Focus on cross-border fintech and emerging markets. Previously at SoftBank Vision Fund.",
    location: "Singapore",
    company: "TechBridge Fund",
    companyId: "c9",
    email: "priya@techbridgefund.com",
    website: "https://techbridgefund.com",
    linkedin: "https://linkedin.com/in/priyasharma",
    industries: ["fintech", "e-commerce", "saas"],
    investmentRange: { min: 5000000, max: 50000000 },
    investmentCount: 22,
    tags: ["growth-stage", "emerging-markets", "ex-softbank"],
    leadScore: 87,
    leadTemp: "hot",
    createdAt: new Date("2024-03-18"),
    updatedAt: new Date("2025-07-08"),
  },
  {
    id: "p10",
    name: "Alex Turner",
    title: "Founder",
    roles: ["founder", "entrepreneur"],
    bio: "Founder of RoboFarm, applying autonomous robotics to agriculture. Ex-Boston Dynamics engineer. Carnegie Mellon Robotics Institute PhD.",
    location: "Pittsburgh, PA",
    company: "RoboFarm",
    companyId: "c10",
    email: "alex@robofarm.tech",
    website: "https://robofarm.tech",
    linkedin: "https://linkedin.com/in/alexturner",
    twitter: "https://twitter.com/alex_robofarm",
    industries: ["robotics", "climate", "deep-tech"],
    foundedCompanies: ["RoboFarm"],
    tags: ["robotics", "agritech", "phd", "ex-boston-dynamics"],
    leadScore: 68,
    leadTemp: "warm",
    createdAt: new Date("2024-07-01"),
    updatedAt: new Date("2025-06-18"),
  },
  {
    id: "p11",
    name: "Nina Kowalski",
    title: "Principal",
    roles: ["vc", "investor"],
    bio: "Principal at Catalyst Ventures. Early-stage specialist in cybersecurity and enterprise software. Former penetration tester and security consultant.",
    location: "Washington, DC",
    company: "Catalyst Ventures",
    companyId: "c11",
    email: "nina@catalystvc.com",
    industries: ["cybersecurity", "enterprise", "saas"],
    investmentRange: { min: 250000, max: 5000000 },
    investmentCount: 18,
    tags: ["cybersecurity", "pre-seed", "seed", "technical-investor"],
    leadScore: 74,
    leadTemp: "warm",
    createdAt: new Date("2024-04-22"),
    updatedAt: new Date("2025-05-15"),
  },
  {
    id: "p12",
    name: "Tom Nakamura",
    title: "CEO & Co-Founder",
    roles: ["co-founder", "entrepreneur"],
    bio: "CEO & Co-Founder of EduSpark, a personalized AI tutoring platform serving 2M+ students. Y Combinator W23. Previously head of engineering at Coursera.",
    location: "San Francisco, CA",
    company: "EduSpark",
    companyId: "c12",
    email: "tom@eduspark.com",
    website: "https://eduspark.com",
    linkedin: "https://linkedin.com/in/tomnakamura",
    industries: ["edtech", "ai-ml", "consumer"],
    foundedCompanies: ["EduSpark"],
    tags: ["yc-alumni", "ex-coursera", "ai-education"],
    leadScore: 82,
    leadTemp: "hot",
    createdAt: new Date("2024-05-30"),
    updatedAt: new Date("2025-07-12"),
  },
];

// ---- Companies ----

export const mockCompanies: Company[] = [
  {
    id: "c1",
    name: "Horizon Ventures",
    tagline: "Investing in the builders of tomorrow",
    description: "Horizon Ventures is a leading early-stage venture capital firm based in San Francisco, managing $2B in assets. We invest in visionary founders building transformative technology in AI, fintech, and deep tech.",
    type: "vc-firm",
    stage: "growth",
    industries: ["ai-ml", "fintech", "deep-tech"],
    location: "San Francisco, CA",
    foundedYear: 2012,
    website: "https://horizonvc.com",
    teamSize: 45,
    totalFunding: 2000000000,
    fundingRounds: [],
    founders: ["p1"],
    activities: [],
    tags: ["top-vc", "early-stage", "ai-focus"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2025-07-01"),
  },
  {
    id: "c2",
    name: "NeuralFlow",
    tagline: "Democratizing AI for every business",
    description: "NeuralFlow provides enterprise-grade AI infrastructure that enables companies to build, deploy, and manage AI models 10x faster. Our no-code AI platform serves 500+ enterprise customers worldwide.",
    type: "startup",
    stage: "series-b",
    industries: ["ai-ml", "saas", "enterprise"],
    location: "New York, NY",
    foundedYear: 2021,
    website: "https://neuralflow.ai",
    teamSize: 120,
    totalFunding: 65000000,
    fundingRounds: [
      { id: "fr1", companyId: "c2", stage: "seed", amount: 3000000, date: new Date("2021-06-01"), leadInvestor: "Y Combinator", investors: ["Y Combinator", "SV Angel"], source: "Crunchbase" },
      { id: "fr2", companyId: "c2", stage: "series-a", amount: 18000000, date: new Date("2022-09-15"), leadInvestor: "Horizon Ventures", investors: ["Horizon Ventures", "Khosla Ventures"], valuation: 90000000, source: "TechCrunch" },
      { id: "fr3", companyId: "c2", stage: "series-b", amount: 44000000, date: new Date("2024-03-20"), leadInvestor: "Sequoia Capital", investors: ["Sequoia Capital", "Horizon Ventures", "Tiger Global"], valuation: 350000000, source: "SEC Filing" },
    ],
    founders: ["p2"],
    activities: [],
    tags: ["high-growth", "ai-infrastructure", "enterprise"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2025-07-05"),
  },
  {
    id: "c3",
    name: "BlueShift Capital",
    tagline: "Healthcare innovation, funded",
    description: "BlueShift Capital is a venture capital firm specializing in healthcare and life sciences. $800M AUM across three funds. Portfolio includes 4 unicorns and 2 successful IPOs.",
    type: "vc-firm",
    stage: "growth",
    industries: ["healthtech", "biotech", "ai-ml"],
    location: "Boston, MA",
    foundedYear: 2015,
    website: "https://blueshiftcap.com",
    teamSize: 32,
    totalFunding: 800000000,
    fundingRounds: [],
    founders: ["p3"],
    activities: [],
    tags: ["healthcare-vc", "life-sciences", "impact"],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2025-06-20"),
  },
  {
    id: "c4",
    name: "CryptoVault",
    tagline: "Enterprise-grade digital asset security",
    description: "CryptoVault provides institutional-grade custody and security solutions for digital assets. Our zero-trust architecture protects over $5B in assets for banks, hedge funds, and enterprises.",
    type: "startup",
    stage: "series-a",
    industries: ["web3", "cybersecurity", "fintech"],
    location: "Austin, TX",
    foundedYear: 2022,
    website: "https://cryptovault.io",
    teamSize: 55,
    totalFunding: 22000000,
    fundingRounds: [
      { id: "fr4", companyId: "c4", stage: "seed", amount: 5000000, date: new Date("2022-11-01"), leadInvestor: "a16z crypto", investors: ["a16z crypto", "Paradigm"], source: "CoinDesk" },
      { id: "fr5", companyId: "c4", stage: "series-a", amount: 17000000, date: new Date("2024-01-10"), leadInvestor: "Paradigm", investors: ["Paradigm", "Coinbase Ventures", "Galaxy Digital"], valuation: 120000000, source: "SEC Filing" },
    ],
    founders: ["p4"],
    activities: [],
    tags: ["crypto-security", "institutional", "b2b"],
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2025-07-02"),
  },
  {
    id: "c6",
    name: "GreenGrid",
    tagline: "Powering the clean energy transition",
    description: "GreenGrid's AI-powered platform optimizes renewable energy distribution for utility companies and large enterprises. Reducing energy waste by 35% on average across our customer base.",
    type: "startup",
    stage: "seed",
    industries: ["climate", "deep-tech", "enterprise"],
    location: "Los Angeles, CA",
    foundedYear: 2023,
    website: "https://greengrid.energy",
    teamSize: 18,
    totalFunding: 4500000,
    fundingRounds: [
      { id: "fr6", companyId: "c6", stage: "seed", amount: 4500000, date: new Date("2024-06-01"), leadInvestor: "Lowercarbon Capital", investors: ["Lowercarbon Capital", "Breakthrough Energy Ventures"], source: "CleanTechnica" },
    ],
    founders: ["p6"],
    activities: [],
    tags: ["climate-tech", "clean-energy", "ai-optimization"],
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2025-06-30"),
  },
  {
    id: "c8",
    name: "HealthPilot",
    tagline: "AI co-pilot for healthcare providers",
    description: "HealthPilot uses advanced AI to analyze patient data and provide real-time clinical decision support. Serving 200+ hospitals across the US with an average 23% improvement in diagnostic accuracy.",
    type: "startup",
    stage: "series-a",
    industries: ["healthtech", "ai-ml", "biotech"],
    location: "Chicago, IL",
    foundedYear: 2022,
    website: "https://healthpilot.io",
    teamSize: 75,
    totalFunding: 28000000,
    fundingRounds: [
      { id: "fr7", companyId: "c8", stage: "seed", amount: 6000000, date: new Date("2022-12-01"), leadInvestor: "BlueShift Capital", investors: ["BlueShift Capital", "GV"], source: "MedTech Dive" },
      { id: "fr8", companyId: "c8", stage: "series-a", amount: 22000000, date: new Date("2024-08-15"), leadInvestor: "General Catalyst", investors: ["General Catalyst", "BlueShift Capital", "a16z Bio"], valuation: 180000000, source: "TechCrunch" },
    ],
    founders: ["p8"],
    activities: [],
    tags: ["health-ai", "clinical-decision", "b2b-healthcare"],
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2025-07-08"),
  },
  {
    id: "c10",
    name: "RoboFarm",
    tagline: "Autonomous robotics for modern agriculture",
    description: "RoboFarm develops autonomous robots for precision agriculture. Our fleet of solar-powered bots can plant, monitor, and harvest crops with 90% less labor and 40% less water usage.",
    type: "startup",
    stage: "seed",
    industries: ["robotics", "climate", "deep-tech"],
    location: "Pittsburgh, PA",
    foundedYear: 2023,
    website: "https://robofarm.tech",
    teamSize: 22,
    totalFunding: 7500000,
    fundingRounds: [
      { id: "fr9", companyId: "c10", stage: "seed", amount: 7500000, date: new Date("2024-09-01"), leadInvestor: "Khosla Ventures", investors: ["Khosla Ventures", "AgFunder", "Lux Capital"], source: "AgFunder News" },
    ],
    founders: ["p10"],
    activities: [],
    tags: ["agritech", "autonomous", "sustainability"],
    createdAt: new Date("2024-07-01"),
    updatedAt: new Date("2025-06-25"),
  },
  {
    id: "c12",
    name: "EduSpark",
    tagline: "Personalized AI tutoring for every student",
    description: "EduSpark's AI tutoring platform adapts to each student's learning style and pace. Serving 2M+ students across 50 countries with proven 40% improvement in learning outcomes.",
    type: "startup",
    stage: "series-a",
    industries: ["edtech", "ai-ml", "consumer"],
    location: "San Francisco, CA",
    foundedYear: 2023,
    website: "https://eduspark.com",
    teamSize: 65,
    totalFunding: 19000000,
    fundingRounds: [
      { id: "fr10", companyId: "c12", stage: "pre-seed", amount: 1500000, date: new Date("2023-01-15"), leadInvestor: "Y Combinator", investors: ["Y Combinator"], source: "YC Blog" },
      { id: "fr11", companyId: "c12", stage: "seed", amount: 5500000, date: new Date("2023-09-01"), leadInvestor: "Reach Capital", investors: ["Reach Capital", "Owl Ventures"], source: "EdSurge" },
      { id: "fr12", companyId: "c12", stage: "series-a", amount: 12000000, date: new Date("2025-02-20"), leadInvestor: "Apex Ventures", investors: ["Apex Ventures", "Reach Capital", "GSV Ventures"], valuation: 95000000, source: "TechCrunch" },
    ],
    founders: ["p12"],
    activities: [],
    tags: ["yc-alumni", "ai-education", "consumer-edtech"],
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2025-07-12"),
  },
];

// ---- Activity Events ----

export const mockActivities: ActivityEvent[] = [
  { id: "a1", entityId: "c2", entityType: "company", type: "funding-round", title: "NeuralFlow raises $44M Series B", description: "Sequoia Capital leads $44M Series B for NeuralFlow, valuing the AI infrastructure startup at $350M.", url: "https://techcrunch.com", date: new Date("2024-03-20"), source: "TechCrunch" },
  { id: "a2", entityId: "c2", entityType: "company", type: "product-launch", title: "NeuralFlow launches AutoML 3.0", description: "New version features one-click model deployment and real-time monitoring dashboard.", date: new Date("2025-05-15"), source: "Product Hunt" },
  { id: "a3", entityId: "c8", entityType: "company", type: "news-mention", title: "HealthPilot featured in Forbes Health AI list", description: "Named one of the top 20 AI companies transforming healthcare in 2025.", url: "https://forbes.com", date: new Date("2025-04-10"), source: "Forbes" },
  { id: "a4", entityId: "c6", entityType: "company", type: "partnership", title: "GreenGrid partners with Southern California Edison", description: "Major utility partnership to optimize renewable energy distribution across SoCal region.", date: new Date("2025-06-01"), source: "CleanTechnica" },
  { id: "a5", entityId: "c4", entityType: "company", type: "hire", title: "CryptoVault hires ex-Coinbase CISO", description: "Major security hire signals expansion into institutional custody services.", date: new Date("2025-05-20"), source: "CoinDesk" },
  { id: "a6", entityId: "c12", entityType: "company", type: "award", title: "EduSpark wins EdTech Breakthrough Award", description: "Named Best AI Learning Solution of 2025 by EdTech Breakthrough.", date: new Date("2025-03-15"), source: "EdTech Breakthrough" },
  { id: "a7", entityId: "p1", entityType: "person", type: "blog-post", title: "Sarah Chen publishes AI investment thesis", description: "Comprehensive analysis of the next wave of AI infrastructure investments and emerging opportunities.", date: new Date("2025-06-28"), source: "Medium" },
  { id: "a8", entityId: "c10", entityType: "company", type: "product-launch", title: "RoboFarm launches HarvestBot v2", description: "Next-generation autonomous harvesting robot with 3x speed improvement and new crop support.", date: new Date("2025-06-15"), source: "Product Hunt" },
  { id: "a9", entityId: "c2", entityType: "company", type: "hire", title: "NeuralFlow expands with 30 new AI researchers", description: "Major hiring push to scale research team, including 5 former Google DeepMind engineers.", date: new Date("2025-07-01"), source: "LinkedIn" },
  { id: "a10", entityId: "p9", entityType: "person", type: "news-mention", title: "Priya Sharma on Bloomberg: FinTech outlook 2025", description: "Featured interview discussing emerging fintech trends and cross-border investment opportunities.", date: new Date("2025-06-20"), source: "Bloomberg" },
];

// ---- Dashboard Metrics ----

export const mockDashboardMetrics: DashboardMetrics = {
  totalLeads: 1247,
  totalLeadsChange: 12.5,
  matchRate: 68,
  matchRateChange: 5.2,
  outreachSent: 342,
  outreachSentChange: 23.1,
  responseRate: 34,
  responseRateChange: -2.3,
};

// ---- Trend Data ----

export const mockFundingTrends: TrendDataPoint[] = [
  { date: "Jan", value: 12400000000, label: "$12.4B" },
  { date: "Feb", value: 15200000000, label: "$15.2B" },
  { date: "Mar", value: 18700000000, label: "$18.7B" },
  { date: "Apr", value: 14300000000, label: "$14.3B" },
  { date: "May", value: 21500000000, label: "$21.5B" },
  { date: "Jun", value: 19800000000, label: "$19.8B" },
  { date: "Jul", value: 24100000000, label: "$24.1B" },
];

export const mockDealFlow: TrendDataPoint[] = [
  { date: "Jan", value: 342 },
  { date: "Feb", value: 398 },
  { date: "Mar", value: 456 },
  { date: "Apr", value: 389 },
  { date: "May", value: 512 },
  { date: "Jun", value: 478 },
  { date: "Jul", value: 534 },
];

export const mockIndustryDistribution = [
  { name: "AI & ML", value: 35, color: "#8b5cf6" },
  { name: "FinTech", value: 22, color: "#06b6d4" },
  { name: "HealthTech", value: 18, color: "#10b981" },
  { name: "Climate", value: 12, color: "#22c55e" },
  { name: "SaaS", value: 8, color: "#3b82f6" },
  { name: "Other", value: 5, color: "#64748b" },
];

// ---- Search Helpers ----

export function searchPeople(query: string, filters?: Partial<{ roles: string[]; industries: string[]; locations: string[] }>): Person[] {
  let results = mockPeople;
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.bio.toLowerCase().includes(q) ||
        p.industries.some((i) => i.includes(q)) ||
        p.tags.some((t) => t.includes(q))
    );
  }
  if (filters?.roles?.length) {
    results = results.filter((p) => p.roles.some((r) => filters.roles!.includes(r)));
  }
  if (filters?.industries?.length) {
    results = results.filter((p) => p.industries.some((i) => filters.industries!.includes(i)));
  }
  return results;
}

export function searchCompanies(query: string, filters?: Partial<{ stages: string[]; industries: string[]; types: string[] }>): Company[] {
  let results = mockCompanies;
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.industries.some((i) => i.includes(q)) ||
        c.tags.some((t) => t.includes(q))
    );
  }
  if (filters?.stages?.length) {
    results = results.filter((c) => filters.stages!.includes(c.stage));
  }
  if (filters?.industries?.length) {
    results = results.filter((c) => c.industries.some((i) => filters.industries!.includes(i)));
  }
  return results;
}

export function getPersonById(id: string): Person | undefined {
  return mockPeople.find((p) => p.id === id);
}

export function getCompanyById(id: string): Company | undefined {
  return mockCompanies.find((c) => c.id === id);
}

export function getActivitiesForEntity(entityId: string): ActivityEvent[] {
  return mockActivities.filter((a) => a.entityId === entityId);
}

export function getAllSearchResults(query: string): SearchResult[] {
  const people = searchPeople(query).map((p) => ({
    type: "person" as const,
    person: p,
    matchScore: p.leadScore || 50,
    highlights: [p.title, p.company],
  }));
  const companies = searchCompanies(query).map((c) => ({
    type: "company" as const,
    company: c,
    matchScore: 70,
    highlights: [c.tagline, c.location],
  }));
  return [...people, ...companies].sort((a, b) => b.matchScore - a.matchScore);
}
