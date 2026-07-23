"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Building2, ExternalLink, Mail, Activity, RefreshCw } from "lucide-react";
import { INDUSTRIES_LIST, LOCATIONS_LIST, LiveInvestorData } from "@origenix/shared";
import { formatCurrency } from "@/lib/utils";

export default function InvestorsSearchPage() {
  const [query, setQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("India");
  const [investors, setInvestors] = useState<LiveInvestorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSynced, setLastSynced] = useState<string>("");

  const loadRealTimeData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/data/real-time?type=investors&location=${encodeURIComponent(selectedLocation)}&industry=${encodeURIComponent(selectedIndustry)}&query=${encodeURIComponent(query)}`);
      const json = await res.json();
      if (json.success && json.data.liveInvestors) {
        setInvestors(json.data.liveInvestors);
        setLastSynced(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error("Failed to load real-time investor signals:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRealTimeData();
  }, [selectedIndustry, selectedLocation]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Live Real-Time Data Pipeline Active
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            💼 Real-Time VC & Angel Investor Search
          </h1>
          <p className="mt-1 text-zinc-400">
            Discover active venture capital partners and angel syndicates across 100+ categories.
          </p>
        </div>
        <button
          onClick={loadRealTimeData}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#12121a] px-4 py-2 text-xs font-semibold text-zinc-300 hover:border-violet-500 hover:text-white transition-all disabled:opacity-50"
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin text-violet-400" : "text-violet-400"} />
          {isLoading ? "Syncing..." : "Sync Live Signals"}
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-[#12121a] p-4 backdrop-blur-xl">
        <div className="relative col-span-1">
          <Search className="absolute left-3.5 top-3 text-zinc-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Search investor name or VC firm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none transition-colors"
          />
        </div>
        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#12121a] px-4 py-2 text-sm text-zinc-300 focus:border-violet-500 focus:outline-none transition-colors cursor-pointer"
        >
          <option value="all">All Industries (100+)</option>
          {INDUSTRIES_LIST.map((ind) => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="rounded-xl border border-cyan-500/40 bg-[#12121a] px-4 py-2 text-sm font-semibold text-cyan-400 focus:border-cyan-400 focus:outline-none transition-colors cursor-pointer"
        >
          <option value="India">🇮🇳 Target: India (Default)</option>
          {LOCATIONS_LIST.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Investor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investors.map((investor) => (
          <motion.div
            key={investor.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-[#12121a] p-6 backdrop-blur-xl hover:border-violet-500/40 transition-all shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img src={investor.avatar} alt={investor.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-violet-500/30" />
                  <div>
                    <h3 className="font-bold text-white text-base">{investor.name}</h3>
                    <p className="text-xs text-cyan-400 font-medium">{investor.title}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {investor.matchScore}% Match
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-400 mb-3">
                <div className="flex items-center gap-1.5 text-zinc-200 font-medium">
                  <Building2 size={13} className="text-zinc-500" /> {investor.company}
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <MapPin size={13} className="text-zinc-500" /> {investor.location}
                </div>
              </div>

              {investor.bio && (
                <p className="text-xs text-zinc-400 line-clamp-3 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                  {investor.bio}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <a href={investor.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                LinkedIn Profile <ExternalLink size={12} />
              </a>
              <a href="/dashboard/outreach" className="rounded-xl bg-violet-600/20 text-violet-300 hover:bg-violet-600 hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1">
                <Mail size={12} /> Outreach
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
