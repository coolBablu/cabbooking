"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Car,
  DollarSign,
  Activity,
  AlertCircle,
  MapPin,
  Navigation2,
  Clock,
} from "lucide-react";
import { AdminShell, AdminTopbar } from "@/components/admin/AdminShell";
import { AdminCard as Card, StatusPill } from "@/components/admin/AdminUI";

const revenue = [42, 58, 49, 72, 64, 88, 76, 91, 84, 102, 96, 118];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const cityHeat = [
  { city: "New York", rides: 18420, growth: 12 },
  { city: "London", rides: 14210, growth: 9 },
  { city: "Bangalore", rides: 12890, growth: 28 },
  { city: "Dubai", rides: 9740, growth: 6 },
  { city: "Berlin", rides: 8100, growth: 14 },
  { city: "Singapore", rides: 7320, growth: 18 },
];

const recent = [
  { id: "SW-2451", rider: "Maya Chen", driver: "Daniel O.", route: "Brooklyn → JFK", fare: "$28.40", status: "completed" },
  { id: "SW-2452", rider: "Priya M.", driver: "Sara K.", route: "Soho → Times Sq", fare: "$11.20", status: "in-progress" },
  { id: "SW-2453", rider: "Marcus C.", driver: "Ravi P.", route: "Hudson → Greenwich", fare: "$14.80", status: "completed" },
  { id: "SW-2454", rider: "Sara L.", driver: "Daniel O.", route: "MoMA → Times Sq", fare: "$9.50", status: "cancelled" },
  { id: "SW-2455", rider: "Emma L.", driver: "Marcus J.", route: "Brooklyn → Manhattan", fare: "$18.60", status: "completed" },
];

