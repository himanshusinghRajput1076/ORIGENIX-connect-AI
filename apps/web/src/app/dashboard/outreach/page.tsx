"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Copy, RefreshCw, Send, CheckCircle2, ChevronDown } from "lucide-react";
import { mockPeople } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const OUTREACH_TYPES = ["Cold Email", "Intro Request", "Partnership", "Investment Ask"];
const TONES = ["Formal", "Casual", "Concise"];

const TEMPLATES = [
  {
    title: "Quick Intro",
    subject: "Introduction: {{your_name}} / {{target_name}}",
    body: "Hi {{target_name}},\n\nI noticed your work at {{target_company}} and was really impressed by your recent developments in the space.\n\nI'm building something that aligns well with your focus, and I'd love to get your quick thoughts if you have 5 minutes next week.\n\nBest,\n[Your Name]"
  },
  {
    title: "Investment Ask",
    subject: "Investment Opportunity: [Your Startup] & {{target_company}}",
    body: "Hi {{target_name}},\n\nGiven your focus on early-stage investments at {{target_company}}, I wanted to reach out. We are building [Your Pitch Summary].\n\nWe are currently raising our next round and already have some great momentum. Would you be open to a brief chat to see if there's a fit?\n\nBest,\n[Your Name]"
  }
];

export default function OutreachPage() {
  const [selectedPersonId, setSelectedPersonId] = useState(mockPeople[0].id);
  const [outreachType, setOutreachType] = useState(OUTREACH_TYPES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [pitch, setPitch] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<{subject: string, body: string} | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedPerson = mockPeople.find(p => p.id === selectedPersonId);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedResult(null);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const subject = outreachType === "Investment Ask" 
        ? `Investment Opportunity: Aligning with ${selectedPerson?.company}'s thesis`
        : `Connecting regarding ${selectedPerson?.company}`;
        
      const body = `Hi ${selectedPerson?.name.split(' ')[0]},\n\nI hope this email finds you well.\n\nI've been following your work at ${selectedPerson?.company} and was particularly impressed by your recent focus on ${selectedPerson?.industries[0] || 'innovation'}.\n\n${pitch ? `We are currently working on: ${pitch}. ` : "We are building something that I believe aligns perfectly with your current thesis. "}\n\nGiven your expertise as a ${selectedPerson?.title}, I would love to grab 15 minutes of your time next week to share what we're building and get your feedback.\n\nWould you be open to a brief introductory call?\n\nBest regards,\n[Your Name]`;
      
      setGeneratedResult({ subject, body });
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (generatedResult) {
      navigator.clipboard.writeText(`${generatedResult.subject}\n\n${generatedResult.body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-violet-400" /> AI Outreach Studio
        </h1>
        <p className="text-slate-400 mt-2">Craft hyper-personalized outreach messages using AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Config */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl flex flex-col gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] -z-10" />
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Target Person</label>
            <div className="relative">
              <select
                value={selectedPersonId}
                onChange={(e) => setSelectedPersonId(e.target.value)}
                className="w-full appearance-none bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                {mockPeople.map(p => (
                  <option key={p.id} value={p.id}>{p.name} - {p.company}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Outreach Type</label>
              <div className="relative">
                <select
                  value={outreachType}
                  onChange={(e) => setOutreachType(e.target.value)}
                  className="w-full appearance-none bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  {OUTREACH_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Tone</label>
              <div className="relative">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full appearance-none bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2 flex-grow">
            <label className="text-sm font-medium text-slate-300">Your Pitch / Key Points (Optional)</label>
            <textarea
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              placeholder="e.g. We are building an AI-powered sales platform that increases conversion by 30%..."
              className="w-full h-32 resize-none bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isGenerating ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <RefreshCw className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" /> Generate with AI
              </>
            )}
          </button>
        </motion.div>

        {/* Right Panel - Result */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl flex flex-col h-[600px] relative"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10" />
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">Generated Message</h2>
            {generatedResult && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleGenerate}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                  title="Regenerate"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
            {!generatedResult && !isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                <Send className="w-12 h-12 opacity-20" />
                <p>Configure options and click generate to create a message.</p>
              </div>
            ) : isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center text-cyan-400 space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Sparkles className="w-10 h-10" />
                </motion.div>
                <p className="animate-pulse">Crafting personalized message...</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Subject</span>
                  <div className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-3 text-white font-medium">
                    {generatedResult?.subject}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Body</span>
                  <div className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-4 text-slate-300 whitespace-pre-wrap min-h-[300px]">
                    {generatedResult?.body}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Templates Library */}
      <div className="pt-8">
        <h2 className="text-xl font-semibold text-white mb-6">Template Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEMPLATES.map((template, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors group"
            >
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-violet-400 transition-colors">{template.title}</h3>
              <p className="text-xs text-slate-500 mb-4 font-mono truncate">{template.subject}</p>
              <p className="text-sm text-slate-400 line-clamp-3 whitespace-pre-wrap">{template.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
