"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  MapPin,
  Users,
  Calendar,
  Globe,
  ExternalLink,
  Activity,
  UserCircle2,
  DollarSign,
} from "lucide-react";
import {
  getCompanyById,
  getActivitiesForEntity,
  getPersonById,
} from "@/lib/mock-data";
import { cn, formatCurrency, getInitials, timeAgo } from "@/lib/utils";

const STAGE_COLORS: Record<string, string> = {
  "pre-seed": "bg-slate-500/10 text-slate-400 border-slate-500/20",
  seed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "series-a": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "series-b": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  growth: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const CHART_COLORS: Record<string, string> = {
  "pre-seed": "#64748b",
  seed: "#10b981",
  "series-a": "#3b82f6",
  "series-b": "#6366f1",
  growth: "#a855f7",
};

export default function CompanyProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const company = getCompanyById(id);

  if (!company) {
    notFound();
  }

  const activities = getActivitiesForEntity(id);
  const founders = company.founders
    ?.map((fid) => getPersonById(fid))
    .filter(Boolean);

  const fundingData = useMemo(() => {
    return company.fundingRounds
      ?.map((round) => ({
        name: new Date(round.date).getFullYear().toString(),
        amount: round.amount,
        stage: round.stage,
        investors: round.investors?.join(", "),
      }))
      .sort((a, b) => Number(a.name) - Number(b.name));
  }, [company.fundingRounds]);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-violet-500/20 to-cyan-500/5 rounded-full blur-[100px] -z-10" />
        
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/20 flex items-center justify-center text-4xl font-bold text-white shadow-[0_0_30px_rgba(139,92,246,0.3)] shrink-0">
            {getInitials(company.name)}
          </div>
          <div className="flex-grow space-y-2">
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-4xl font-bold text-white tracking-tight">{company.name}</h1>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium border uppercase tracking-wider",
                  STAGE_COLORS[company.stage] || "bg-white/10 text-white/70 border-white/20"
                )}
              >
                {company.stage}
              </span>
            </div>
            <p className="text-xl text-slate-300">{company.tagline}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {company.location}
              </div>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <Globe className="w-4 h-4" /> {company.website.replace("https://", "")}
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold text-white mb-4">About</h2>
            <p className="text-slate-300 leading-relaxed">{company.description}</p>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {company.industries.map((ind) => (
                <span
                  key={ind}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300"
                >
                  {ind}
                </span>
              ))}
              {company.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-sm text-violet-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {fundingData && fundingData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Funding History</h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fundingData} margin={{ top: 20, right: 0, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis
                      stroke="#94a3b8"
                      tick={{ fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `$${val / 1000000}M`}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.05)" }}
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        backdropFilter: "blur(10px)",
                      }}
                      itemStyle={{ color: "#fff" }}
                      formatter={(value: any, name: any, props: any) => [
                        formatCurrency(value),
                        `Amount (${props.payload.stage})`,
                      ]}
                    />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                      {fundingData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[entry.stage] || "#3b82f6"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {activities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" /> Recent Activity
              </h2>
              <div className="space-y-6">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="relative pl-6">
                    {/* Timeline line */}
                    {index !== activities.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-[-24px] w-px bg-white/10" />
                    )}
                    {/* Timeline dot */}
                    <div className="absolute left-[7px] top-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium">{activity.title}</h4>
                        <span className="text-xs text-slate-500">{timeAgo(activity.date)}</span>
                      </div>
                      <p className="text-sm text-slate-400">{activity.description}</p>
                      {activity.url && (
                        <a
                          href={activity.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 mt-2"
                        >
                          Read more <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md space-y-6"
          >
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Quick Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-4 h-4" /> Founded
                </div>
                <span className="text-white font-medium">{company.foundedYear}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Users className="w-4 h-4" /> Team Size
                </div>
                <span className="text-white font-medium">{company.teamSize}</span>
              </div>
              {company.totalFunding && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <DollarSign className="w-4 h-4" /> Total Funding
                  </div>
                  <span className="text-white font-medium text-cyan-400">{formatCurrency(company.totalFunding)}</span>
                </div>
              )}
              {company.fundingRounds && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Activity className="w-4 h-4" /> Funding Rounds
                  </div>
                  <span className="text-white font-medium">{company.fundingRounds.length}</span>
                </div>
              )}
            </div>
          </motion.div>

          {founders && founders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md"
            >
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2 mb-4">Key People</h3>
              <div className="space-y-4">
                {founders.map((person) => (
                  <Link href={`/dashboard/people/${person?.id}`} key={person?.id}>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-white text-sm">
                        {getInitials(person?.name || "")}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                          {person?.name}
                        </h4>
                        <p className="text-xs text-slate-400">{person?.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
