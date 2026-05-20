"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Download,
  CreditCard,
  Wallet,
  Apple,
  Smartphone,
  RotateCcw,
  Eye,
} from "lucide-react";
import { AdminShell, AdminTopbar } from "@/components/admin/AdminShell";
import { AdminCard, StatusPill, FilterBar } from "@/components/admin/AdminUI";

type Payment = {
  id: string;
  booking: string;
  user: string;
  amount: number;
  method: "card" | "wallet" | "apple" | "google";
  provider: "Stripe" | "Razorpay";
  status: "succeeded" | "failed" | "processing" | "refunded";
  date: string;
};

const PAYMENTS: Payment[] = [
  { id: "pi_4421A2B", booking: "SW-24512", user: "Maya Chen", amount: 28.4, method: "card", provider: "Stripe", status: "succeeded", date: "May 18, 6:24 PM" },
  { id: "pi_4421A2C", booking: "SW-24513", user: "Priya Mehta", amount: 11.2, method: "wallet", provider: "Razorpay", status: "succeeded", date: "May 18, 7:02 PM" },
  { id: "pi_4421A2D", booking: "SW-24514", user: "Marcus Chen", amount: 14.8, method: "apple", provider: "Stripe", status: "succeeded", date: "May 18, 5:48 PM" },
  { id: "pi_4421A2E", booking: "SW-24515", user: "Sara Linde", amount: 9.5, method: "card", provider: "Stripe", status: "refunded", date: "May 18, 4:22 PM" },
  { id: "pi_4421A2F", booking: "SW-24516", user: "Emma Larsen", amount: 38.6, method: "card", provider: "Stripe", status: "succeeded", date: "May 18, 3:18 PM" },
  { id: "pi_4421A2G", booking: "SW-24517", user: "Ravi Sharma", amount: 4.8, method: "google", provider: "Razorpay", status: "failed", date: "May 18, 1:24 PM" },
  { id: "pi_4421A2H", booking: "SW-24518", user: "Daniel Park", amount: 22.5, method: "card", provider: "Stripe", status: "processing", date: "May 18, 12:55 PM" },
  { id: "pi_4421A2I", booking: "SW-24519", user: "Lena Brown", amount: 64.2, method: "apple", provider: "Stripe", status: "succeeded", date: "May 18, 11:30 AM" },
];

const FILTERS = ["All", "Succeeded", "Processing", "Failed", "Refunded"];

const STATUS_MAP: Record<string, string> = {
  All: "all",
  Succeeded: "succeeded",
  Processing: "processing",
  Failed: "failed",
  Refunded: "refunded",
};

const METHOD_ICON = {
  card: CreditCard,
  wallet: Wallet,
  apple: Apple,
  google: Smartphone,
} as const;

export default function AdminPaymentsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return PAYMENTS.filter((p) => {
      const want = STATUS_MAP[filter];
      if (want !== "all" && p.status !== want) return false;
      const q = query.toLowerCase();
      if (!q) return true;
      return (
        p.id.toLowerCase().includes(q) ||
        p.booking.toLowerCase().includes(q) ||
        p.user.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  return (
    <AdminShell>
      <AdminTopbar
        title="Payments"
        subtitle="Stripe + Razorpay transactions, refunds, and reconciliation"
        action={
          <button className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-yellow sm:inline-flex">
            <Download size={14} /> Export ledger
          </button>
        }
      />

      <div className="space-y-4 p-5 md:p-8">
        {/* KPIs */}
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { l: "Gross volume", v: "$2.84M", c: "text-emerald-400" },
            { l: "Net revenue", v: "$2.41M", c: "text-sunny-400" },
            { l: "Refunds", v: "$18.4K", c: "text-rose-400" },
            { l: "Success rate", v: "99.2%", c: "text-electric-400" },
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

        {/* Method breakdown */}
        <AdminCard title="Payment methods" sub="Last 30 days">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Card", value: "62%", icon: <CreditCard size={16} />, color: "bg-electric-500" },
              { label: "Wallet", value: "21%", icon: <Wallet size={16} />, color: "bg-sunny-400" },
              { label: "Apple Pay", value: "11%", icon: <Apple size={16} />, color: "bg-neon-purple" },
              { label: "Google Pay", value: "6%", icon: <Smartphone size={16} />, color: "bg-emerald-400" },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${m.color} text-ink-950`}>
                    {m.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/55">
                      {m.label}
                    </p>
                    <p className="font-display text-xl">{m.value}</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: m.value }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1 }}
                    className={`h-full rounded-full ${m.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 md:min-w-80">
              <Search size={14} className="text-white/55" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search payment ID, booking, user…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
              />
            </div>
            <FilterBar filters={FILTERS} active={filter} onSelect={setFilter} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-[11px] uppercase tracking-wider text-white/55">
                <tr>
                  <th className="pb-3 pr-4 font-medium">Payment ID</th>
                  <th className="pb-3 pr-4 font-medium">Booking</th>
                  <th className="pb-3 pr-4 font-medium">User</th>
                  <th className="pb-3 pr-4 font-medium">Amount</th>
                  <th className="pb-3 pr-4 font-medium">Method</th>
                  <th className="pb-3 pr-4 font-medium">Provider</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium">Date</th>
                  <th className="pb-3 pr-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => {
                  const Icon = METHOD_ICON[p.method];
                  return (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-t border-white/5 transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="py-3 pr-4 font-mono text-xs">{p.id}</td>
                      <td className="py-3 pr-4 font-mono text-xs text-white/65">
                        {p.booking}
                      </td>
                      <td className="py-3 pr-4">{p.user}</td>
                      <td className="py-3 pr-4 font-semibold">
                        ${p.amount.toFixed(2)}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] capitalize">
                          <Icon size={11} /> {p.method}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-white/65">{p.provider}</td>
                      <td className="py-3 pr-4">
                        <StatusPill status={p.status} />
                      </td>
                      <td className="py-3 pr-4 text-xs text-white/55">{p.date}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-1">
                          <button className="rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-white/65 hover:bg-white/[0.08] hover:text-white">
                            <Eye size={12} />
                          </button>
                          <button className="rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-white/65 hover:bg-white/[0.08] hover:text-white">
                            <RotateCcw size={12} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-white/55">
                No payments match your filters.
              </div>
            )}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
