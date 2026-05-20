"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Send,
  Paperclip,
  Sparkles,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { AdminShell, AdminTopbar } from "@/components/admin/AdminShell";
import { AdminCard, StatusPill, FilterBar } from "@/components/admin/AdminUI";

type Ticket = {
  id: string;
  subject: string;
  user: string;
  initials: string;
  channel: "Email" | "Chat" | "Phone";
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "open" | "in-progress" | "resolved";
  updated: string;
  preview: string;
};

const TICKETS: Ticket[] = [
  { id: "T-9881", subject: "Driver took the wrong route", user: "Maya Chen", initials: "MC", channel: "Chat", priority: "High", status: "open", updated: "2 min ago", preview: "My driver took a route that was 14 minutes longer…" },
  { id: "T-9880", subject: "Refund not received yet", user: "Marcus Chen", initials: "MC", channel: "Email", priority: "Medium", status: "in-progress", updated: "12 min ago", preview: "I cancelled a Luxe ride yesterday at 8 pm and…" },
  { id: "T-9879", subject: "App crashes on iOS 18", user: "Sara Linde", initials: "SL", channel: "Email", priority: "Urgent", status: "open", updated: "24 min ago", preview: "After updating to iOS 18, the app crashes whenever…" },
  { id: "T-9878", subject: "Suggestion: schedule rides", user: "Priya Mehta", initials: "PM", channel: "Chat", priority: "Low", status: "open", updated: "1 hr ago", preview: "Hi team, would love an option to schedule recurring…" },
  { id: "T-9877", subject: "Driver was very kind 🙏", user: "Emma Larsen", initials: "EL", channel: "Email", priority: "Low", status: "resolved", updated: "2 hrs ago", preview: "Just wanted to say Daniel was incredible — please…" },
  { id: "T-9876", subject: "Charged twice for ride SW-24400", user: "Daniel Park", initials: "DP", channel: "Phone", priority: "High", status: "in-progress", updated: "3 hrs ago", preview: "I see two charges for the same booking on my statement…" },
];

const FILTERS = ["All", "Open", "In progress", "Resolved"];

const STATUS_MAP: Record<string, string> = {
  All: "all",
  Open: "open",
  "In progress": "in-progress",
  Resolved: "resolved",
};

