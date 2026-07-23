"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Building2,
  Users,
  Briefcase,
  Bot,
  BarChart3,
  Mail,
  Star,
  ArrowRight,
  Sparkles,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  Target,
  ChevronRight,
  Check,
  Database,
  Newspaper,
  FileText,
  UserCheck,
} from "lucide-react";

// ---- Animation Variants ----
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// ---- Features Data ----
const features = [
  { icon: Search, title: "Investor Search", desc: "Find investors, VCs, and angels filtered by industry, stage, check size, and geography.", color: "#8b5cf6" },
  { icon: Building2, title: "Startup Discovery", desc: "Discover high-growth startups across every sector with real-time funding and activity data.", color: "#06b6d4" },
  { icon: Users, title: "Founder & Co-Founder Search", desc: "Find founders and co-founders with detailed backgrounds, experience, and track records.", color: "#10b981" },
  { icon: Briefcase, title: "VC & Angel Database", desc: "Comprehensive database of venture capital firms and angel investors with portfolio details.", color: "#f59e0b" },
  { icon: Bot, title: "AI Company Analysis", desc: "AI-powered analysis of public company activity, growth signals, and market positioning.", color: "#ec4899" },
  { icon: BarChart3, title: "Trend Analysis", desc: "Real-time investment and startup trend analysis across industries and geographies.", color: "#3b82f6" },
  { icon: Mail, title: "AI Outreach", desc: "Generate hyper-personalized outreach messages powered by AI using real company context.", color: "#8b5cf6" },
  { icon: Star, title: "Lead Scoring", desc: "AI lead scoring matches investors to startups based on your ideal customer profile.", color: "#f43f5e" },
];

