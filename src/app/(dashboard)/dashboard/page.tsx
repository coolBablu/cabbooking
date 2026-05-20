"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Car,
  MapPin,
  Plus,
  Wallet,
  Gift,
  TrendingUp,
  Star,
  Bell,
  Sparkles,
  ChevronRight,
  Crown,
  CalendarClock,
  ArrowUpRight,
} from "lucide-react";
import {
  DashboardShell,
  DashboardTopbar,
} from "@/components/dashboard/DashboardSidebar";
import { ROUTES } from "@/lib/routes";

const trips = [
  {
    from: "Home · Brooklyn",
    to: "JFK International, T4",
    date: "May 18 · 6:24 PM",
    price: "$28.40",
    rating: 5,
    status: "Completed",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&q=85&auto=format&fit=crop",
  },
  {
    from: "Soho Coffee",
    to: "Brooklyn Bridge",
    date: "May 17 · 9:12 AM",
    price: "$11.20",
    rating: 5,
    status: "Completed",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&q=85&auto=format&fit=crop",
  },
  {
    from: "MoMA Museum",
    to: "Times Square",
    date: "May 15 · 7:48 PM",
    price: "$9.50",
    rating: 5,
    status: "Completed",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=200&q=85&auto=format&fit=crop",
  },
  {
    from: "Home · Brooklyn",
    to: "WeWork Bryant Park",
    date: "May 14 · 8:32 AM",
    price: "$14.80",
    rating: 4,
    status: "Completed",
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&q=85&auto=format&fit=crop",
  },
];

const saved = [
  { label: "Home", addr: "1255 Court St, Brooklyn", icon: "🏠" },
  { label: "Work", addr: "WeWork Bryant Park, 5th Floor", icon: "💼" },
  { label: "Gym", addr: "Equinox Soho", icon: "💪" },
  { label: "Mom's place", addr: "Park Slope, 78th Ave", icon: "❤️" },
];

