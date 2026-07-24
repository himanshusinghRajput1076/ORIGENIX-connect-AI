"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Grid3X3, 
  List, 
  SlidersHorizontal,
  Briefcase,
  MapPin,
  Building2,
  User,
  Users,
  Mail,
  Link as LinkIcon
} from "lucide-react";
import { 
  getAllSearchResults, 
  mockPeople,
  mockCompanies
} from "@/lib/mock-data";
import type { SearchResult } from "@/types";
import { 
  INDUSTRY_LABELS, 
  STAGE_LABELS, 
  ROLE_LABELS, 
  STAGE_COLORS 
} from "@/types";
import { cn, formatCurrency, getInitials } from "@/lib/utils";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "people" | "companies">("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("India");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    async function fetchRealData() {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/data/real-time?query=${debouncedQuery}&location=${selectedLocation}`);
        const json = await res.json();
        
        let formattedData: SearchResult[] = [];
        
        if (json.success && json.data) {
          // Transform Founders
          const founders = (json.data.liveFounders || []).map((f: any) => ({
            type: "person",
            person: {
              id: f.id,
              name: f.name,
              title: f.title,
              company: f.company,
              location: f.location,
              industries: f.industries || ["AI", "Tech"],
              leadScore: f.leadScore || 85,
              roles: ["founder"],
              avatar: f.avatar,
              linkedin: f.linkedin,
              email: f.email
            }
          }));

          // Transform Investors
          const investors = (json.data.liveInvestors || []).map((i: any) => ({
            type: "person",
            person: {
              id: i.id,
              name: i.name,
              title: i.title,
              company: i.company,
              location: i.location,
              industries: i.industries || ["VC", "Investments"],
              leadScore: i.matchScore || 90,
              roles: ["investor"],
              avatar: i.avatar,
              linkedin: i.linkedin,
              email: i.email
            }
          }));

          // Transform Startups / Companies
          const companies = (json.data.liveStartups || []).map((s: any) => ({
            type: "company",
            company: {
              id: s.id,
              name: s.name,
              tagline: s.description || "Next-generation tech startup",
              stage: "seed",
              location: "Bengaluru, KA, India",
              industries: [s.language || "TypeScript", "AI"],
              totalFunding: 1500000,
              teamSize: 12,
              logo: ""
            }
          }));

          formattedData = [...founders, ...investors, ...companies];
        }

        // Fallback to local catalog if real-time API returned no results
        if (formattedData.length === 0) {
          formattedData = getAllSearchResults(debouncedQuery);
        }

        // Apply type filters
        if (activeFilter === "people") {
          formattedData = formattedData.filter(d => d.type === "person");
        } else if (activeFilter === "companies") {
          formattedData = formattedData.filter(d => d.type === "company");
        }

        // Filter by search query if provided
        if (debouncedQuery.trim()) {
          const q = debouncedQuery.toLowerCase();
          formattedData = formattedData.filter(d => {
            if (d.type === "person" && d.person) {
              return (
                d.person.name.toLowerCase().includes(q) ||
                d.person.title.toLowerCase().includes(q) ||
                d.person.company.toLowerCase().includes(q) ||
                d.person.industries.some(i => i.toLowerCase().includes(q))
              );
            } else if (d.type === "company" && d.company) {
              return (
                d.company.name.toLowerCase().includes(q) ||
                d.company.tagline.toLowerCase().includes(q) ||
                d.company.industries.some(i => i.toLowerCase().includes(q))
              );
            }
            return false;
          });
        }

        setResults(formattedData);
      } catch (error) {
        console.error("Error fetching real data, using local catalog:", error);
        let fallback = getAllSearchResults(debouncedQuery);
        if (activeFilter === "people") fallback = fallback.filter(d => d.type === "person");
        if (activeFilter === "companies") fallback = fallback.filter(d => d.type === "company");
        setResults(fallback);
      } finally {
        setIsSearching(false);
      }
    }

    fetchRealData();
  }, [debouncedQuery, activeFilter, selectedLocation]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Search Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
            Global Search
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Discover investors, founders, and startups across our network.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative group max-w-3xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-2xl blur-xl transition-all group-hover:blur-2xl" />
          <div className="relative flex items-center bg-[#12121a] border border-white/10 rounded-2xl p-2 shadow-2xl">
            <div className="pl-4 pr-2 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search investors, founders, startups..."
              className="flex-1 bg-transparent border-none outline-none text-xl p-3 placeholder:text-slate-500 text-white"
            />
            <div className="pr-3 flex gap-2">
              <button className="bg-white/5 hover:bg-white/10 text-slate-300 p-2 rounded-xl transition-colors">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-b border-white/5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
            {["all", "people", "companies"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium capitalize transition-all whitespace-nowrap",
                  activeFilter === filter
                    ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {filter}
              </button>
            ))}
            <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />
            
            {/* Filter Dropdowns (Visual representation) */}
            <select className="bg-[#12121a] border border-white/10 text-slate-300 text-sm rounded-full px-4 py-2 outline-none hover:border-violet-500/50 transition-colors appearance-none cursor-pointer hidden md:block">
              <option>Role</option>
              <option>Investor</option>
              <option>Founder</option>
              <option>VC</option>
            </select>
            <select className="bg-[#12121a] border border-white/10 text-slate-300 text-sm rounded-full px-4 py-2 outline-none hover:border-violet-500/50 transition-colors appearance-none cursor-pointer hidden md:block">
              <option>Industry</option>
              <option>AI & ML</option>
              <option>FinTech</option>
              <option>BioTech</option>
            </select>
            <select className="bg-[#12121a] border border-white/10 text-slate-300 text-sm rounded-full px-4 py-2 outline-none hover:border-violet-500/50 transition-colors appearance-none cursor-pointer hidden md:block">
              <option>Stage</option>
              <option>Seed</option>
              <option>Series A</option>
              <option>Growth</option>
            </select>
            <select 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-[#12121a] border border-cyan-500/40 text-cyan-400 text-sm font-semibold rounded-full px-4 py-2 outline-none hover:border-cyan-400 transition-colors cursor-pointer"
            >
              <option value="India">🇮🇳 Target: India (Default)</option>
              <option value="Bengaluru">Bengaluru, KA, India</option>
              <option value="Mumbai">Mumbai, MH, India</option>
              <option value="Delhi NCR">Delhi NCR, India</option>
              <option value="Hyderabad">Hyderabad, TS, India</option>
              <option value="Pune">Pune, MH, India</option>
              <option value="all">Global (All Locations)</option>
            </select>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-6 text-sm text-slate-400 mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 hidden sm:inline">Sort:</span>
              <select className="bg-transparent text-slate-300 border-none outline-none font-medium cursor-pointer">
                <option>Relevance</option>
                <option>Score</option>
                <option>Funding</option>
                <option>Recent</option>
              </select>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div>
              <span className="text-white font-medium">{results.length}</span> results
            </div>
            <div className="flex items-center gap-2 bg-[#12121a] p-1 rounded-lg border border-white/5">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-md transition-all",
                  viewMode === "grid" ? "bg-white/10 text-white shadow" : "hover:text-white"
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded-md transition-all",
                  viewMode === "list" ? "bg-white/10 text-white shadow" : "hover:text-white"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="min-h-[400px]">
          {isSearching ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-violet-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          ) : results.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className={cn(
                "grid gap-6",
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              )}
            >
              {results.map((result, i) => (
                <motion.div
                  key={`${result.type}-${result.person?.id || result.company?.id}-${i}`}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={cn(
                    "bg-[#12121a]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 group cursor-pointer",
                    viewMode === "list" && "flex items-center gap-6"
                  )}
                >
                  {result.type === "person" && result.person && (
                    <>
                      <div className={cn("flex", viewMode === "list" ? "flex-row items-center gap-4 w-1/3" : "flex-col mb-4 gap-4")}>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-xl font-bold shadow-lg shrink-0 border-2 border-[#12121a] group-hover:border-violet-500/50 transition-all">
                          {result.person.avatar ? (
                            <img src={result.person.avatar} alt={result.person.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            getInitials(result.person.name)
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {result.person.name}
                          </h3>
                          <p className="text-slate-400 text-sm">{result.person.title}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                            <Building2 className="w-3 h-3" />
                            {result.person.company}
                          </div>
                          
                          {/* Real Contact Data */}
                          {(result.person as any).email && (
                            <div className="flex items-center gap-3 mt-2">
                              <a href={`mailto:${(result.person as any).email}`} className="text-violet-400 hover:text-cyan-400 transition-colors flex items-center gap-1 text-xs" onClick={(e) => e.stopPropagation()}>
                                <Mail className="w-3.5 h-3.5" /> {(result.person as any).email}
                              </a>
                              {(result.person as any).linkedin && (
                                <a href={(result.person as any).linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-cyan-400 transition-colors flex items-center gap-1 text-xs" onClick={(e) => e.stopPropagation()}>
                                  <LinkIcon className="w-3.5 h-3.5" /> LinkedIn
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className={cn(viewMode === "list" ? "flex-1 flex gap-4" : "space-y-4")}>
                        <div className={cn("flex flex-wrap gap-2", viewMode === "list" && "w-1/3")}>
                          {result.person.roles.map((role: string) => (
                            <span key={role} className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-slate-300 border border-white/5">
                              {(ROLE_LABELS as Record<string, string>)[role] || role}
                            </span>
                          ))}
                        </div>
                        
                        <div className={cn("flex flex-wrap gap-2", viewMode === "list" && "w-1/3")}>
                          {result.person.industries.slice(0, 3).map((ind: string) => (
                            <span key={ind} className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-md bg-violet-500/10 text-violet-400">
                              {(INDUSTRY_LABELS as Record<string, string>)[ind] || ind}
                            </span>
                          ))}
                          {result.person.industries.length > 3 && (
                            <span className="px-2 py-1 text-[10px] rounded-md bg-white/5 text-slate-400">
                              +{result.person.industries.length - 3}
                            </span>
                          )}
                        </div>
                        
                        <div className={cn("flex items-center gap-1 text-xs text-slate-400", viewMode === "list" && "w-1/4 justify-end")}>
                          <MapPin className="w-3.5 h-3.5" />
                          {result.person.location}
                        </div>
                      </div>
                    </>
                  )}

                  {result.type === "company" && result.company && (
                    <>
                      <div className={cn("flex", viewMode === "list" ? "flex-row items-center gap-4 w-1/3" : "flex-col mb-4 gap-4")}>
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-xl font-bold shadow-lg shrink-0 border border-white/10 group-hover:border-cyan-500/50 transition-all">
                          {result.company.logo ? (
                            <img src={result.company.logo} alt={result.company.name} className="w-full h-full rounded-2xl object-cover" />
                          ) : (
                            getInitials(result.company.name)
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                            {result.company.name}
                          </h3>
                          <p className="text-slate-400 text-xs mt-1 line-clamp-1">{result.company.tagline}</p>
                        </div>
                      </div>

                      <div className={cn(viewMode === "list" ? "flex-1 flex items-center gap-4" : "space-y-4")}>
                        <div className={cn("flex items-center gap-3 text-sm", viewMode === "list" && "w-1/3")}>
                          <span 
                            className="px-2 py-1 rounded text-xs font-semibold"
                            style={{ 
                              backgroundColor: `${STAGE_COLORS[result.company.stage]}20`,
                              color: STAGE_COLORS[result.company.stage] 
                            }}
                          >
                            {STAGE_LABELS[result.company.stage] || result.company.stage}
                          </span>
                        </div>

                        <div className={cn("flex items-center justify-between text-xs text-slate-400 bg-black/20 p-2 rounded-lg", viewMode === "list" && "w-1/3")}>
                          <div className="flex flex-col">
                            <span className="text-slate-500 mb-0.5">Funding</span>
                            <span className="text-white font-medium">{formatCurrency(result.company.totalFunding)}</span>
                          </div>
                          <div className="w-px h-6 bg-white/10" />
                          <div className="flex flex-col items-end">
                            <span className="text-slate-500 mb-0.5">Team</span>
                            <span className="text-white font-medium flex items-center gap-1">
                              <Users className="w-3 h-3" /> {result.company.teamSize}
                            </span>
                          </div>
                        </div>

                        <div className={cn("flex items-center justify-between", viewMode === "list" && "w-1/3 justify-end gap-4")}>
                           <div className="flex flex-wrap gap-1">
                            {result.company.industries.slice(0, 2).map((ind: string) => (
                              <span key={ind} className="px-1.5 py-0.5 text-[10px] rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                {(INDUSTRY_LABELS as Record<string, string>)[ind] || ind}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="w-3 h-3" />
                            {result.company.location.split(",")[0]}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                <Search className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-xl font-medium text-white">No results found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
