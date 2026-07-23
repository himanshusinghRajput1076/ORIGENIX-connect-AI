import React from "react";
import { Users, Building2, CreditCard, Activity, TrendingUp, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <ShieldCheck className="text-violet-400" /> Enterprise Admin Overview
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Real-time metrics for platform users, companies, active ARR subscriptions, and API latency.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Platform Users", value: "1,420", change: "+18% this month", icon: Users, color: "text-cyan-400" },
          { label: "Verified Companies", value: "480", change: "+12% this month", icon: Building2, color: "text-violet-400" },
          { label: "ARR (Annual Recurring Revenue)", value: "$124,000", change: "+24% QoQ", icon: CreditCard, color: "text-emerald-400" },
          { label: "API System Uptime", value: "99.98%", change: "Avg Latency 42ms", icon: Activity, color: "text-amber-400" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-white/10 bg-[#12121a] p-6 space-y-2 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400">{kpi.label}</span>
              <kpi.icon size={20} className={kpi.color} />
            </div>
            <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
            <p className="text-xs text-emerald-400 font-medium">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* System Status Table */}
      <div className="rounded-2xl border border-white/10 bg-[#12121a] p-6 space-y-4">
        <h3 className="text-base font-bold text-white">System Service Health</h3>
        <div className="space-y-3">
          {[
            { service: "PostgreSQL Database Pool", status: "Operational (12/100 conn)", health: "100%" },
            { service: "Redis Cache Cluster", status: "Operational (Hit Rate 98.4%)", health: "100%" },
            { service: "Qdrant Vector Database", status: "Operational (1.2M vectors)", health: "100%" },
            { service: "Background Worker Pipeline", status: "Active (Polling signals)", health: "100%" },
            { service: "LinkedIn API Direct Dispatch", status: "OAuth Token Synced", health: "100%" },
          ].map((item) => (
            <div key={item.service} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
              <span className="font-semibold text-white">{item.service}</span>
              <span className="text-zinc-400">{item.status}</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                {item.health}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
