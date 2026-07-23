"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Key, 
  Bell, 
  CreditCard, 
  Shield, 
  ChevronRight,
  Share2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Link2
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "integrations", label: "LinkedIn & APIs", icon: Share2 },
  { id: "apikeys", label: "API Keys", icon: Key },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("integrations");

  // Dynamic LinkedIn API Connection State
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(true);
  const [linkedInProfileUrl, setLinkedInProfileUrl] = useState("https://www.linkedin.com/in/himanshusingh88");
  const [clientId, setClientId] = useState("78origx_connect_ai_88");
  const [clientSecret, setClientSecret] = useState("••••••••••••••••••••••••");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleToggleLinkedInConnection = () => {
    setIsConnecting(true);
    setTimeout(() => {
      if (isLinkedInConnected) {
        setIsLinkedInConnected(false);
        setStatusMessage("LinkedIn API disconnected successfully.");
      } else {
        setIsLinkedInConnected(true);
        setStatusMessage("LinkedIn API connected to profile: " + linkedInProfileUrl);
      }
      setIsConnecting(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }, 800);
  };

  const handleSyncActivity = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setStatusMessage("Synced recent company activity & posts for " + linkedInProfileUrl);
      setTimeout(() => setStatusMessage(null), 4000);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="mt-2 text-zinc-400">
          Manage your account preferences, LinkedIn API integrations, and security.
        </p>
      </div>

      {statusMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-xl border border-violet-500/30 bg-violet-500/10 p-4 text-sm font-medium text-violet-300 backdrop-blur-md"
        >
          <Sparkles className="h-5 w-5 text-violet-400 shrink-0" />
          {statusMessage}
        </motion.div>
      )}

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Settings Sidebar */}
        <nav className="flex flex-row space-x-2 overflow-x-auto border-b border-white/5 pb-2 md:w-64 md:flex-col md:space-x-0 md:space-y-1 md:border-b-0 md:pb-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
              >
                <tab.icon
                  size={18}
                  className={isActive ? "text-violet-400" : "text-zinc-500"}
                />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Settings Content */}
        <div className="flex-1 rounded-2xl border border-white/5 bg-[#12121a] p-6 backdrop-blur-xl md:p-8">
          
          {/* LinkedIn API Integration Tab */}
          {activeTab === "integrations" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Share2 className="text-cyan-400 h-5 w-5" /> LinkedIn API Integration
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    Connect your LinkedIn API credentials to discover investors, startups, and analyze public post activity.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {isLinkedInConnected ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Connected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400 ring-1 ring-rose-500/20">
                      <span className="h-2 w-2 rounded-full bg-rose-400" />
                      Disconnected
                    </span>
                  )}
                </div>
              </div>

              {/* Dynamic Connection Status Box */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl border transition-all",
                      isLinkedInConnected 
                        ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/10" 
                        : "border-white/10 bg-white/5 text-zinc-400"
                    )}>
                      <Share2 className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-base">
                        {isLinkedInConnected ? "Himanshu Singh (Active Integration)" : "LinkedIn Official API"}
                      </h3>
                      <a 
                        href={linkedInProfileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        {linkedInProfileUrl} <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  {/* Dynamic Connect / Disconnect Toggle Button */}
                  <button
                    onClick={handleToggleLinkedInConnection}
                    disabled={isConnecting}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all shadow-md",
                      isLinkedInConnected
                        ? "border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:text-white"
                        : "bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:opacity-90 shadow-cyan-500/20"
                    )}
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" /> Processing...
                      </>
                    ) : isLinkedInConnected ? (
                      <>
                        <XCircle className="h-4 w-4 text-rose-400" /> Disconnect API
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-cyan-200" /> Connect API
                      </>
                    )}
                  </button>
                </div>

                {/* API Configuration & Credentials Form */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Target LinkedIn Profile URL</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={linkedInProfileUrl} 
                        onChange={(e) => setLinkedInProfileUrl(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:bg-white/10 focus:outline-none transition-colors"
                      />
                      <Link2 className="absolute right-3.5 top-3 text-zinc-500 h-4 w-4" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Client ID / App ID</label>
                      <input 
                        type="text" 
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:bg-white/10 focus:outline-none transition-colors font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Client Secret</label>
                      <input 
                        type="password" 
                        value={clientSecret}
                        onChange={(e) => setClientSecret(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:bg-white/10 focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* API Scope Compliance Card */}
                {isLinkedInConnected && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-xl border border-white/5 bg-black/20 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" /> Permitted Scopes & Compliance
                      </span>
                      <button 
                        onClick={handleSyncActivity}
                        disabled={isSyncing}
                        className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <RefreshCw className={cn("h-3 w-3", isSyncing && "animate-spin")} />
                        {isSyncing ? "Syncing..." : "Sync Posts & Activity"}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 sm:grid-cols-3">
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> r_liteprofile</div>
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> r_emailaddress</div>
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> w_member_social</div>
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> rw_organization</div>
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Company Activity Analytics</div>
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Public Signal Extraction</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-semibold text-white">Profile Information</h2>
                <p className="mt-1 text-sm text-zinc-400">Update your account details and public profile.</p>
              </div>
              <div className="space-y-4 pt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">First Name</label>
                    <input type="text" defaultValue="Himanshu" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Last Name</label>
                    <input type="text" defaultValue="Singh" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Email Address</label>
                  <input type="email" defaultValue="himanshu@origenix.ai" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">LinkedIn Profile</label>
                  <input type="text" defaultValue="https://www.linkedin.com/in/himanshusingh88" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" />
                </div>
                <div className="pt-4 flex justify-end">
                  <button className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 hover:bg-violet-500 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "apikeys" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">API Keys</h2>
                  <p className="mt-1 text-sm text-zinc-400">Manage your API keys for programmatic access.</p>
                </div>
                <button className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors">
                  Generate Key
                </button>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                      <Key size={18} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Production Key</p>
                      <p className="text-xs text-zinc-500">Created on Oct 12, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-zinc-400">sk_live_...88hs</span>
                    <button className="text-sm font-medium text-violet-400 hover:text-violet-300">Revoke</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-semibold text-white">Notifications</h2>
                <p className="mt-1 text-sm text-zinc-400">Choose what updates you want to receive.</p>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Lead & Investor Alerts", desc: "Get notified when a high-value VC or founder matches your criteria" },
                  { title: "LinkedIn Post Signals", desc: "Alerts when tracked company profiles post new activity" },
                  { title: "AI Outreach Performance", desc: "Daily summary of your outreach message responses" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-white/5 p-4 hover:bg-white/5 transition-colors">
                    <div>
                      <p className="font-medium text-white">{item.title}</p>
                      <p className="text-sm text-zinc-400">{item.desc}</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-violet-600">
                      <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "billing" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-64 flex-col items-center justify-center text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                <CreditCard size={32} className="text-zinc-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Billing Settings</h3>
              <p className="mt-2 max-w-sm text-sm text-zinc-400">
                You are currently on the Enterprise Plan. Manage your subscription and payment methods in the portal.
              </p>
              <button className="mt-6 flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors">
                Open Billing Portal <ChevronRight size={16} />
              </button>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-64 flex-col items-center justify-center text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                <Shield size={32} className="text-zinc-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Security Settings</h3>
              <p className="mt-2 max-w-sm text-sm text-zinc-400">
                Manage your password, two-factor authentication, and connected API credentials.
              </p>
              <button className="mt-6 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors">
                Enable 2FA
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
