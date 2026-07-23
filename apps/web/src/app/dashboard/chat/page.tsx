"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Sparkles, 
  Calendar, 
  Paperclip, 
  ExternalLink,
  Bot,
  UserCheck,
  Building2,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Share,
  FileText,
  Mail,
  UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatContact {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  linkedinUrl: string;
  status: "online" | "away" | "offline";
  role: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isAiGenerated?: boolean;
  viaLinkedIn?: boolean;
  sharedDetails?: string;
}

const initialContacts: ChatContact[] = [
  {
    id: "c_himanshu",
    name: "Himanshu Singh",
    title: "Founder & Tech Lead",
    company: "Origenix Connect AI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    linkedinUrl: "https://www.linkedin.com/in/himanshusingh88",
    status: "online",
    role: "Founder",
    lastMessage: "Connected via LinkedIn. Ready for direct messaging & detail sharing.",
    lastMessageTime: "10:42 AM",
    unreadCount: 0,
  },
  {
    id: "c_sarah",
    name: "Sarah Chen",
    title: "Managing Partner",
    company: "Horizon Ventures",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    linkedinUrl: "https://linkedin.com/in/sarachen",
    status: "online",
    role: "VC Investor",
    lastMessage: "Looking forward to reviewing the Series A pitch deck.",
    lastMessageTime: "Yesterday",
    unreadCount: 1,
  },
  {
    id: "c_priya",
    name: "Priya Sharma",
    title: "Managing Director",
    company: "TechBridge Fund",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    linkedinUrl: "https://linkedin.com/in/priyasharma",
    status: "away",
    role: "VC Investor",
    lastMessage: "Let's schedule a call to discuss the cross-border investment.",
    lastMessageTime: "Jul 20",
    unreadCount: 0,
  },
];

