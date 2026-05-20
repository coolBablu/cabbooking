"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Star,
  Phone,
  MoreHorizontal,
  Car,
  TrendingUp,
} from "lucide-react";
import { AdminShell, AdminTopbar } from "@/components/admin/AdminShell";
import { AdminCard, StatusPill, FilterBar } from "@/components/admin/AdminUI";

type Driver = {
  id: string;
  name: string;
  phone: string;
  city: string;
  rating: number;
  trips: number;
  earnings: number;
  vehicle: string;
  plate: string;
  status: "active" | "suspended" | "pending_verification";
  initials: string;
  tier: "Elite" | "Pro" | "Standard";
};

const DRIVERS: Driver[] = [
  { id: "DR-1042", name: "Daniel Okafor", phone: "+1 555 010 1042", city: "New York", rating: 4.98, trips: 2481, earnings: 28420, vehicle: "Tesla Model Y", plate: "ABC 4421", status: "active", initials: "DO", tier: "Elite" },
  { id: "DR-1043", name: "Sara Kovacs", phone: "+44 20 7946 1042", city: "London", rating: 4.92, trips: 1842, earnings: 21200, vehicle: "BMW i4", plate: "LON 882", status: "active", initials: "SK", tier: "Elite" },
  { id: "DR-1044", name: "Ravi Patel", phone: "+91 98 4421 1042", city: "Bangalore", rating: 4.87, trips: 3120, earnings: 8420, vehicle: "Hyundai Verna", plate: "KA 01 4421", status: "active", initials: "RP", tier: "Pro" },
  { id: "DR-1045", name: "Aisha Khan", phone: "+91 98 8821 1042", city: "Bangalore", rating: 4.95, trips: 980, earnings: 4220, vehicle: "Honda Activa", plate: "KA 51 8821", status: "active", initials: "AK", tier: "Pro" },
  { id: "DR-1046", name: "Marcus Junior", phone: "+1 555 010 4421", city: "New York", rating: 4.71, trips: 412, earnings: 6240, vehicle: "Toyota Camry", plate: "NYC 6240", status: "pending_verification", initials: "MJ", tier: "Standard" },
  { id: "DR-1047", name: "Olivia Stone", phone: "+44 20 7946 8821", city: "London", rating: 4.45, trips: 220, earnings: 2840, vehicle: "Ford Focus", plate: "LON 552", status: "suspended", initials: "OS", tier: "Standard" },
  { id: "DR-1048", name: "Jiro Tanaka", phone: "+81 90 1234 1042", city: "Tokyo", rating: 4.96, trips: 1620, earnings: 18400, vehicle: "Toyota Crown", plate: "TYO 4421", status: "active", initials: "JT", tier: "Elite" },
  { id: "DR-1049", name: "Mark Friedman", phone: "+49 30 4421 8821", city: "Berlin", rating: 4.82, trips: 740, earnings: 9820, vehicle: "Mercedes E", plate: "B-MF 442", status: "active", initials: "MF", tier: "Pro" },
];

const FILTERS = ["All", "Active", "Pending verification", "Suspended"];

const STATUS_MAP: Record<string, string> = {
  All: "all",
  Active: "active",
  "Pending verification": "pending_verification",
  Suspended: "suspended",
};

export default function AdminDriversPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return DRIVERS.filter((d) => {
      const want = STATUS_MAP[filter];
      if (want !== "all" && d.status !== want) return false;
      const q = query.toLowerCase();
      if (!q) return true;
      return (
        d.id.toLowerCase().includes(q) ||
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.plate.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  return (
    <AdminShell>
      <AdminTopbar
        title="Drivers"
        subtitle="120K+ driver-partners worldwide"
        action={
          <button className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-yellow sm:inline-flex">
            <Plus size={14} /> Onboard driver
          </button>
        }
      />

      <div className="space-y-4 p-5 md:p-8">
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { l: "Total drivers", v: "120,420", c: "text-electric-400" },
            { l: "Online now", v: "8,420", c: "text-emerald-400" },
            { l: "Avg rating", v: "4.91★", c: "text-sunny-400" },
            { l: "Pending verification", v: "182", c: "text-rose-400" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="text-[10px] uppercase tracking-wider text-white/55">
                {s.l}
              </p>
              <p className={`mt-1 font-display text-2xl ${s.c}`}>{s.v}</p>
            </div>
          ))}
        </div>

        <AdminCard>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 md:min-w-80">
              <Search size={14} className="text-white/55" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, ID, city, plate…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
              />
            </div>
            <FilterBar filters={FILTERS} active={filter} onSelect={setFilter} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold text-ink-950 ${
                      d.tier === "Elite"
                        ? "bg-gradient-to-tr from-sunny-400 to-sunny-300"
                        : d.tier === "Pro"
                        ? "bg-gradient-to-tr from-electric-400 to-electric-300"
                        : "bg-gradient-to-tr from-white/70 to-white/50"
                    }`}>
                      {d.initials}
                    </div>
                    <div>
                      <p className="font-semibold">{d.name}</p>
                      <p className="font-mono text-[11px] text-white/55">{d.id}</p>
                    </div>
                  </div>
                  <button className="rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-white/65 hover:bg-white/[0.08] hover:text-white">
                    <MoreHorizontal size={14} />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-3 text-xs text-white/65">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-sunny-400" fill="currentColor" stroke="none" />
                    {d.rating}
                  </span>
                  <span>·</span>
                  <span>{d.trips.toLocaleString()} trips</span>
                  <span>·</span>
                  <span>{d.city}</span>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">Vehicle</span>
                    <span className="font-mono text-white/85">{d.plate}</span>
                  </div>
                  <p className="mt-0.5 text-sm">{d.vehicle}</p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/55">
                      Lifetime earnings
                    </p>
                    <p className="font-display text-base">${d.earnings.toLocaleString()}</p>
                  </div>
                  <StatusPill status={d.status} />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <SmallBtn icon={<Phone size={12} />} label="Call" />
                  <SmallBtn icon={<Car size={12} />} label="Trips" />
                  <SmallBtn icon={<TrendingUp size={12} />} label="Stats" />
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-sm text-white/55">
              No drivers match your filters.
            </div>
          )}
        </AdminCard>
      </div>
    </AdminShell>
  );
}

function SmallBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] py-1.5 text-[11px] font-medium text-white/80 hover:bg-white/[0.08]">
      {icon} {label}
    </button>
  );
}
