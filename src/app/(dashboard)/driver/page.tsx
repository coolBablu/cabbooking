"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Car,
  TrendingUp,
  Clock,
  Star,
  MapPin,
  Navigation2,
  Bell,
  Fuel,
  Sparkles,
  Check,
  X,
  CalendarClock,
} from "lucide-react";
import {
  DashboardShell,
  DashboardTopbar,
} from "@/components/dashboard/DashboardSidebar";

const earnings = [
  { day: "Mon", value: 145 },
  { day: "Tue", value: 198 },
  { day: "Wed", value: 224 },
  { day: "Thu", value: 172 },
  { day: "Fri", value: 286 },
  { day: "Sat", value: 312 },
  { day: "Sun", value: 91 },
];

const requests = [
  {
    rider: "Maya Chen",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=85&auto=format&fit=crop",
    from: "Brooklyn Bridge",
    to: "JFK Terminal 4",
    distance: "18.4 mi",
    fare: "$28.40",
    eta: "2 min",
    type: "Luxe",
  },
  {
    rider: "Ravi Sharma",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=85&auto=format&fit=crop",
    from: "Soho Cafe",
    to: "Times Square",
    distance: "3.2 mi",
    fare: "$11.20",
    eta: "4 min",
    type: "Plus",
  },
  {
    rider: "Sara Linde",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=85&auto=format&fit=crop",
    from: "Hudson Yards",
    to: "Greenwich Village",
    distance: "5.1 mi",
    fare: "$14.80",
    eta: "5 min",
    type: "Lite",
  },
];

