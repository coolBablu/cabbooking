"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  MoreHorizontal,
  Crown,
  Sparkles,
  Mail,
  UserCheck,
  Ban,
} from "lucide-react";
import { AdminShell, AdminTopbar } from "@/components/admin/AdminShell";
import { AdminCard, StatusPill, FilterBar } from "@/components/admin/AdminUI";

type User = {
  id: string;
  name: string;
  email: string;
  city: string;
  joined: string;
  trips: number;
  spent: number;
  tier: "Lite" | "Plus" | "Luxe";
  status: "active" | "suspended" | "pending";
  initials: string;
};

const USERS: User[] = [
  { id: "U-244010", name: "Maya Chen", email: "maya@swiftcab.com", city: "New York", joined: "Jan 14, 2024", trips: 64, spent: 1840, tier: "Plus", status: "active", initials: "MC" },
  { id: "U-244011", name: "Marcus Chen", email: "marcus@sfu.io", city: "San Francisco", joined: "Mar 02, 2024", trips: 142, spent: 4220, tier: "Luxe", status: "active", initials: "MC" },
  { id: "U-244012", name: "Priya Mehta", email: "priya@mehta.in", city: "Mumbai", joined: "Apr 18, 2024", trips: 28, spent: 320, tier: "Lite", status: "active", initials: "PM" },
  { id: "U-244013", name: "Sara Linde", email: "sara@bln.de", city: "Berlin", joined: "Jan 02, 2024", trips: 87, spent: 2640, tier: "Plus", status: "active", initials: "SL" },
  { id: "U-244014", name: "Daniel Park", email: "daniel@tokyo.app", city: "Tokyo", joined: "Feb 11, 2025", trips: 12, spent: 180, tier: "Lite", status: "pending", initials: "DP" },
  { id: "U-244015", name: "Emma Larsen", email: "emma@cph.dk", city: "Copenhagen", joined: "Sep 22, 2023", trips: 320, spent: 8420, tier: "Luxe", status: "active", initials: "EL" },
  { id: "U-244016", name: "Ravi Sharma", email: "ravi@blr.in", city: "Bangalore", joined: "Dec 05, 2024", trips: 6, spent: 22, tier: "Lite", status: "suspended", initials: "RS" },
  { id: "U-244017", name: "Yuki Sato", email: "yuki@kyoto.jp", city: "Kyoto", joined: "Aug 14, 2024", trips: 44, spent: 980, tier: "Plus", status: "active", initials: "YS" },
];

const FILTERS = ["All", "Active", "Pending", "Suspended"];

const STATUS_MAP: Record<string, string> = {
  All: "all",
  Active: "active",
  Pending: "pending",
  Suspended: "suspended",
};

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return USERS.filter((u) => {
      const want = STATUS_MAP[filter];
      if (want !== "all" && u.status !== want) return false;
      const q = query.toLowerCase();
      if (!q) return true;
      return (
        u.id.toLowerCase().includes(q) ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  return (
    <AdminShell>
      <AdminTopbar
        title="Users"
        subtitle="248,310 riders across the SwiftCab network"
        action={
          <button className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-yellow sm:inline-flex">
            <Plus size={14} /> Invite user
          </button>
        }
      />

      <div className="space-y-4 p-5 md:p-8">
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { l: "Total users", v: "248,310", c: "text-electric-400" },
            { l: "Active this week", v: "82,420", c: "text-emerald-400" },
            { l: "Plus + Luxe", v: "44,820", c: "text-sunny-400" },
            { l: "New this month", v: "+12,420", c: "text-neon-purple" },
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
                placeholder="Search by name, email, city…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
              />
            </div>
            <FilterBar filters={FILTERS} active={filter} onSelect={setFilter} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-[11px] uppercase tracking-wider text-white/55">
                <tr>
                  <th className="pb-3 pr-4 font-medium">User</th>
                  <th className="pb-3 pr-4 font-medium">Email</th>
                  <th className="pb-3 pr-4 font-medium">City</th>
                  <th className="pb-3 pr-4 font-medium">Joined</th>
                  <th className="pb-3 pr-4 font-medium">Trips</th>
                  <th className="pb-3 pr-4 font-medium">Spent</th>
                  <th className="pb-3 pr-4 font-medium">Tier</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-t border-white/5 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-electric-400 to-neon-purple text-xs font-bold text-ink-950">
                          {u.initials}
                        </div>
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="font-mono text-[10px] text-white/55">{u.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-white/65">{u.email}</td>
                    <td className="py-3 pr-4 text-white/65">{u.city}</td>
                    <td className="py-3 pr-4 text-white/55 text-xs">{u.joined}</td>
                    <td className="py-3 pr-4">{u.trips}</td>
                    <td className="py-3 pr-4 font-semibold">${u.spent.toLocaleString()}</td>
                    <td className="py-3 pr-4">
                      <TierPill tier={u.tier} />
                    </td>
                    <td className="py-3 pr-4">
                      <StatusPill status={u.status} />
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1">
                        <IconBtn title="Email" icon={<Mail size={12} />} />
                        <IconBtn title="Verify" icon={<UserCheck size={12} />} />
                        <IconBtn title="Suspend" icon={<Ban size={12} />} danger />
                        <IconBtn title="More" icon={<MoreHorizontal size={12} />} />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-white/55">
                No users match your filters.
              </div>
            )}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}

function TierPill({ tier }: { tier: "Lite" | "Plus" | "Luxe" }) {
  if (tier === "Luxe") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-neon-purple/30 to-electric-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-200">
        <Crown size={9} /> Luxe
      </span>
    );
  }
  if (tier === "Plus") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-sunny-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sunny-300">
        <Sparkles size={9} /> Plus
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/65">
      Lite
    </span>
  );
}

function IconBtn({
  icon,
  title,
  danger,
}: {
  icon: React.ReactNode;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      title={title}
      className={`rounded-lg border p-1.5 transition-colors ${
        danger
          ? "border-rose-400/20 bg-rose-400/5 text-rose-300 hover:bg-rose-400/15"
          : "border-white/10 bg-white/[0.04] text-white/65 hover:bg-white/[0.08] hover:text-white"
      }`}
    >
      {icon}
    </button>
  );
}
