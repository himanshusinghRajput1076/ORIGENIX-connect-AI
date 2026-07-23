"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, MapPin, Users, DollarSign, ArrowUpRight } from "lucide-react";
import { mockCompanies } from "@/lib/mock-data";
import { cn, formatCurrency, getInitials } from "@/lib/utils";

const STAGE_COLORS: Record<string, string> = {
  "pre-seed": "bg-slate-500/10 text-slate-400 border-slate-500/20",
  "seed": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "series-a": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "series-b": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  "growth": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const TABS = ["All", "Startups", "VC Firms", "Accelerators"];

export default function CompaniesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredCompanies = mockCompanies.filter((company) => {
    if (activeTab === "All") return true;
    if (activeTab === "Startups") return company.type === "startup";
    if (activeTab === "VC Firms") return company.type === "vc-firm";
    if (activeTab === "Accelerators") return company.type === "accelerator";
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Startup & Company Directory
        </h1>
        <p className="text-slate-400 mt-2">Discover and connect with top startups and investment firms.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
              activeTab === tab
                ? "bg-white/10 text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company, i) => (
          <Link href={`/dashboard/companies/${company.id}`} key={company.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="h-full relative group rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-lg font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      {getInitials(company.name)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {company.name}
                      </h3>
                      <span
                        className={cn(
                          "inline-block px-2 py-0.5 mt-1 rounded-full text-xs font-medium border uppercase tracking-wider",
                          STAGE_COLORS[company.stage] || "bg-white/10 text-white/70 border-white/20"
                        )}
                      >
                        {company.stage}
                      </span>
                    </div>
                  </div>
                  <div className="text-slate-500 group-hover:text-cyan-400 transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-6 flex-grow line-clamp-2">
                  {company.tagline}
                </p>

                <div className="space-y-3 mb-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span>{company.teamSize} employees</span>
                  </div>
                  {company.totalFunding && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-slate-500" />
                      <span>{formatCurrency(company.totalFunding)} total funding</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/10">
                  {company.industries.map((ind) => (
                    <span
                      key={ind}
                      className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
