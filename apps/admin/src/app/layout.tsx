import React from "react";
import Link from "next/link";
import { Shield, Users, Building2, CreditCard, Activity, LayoutDashboard } from "lucide-react";
import "@/app/globals.css";

export const metadata = {
  title: "Origenix Connect AI — Admin Console",
  description: "Enterprise Control Panel, Billing & Health Monitoring",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0f] text-white min-h-screen font-sans antialiased">
        <div className="flex min-h-screen">
          {/* Sidebar Nav */}
          <aside className="w-64 border-r border-white/10 bg-[#12121a] p-6 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-lg">
                  <Shield size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-white text-base">Origenix Admin</h2>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Enterprise v1.0
                  </span>
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { name: "Overview", icon: LayoutDashboard, href: "/" },
                  { name: "Users", icon: Users, href: "/users" },
                  { name: "Companies", icon: Building2, href: "/companies" },
                  { name: "Billing & ARR", icon: CreditCard, href: "/billing" },
                  { name: "System Health", icon: Activity, href: "/monitoring" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <item.icon size={16} className="text-violet-400" /> {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="border-t border-white/5 pt-4 text-xs text-zinc-500">
              Logged in as <strong className="text-zinc-300">Himanshu Singh (Super Admin)</strong>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
