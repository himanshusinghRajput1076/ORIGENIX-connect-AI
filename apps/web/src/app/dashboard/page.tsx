"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Mail,
  TrendingUp,
  Search,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Clock,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { cn, formatNumber, formatCurrency, timeAgo } from "@/lib/utils";
import { mockDashboardMetrics, mockActivities, mockPeople } from "@/lib/mock-data";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export default function DashboardPage() {
  // Extract top 4 people by leadScore
  const trendingPeople = [...mockPeople]
    .sort((a, b) => (b.leadScore ?? 0) - (a.leadScore ?? 0))
    .slice(0, 4);

  // Map metric keys to icons
  const metricIcons: Record<string, React.ElementType> = {
    totalLeads: Users,
    matchRate: Target,
    outreachSent: Mail,
    responseRate: TrendingUp,
  };
  
  const metricLabels: Record<string, string> = {
    totalLeads: "Total Leads",
    matchRate: "AI Match Rate",
    outreachSent: "Outreach Sent",
    responseRate: "Response Rate",
  };

  const metricsList = [
    { key: 'totalLeads', value: mockDashboardMetrics.totalLeads, change: mockDashboardMetrics.totalLeadsChange },
    { key: 'matchRate', value: mockDashboardMetrics.matchRate, change: mockDashboardMetrics.matchRateChange },
    { key: 'outreachSent', value: mockDashboardMetrics.outreachSent, change: mockDashboardMetrics.outreachSentChange },
    { key: 'responseRate', value: mockDashboardMetrics.responseRate, change: mockDashboardMetrics.responseRateChange },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "email_sent": return Mail;
      case "email_opened": return TrendingUp;
      case "profile_viewed": return Users;
      case "lead_scored": return Target;
      default: return Clock;
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Alex
            </span>
          </h1>
          <p className="mt-1 text-zinc-400">
            Here's what's happening with your outreach campaigns today.
          </p>
        </div>
        <div className="mt-4 flex gap-3 md:mt-0">
          <button className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-white/10 transition-all">
            <BarChart3 size={16} />
            View Reports
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500 transition-all">
            <Sparkles size={16} />
            New Campaign
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {metricsList.map((data) => {
          const Icon = metricIcons[data.key] || BarChart3;
          const isPositive = data.change > 0;
          
          return (
            <motion.div
              key={data.key}
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-md transition-all hover:bg-white/[0.04]"
            >
              {/* Subtle top glow */}
              <div className="absolute -top-10 left-1/2 h-20 w-3/4 -translate-x-1/2 bg-violet-500/10 blur-2xl"></div>
              
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <Icon size={20} className="text-zinc-300" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                  isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                )}>
                  {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {Math.abs(data.change)}%
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-zinc-400">{metricLabels[data.key]}</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-2xl font-semibold text-white">
                    {data.key.includes('Rate') ? `${data.value}%` : formatNumber(data.value)}
                  </p>
                </div>
              </div>

              {/* Sparkline */}
              <div className="mt-4 h-10 w-full opacity-50">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[{ val: 20 }, { val: 35 }, { val: 25 }, { val: 45 }, { val: 40 }, { val: 55 }]}>
                    <Line
                      type="monotone"
                      dataKey="val"
                      stroke={isPositive ? "#10b981" : "#8b5cf6"}
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content Area - 2 columns on lg screens */}
        <div className="space-y-6 lg:col-span-2">
          {/* Quick Actions */}
          <div className="rounded-2xl border border-white/5 bg-[#12121a] p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "New Search", icon: Search, color: "from-blue-500/20 to-blue-500/5", textColor: "text-blue-400" },
                { label: "Generate Outreach", icon: Sparkles, color: "from-violet-500/20 to-violet-500/5", textColor: "text-violet-400" },
                { label: "Score Leads", icon: Target, color: "from-emerald-500/20 to-emerald-500/5", textColor: "text-emerald-400" },
                { label: "View Analytics", icon: BarChart3, color: "from-amber-500/20 to-amber-500/5", textColor: "text-amber-400" },
              ].map((action, i) => (
                <button
                  key={i}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05] hover:ring-1 hover:ring-white/10"
                >
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br", action.color)}>
                    <action.icon size={24} className={action.textColor} />
                  </div>
                  <span className="text-center text-sm font-medium text-zinc-300 group-hover:text-white">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-white/5 bg-[#12121a] p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
              <button className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                View all
              </button>
            </div>
            <div className="space-y-6">
              {mockActivities.slice(0, 5).map((activity, i) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex gap-4">
                    <div className="relative mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                      <Icon size={16} className="text-zinc-400" />
                      {i !== mockActivities.slice(0, 5).length - 1 && (
                        <div className="absolute top-10 h-6 w-px bg-white/10" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-zinc-200">
                        {activity.description}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {timeAgo(activity.date)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Area - 1 column on lg screens */}
        <div className="space-y-6">
          {/* Trending Leads */}
          <div className="rounded-2xl border border-white/5 bg-[#12121a] p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Trending Leads</h2>
              <Target size={18} className="text-zinc-500" />
            </div>
            <div className="space-y-4">
              {trendingPeople.map((person) => (
                <div key={person.id} className="group flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {person.avatar ? (
                        <img src={person.avatar} alt={person.name} className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-medium text-white">
                          {person.name.charAt(0)}
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#12121a] border-2 border-[#12121a]">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                        {person.name}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <Briefcase size={10} />
                        <span className="truncate max-w-[100px]">{person.title}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="flex items-center gap-1 rounded-full bg-violet-500/10 px-2 py-0.5 text-xs font-medium text-violet-400">
                      {person.leadScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pro Tip */}
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-violet-900/40 to-cyan-900/20 p-6 backdrop-blur-xl">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" />
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <Sparkles size={16} className="text-cyan-400" />
              AI Insight
            </h3>
            <p className="text-sm leading-relaxed text-zinc-300">
              Your recent outreach campaign has a 24% higher response rate than average. Try sending more messages between 9am-11am PST for optimal engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