export default function DriverDashboardPage() {
  const [online, setOnline] = useState(true);
  const max = Math.max(...earnings.map((e) => e.value));

  return (
    <DashboardShell variant="driver">
      <DashboardTopbar
        title="Welcome back, Daniel"
        subtitle="Your highest earning day this month was Saturday."
        variant="driver"
      />

      <div className="space-y-6 p-5 md:p-8">
        {/* Online status */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl md:p-7 ${
            online
              ? "border-emerald-400/30 bg-gradient-to-br from-emerald-400/15 via-emerald-400/5 to-transparent"
              : "border-white/10 bg-white/[0.03]"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                {online && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
                )}
                <div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${
                    online ? "bg-emerald-400 text-ink-950" : "bg-white/10 text-white/70"
                  }`}
                >
                  <Car size={20} />
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">
                  Status
                </p>
                <p className="font-display text-2xl">
                  {online ? "You're online" : "You're offline"}
                </p>
                <p className="mt-0.5 text-xs text-white/55">
                  {online
                    ? "Listening for high-value trips in your zone"
                    : "Tap to start earning"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setOnline(!online)}
              className={`relative flex h-9 w-16 items-center rounded-full p-1 transition-colors ${
                online ? "bg-emerald-400" : "bg-white/15"
              }`}
            >
              <motion.span
                layout
                className={`block h-7 w-7 rounded-full bg-white shadow-md`}
                style={{ marginLeft: online ? "28px" : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard label="This week" value="$1,428.40" sub="+18% vs last week" icon={<TrendingUp size={18} />} color="text-emerald-400" />
          <StatCard label="Trips today" value="11" sub="6.4 hrs online" icon={<Car size={18} />} color="text-sunny-400" />
          <StatCard label="Rating" value="4.98★" sub="last 100 trips" icon={<Star size={18} />} color="text-electric-400" />
          <StatCard label="Acceptance" value="96%" sub="elite tier" icon={<Sparkles size={18} />} color="text-neon-purple" />
        </div>

        {/* Earnings chart + Goals */}
        <div className="grid gap-6 lg:grid-cols-3" id="earnings">
          <Card title="This week" sub="Earnings · last 7 days" className="lg:col-span-2">
            <div className="grid grid-cols-7 items-end gap-3 h-48">
              {earnings.map((e, i) => (
                <motion.div
                  key={e.day}
                  initial={{ height: 0 }}
                  animate={{ height: `${(e.value / max) * 100}%` }}
                  transition={{ delay: i * 0.07, duration: 0.6, ease: "easeOut" }}
                  className="relative group flex flex-col items-center justify-end"
                >
                  <div
                    className={`relative w-full rounded-xl ${
                      i === 5
                        ? "bg-gradient-to-t from-sunny-400 to-sunny-300"
                        : "bg-gradient-to-t from-electric-600 to-electric-400"
                    }`}
                    style={{ height: "100%" }}
                  >
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-ink-950 px-1.5 py-0.5 text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
                      ${e.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-7 text-center text-[11px] text-white/55">
              {earnings.map((e) => (
                <span key={e.day}>{e.day}</span>
              ))}
            </div>
          </Card>

          <Card title="Daily goal" sub="Stay above target">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[11px] uppercase tracking-wider text-white/55">
                Today
              </p>
              <p className="mt-1 font-display text-3xl">$224 / $250</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "89%" }}
                  transition={{ duration: 1.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300"
                />
              </div>
              <p className="mt-2 text-xs text-white/55">89% to your goal — go go go!</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Tile label="Online time" value="6.4 hrs" icon={<Clock size={14} />} />
              <Tile label="Avg / trip" value="$20.4" icon={<TrendingUp size={14} />} />
              <Tile label="Fuel saved" value="$18" icon={<Fuel size={14} />} />
              <Tile label="Bonus" value="$32" icon={<Sparkles size={14} />} />
            </div>
          </Card>
        </div>

        {/* Trip requests */}
        <Card
          title="Live trip requests"
          sub="Accept within 15 seconds to keep your acceptance rate"
          id="requests"
          action="Filter"
        >
          <div className="space-y-3">
            {requests.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-white/10">
                      <Image
                        src={r.img}
                        alt={r.rider}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{r.rider}</p>
                      <p className="text-[11px] text-white/55">
                        SwiftCab {r.type} • ETA {r.eta}
                      </p>
                    </div>
                  </div>

                  <div className="hidden flex-1 items-center gap-2 text-xs text-white/65 md:flex">
                    <MapPin size={12} className="text-sunny-400" />
                    <span className="truncate">{r.from}</span>
                    <span className="text-white/30">→</span>
                    <Navigation2 size={12} className="text-electric-400" />
                    <span className="truncate">{r.to}</span>
                  </div>

                  <div className="ml-auto flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-display text-base">{r.fare}</p>
                      <p className="text-[11px] text-white/55">{r.distance}</p>
                    </div>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:text-white">
                      <X size={14} />
                    </button>
                    <button className="flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300 px-4 text-xs font-bold text-ink-950">
                      <Check size={14} /> Accept
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Schedule + Analytics */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Schedule" sub="Plan your shifts" id="schedule">
            <div className="space-y-2">
              {[
                { d: "Today", h: "8:00 AM – 2:30 PM", l: "Manhattan + Brooklyn" },
                { d: "Tomorrow", h: "6:00 AM – 11:00 AM", l: "Airport corridor" },
                { d: "Sat May 23", h: "5:00 PM – 11:00 PM", l: "Nightlife zones" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sunny-400/15 text-sunny-400">
                    <CalendarClock size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{s.d}</p>
                    <p className="text-xs text-white/55">{s.h} · {s.l}</p>
                  </div>
                  <button className="text-[11px] text-sunny-400 hover:underline">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Analytics" sub="Last 30 days" id="analytics">
            <div className="space-y-3">
              {[
                { label: "Acceptance rate", v: 96, c: "from-emerald-400 to-emerald-300" },
                { label: "Cancellation rate", v: 2, c: "from-rose-400 to-rose-300" },
                { label: "5-star ratings", v: 88, c: "from-sunny-400 to-sunny-300" },
                { label: "Repeat riders", v: 41, c: "from-electric-400 to-electric-300" },
              ].map((a) => (
                <div key={a.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">{a.label}</span>
                    <span className="font-semibold text-white">{a.v}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${a.v}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${a.c}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Riders */}
        <Card title="Top riders this week" id="riders" action="See all">
          <div className="grid gap-2 md:grid-cols-2">
            {[
              { name: "Maya Chen", trips: 8, fare: "$184", initials: "MC", tone: "from-electric-400 to-neon-purple" },
              { name: "Marcus Chen", trips: 6, fare: "$142", initials: "MC", tone: "from-sunny-400 to-sunny-300" },
              { name: "Priya Mehta", trips: 5, fare: "$98", initials: "PM", tone: "from-emerald-400 to-emerald-300" },
              { name: "Sara Linde", trips: 4, fare: "$76", initials: "SL", tone: "from-rose-400 to-rose-300" },
            ].map((r) => (
              <div
                key={r.name}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr ${r.tone} text-xs font-bold text-ink-950`}
                >
                  {r.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{r.name}</p>
                  <p className="text-[11px] text-white/55">{r.trips} trips this week</p>
                </div>
                <p className="font-display text-sm">{r.fare}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card title="Recent activity">
          <div className="space-y-2">
            {[
              { icon: <Bell size={14} className="text-sunny-400" />, t: "Bonus unlocked: +$32 for 10 trips on Sunday", d: "1 hr ago" },
              { icon: <Star size={14} className="text-electric-400" />, t: "Maya rated you 5 stars: 'A literal sunshine driver'", d: "2 hrs ago" },
              { icon: <Sparkles size={14} className="text-emerald-400" />, t: "You moved up to Elite tier — keep it up", d: "Yesterday" },
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
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
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

function Tile({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/55">
        {icon} {label}
      </div>
      <p className="mt-1 font-display text-base">{value}</p>
    </div>
  );
}

function Card({
  title,
  sub,
  id,
  action,
  className,
  children,
}: {
  title: string;
  sub?: string;
  id?: string;
  action?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`rounded-3xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl md:p-6 ${
        className ?? ""
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg">{title}</h3>
          {sub && <p className="text-xs text-white/55">{sub}</p>}
        </div>
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