export default function ChatPage() {
  const [contacts, setContacts] = useState<ChatContact[]>(initialContacts);
  const [activeContactId, setActiveContactId] = useState<string>("c_himanshu");
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    c_himanshu: [
      { id: "m1", senderId: "c_himanshu", text: "Hello! Connected via LinkedIn API. You can search, chat, and share details directly from here.", timestamp: "10:40 AM" },
    ],
    c_sarah: [
      { id: "m2", senderId: "c_sarah", text: "Hi! Send over your pitch deck and team contact details when ready.", timestamp: "Yesterday" },
    ],
    c_priya: [
      { id: "m3", senderId: "c_priya", text: "Let's connect over LinkedIn for the FinTech syndicate updates.", timestamp: "Jul 20" },
    ],
  });

  const [inputMessage, setInputMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sendViaLinkedIn, setSendViaLinkedIn] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareType, setShareType] = useState<"PITCH_DECK" | "CONTACT_CARD" | "MEETING_INVITE">("PITCH_DECK");

  const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0];
  const activeMessages = messages[activeContactId] || [];

  const handleSendMessage = async (sharedDetailText?: string) => {
    const textToSend = inputMessage.trim() || sharedDetailText;
    if (!textToSend) return;

    setIsSending(true);
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      viaLinkedIn: sendViaLinkedIn,
      sharedDetails: sharedDetailText ? shareType : undefined,
    };

    setMessages((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg],
    }));
    setInputMessage("");

    if (sendViaLinkedIn) {
      try {
        await fetch("/api/linkedin/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipientProfileUrl: activeContact.linkedinUrl,
            message: textToSend,
            shareDetails: sharedDetailText ? shareType : null,
          }),
        });
      } catch (err) {
        console.error("LinkedIn message dispatch error:", err);
      }
    }
    setIsSending(false);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12">
      {/* Top Banner: Connected Account Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-950/40 via-[#12121a] to-cyan-950/40 p-4 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-400 font-bold shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Connected LinkedIn Account:</span>
              <a href="https://www.linkedin.com/in/himanshusingh88" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-cyan-400 hover:underline flex items-center gap-1">
                Himanshu Singh <ExternalLink size={12} />
              </a>
            </div>
            <p className="text-xs text-zinc-400">
              Active Scopes: <span className="text-zinc-200">r_liteprofile, r_emailaddress, w_member_social, w_messages</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSendViaLinkedIn(!sendViaLinkedIn)}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold border transition-all cursor-pointer",
              sendViaLinkedIn
                ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/10"
                : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
            )}
          >
            <CheckCircle2 size={14} className={sendViaLinkedIn ? "text-cyan-400" : "text-zinc-500"} />
            {sendViaLinkedIn ? "LinkedIn Direct DM Active" : "Platform Chat Only"}
          </button>
        </div>
      </div>

      {/* Main Chat Hub Split View */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[680px]">
        {/* Left Contacts Sidebar */}
        <div className="md:col-span-4 rounded-2xl border border-white/10 bg-[#12121a] p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="text-violet-400" size={18} /> Conversations
              </h2>
              <span className="text-xs font-semibold text-zinc-500">{contacts.length} Active</span>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-zinc-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search profiles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[500px]">
              {contacts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveContactId(c.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 cursor-pointer",
                    activeContactId === c.id
                      ? "border-violet-500/50 bg-violet-500/10 shadow-lg shadow-violet-500/5"
                      : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                  )}
                >
                  <img src={c.avatar} alt={c.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">{c.name}</h4>
                      <span className="text-[10px] text-zinc-500">{c.lastMessageTime}</span>
                    </div>
                    <p className="text-[11px] text-cyan-400 truncate">{c.title}</p>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">{c.lastMessage}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Chat & Detail Sharing Panel */}
        <div className="md:col-span-8 rounded-2xl border border-white/10 bg-[#12121a] p-6 flex flex-col justify-between">
          {/* Active Contact Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <img src={activeContact.avatar} alt={activeContact.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-violet-500/30" />
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  {activeContact.name}
                  <a href={activeContact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline text-xs flex items-center gap-1 font-normal">
                    LinkedIn <ExternalLink size={11} />
                  </a>
                </h3>
                <p className="text-xs text-zinc-400">{activeContact.title} • {activeContact.company}</p>
              </div>
            </div>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300 hover:bg-violet-500/20 transition-all cursor-pointer"
            >
              <Share2 size={13} /> Share Details via LinkedIn
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {activeMessages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col max-w-[80%]",
                  m.senderId === "user" ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-2xl text-xs space-y-1",
                    m.senderId === "user"
                      ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-br-none shadow-lg"
                      : "bg-white/5 border border-white/10 text-zinc-200 rounded-bl-none"
                  )}
                >
                  <p>{m.text}</p>
                  {m.sharedDetails && (
                    <div className="mt-2 p-2 rounded-lg bg-black/30 border border-white/10 text-[11px] text-cyan-300 flex items-center gap-1.5">
                      <FileText size={12} /> Shared Details: {m.sharedDetails.replace(/_/g, " ")}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-zinc-500">
                  <span>{m.timestamp}</span>
                  {m.viaLinkedIn && <span className="text-cyan-400 font-semibold">• Sent via LinkedIn API</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Input & Dispatch Controls */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-violet-500 transition-colors">
              <input
                type="text"
                placeholder={`Type a message to ${activeContact.name}${sendViaLinkedIn ? " (Dispatches to LinkedIn DM)" : ""}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-transparent border-none outline-none text-xs px-3 text-white placeholder:text-zinc-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isSending}
                className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 p-2.5 text-white shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Profile Details Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#12121a] p-6 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Share2 className="text-violet-400" size={18} /> Share Details on LinkedIn
                </h3>
                <button onClick={() => setIsShareModalOpen(false)} className="text-zinc-500 hover:text-white">✕</button>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-zinc-400">Select what details to share directly with <strong className="text-white">{activeContact.name}</strong> over LinkedIn:</p>
                <div className="space-y-2">
                  {[
                    { id: "PITCH_DECK", label: "Series A Pitch Deck & Metrics", desc: "Includes deck link and traction stats" },
                    { id: "CONTACT_CARD", label: "Contact Details & Office Location", desc: "Official email, phone, and Bengaluru address" },
                    { id: "MEETING_INVITE", label: "Calendar Meeting Slot Link", desc: "Direct 30-min scheduling link" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setShareType(option.id as any)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl border transition-all cursor-pointer",
                        shareType === option.id
                          ? "border-violet-500 bg-violet-500/10 text-white"
                          : "border-white/5 bg-white/5 text-zinc-400 hover:text-white"
                      )}
                    >
                      <h5 className="text-xs font-bold text-white">{option.label}</h5>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                <button onClick={() => setIsShareModalOpen(false)} className="px-4 py-2 text-xs text-zinc-400 hover:text-white">Cancel</button>
                <button
                  onClick={() => {
                    handleSendMessage(`[Shared via LinkedIn API]: ${shareType.replace(/_/g, " ")} details attached for review.`);
                    setIsShareModalOpen(false);
                  }}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-lg"
                >
                  Share via LinkedIn API
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
