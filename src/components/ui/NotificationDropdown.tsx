"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Car,
  CreditCard,
  Gift,
  Sparkles,
  CheckCheck,
  Settings,
  AlertCircle,
  Star,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type NotificationVariant = "user" | "driver" | "admin";

type Tone = "sunny" | "electric" | "emerald" | "rose" | "purple";

type Notif = {
  id: string;
  icon: LucideIcon;
  tone: Tone;
  title: string;
  body: string;
  time: string;
  href?: string;
  unread: boolean;
};

const TONE_BG: Record<Tone, string> = {
  sunny: "bg-sunny-400/15 text-sunny-300",
  electric: "bg-electric-400/15 text-electric-300",
  emerald: "bg-emerald-400/15 text-emerald-300",
  rose: "bg-rose-400/15 text-rose-300",
  purple: "bg-neon-purple/20 text-purple-300",
};

const TONE_DOT: Record<Tone, string> = {
  sunny: "bg-sunny-400",
  electric: "bg-electric-400",
  emerald: "bg-emerald-400",
  rose: "bg-rose-400",
  purple: "bg-neon-purple",
};

const SAMPLES: Record<NotificationVariant, Notif[]> = {
  user: [
    {
      id: "n1",
      icon: Car,
      tone: "sunny",
      title: "Your driver Daniel is arriving",
      body: "Tesla Model Y · ABC 4421 · 2 min away",
      time: "Just now",
      href: "/ride/sw-2451",
      unread: true,
    },
    {
      id: "n2",
      icon: Gift,
      tone: "purple",
      title: "Reward unlocked",
      body: "You earned 200 SwiftPoints from your last trip.",
      time: "12 min ago",
      href: "/dashboard",
      unread: true,
    },
    {
      id: "n3",
      icon: CreditCard,
      tone: "emerald",
      title: "Payment receipt",
      body: "$14.80 charged to Visa •••• 4421 for ride SW-24514.",
      time: "1 hr ago",
      href: "/dashboard",
      unread: false,
    },
    {
      id: "n4",
      icon: Sparkles,
      tone: "electric",
      title: "Plus member perks",
      body: "Free upgrades all weekend — your loyalty tier just leveled up.",
      time: "Yesterday",
      href: "/pricing",
      unread: false,
    },
  ],
  driver: [
    {
      id: "n1",
      icon: Car,
      tone: "sunny",
      title: "New ride request nearby",
      body: "Maya · 1.2 km away · est. $12.40",
      time: "Just now",
      href: "/driver",
      unread: true,
    },
    {
      id: "n2",
      icon: TrendingUp,
      tone: "emerald",
      title: "Weekly earnings recap",
      body: "You earned $642 across 38 trips — top 5% in your city.",
      time: "3 hr ago",
      href: "/driver",
      unread: true,
    },
    {
      id: "n3",
      icon: Star,
      tone: "purple",
      title: "5-star streak",
      body: "12 consecutive 5-star ratings. Keep it up!",
      time: "Yesterday",
      href: "/driver",
      unread: false,
    },
  ],
  admin: [
    {
      id: "n1",
      icon: AlertCircle,
      tone: "rose",
      title: "Incident: Bangalore region",
      body: "Elevated p99 latency — investigation in progress.",
      time: "2 min ago",
      href: "/admin",
      unread: true,
    },
    {
      id: "n2",
      icon: Star,
      tone: "sunny",
      title: "Driver flagged for review",
      body: "Daniel Okafor — 2 customer complaints in 48 hrs.",
      time: "14 min ago",
      href: "/admin/drivers",
      unread: true,
    },
    {
      id: "n3",
      icon: CreditCard,
      tone: "electric",
      title: "Refund requested",
      body: "Booking SW-24515 — $9.50 — awaiting approval.",
      time: "1 hr ago",
      href: "/admin/payments",
      unread: true,
    },
    {
      id: "n4",
      icon: TrendingUp,
      tone: "emerald",
      title: "Revenue milestone",
      body: "You just crossed $2.84M monthly gross. 🎉",
      time: "Today",
      href: "/admin",
      unread: false,
    },
  ],
};

const ALIGN_CLASS: Record<NotificationVariant, string> = {
  user: "ring-sunny-400/60",
  driver: "ring-emerald-400/60",
  admin: "ring-rose-400/60",
};

const DOT_COLOR: Record<NotificationVariant, string> = {
  user: "bg-sunny-400",
  driver: "bg-emerald-400",
  admin: "bg-rose-400",
};

export function NotificationDropdown({
  variant = "user",
}: {
  variant?: NotificationVariant;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notif[]>(SAMPLES[variant]);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = items.filter((n) => n.unread).length;

  // Click outside / Escape to close
  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function markRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        aria-expanded={open}
        className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition-colors hover:bg-white/[0.08] ${
          open ? `ring-2 ${ALIGN_CLASS[variant]}` : ""
        }`}
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span
            className={`absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-ink-950 ${DOT_COLOR[variant]}`}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-[min(92vw,22rem)] origin-top-right overflow-hidden rounded-3xl border border-white/10 bg-ink-950/95 shadow-2xl shadow-black/40 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="font-display text-base">Notifications</p>
                <p className="text-[10px] uppercase tracking-wider text-white/55">
                  {unreadCount > 0
                    ? `${unreadCount} unread`
                    : "You're all caught up"}
                </p>
              </div>
              <button
                onClick={markAllRead}
                disabled={unreadCount === 0}
                className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/75 transition-colors hover:bg-white/[0.08] disabled:opacity-50"
              >
                <CheckCheck size={11} /> Mark all read
              </button>
            </div>

            {/* List */}
            <div className="max-h-[60vh] overflow-y-auto">
              {items.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-white/55">
                  No notifications yet.
                </div>
              ) : (
                items.map((n) => {
                  const Inner = (
                    <div className="flex gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${TONE_BG[n.tone]}`}
                      >
                        <n.icon size={15} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-white">
                            {n.title}
                          </p>
                          {n.unread && (
                            <span
                              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${TONE_DOT[n.tone]}`}
                            />
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-white/65 line-clamp-2">
                          {n.body}
                        </p>
                        <p className="mt-1 text-[10px] text-white/40">{n.time}</p>
                      </div>
                    </div>
                  );

                  const baseCls =
                    "block w-full px-4 py-3 text-left transition-colors hover:bg-white/[0.04]" +
                    (n.unread ? " bg-white/[0.02]" : "");

                  if (n.href) {
                    return (
                      <Link
                        key={n.id}
                        href={n.href}
                        onClick={() => {
                          markRead(n.id);
                          setOpen(false);
                        }}
                        className={baseCls}
                      >
                        {Inner}
                      </Link>
                    );
                  }
                  return (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={baseCls}
                    >
                      {Inner}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-2.5">
              <Link
                href={
                  variant === "admin"
                    ? "/admin/settings"
                    : variant === "driver"
                    ? "/driver"
                    : "/dashboard"
                }
                onClick={() => setOpen(false)}
                className="flex items-center gap-1.5 text-[11px] text-white/65 hover:text-white"
              >
                <Settings size={11} /> Notification settings
              </Link>
              <Link
                href={
                  variant === "admin"
                    ? "/admin"
                    : variant === "driver"
                    ? "/driver"
                    : "/dashboard"
                }
                onClick={() => setOpen(false)}
                className="text-[11px] font-semibold text-sunny-400 hover:underline"
              >
                View all →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
