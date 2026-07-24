"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft,
  Mail,
  Globe,
  ExternalLink,
  Link as LinkIcon,
  Building2,
  MapPin,
  TrendingUp,
  Target,
  Briefcase,
  Sparkles,
  CalendarDays,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { getPersonById, getActivitiesForEntity } from "@/lib/mock-data";
import { ROLE_LABELS, INDUSTRY_LABELS } from "@/types";
import { cn, formatCurrency, getInitials, timeAgo } from "@/lib/utils";
import { useSavedLeads } from "@/hooks/useSavedLeads";

export default function PersonProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const person = getPersonById(id);
  const activities = getActivitiesForEntity(id);
  const { saveLead, removeLead, isLeadSaved, loading: leadsLoading } = useSavedLeads();
  const saved = isLeadSaved(id);

  if (!person) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white p-10 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Person not found</h1>
        <Link href="/dashboard/people" className="text-violet-400 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-10"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link 
          href="/dashboard/people" 
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-[#12121a] border border-white/5 overflow-hidden">
          {/* Abstract Background */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-violet-600/20 via-cyan-600/20 to-transparent blur-3xl" />
          
          <div className="relative p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
            
            {/* Avatar */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full blur opacity-70" />
              <div className="relative w-32 h-32 rounded-full bg-[#0a0a0f] flex items-center justify-center text-4xl font-bold shadow-2xl overflow-hidden border-4 border-[#12121a]">
                {person.avatar ? (
                  <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                ) : (
                  getInitials(person.name)
                )}
              </div>
            </div>

            {/* Core Info */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold">{person.name}</h1>
                {person.leadScore && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                    <TrendingUp className="w-4 h-4" />
                    Score {person.leadScore}
                  </div>
                )}
              </div>
              
              <div className="text-xl text-violet-300 font-medium">
                {person.title}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  {person.company}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {person.location}
                </div>
              </div>

              {/* Roles */}
              <div className="flex flex-wrap gap-2 pt-2">
                {person.roles.map(role => (
                  <span key={role} className="px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-medium border border-white/5">
                    {ROLE_LABELS[role] || role}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Link 
                href="/dashboard/outreach"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-medium shadow-lg shadow-violet-500/25 transition-all hover:scale-105 active:scale-95 w-full"
              >
                <Sparkles className="w-5 h-5" />
                Generate Outreach
              </Link>

              <button 
                onClick={() => saved ? removeLead(id) : saveLead(id)}
                disabled={leadsLoading}
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 active:scale-95 w-full border",
                  saved 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20" 
                    : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                )}
              >
                {saved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                {saved ? "Lead Saved" : "Save Lead"}
              </button>
              
              <div className="flex justify-center gap-3 mt-2">
                {person.email && (
                  <a href={`mailto:${person.email}`} className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
                {person.linkedin && (
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#0a66c2] transition-colors border border-white/5">
                    <LinkIcon className="w-5 h-5" />
                  </a>
                )}
                {person.twitter && (
                  <a href={person.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#1d9bf0] transition-colors border border-white/5">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
                {person.website && (
                  <a href={person.website} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5">
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left Col) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Bio */}
            <div className="bg-[#12121a] rounded-2xl p-8 border border-white/5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-violet-400" />
                About
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                {person.bio}
              </p>
            </div>

            {/* Activity Feed */}
            <div className="bg-[#12121a] rounded-2xl p-8 border border-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-cyan-400" />
                Recent Activity
              </h3>
              
              {activities.length > 0 ? (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                  {activities.map((activity, index) => (
                    <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#12121a] bg-violet-600 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10">
                        <ActivityIcon type={activity.type} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">{activity.type.replace("-", " ")}</span>
                          <time className="text-xs text-slate-500">{timeAgo(activity.date)}</time>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">{activity.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2">{activity.description}</p>
                        {activity.url && (
                          <a href={activity.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 mt-2">
                            Source <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-500">
                  No recent activity found.
                </div>
              )}
            </div>

          </div>

          {/* Sidebar (Right Col) */}
          <div className="space-y-6">
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#12121a] p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center gap-1 hover:bg-white/[0.02] transition-colors">
                <Target className="w-5 h-5 text-violet-400 mb-1" />
                <span className="text-2xl font-bold text-white">{person.investmentCount || 0}</span>
                <span className="text-xs text-slate-400">Investments</span>
              </div>
              <div className="bg-[#12121a] p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center gap-1 hover:bg-white/[0.02] transition-colors">
                <Briefcase className="w-5 h-5 text-cyan-400 mb-1" />
                <span className="text-2xl font-bold text-white">{person.foundedCompanies?.length || 0}</span>
                <span className="text-xs text-slate-400">Companies Founded</span>
              </div>
            </div>

            {/* Investment Range */}
            {person.investmentRange && (
              <div className="bg-[#12121a] p-6 rounded-xl border border-white/5">
                <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Investment Range</h3>
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-lg font-bold text-emerald-400">{formatCurrency(person.investmentRange.min)}</span>
                  <span className="text-slate-500">-</span>
                  <span className="text-lg font-bold text-emerald-400">{formatCurrency(person.investmentRange.max)}</span>
                </div>
              </div>
            )}

            {/* Industries */}
            <div className="bg-[#12121a] p-6 rounded-xl border border-white/5">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Focus Industries</h3>
              <div className="flex flex-wrap gap-2">
                {person.industries.map(ind => (
                  <span key={ind} className="px-3 py-1.5 text-xs rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    {INDUSTRY_LABELS[ind] || ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-[#12121a] p-6 rounded-xl border border-white/5">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {person.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-[10px] uppercase font-bold rounded bg-white/5 text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </motion.div>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "funding-round":
      return <TrendingUp className="w-4 h-4" />;
    case "hire":
      return <Briefcase className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
}
