"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Users,
  Search,
  Building2,
  MapPin,
  TrendingUp,
  Mail,
  Link as LinkIcon
} from "lucide-react";
import { mockPeople } from "@/lib/mock-data";
import { ROLE_LABELS, PersonRole, Person } from "@/types";
import { cn, getInitials } from "@/lib/utils";

type FilterTab = "all" | "investor" | "founder" | "vc" | "angel";

export default function PeopleDirectoryPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [people, setPeople] = useState<Person[]>(mockPeople);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPeople() {
      setLoading(true);
      try {
        const res = await fetch("/api/data/real-time");
        const json = await res.json();
        if (json.success && json.data) {
          const founders = (json.data.liveFounders || []).map((f: any) => ({
            id: f.id,
            name: f.name,
            title: f.title,
            company: f.company,
            location: f.location,
            roles: ["founder" as PersonRole],
            leadScore: f.leadScore || 90,
            avatar: f.avatar,
            linkedin: f.linkedin,
            email: f.email,
            industries: f.industries || ["AI"],
            createdAt: new Date(),
            updatedAt: new Date()
          }));

          const investors = (json.data.liveInvestors || []).map((i: any) => ({
            id: i.id,
            name: i.name,
            title: i.title,
            company: i.company,
            location: i.location,
            roles: ["investor" as PersonRole, "vc" as PersonRole],
            leadScore: i.matchScore || 88,
            avatar: i.avatar,
            linkedin: i.linkedin,
            email: i.email,
            industries: i.industries || ["Venture Capital"],
            createdAt: new Date(),
            updatedAt: new Date()
          }));

          const combined = [...founders, ...investors];
          if (combined.length > 0) {
            setPeople(combined as any);
          }
        }
      } catch (err) {
        console.error("Error fetching live people:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPeople();
  }, []);

  const filteredPeople = people.filter((person) => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          person.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && person.roles.includes(activeTab as PersonRole);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium border border-violet-500/20 mb-2">
              <Users className="w-4 h-4" />
              <span>Network Directory</span>
            </div>
            <h1 className="text-4xl font-bold">People Directory</h1>
            <p className="text-slate-400 max-w-xl">
              Connect with the world's leading investors, visionary founders, and industry experts.
            </p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search people..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12121a] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar border-b border-white/5">
          {(["all", "investor", "founder", "vc", "angel"] as FilterTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2.5 rounded-t-lg text-sm font-medium capitalize transition-all whitespace-nowrap border-b-2",
                activeTab === tab
                  ? "text-violet-400 border-violet-500 bg-violet-500/5"
                  : "text-slate-400 border-transparent hover:text-white hover:bg-white/5"
              )}
            >
              {tab === "all" ? "All People" : ROLE_LABELS[tab as PersonRole] || tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredPeople.map((person) => (
              <motion.div
                key={person.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <Link href={`/dashboard/people/${person.id}`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/10 group-hover:to-cyan-500/10 rounded-2xl transition-all duration-300 pointer-events-none" />
                  <div className="bg-[#12121a] border border-white/5 rounded-2xl p-6 h-full flex flex-col transition-all duration-300 group-hover:border-white/10 group-hover:shadow-2xl group-hover:shadow-violet-500/5">
                    
                    {/* Top Row: Avatar & Score */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-[#0a0a0f] shadow-xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        {person.avatar ? (
                          <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-lg font-bold text-white tracking-wider">
                            {getInitials(person.name)}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      {person.leadScore && (
                        <div className="flex flex-col items-center justify-center bg-black/40 rounded-lg p-2 border border-white/5">
                          <span className="text-xs text-slate-500 font-medium mb-0.5">Score</span>
                          <div className="flex items-center gap-1 text-emerald-400 font-bold">
                            <TrendingUp className="w-3 h-3" />
                            {person.leadScore}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                        {person.name}
                      </h3>
                      <p className="text-sm text-violet-300 font-medium mb-3">
                        {person.title}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Building2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{person.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{person.location}</span>
                        </div>
                        {person.email && (
                          <div className="flex items-center gap-2 text-xs text-violet-400">
                            <Mail className="w-3.5 h-3.5 shrink-0" />
                            <a href={`mailto:${person.email}`} className="hover:underline truncate" onClick={e => e.stopPropagation()}>{person.email}</a>
                          </div>
                        )}
                        {person.linkedin && (
                          <div className="flex items-center gap-2 text-xs text-blue-400">
                            <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline truncate" onClick={e => e.stopPropagation()}>LinkedIn Profile</a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Roles tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {person.roles.slice(0, 2).map((role) => (
                        <span key={role} className="px-2 py-1 bg-white/5 rounded text-[10px] font-medium text-slate-300 border border-white/5">
                          {ROLE_LABELS[role] || role}
                        </span>
                      ))}
                      {person.roles.length > 2 && (
                        <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-medium text-slate-500 border border-white/5">
                          +{person.roles.length - 2}
                        </span>
                      )}
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPeople.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-white mb-2">No people found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}

      </div>
    </div>
  );
}