export default function AdminDashboardPage() {
  const max = Math.max(...revenue);

  return (
    <AdminShell>
      <AdminTopbar
        title="Overview"
        subtitle="Real-time pulse of the SwiftCab network"
      />

      <div className="space-y-6 p-5 md:p-8">
        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPI
            label="Total revenue"
            value="$2.84M"
            delta="+18%"
            up
            icon={<DollarSign size={18} />}
            color="text-emerald-400"
          />
          <KPI
            label="Active rides"
            value="1,248"
            delta="+12%"
            up
            icon={<Car size={18} />}
            color="text-sunny-400"
          />
          <KPI
            label="Total users"
            value="248,310"
            delta="+8%"
            up
            icon={<Users size={18} />}
            color="text-electric-400"
          />
          <KPI
            label="Cancellations"
            value="2.1%"
            delta="−0.3%"
            up={false}
            icon={<Activity size={18} />}
            color="text-rose-400"
          />
        </div>

        {/* Revenue chart + System health */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card title="Revenue · 12 months" sub="Monthly gross, in $M" className="lg:col-span-2">
            <div className="grid grid-cols-12 items-end gap-2 h-56">
              {revenue.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / max) * 100}%` }}
                  transition={{ delay: i * 0.04, duration: 0.6, ease: "easeOut" }}
                  className="group relative w-full flex flex-col items-center justify-end"
                >
                  <div className="relative w-full rounded-lg bg-gradient-to-t from-electric-700 to-electric-400" style={{ height: "100%" }}>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-ink-950 px-1.5 py-0.5 text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
                      ${v}M
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-12 text-center text-[10px] text-white/55">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </Card>

          <Card title="System health" sub="Live">
            <div className="space-y-3">
              {[
                { label: "API uptime", v: 99.97, c: "from-emerald-400 to-emerald-300" },
                { label: "Match success", v: 96.4, c: "from-sunny-400 to-sunny-300" },
                { label: "Avg pickup ETA", v: 82, c: "from-electric-400 to-electric-300", note: "2.4 min" },
                { label: "Payment success", v: 99.2, c: "from-emerald-400 to-emerald-300" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">{m.label}</span>
                    <span className="font-semibold text-white">{m.note ?? `${m.v}%`}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.v}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${m.c}`}
                    />
                  </div>
                </div>
              ))}

              <div className="mt-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-200">
                  <AlertCircle size={14} /> 1 incident under investigation
                </div>
                <p className="mt-1 text-[11px] text-white/65">
                  Elevated p99 latency on Bangalore region. ETA: 14 min.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live + Cities */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Live activity" sub="Last 10 minutes">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Active rides", v: "1,248", icon: <Car size={14} /> },
                { label: "Online drivers", v: "8,420", icon: <Users size={14} /> },
                { label: "Avg ETA", v: "2.4 min", icon: <Clock size={14} /> },
              ].map((l) => (
                <div
                  key={l.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/55">
                    {l.icon} {l.label}
                  </div>
                  <p className="mt-1 font-display text-lg">{l.v}</p>
                </div>
              ))}
            </div>

            {/* Mini map */}
            <div className="relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-ink-950/40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.3),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(250,204,21,0.2),transparent_45%)]" />
              <div className="absolute inset-0 bg-grid-pattern bg-[size:24px_24px] opacity-30" />
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-emerald-400"
                  style={{
                    left: `${(i * 47) % 95}%`,
                    top: `${(i * 31) % 88}%`,
                    boxShadow: "0 0 12px #34d399",
                  }}
                />
              ))}
              <div className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-[10px] text-emerald-300 backdrop-blur">
                ● 1,248 active rides
              </div>
            </div>
          </Card>

          <Card title="Top cities" sub="By active rides this hour">
            <div className="space-y-3">
              {cityHeat.map((c, i) => {
                const pct = (c.rides / cityHeat[0].rides) * 100;
                return (
                  <motion.div
                    key={c.city}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/85">{c.city}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white/65">{c.rides.toLocaleString()}</span>
                        <span className="flex items-center gap-0.5 rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                          <TrendingUp size={10} />+{c.growth}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.05 }}
                        className="h-full rounded-full bg-gradient-to-r from-sunny-400 via-electric-400 to-neon-purple"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Recent bookings */}
        <Card title="Recent bookings" sub="Last 5 trips" action="View all">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-[11px] uppercase tracking-wider text-white/55">
                <tr>
                  <th className="pb-3 pr-4 font-medium">ID</th>
                  <th className="pb-3 pr-4 font-medium">Rider</th>
                  <th className="pb-3 pr-4 font-medium">Driver</th>
                  <th className="pb-3 pr-4 font-medium">Route</th>
                  <th className="pb-3 pr-4 font-medium">Fare</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-white/5 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="py-3 pr-4 font-mono text-xs text-white/85">
                      {r.id}
                    </td>
                    <td className="py-3 pr-4">{r.rider}</td>
                    <td className="py-3 pr-4 text-white/65">{r.driver}</td>
                    <td className="py-3 pr-4 text-white/70">
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPin size={11} className="text-sunny-400" />
                        {r.route.split("→")[0].trim()}
                        <span className="text-white/30">→</span>
                        <Navigation2 size={11} className="text-electric-400" />
                        {r.route.split("→")[1].trim()}
                      </div>
                    </td>
                    <td className="py-3 pr-4 font-semibold">{r.fare}</td>
                    <td className="py-3 pr-4">
                      <StatusPill status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}

function KPI({
  label,
  value,
  delta,
  up,
  icon,
  color,
}: {
  label: string;
  value: string;
  delta: string;
  up: boolean;
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
      <div className="mt-2 flex items-center gap-1 text-xs">
        {up ? (
          <TrendingUp size={12} className="text-emerald-400" />
        ) : (
          <TrendingDown size={12} className="text-rose-400" />
        )}
        <span className={up ? "text-emerald-400" : "text-rose-400"}>{delta}</span>
        <span className="text-white/45">vs last month</span>
      </div>
    </motion.div>
  );
}

