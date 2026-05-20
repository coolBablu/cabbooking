"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  MapPin,
  Navigation2,
  MoreHorizontal,
  Eye,
  Ban,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { AdminShell, AdminTopbar } from "@/components/admin/AdminShell";
import { AdminCard, StatusPill, FilterBar } from "@/components/admin/AdminUI";

type Booking = {
  id: string;
  rider: string;
  driver: string;
  from: string;
  to: string;
  type: "Lite" | "Plus" | "Luxe" | "Bike" | "Airport";
  fare: number;
  status: "completed" | "in-progress" | "cancelled" | "pending";
  city: string;
  date: string;
};

const BOOKINGS: Booking[] = [
  { id: "SW-24512", rider: "Maya Chen", driver: "Daniel Okafor", from: "Brooklyn Bridge", to: "JFK T4", type: "Plus", fare: 28.4, status: "completed", city: "New York", date: "May 18, 6:24 PM" },
  { id: "SW-24513", rider: "Priya Mehta", driver: "Sara Kovacs", from: "Soho Cafe", to: "Times Square", type: "Lite", fare: 11.2, status: "in-progress", city: "New York", date: "May 18, 7:02 PM" },
  { id: "SW-24514", rider: "Marcus Chen", driver: "Ravi Patel", from: "Hudson Yards", to: "Greenwich Village", type: "Lite", fare: 14.8, status: "completed", city: "New York", date: "May 18, 5:48 PM" },
  { id: "SW-24515", rider: "Sara Linde", driver: "Daniel Okafor", from: "MoMA Museum", to: "Times Square", type: "Plus", fare: 9.5, status: "cancelled", city: "New York", date: "May 18, 4:22 PM" },
  { id: "SW-24516", rider: "Emma Larsen", driver: "Marcus Junior", from: "Brooklyn DUMBO", to: "Manhattan", type: "Luxe", fare: 38.6, status: "completed", city: "New York", date: "May 18, 3:18 PM" },
  { id: "SW-24517", rider: "Ravi Sharma", driver: "Aisha Khan", from: "MG Road", to: "Whitefield", type: "Bike", fare: 4.8, status: "completed", city: "Bangalore", date: "May 18, 1:24 PM" },
  { id: "SW-24518", rider: "Daniel Park", driver: "Jiro Tanaka", from: "Shibuya", to: "Shinjuku", type: "Plus", fare: 22.5, status: "pending", city: "Tokyo", date: "May 18, 12:55 PM" },
  { id: "SW-24519", rider: "Lena Brown", driver: "Olivia Stone", from: "Westminster", to: "Heathrow", type: "Airport", fare: 64.2, status: "in-progress", city: "London", date: "May 18, 11:30 AM" },
  { id: "SW-24520", rider: "Yuki Sato", driver: "Mark Friedman", from: "Berlin Mitte", to: "Brandenburg", type: "Plus", fare: 18.4, status: "completed", city: "Berlin", date: "May 18, 10:10 AM" },
];

const FILTERS = ["All", "Pending", "In progress", "Completed", "Cancelled"];

