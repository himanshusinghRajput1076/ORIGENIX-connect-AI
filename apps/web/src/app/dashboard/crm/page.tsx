"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Kanban, 
  Plus, 
  Search, 
  Filter, 
  Sparkles, 
  ChevronRight, 
  MoreVertical, 
  Building2, 
  Mail, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  User,
  DollarSign
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface CrmDeal {
  id: string;
  personName: string;
  title: string;
  company: string;
  avatar: string;
  role: string;
  stage: "NEW" | "CONTACTED" | "MEETING_SCHEDULED" | "TERM_SHEET" | "CLOSED_WON";
  leadScore: number;
  temperature: "hot" | "warm" | "cold";
  targetRaise: number;
  lastContacted: string;
  notes: string;
}

const initialDeals: CrmDeal[] = [
  {
    id: "deal_1",
    personName: "Himanshu Singh",
    title: "Founder & Tech Lead",
    company: "Origenix Connect AI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Founder",
    stage: "MEETING_SCHEDULED",
    leadScore: 98,
    temperature: "hot",
    targetRaise: 3500000,
    lastContacted: "Today, 10:30 AM",
    notes: "AI discovery engine demo completed. Interested in Seed syndicate participation.",
  },
  {
    id: "deal_2",
    personName: "Sarah Chen",
    title: "Managing Partner",
    company: "Horizon Ventures",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    role: "VC Investor",
    stage: "TERM_SHEET",
    leadScore: 94,
    temperature: "hot",
    targetRaise: 5000000,
    lastContacted: "Yesterday",
    notes: "Term sheet draft issued for Series A co-investment.",
  },
  {
    id: "deal_3",
    personName: "Marcus Johnson",
    title: "CEO & Founder",
    company: "NeuralFlow",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "Entrepreneur",
    stage: "CONTACTED",
    leadScore: 88,
    temperature: "warm",
    targetRaise: 12000000,
    lastContacted: "Jul 20",
    notes: "Outreach message delivered. Waiting for scheduling link.",
  },
  {
    id: "deal_4",
    personName: "Priya Sharma",
    title: "Managing Director",
    company: "TechBridge Fund",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    role: "VC Investor",
    stage: "NEW",
    leadScore: 87,
    temperature: "hot",
    targetRaise: 10000000,
    lastContacted: "Not contacted",
    notes: "High-value cross-border FinTech investor. AI match score 87%.",
  },
  {
    id: "deal_5",
    personName: "Alex Turner",
    title: "Founder",
    company: "RoboFarm",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    role: "Founder",
    stage: "CLOSED_WON",
    leadScore: 91,
    temperature: "hot",
    targetRaise: 4000000,
    lastContacted: "Jul 15",
    notes: "Closed Seed round successfully.",
  },
];

