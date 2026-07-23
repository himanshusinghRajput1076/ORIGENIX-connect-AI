"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Building2, User, ExternalLink, Mail, Sparkles } from "lucide-react";
import { mockPeople } from "@/lib/mock-data";
import { INDUSTRIES_LIST, LOCATIONS_LIST } from "@origenix/shared";
import { cn } from "@/lib/utils";

export default function FoundersSearchPage() {
  const [query, setQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("India");

  const founders = mockPeople.filter(p => p.roles.includes("founder") || p.roles.includes("co-founder") || p.roles.includes("entrepreneur"));

  const filteredFounders = founders.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.company.toLowerCase().includes(query.toLowerCase()) || p.bio.toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = selectedIndustry === "all" || p.industries.some(i => i.toLowerCase().includes(selectedIndustry.toLowerCase()));
    const matchesLocation = selectedLocation === "all" || p.location.toLowerCase().includes(selectedLocation.toLowerCase()) || selectedLocation === "India";
    return matchesQuery && matchesIndustry && matchesLocation;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          👨‍💼 Founder & Co-Founder Search
        </h1>
        <p className="mt-1 text-zinc-400">
          Discover visionary founders, CEOs, and technical co-founders building high-growth startups.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-[#12121a] p-4 backdrop-blur-xl">
        <div className="relative col-span-1 sm:col-span-1">
          <Search className="absolute left-3.5 top-3 text-zinc-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Search founder name or startup..."
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
          <option value="all">All Sectors (100+)</option>
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

      {/* Founders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFounders.map((founder) => (
          <motion.div
            key={founder.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-[#12121a] p-6 backdrop-blur-xl hover:border-cyan-500/40 transition-all shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img src={founder.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} alt={founder.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-cyan-500/30" />
                  <div>
                    <h3 className="font-bold text-white text-base">{founder.name}</h3>
                    <p className="text-xs text-cyan-400 font-medium">{founder.title}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  {founder.leadScore}% Lead Score
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-400 mb-3">
                <div className="flex items-center gap-1.5 text-zinc-200 font-medium">
                  <Building2 size={13} className="text-zinc-500" /> {founder.company}
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <MapPin size={13} className="text-zinc-500" /> {founder.location}
                </div>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-3 italic bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                "{founder.bio}"
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                LinkedIn Profile <ExternalLink size={12} />
              </a>
              <a href="/dashboard/chat" className="rounded-xl bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600 hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1">
                <Mail size={12} /> Connect Chat
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