export default function AdminBookingsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Booking | null>(null);

  const filtered = useMemo(() => {
    return BOOKINGS.filter((b) => {
      if (filter !== "All" && b.status.replace("-", " ") !== filter.toLowerCase())
        return false;
      const q = query.toLowerCase();
      if (!q) return true;
      return (
        b.id.toLowerCase().includes(q) ||
        b.rider.toLowerCase().includes(q) ||
        b.driver.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: BOOKINGS.length };
    for (const b of BOOKINGS) {
      const key = b.status === "in-progress" ? "In progress" : b.status[0].toUpperCase() + b.status.slice(1);
      c[key] = (c[key] ?? 0) + 1;
    }
    return c;
  }, []);

  return (
    <AdminShell>
      <AdminTopbar
        title="Bookings"
        subtitle="Manage every ride happening across the SwiftCab network"
        action={
          <button className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-yellow sm:inline-flex">
            <Download size={14} /> Export CSV
          </button>
        }
      />

      <div className="space-y-4 p-5 md:p-8">
        {/* KPIs */}
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { l: "Total today", v: "1,248", c: "text-sunny-400" },
            { l: "Completed", v: "1,072", c: "text-emerald-400" },
            { l: "In progress", v: "142", c: "text-electric-400" },
            { l: "Cancelled", v: "34", c: "text-rose-400" },
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
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 md:min-w-80">
              <Search size={14} className="text-white/55" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ID, rider, driver, city…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
              />
            </div>

            <FilterBar
              filters={FILTERS}
              active={filter}
              onSelect={setFilter}
              counts={counts}
            />

            <button className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/80 hover:bg-white/[0.08]">
              <Filter size={12} /> More filters
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-[11px] uppercase tracking-wider text-white/55">
                <tr>
                  <th className="pb-3 pr-4 font-medium">ID</th>
                  <th className="pb-3 pr-4 font-medium">Rider</th>
                  <th className="pb-3 pr-4 font-medium">Driver</th>
                  <th className="pb-3 pr-4 font-medium">Route</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 pr-4 font-medium">City</th>
                  <th className="pb-3 pr-4 font-medium">Fare</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-t border-white/5 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="py-3 pr-4 font-mono text-xs text-white/85">
                      {b.id}
                    </td>
                    <td className="py-3 pr-4">{b.rider}</td>
                    <td className="py-3 pr-4 text-white/65">{b.driver}</td>
                    <td className="py-3 pr-4 text-white/70">
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPin size={11} className="text-sunny-400" />
                        <span className="truncate">{b.from}</span>
                        <span className="text-white/30">→</span>
                        <Navigation2 size={11} className="text-electric-400" />
                        <span className="truncate">{b.to}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/75">
                        {b.type}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-white/65">{b.city}</td>
                    <td className="py-3 pr-4 font-semibold">${b.fare.toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      <StatusPill status={b.status} />
                    </td>
                    <td className="py-3 pr-4">
                      <button
                        onClick={() => setSelected(b)}
                        className="rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-white/65 transition-colors hover:bg-white/[0.08] hover:text-white"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-white/55">
                No bookings match your filters.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-5 flex items-center justify-between text-xs text-white/55">
            <span>Showing {filtered.length} of {BOOKINGS.length}</span>
            <div className="flex items-center gap-1">
              {["1", "2", "3", "…", "21"].map((p, i) => (
                <button
                  key={i}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs ${
                    p === "1"
                      ? "bg-sunny-400 text-ink-950 font-bold"
                      : "border border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.08]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Detail panel */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/70 backdrop-blur-sm md:items-center"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-t-3xl border border-white/10 bg-gradient-to-b from-ink-900 to-ink-950 p-6 md:rounded-3xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-white/55">{selected.id}</p>
                <p className="mt-1 font-display text-2xl">{selected.rider}</p>
                <p className="text-sm text-white/65">→ {selected.driver}</p>
              </div>
              <StatusPill status={selected.status} />
            </div>

            <div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={14} className="text-sunny-400" />
                {selected.from}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Navigation2 size={14} className="text-electric-400" />
                {selected.to}
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <Detail label="Type" value={selected.type} />
                <Detail label="City" value={selected.city} />
                <Detail label="Fare" value={`$${selected.fare.toFixed(2)}`} />
              </div>
              <p className="text-[11px] text-white/55">{selected.date}</p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <ModalBtn icon={<Eye size={14} />} label="View trip" />
              <ModalBtn icon={<RotateCcw size={14} />} label="Refund" />
              <ModalBtn icon={<Ban size={14} />} label="Cancel" danger />
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sunny-400 to-sunny-300 py-3 text-sm font-semibold text-ink-950 shadow-glow-yellow"
            >
              <CheckCircle2 size={14} /> Mark resolved
            </button>
          </motion.div>
        </motion.div>
      )}
    </AdminShell>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
      <p className="text-[10px] uppercase tracking-wider text-white/55">{label}</p>
      <p className="mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  );
}

function ModalBtn({
  icon,
  label,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-xs transition-colors ${
        danger
          ? "border-rose-400/30 bg-rose-400/10 text-rose-300 hover:bg-rose-400/20"
          : "border-white/10 bg-white/[0.04] text-white/80 hover:bg-white/[0.08]"
      }`}
    >
      {icon} {label}
    </button>
  );
}