export default function UserDashboardPage() {
  return (
    <DashboardShell variant="user">
      <DashboardTopbar
        title="Good afternoon, Alex 👋"
        subtitle="Here's what's new on your SwiftCab today."
      />

      <div className="space-y-6 p-5 md:p-8">
        {/* Stat row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total trips"
            value="64"
            sub="+8 this month"
            icon={<Car size={18} />}
            color="text-electric-400"
          />
          <StatCard
            label="Spent this month"
            value="$284.40"
            sub="–12% vs Apr"
            icon={<Wallet size={18} />}
            color="text-sunny-400"
          />
          <StatCard
            label="Saved with Plus"
            value="$142.80"
            sub="vs standard fares"
            icon={<TrendingUp size={18} />}
            color="text-emerald-400"
          />
          <StatCard
            label="Wallet balance"
            value="$48.20"
            sub="Auto-top-up on"
            icon={<Sparkles size={18} />}
            color="text-neon-purple"
          />
        </div>

        {/* Hero — Book a ride */}
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sunny-400/15 via-electric-500/10 to-transparent p-6 backdrop-blur-xl md:p-8"
          >
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-sunny-400/20 blur-3xl" />
            <p className="text-[11px] uppercase tracking-[0.18em] text-sunny-400">
              Quick book
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">
              Where to today?
            </h2>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-950/50 px-4 py-3 backdrop-blur">
                <MapPin size={16} className="text-sunny-400" />
                <input
                  defaultValue="Home · Brooklyn"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                />
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-950/50 px-4 py-3 backdrop-blur">
                <MapPin size={16} className="text-electric-400" />
                <input
                  placeholder="Where to?"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                />
              </div>
              <Link href={ROUTES.booking}>
                <motion.span
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sunny-400 to-sunny-300 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-yellow"
                >
                  Find a ride <ChevronRight size={14} />
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* Membership card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neon-purple/25 via-electric-500/15 to-transparent p-6 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-sunny-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sunny-400">
                Plus member
              </span>
              <Crown size={20} className="text-sunny-400" />
            </div>
            <p className="mt-6 font-display text-4xl tracking-tight">
              $9 / mo
            </p>
            <p className="mt-1 text-xs text-white/55">Renews Jun 12</p>

            <div className="mt-5 space-y-1.5 text-sm text-white/80">
              <p>✓ 10% off every ride</p>
              <p>✓ Surge protection 1.5x</p>
              <p>✓ Priority pickup</p>
            </div>

            <Link
              href={ROUTES.pricing}
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sunny-400 hover:underline"
            >
              Upgrade to Luxe <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Saved places */}
        <Card title="Saved places" id="saved" action="Manage">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {saved.map((s) => (
              <motion.button
                whileHover={{ y: -4 }}
                key={s.label}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:bg-white/[0.05]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-xl">
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="truncate text-xs text-white/55">{s.addr}</p>
                </div>
              </motion.button>
            ))}
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-4 text-sm text-white/65 transition-colors hover:bg-white/[0.04] hover:text-white sm:col-span-2 lg:col-span-1">
              <Plus size={14} /> Add new place
            </button>
          </div>
        </Card>

        {/* Recent trips */}
        <Card title="Recent trips" id="trips" action="View all">
          <div className="space-y-3">
            {trips.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
              >
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={t.img}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {t.from} → {t.to}
                  </p>
                  <p className="text-xs text-white/55">{t.date} · {t.status}</p>
                </div>
                <div className="hidden items-center gap-1 text-sunny-400 sm:flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <p className="font-display text-base">{t.price}</p>
                <ChevronRight size={14} className="text-white/40" />
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Wallet + Rewards */}
        <div className="grid gap-6 lg:grid-cols-2" id="wallet">
          <Card title="Wallet" action="Top up">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-electric-700 via-electric-600 to-ink-900 p-6">
              <p className="text-xs text-white/70">SwiftPay balance</p>
              <p className="mt-1 font-display text-4xl">$48.20</p>
              <p className="mt-1 text-[11px] text-white/55">
                Auto-top-up enabled · Recharges below $10
              </p>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs text-white/65">•••• •••• •••• 4242</p>
                <p className="text-xs text-white/65">Visa</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["$20", "$50", "$100"].map((a) => (
                <button
                  key={a}
                  className="rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-sm font-semibold text-white/85 transition-colors hover:bg-white/[0.06]"
                >
                  {a}
                </button>
              ))}
            </div>
          </Card>

          <Card title="Loyalty & Rewards" action="See all">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-sunny-400/15 to-transparent p-5">
              <div className="flex items-center gap-3">
                <Gift size={20} className="text-sunny-400" />
                <p className="font-display text-lg">SwiftStar tier · Gold</p>
              </div>
              <p className="mt-2 text-xs text-white/60">
                420 more points until Platinum
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "68%" }}
                  transition={{ duration: 1.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {[
                { t: "First ride free credit", v: "Used May 12" },
                { t: "Refer a friend → +$10", v: "2 friends invited" },
                { t: "20% Luxe upgrade", v: "Expires Jun 30" },
              ].map((r) => (
                <div
                  key={r.t}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <p className="text-sm">{r.t}</p>
                  <p className="text-[11px] text-white/55">{r.v}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Notifications */}
        <Card title="Notifications" id="alerts" action="Mark all read">
          <div className="space-y-2">
            {[
              {
                icon: <Bell size={14} className="text-sunny-400" />,
                t: "Your driver Daniel is arriving in 2 min",
                d: "2 min ago",
              },
              {
                icon: <Gift size={14} className="text-emerald-400" />,
                t: "New coupon: SWIFT30 — 30% off your next 3 rides",
                d: "Today",
              },
              {
                icon: <Star size={14} className="text-electric-400" />,
                t: "You rated Daniel 5 stars. Thanks for the kindness!",
                d: "Yesterday",
              },
              {
                icon: <CalendarClock size={14} className="text-neon-purple" />,
                t: "Schedule reminder: Airport ride Saturday 6 AM",
                d: "2 days ago",
              },
            ].map((n, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05]">
                  {n.icon}
                </div>
                <p className="flex-1 text-sm">{n.t}</p>
                <p className="text-[11px] text-white/45">{n.d}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Settings */}
        <Card title="Account settings" id="settings" action="Edit profile">
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { label: "Full name", value: "Maya Chen" },
              { label: "Email", value: "maya@swiftcab.com" },
              { label: "Phone", value: "+1 (555) 010 4421" },
              { label: "Home city", value: "New York" },
              { label: "Preferred ride type", value: "SwiftCab Plus" },
              { label: "Language", value: "English" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-[10px] uppercase tracking-wider text-white/55">
                  {s.label}
                </p>
                <p className="mt-1 text-sm">{s.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">
          {label}
        </p>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] ${color}`}
        >
          {icon}
        </div>
      </div>
      <p className="mt-3 font-display text-3xl">{value}</p>
      <p className="mt-1 text-xs text-white/55">{sub}</p>
    </motion.div>
  );
}

function Card({
  title,
  id,
  action,
  children,
}: {
  title: string;
  id?: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl md:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg">{title}</h3>
        {action && (
          <button className="text-xs text-sunny-400 hover:underline">
            {action}
          </button>
        )}
      </div>
      {children}
    </section>
  );
}
