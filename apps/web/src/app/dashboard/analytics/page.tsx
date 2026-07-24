"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { TrendingUp, DollarSign, Activity, PieChart as PieChartIcon, BarChart3, LineChart as LineChartIcon } from "lucide-react";
import { useRealtimeDashboard } from "@/hooks/useRealtimeData";
import { formatCurrency } from "@/lib/utils";

export default function AnalyticsPage() {
  const { fundingTrends: mockFundingTrends, dealFlow: mockDealFlow, industryDistribution: mockIndustryDistribution } = useRealtimeDashboard();
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-3">
          Investment & Startup Trends
        </h1>
        <p className="text-slate-400 mt-2">Market analytics and deal flow insights across the ecosystem.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -z-10 group-hover:bg-blue-500/20 transition-colors" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Total Funding (YTD)</h3>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">$125.8B</p>
          <p className="text-sm text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +14.2% from last year
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] -z-10 group-hover:bg-purple-500/20 transition-colors" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Active Deals Tracker</h3>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">3,142</p>
          <p className="text-sm text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +5.8% this month
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -z-10 group-hover:bg-emerald-500/20 transition-colors" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Avg Deal Size (Series A)</h3>
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">$14.2M</p>
          <p className="text-sm text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +2.1% this quarter
          </p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Funding Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <LineChartIcon className="w-5 h-5 text-indigo-400" /> Global Funding Trends
            </h2>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockFundingTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `$${(val / 1000000000).toFixed(0)}B`}
                />
                <Tooltip
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    backdropFilter: "blur(10px)",
                  }}
                  itemStyle={{ color: "#fff" }}
                  formatter={(value: any) => [formatCurrency(value as number), "Funding"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Deal Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" /> Deal Flow Volume
            </h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockDealFlow} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    backdropFilter: "blur(10px)",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Bar dataKey="value" name="Deals" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Industry Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-violet-400" /> Industry Distribution
            </h2>
          </div>
          <div className="h-[300px] w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockIndustryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {mockIndustryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    backdropFilter: "blur(10px)",
                  }}
                  itemStyle={{ color: "#fff" }}
                  formatter={(value: any) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Custom Legend */}
            <div className="flex flex-col justify-center gap-3 pr-4">
              {mockIndustryDistribution.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-300">{item.name}</span>
                  <span className="text-sm font-medium text-white ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