const dataSources = [
  { icon: Globe, name: "Public Company Websites", desc: "Direct website data" },
  { icon: Database, name: "Startup Directories", desc: "Curated databases" },
  { icon: TrendingUp, name: "Funding Announcements", desc: "Real-time funding data" },
  { icon: Newspaper, name: "News & Media", desc: "Press coverage" },
  { icon: FileText, name: "Government Registries", desc: "Official filings" },
  { icon: UserCheck, name: "User-Provided Data", desc: "Your CRM imports" },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    desc: "For individual founders exploring",
    features: ["50 searches/month", "Basic filters", "5 AI outreach/month", "Community support"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/mo",
    desc: "For active founders and investors",
    features: ["Unlimited searches", "Advanced filters & scoring", "100 AI outreach/month", "Export to CSV", "Priority support", "Lead scoring"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For VCs, accelerators, and teams",
    features: ["Everything in Pro", "Team workspaces", "CRM integrations", "API access", "Custom AI agents", "Dedicated support"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const stats = [
  { value: "50K+", label: "Investors & Founders" },
  { value: "12K+", label: "Startups Tracked" },
  { value: "98%", label: "Data Accuracy" },
  { value: "$2.4T", label: "Funding Analyzed" },
];

// ---- Components ----

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(10,10,15,0.8)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] py-3 px-8 shadow-lg"
            : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">Origenix</span>
          <span className="text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-card)] px-2 py-0.5 rounded-full border border-[var(--border-subtle)]">
            Connect AI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Features</a>
          <a href="#sources" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Data Sources</a>
          <a href="#pricing" className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="btn-secondary text-sm !py-2 !px-4">
            Log In
          </Link>
          <Link href="/dashboard" className="btn-primary text-sm !py-2 !px-4">
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="mesh-gradient" />
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />

      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-[rgba(139,92,246,0.1)] text-[var(--accent-violet)] border border-[rgba(139,92,246,0.2)]">
              <Zap size={12} />
              AI-Powered Intelligence Platform
              <ChevronRight size={12} />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6"
          >
            <span className="block text-white">Discover Your Next</span>
            <span className="block gradient-text mt-2">Investor or Startup</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl text-lg md:text-xl text-[var(--text-secondary)] mb-10 text-balance leading-relaxed"
          >
            AI-powered platform for finding investors, founders, VCs, and startups.
            Analyze companies, score leads, and generate personalized outreach — all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <Link href="/dashboard" className="btn-primary text-base !py-3.5 !px-8 group">
              Start Discovering
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#features" className="btn-secondary text-base !py-3.5 !px-8">
              See How It Works
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 gradient-bg opacity-20 blur-[100px] rounded-full" />
          <div className="relative glass-card p-1 rounded-2xl overflow-hidden">
            <div className="bg-[var(--bg-secondary)] rounded-xl p-6 md:p-8">
              {/* Fake Dashboard Preview */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#f43f5e]" />
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                  <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                </div>
                <div className="flex-1 h-8 bg-[var(--bg-card)] rounded-lg flex items-center px-4">
                  <Search size={14} className="text-[var(--text-muted)] mr-2" />
                  <span className="text-sm text-[var(--text-muted)]">Search investors, founders, startups...</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Total Leads", value: "1,247", change: "+12.5%" },
                  { label: "Match Rate", value: "68%", change: "+5.2%" },
                  { label: "Outreach Sent", value: "342", change: "+23.1%" },
                  { label: "Response Rate", value: "34%", change: "-2.3%" },
                ].map((metric) => (
                  <div key={metric.label} className="glass-card p-4 !rounded-xl cursor-default">
                    <div className="text-xs text-[var(--text-muted)] mb-1">{metric.label}</div>
                    <div className="text-xl font-bold">{metric.value}</div>
                    <div className={`text-xs mt-1 ${metric.change.startsWith('+') ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-rose)]'}`}>
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span variants={fadeInUp} className="pill mb-4 inline-block">
            ✨ Features
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
            From discovering investors to generating personalized outreach — our AI handles the heavy lifting.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card p-6 cursor-default group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
              >
                <feature.icon size={22} style={{ color: feature.color }} />
              </div>
              <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DataSourcesSection() {
  return (
    <section id="sources" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="pill mb-4 inline-block">
            🔗 Data Sources
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            Richer Data, <span className="gradient-text">Better Results</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
            We aggregate authorized data from multiple public sources — giving you richer and more reliable information than any single platform.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {dataSources.map((source) => (
            <motion.div
              key={source.name}
              variants={scaleIn}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="glass-card p-5 flex items-center gap-4 cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.15)] flex items-center justify-center flex-shrink-0">
                <source.icon size={18} className="text-[var(--accent-violet)]" />
              </div>
              <div>
                <div className="text-sm font-semibold">{source.name}</div>
                <div className="text-xs text-[var(--text-muted)]">{source.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 glass-card p-6 flex items-center gap-4"
        >
          <Shield size={24} className="text-[var(--accent-emerald)] flex-shrink-0" />
          <div>
            <div className="text-sm font-semibold mb-1">Privacy & Compliance First</div>
            <div className="text-xs text-[var(--text-secondary)]">
              We only use publicly available, authorized data sources. Fully compliant with GDPR, CCPA, and CAN-SPAM regulations. Users can opt out at any time.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="pill mb-4 inline-block">
            💎 Pricing
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
            Start free and scale as you grow. No hidden fees.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`relative glass-card p-8 flex flex-col ${
                plan.highlighted
                  ? "!border-[var(--accent-violet)] shadow-[var(--glow-violet)]"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full gradient-bg text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <p className="text-xs text-[var(--text-muted)]">{plan.desc}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-[var(--text-muted)]">{plan.period}</span>
                )}
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Check size={14} className="text-[var(--accent-emerald)] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className={plan.highlighted ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  const phases = [
    { phase: "Phase 1", title: "Search & AI Analysis", status: "current", desc: "Searchable database, AI analysis, outreach generation", color: "#8b5cf6" },
    { phase: "Phase 2", title: "Investor–Startup Matching", status: "upcoming", desc: "Smart matching, lead scoring, signal monitoring", color: "#06b6d4" },
    { phase: "Phase 3", title: "CRM & Automation", status: "planned", desc: "Built-in CRM, outreach automation, team workspaces", color: "#10b981" },
    { phase: "Phase 4", title: "Enterprise SaaS", status: "planned", desc: "API access, white-label, custom AI agents", color: "#f59e0b" },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="pill mb-4 inline-block">
            🚀 Roadmap
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            Building the <span className="gradient-text">Future</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="space-y-4"
        >
          {phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              variants={fadeInUp}
              className="glass-card p-6 flex items-center gap-6"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
                style={{ background: `${phase.color}15`, color: phase.color, border: `1px solid ${phase.color}30` }}
              >
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-medium text-[var(--text-muted)]">{phase.phase}</span>
                  {phase.status === "current" && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[rgba(139,92,246,0.15)] text-[var(--accent-violet)] border border-[rgba(139,92,246,0.2)]">
                      In Progress
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold">{phase.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{phase.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="relative">
            <div className="absolute inset-0 gradient-bg opacity-10 blur-[100px] rounded-full" />
            <div className="relative glass-card p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to <span className="gradient-text">Connect</span>?
              </h2>
              <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-8 text-lg">
                Join thousands of founders and investors using Origenix Connect AI to discover opportunities and build relationships.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard" className="btn-primary text-base !py-3.5 !px-8 group">
                  Get Started Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#features" className="btn-secondary text-base !py-3.5 !px-8">
                  Learn More
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md gradient-bg flex items-center justify-center">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="text-sm font-semibold gradient-text">Origenix Connect AI</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-xs text-[var(--text-muted)] hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-xs text-[var(--text-muted)] hover:text-white transition-colors">Pricing</a>
          <a href="#sources" className="text-xs text-[var(--text-muted)] hover:text-white transition-colors">Data Sources</a>
        </div>
        <div className="text-xs text-[var(--text-muted)]">
          © 2025 Origenix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ---- Main Page ----

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DataSourcesSection />
      <PricingSection />
      <RoadmapSection />
      <CTASection />
      <Footer />
    </main>
  );
}
