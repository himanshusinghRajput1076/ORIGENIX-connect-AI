"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, ThermometerSun, Snowflake, Search, Filter, ChevronRight, UserCircle2 } from "lucide-react";
import { mockPeople } from "@/lib/mock-data";
import { cn, getInitials } from "@/lib/utils";

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
  if (score >= 60) return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
  return "text-slate-400 bg-slate-500/10 border-slate-500/20";
};

const getScoreIcon = (score: number) => {
  if (score >= 80) return <Flame className="w-4 h-4 text-emerald-400" />;
  if (score >= 60) return <ThermometerSun className="w-4 h-4 text-yellow-400" />;
  return <Snowflake className="w-4 h-4 text-slate-400" />;
};

export default function LeadsPage() {
  const sortedLeads = useMemo(() => {
    return [...mockPeople].sort((a, b) => (b.leadScore || 0) - (a.leadScore || 0));
  }, []);

  const hotCount = sortedLeads.filter(p => (p.leadScore || 0) >= 80).length;
  const warmCount = sortedLeads.filter(p => (p.leadScore || 0) >= 60 && (p.leadScore || 0) < 80).length;
  const coldCount = sortedLeads.filter(p => (p.leadScore || 0) < 60).length;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
            AI Lead Scoring
          </h1>
          <p className="text-slate-400 mt-2">Prioritize your outreach based on AI-driven match scores.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-2 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white/5 border border-emerald-500/20 p-6 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -z-10" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium flex items-center gap-2">
              <Flame className="w-5 h-5 text-emerald-400" /> Hot Leads (80+)
            </h3>
          </div>
          <p className="text-4xl font-bold text-white">{hotCount}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white/5 border border-yellow-500/20 p-6 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[40px] -z-10" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium flex items-center gap-2">
              <ThermometerSun className="w-5 h-5 text-yellow-400" /> Warm Leads (60-79)
            </h3>
          </div>
          <p className="text-4xl font-bold text-white">{warmCount}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium flex items-center gap-2">
              <Snowflake className="w-5 h-5 text-slate-400" /> Cold Leads (&lt;60)
            </h3>
          </div>
          <p className="text-4xl font-bold text-white">{coldCount}</p>
        </motion.div>
      </div>

      {/* Main Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden"
      >
        <div className="p-4 border-b border-white/10 flex items-center gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-slate-400 text-sm border-b border-white/10">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Company & Role</th>
                <th className="px-6 py-4 font-medium">AI Score</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Industries</th>
                <th className="px-6 py-4 font-medium hidden lg:table-cell">Location</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedLeads.map((person) => (
                <tr
                  key={person.id}
                  className="hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/people/${person.id}`} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-white text-sm font-medium">
                        {getInitials(person.name)}
                      </div>
                      <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">{person.name}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-300 font-medium">{person.company}</span>
                      <span className="text-slate-500 text-xs">{person.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border",
                        getScoreColor(person.leadScore || 0)
                      )}
                    >
                      {getScoreIcon(person.leadScore || 0)}
                      {person.leadScore}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {person.industries.slice(0, 2).map((ind) => (
                        <span key={ind} className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-white/5 text-slate-400 border border-white/10">
                          {ind}
                        </span>
                      ))}
                      {person.industries.length > 2 && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-500 border border-white/10">
                          +{person.industries.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-sm text-slate-400">
                    {person.location}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/dashboard/people/${person.id}`}>
                      <button className="p-2 rounded-lg text-slate-500 group-hover:text-white group-hover:bg-white/10 transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