const crmColumns = [
  { id: "NEW", title: "New Prospects", color: "border-blue-500/30 text-blue-400 bg-blue-500/10" },
  { id: "CONTACTED", title: "Outreach Sent", color: "border-amber-500/30 text-amber-400 bg-amber-500/10" },
  { id: "MEETING_SCHEDULED", title: "Meeting Scheduled", color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10" },
  { id: "TERM_SHEET", title: "Term Sheet", color: "border-violet-500/30 text-violet-400 bg-violet-500/10" },
  { id: "CLOSED_WON", title: "Closed Deal", color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" },
];

export default function CrmPage() {
  const [deals, setDeals] = useState<CrmDeal[]>(initialDeals);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("all");

  const moveDealStage = (dealId: string, direction: "next" | "prev") => {
    const stageOrder: CrmDeal["stage"][] = ["NEW", "CONTACTED", "MEETING_SCHEDULED", "TERM_SHEET", "CLOSED_WON"];
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          const currentIndex = stageOrder.indexOf(deal.stage);
          const newIndex = direction === "next" ? Math.min(currentIndex + 1, stageOrder.length - 1) : Math.max(currentIndex - 1, 0);
          return { ...deal, stage: stageOrder[newIndex] };
        }
        return deal;
      })
    );
  };

  const filteredDeals = deals.filter((deal) =>
    (deal.personName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     deal.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
     deal.role.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedStage === "all" || deal.stage === selectedStage)
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Kanban className="h-8 w-8 text-violet-400" /> CRM Deal Pipeline & Leads
          </h1>
          <p className="mt-1 text-zinc-400">
            Track investor outreach, founder discussions, and term sheet progress.
          </p>
        </div>
        <button
          onClick={() => {
            const newName = prompt("Enter Person / Company Name:");
            if (newName) {
              const newDeal: CrmDeal = {
                id: `deal_${Date.now()}`,
                personName: newName,
                title: "Executive Lead",
                company: "Tech Innovation",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                role: "Founder",
                stage: "NEW",
                leadScore: 82,
                temperature: "hot",
                targetRaise: 2500000,
                lastContacted: "Just created",
                notes: "Newly added lead from search pipeline.",
              };
              setDeals([newDeal, ...deals]);
            }
          }}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:opacity-90 transition-all"
        >
          <Plus size={18} /> Add New Lead
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#12121a] p-4 backdrop-blur-xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 text-zinc-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Filter leads by name, company, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 focus:border-violet-500 focus:outline-none transition-colors cursor-pointer"
          >
            <option value="all">All Stages</option>
            <option value="NEW">New Prospects</option>
            <option value="CONTACTED">Outreach Sent</option>
            <option value="MEETING_SCHEDULED">Meeting Scheduled</option>
            <option value="TERM_SHEET">Term Sheet</option>
            <option value="CLOSED_WON">Closed Deal</option>
          </select>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
        {crmColumns.map((col) => {
          const colDeals = filteredDeals.filter((d) => d.stage === col.id);
          return (
            <div key={col.id} className="rounded-2xl border border-white/5 bg-[#12121a] p-4 flex flex-col min-h-[500px]">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border", col.color)}>
                  {col.title}
                </span>
                <span className="text-xs font-bold text-zinc-500">{colDeals.length}</span>
              </div>

              {/* Deal Cards Container */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                <AnimatePresence>
                  {colDeals.map((deal) => (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-violet-500/40 hover:bg-white/[0.04] transition-all shadow-md group relative"
                    >
                      {/* Person Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={deal.avatar}
                          alt={deal.personName}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-white text-sm truncate">{deal.personName}</h4>
                          <p className="text-xs text-cyan-400 truncate">{deal.title}</p>
                        </div>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0",
                          deal.temperature === "hot" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
                          deal.temperature === "warm" && "border-amber-500/30 bg-amber-500/10 text-amber-400",
                          deal.temperature === "cold" && "border-zinc-500/30 bg-zinc-500/10 text-zinc-400"
                        )}>
                          {deal.leadScore}%
                        </span>
                      </div>

                      {/* Company & Target Raise */}
                      <div className="space-y-1 text-xs text-zinc-400 mb-3 border-y border-white/5 py-2">
                        <div className="flex items-center gap-1.5 text-zinc-300 font-medium">
                          <Building2 size={13} className="text-zinc-500" /> {deal.company}
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <DollarSign size={13} /> Target Raise: {formatCurrency(deal.targetRaise)}
                        </div>
                      </div>

                      {/* Notes Preview */}
                      <p className="text-xs text-zinc-400 line-clamp-2 mb-3 italic bg-black/20 p-2 rounded-lg border border-white/5">
                        "{deal.notes}"
                      </p>

                      {/* Move Stage Buttons */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/5">
                        <button
                          onClick={() => moveDealStage(deal.id, "prev")}
                          disabled={col.id === "NEW"}
                          className="text-xs text-zinc-500 hover:text-white disabled:opacity-30 transition-colors"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={() => moveDealStage(deal.id, "next")}
                          disabled={col.id === "CLOSED_WON"}
                          className="text-xs text-violet-400 font-medium hover:text-violet-300 disabled:opacity-30 transition-colors flex items-center gap-0.5"
                        >
                          Advance Stage →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
