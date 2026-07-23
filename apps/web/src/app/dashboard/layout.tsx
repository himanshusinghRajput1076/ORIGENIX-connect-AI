"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  Users,
  Building2,
  Mail,
  Target,
  BarChart3,
  MessageSquare,
  Kanban,
  UserCheck,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Global Search", icon: Search, href: "/dashboard/search" },
  { name: "VC & Investors", icon: Users, href: "/dashboard/search/investors" },
  { name: "Founders", icon: UserCheck, href: "/dashboard/search/founders" },
  { name: "Companies", icon: Building2, href: "/dashboard/companies" },
  { name: "CRM Pipeline", icon: Kanban, href: "/dashboard/crm" },
  { name: "AI Outreach", icon: Mail, href: "/dashboard/outreach" },
  { name: "Lead Scoring", icon: Target, href: "/dashboard/leads" },
  { name: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { name: "Chat", icon: MessageSquare, href: "/dashboard/chat" },
];

const bottomNavItems = [
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-between px-2">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/20">
              <span className="text-lg font-bold text-white">O</span>
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-xl font-bold tracking-tight text-transparent"
              >
                Origenix
              </motion.span>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-white md:block"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Main Nav */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-gradient-to-b from-violet-500 to-cyan-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon
                  size={20}
                  className={cn(
                    "shrink-0 transition-colors duration-200",
                    isActive ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-300"
                  )}
                />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate"
                  >
                    {item.name}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4">
        {/* Bottom Nav */}
        <nav className="space-y-1.5 border-t border-white/10 pt-4">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon size={20} className="shrink-0" />
                {!isCollapsed && (
                  <span className="truncate">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10 transition-colors hover:bg-white/10">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600">
            <User size={18} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-zinc-200">
                Admin User
              </span>
              <span className="truncate text-xs text-zinc-500">
                admin@origenix.ai
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#0a0a0f] text-zinc-100 overflow-hidden selection:bg-violet-500/30">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? "80px" : "260px" }}
        className="hidden border-r border-white/5 bg-[#0a0a0f]/50 backdrop-blur-xl md:block z-20"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-[260px] border-r border-white/10 bg-[#0a0a0f] md:hidden"
            >
              <SidebarContent />
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute right-4 top-6 rounded-full bg-white/10 p-1.5 text-zinc-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/5 bg-[#0a0a0f]/80 px-4 backdrop-blur-lg sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="rounded-md p-2 text-zinc-400 hover:bg-white/5 hover:text-white md:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden max-w-md sm:block">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="text"
                placeholder="Search anything..."
                className="h-10 w-64 rounded-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-violet-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all w-[300px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full bg-white/5 p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