export default function AdminSupportPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<string>(TICKETS[0].id);
  const [reply, setReply] = useState("");

  const filtered = useMemo(() => {
    return TICKETS.filter((t) => {
      const want = STATUS_MAP[filter];
      if (want !== "all" && t.status !== want) return false;
      const q = query.toLowerCase();
      if (!q) return true;
      return (
        t.id.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.user.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  const selected = TICKETS.find((t) => t.id === selectedId) ?? TICKETS[0];

  return (
    <AdminShell>
      <AdminTopbar
        title="Support tickets"
        subtitle="Reach inbox zero. Median first-response under 3 minutes."
        action={
          <button className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-yellow sm:inline-flex">
            <Plus size={14} /> New ticket
          </button>
        }
      />

      <div className="space-y-4 p-5 md:p-8">
        {/* KPIs */}
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { l: "Open tickets", v: "84", c: "text-rose-400", icon: <AlertTriangle size={14} /> },
            { l: "Avg first response", v: "2.4 min", c: "text-sunny-400", icon: <Clock size={14} /> },
            { l: "Resolved today", v: "412", c: "text-emerald-400", icon: <CheckCircle2 size={14} /> },
            { l: "CSAT score", v: "4.94 / 5", c: "text-electric-400", icon: <Sparkles size={14} /> },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/55">
                {s.icon} {s.l}
              </div>
              <p className={`mt-1 font-display text-2xl ${s.c}`}>{s.v}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* List */}
          <AdminCard className="lg:col-span-5">
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                <Search size={14} className="text-white/55" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tickets…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                />
              </div>
              <FilterBar filters={FILTERS} active={filter} onSelect={setFilter} />
            </div>

            <div className="space-y-2">
              <AnimatePresence>
                {filtered.map((t, i) => {
                  const active = t.id === selectedId;
                  return (
                    <motion.button
                      key={t.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => setSelectedId(t.id)}
                      className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition ${
                        active
                          ? "border-sunny-400/60 bg-sunny-400/10"
                          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-electric-400 to-neon-purple text-xs font-bold text-ink-950">
                          {t.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-semibold">{t.subject}</p>
                            <p className="shrink-0 text-[10px] text-white/45">
                              {t.updated}
                            </p>
                          </div>
                          <p className="mt-0.5 text-[11px] text-white/55">
                            {t.user} · {t.channel} · {t.id}
                          </p>
                          <p className="mt-2 line-clamp-1 text-xs text-white/70">
                            {t.preview}
                          </p>

                          <div className="mt-3 flex items-center gap-2">
                            <PriorityPill priority={t.priority} />
                            <StatusPill status={t.status} />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
              {filtered.length === 0 && (
                <p className="py-10 text-center text-sm text-white/55">
                  No tickets match your filters.
                </p>
              )}
            </div>
          </AdminCard>

          {/* Conversation */}
          <AdminCard className="lg:col-span-7">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-white/55">
                  {selected.id} · {selected.channel}
                </div>
                <h2 className="mt-1 font-display text-xl">{selected.subject}</h2>
                <p className="mt-1 text-sm text-white/65">{selected.user}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusPill status={selected.status} />
                <PriorityPill priority={selected.priority} />
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              <Message
                from={selected.user}
                me={false}
                time={selected.updated}
                initials={selected.initials}
                text={selected.preview}
              />
              <Message
                from="Sasha Romanov · Support"
                me
                time="just now"
                initials="SR"
                text="Hi! I'm so sorry to hear about that. I've pulled up the ride — looking into the AI route logs now. Will have an update within 5 minutes."
              />
              <Message
                from={selected.user}
                me={false}
                time="2 min ago"
                initials={selected.initials}
                text="Thanks so much — appreciate you being quick on this."
              />
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={3}
                placeholder="Type your response…"
                className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-white/40"
              />
              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <div className="flex items-center gap-2">
                  <button className="rounded-lg p-2 text-white/55 hover:bg-white/[0.05] hover:text-white">
                    <Paperclip size={14} />
                  </button>
                  <button className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/75 hover:bg-white/[0.08]">
                    AI suggest reply
                  </button>
                </div>
                <button
                  onClick={() => setReply("")}
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-4 py-2 text-xs font-semibold text-ink-950 shadow-glow-yellow"
                >
                  Send <Send size={12} />
                </button>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </AdminShell>
  );
}

function PriorityPill({ priority }: { priority: "Low" | "Medium" | "High" | "Urgent" }) {
  const map = {
    Low: "border-white/15 bg-white/[0.05] text-white/65",
    Medium: "border-electric-400/30 bg-electric-400/15 text-electric-300",
    High: "border-sunny-400/30 bg-sunny-400/15 text-sunny-300",
    Urgent: "border-rose-400/40 bg-rose-400/20 text-rose-200",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${map[priority]}`}
    >
      {priority}
    </span>
  );
}

function Message({
  from,
  me,
  time,
  initials,
  text,
}: {
  from: string;
  me: boolean;
  time: string;
  initials: string;
  text: string;
}) {
  return (
    <div className={`flex gap-3 ${me ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
          me
            ? "bg-gradient-to-tr from-sunny-400 to-sunny-300 text-ink-950"
            : "bg-gradient-to-tr from-electric-400 to-neon-purple text-ink-950"
        }`}
      >
        {initials}
      </div>
      <div className={`max-w-[80%] ${me ? "text-right" : ""}`}>
        <p className="text-[11px] text-white/55">
          {from} · {time}
        </p>
        <div
          className={`mt-1 inline-block rounded-2xl px-3.5 py-2.5 text-sm ${
            me
              ? "rounded-tr-sm bg-sunny-400/15 text-white"
              : "rounded-tl-sm border border-white/10 bg-white/[0.05] text-white/90"
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
