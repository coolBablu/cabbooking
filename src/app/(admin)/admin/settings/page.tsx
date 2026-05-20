"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Building2,
  CreditCard,
  Bell,
  Shield,
  Users,
  Globe,
  Mail,
  KeyRound,
  Sparkles,
} from "lucide-react";
import { AdminShell, AdminTopbar } from "@/components/admin/AdminShell";
import { AdminCard } from "@/components/admin/AdminUI";

type Tab = "general" | "billing" | "notifications" | "security" | "team";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "general", label: "General", icon: <Building2 size={14} /> },
  { id: "billing", label: "Billing", icon: <CreditCard size={14} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={14} /> },
  { id: "security", label: "Security", icon: <Shield size={14} /> },
  { id: "team", label: "Team", icon: <Users size={14} /> },
];

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<Tab>("general");

  return (
    <AdminShell>
      <AdminTopbar
        title="Settings"
        subtitle="Configure your SwiftCab control plane"
        action={
          <button className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-yellow sm:inline-flex">
            <Save size={14} /> Save changes
          </button>
        }
      />

      <div className="grid gap-6 p-5 md:p-8 lg:grid-cols-12">
        {/* Side tabs */}
        <aside className="lg:col-span-3">
          <div className="space-y-1 rounded-3xl border border-white/10 bg-white/[0.02] p-2 backdrop-blur-xl">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition-colors ${
                  tab === t.id
                    ? "bg-white/[0.06] text-white"
                    : "text-white/70 hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={tab === t.id ? "text-sunny-400" : "text-white/55"}
                >
                  {t.icon}
                </span>
                {t.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 lg:col-span-9"
        >
          {tab === "general" && <GeneralTab />}
          {tab === "billing" && <BillingTab />}
          {tab === "notifications" && <NotificationsTab />}
          {tab === "security" && <SecurityTab />}
          {tab === "team" && <TeamTab />}
        </motion.div>
      </div>
    </AdminShell>
  );
}

function GeneralTab() {
  return (
    <>
      <AdminCard title="Brand" sub="Public-facing identity">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Workspace name" defaultValue="SwiftCab Inc." icon={<Building2 size={14} />} />
          <Input label="Public website" defaultValue="https://swiftcab.com" icon={<Globe size={14} />} />
          <Input label="Support email" defaultValue="support@swiftcab.com" icon={<Mail size={14} />} />
          <Input label="HQ city" defaultValue="New York" icon={<Building2 size={14} />} />
        </div>
      </AdminCard>

      <AdminCard title="Localization">
        <div className="grid gap-4 md:grid-cols-3">
          <Select label="Default currency" options={["USD", "EUR", "INR", "GBP", "JPY"]} />
          <Select label="Default timezone" options={["America/New_York", "Europe/London", "Asia/Kolkata", "Asia/Tokyo"]} />
          <Select label="Language" options={["English", "Spanish", "French", "Japanese", "Hindi"]} />
        </div>
      </AdminCard>

      <AdminCard title="Operating cities" sub="Cities where SwiftCab is live">
        <div className="flex flex-wrap gap-2">
          {[
            "New York",
            "London",
            "Bangalore",
            "Berlin",
            "Tokyo",
            "Dubai",
            "Singapore",
            "Paris",
            "Mumbai",
            "San Francisco",
          ].map((c) => (
            <span
              key={c}
              className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300"
            >
              ● {c}
            </span>
          ))}
          <button className="rounded-full border border-dashed border-white/20 bg-white/[0.04] px-3 py-1 text-xs text-white/75 hover:bg-white/[0.08]">
            + Add city
          </button>
        </div>
      </AdminCard>
    </>
  );
}

function BillingTab() {
  return (
    <>
      <AdminCard title="Subscription" sub="Your current plan">
        <div className="flex items-center justify-between rounded-2xl border border-sunny-400/30 bg-sunny-400/10 p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sunny-400 text-ink-950">
              <Sparkles size={18} />
            </span>
            <div>
              <p className="font-display text-lg">SwiftCab Enterprise</p>
              <p className="text-xs text-white/65">Unlimited bookings · 24/7 priority support</p>
            </div>
          </div>
          <button className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white/85 hover:bg-white/[0.10]">
            Manage plan
          </button>
        </div>
      </AdminCard>

      <AdminCard title="Payment methods" action="Add card">
        <div className="space-y-2">
          {[
            { brand: "Visa", last4: "4421", exp: "08/27", default: true },
            { brand: "Mastercard", last4: "8821", exp: "11/26", default: false },
          ].map((c) => (
            <div
              key={c.last4}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-center gap-3">
                <CreditCard size={18} className="text-white/55" />
                <div>
                  <p className="text-sm font-semibold">
                    {c.brand} •••• {c.last4}
                  </p>
                  <p className="text-[11px] text-white/55">Expires {c.exp}</p>
                </div>
              </div>
              {c.default && (
                <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                  Default
                </span>
              )}
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Tax & invoices">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="VAT / GST ID" defaultValue="US-44218820" />
          <Input label="Invoice email" defaultValue="finance@swiftcab.com" />
        </div>
      </AdminCard>
    </>
  );
}

function NotificationsTab() {
  const groups = [
    {
      title: "Operational alerts",
      items: [
        { label: "Incident reports", desc: "When p99 latency or error rate breaches thresholds" },
        { label: "Surge pricing triggered", desc: "City-level multipliers go above 1.5x" },
        { label: "Driver verification queue", desc: "Daily digest of pending verifications" },
      ],
    },
    {
      title: "Financial",
      items: [
        { label: "Daily revenue summary", desc: "Yesterday's gross vs. forecast" },
        { label: "Large refund requested", desc: "Any refund over $250" },
        { label: "Payout failures", desc: "When a driver payout fails to settle" },
      ],
    },
    {
      title: "User events",
      items: [
        { label: "VIP complaints", desc: "Tickets from Luxe-tier riders" },
        { label: "New city milestone", desc: "When a city crosses 100K rides" },
      ],
    },
  ];

  return (
    <>
      {groups.map((g) => (
        <AdminCard key={g.title} title={g.title}>
          <div className="space-y-1">
            {g.items.map((it, i) => (
              <Toggle key={it.label} label={it.label} desc={it.desc} defaultOn={i % 2 === 0} />
            ))}
          </div>
        </AdminCard>
      ))}
    </>
  );
}

function SecurityTab() {
  return (
    <>
      <AdminCard title="Authentication">
        <div className="space-y-1">
          <Toggle label="Two-factor authentication" desc="Require TOTP for all admin accounts" defaultOn />
          <Toggle label="Single sign-on (SSO)" desc="Use SAML for your workspace" />
          <Toggle label="Session inactivity timeout" desc="Sign out after 30 min of inactivity" defaultOn />
        </div>
      </AdminCard>

      <AdminCard title="API keys" action="Generate key">
        <div className="space-y-2">
          {[
            { name: "Production · Stripe webhook", masked: "whsec_••••4421", last: "2 hr ago" },
            { name: "Production · Maps API", masked: "AIza••••8821", last: "Yesterday" },
            { name: "Staging · Twilio SMS", masked: "AC••••6240", last: "3 days ago" },
          ].map((k) => (
            <div
              key={k.name}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-center gap-3">
                <KeyRound size={16} className="text-white/55" />
                <div>
                  <p className="text-sm font-semibold">{k.name}</p>
                  <p className="font-mono text-[11px] text-white/55">{k.masked}</p>
                </div>
              </div>
              <span className="text-[11px] text-white/55">Last used {k.last}</span>
            </div>
          ))}
        </div>
      </AdminCard>
    </>
  );
}

function TeamTab() {
  const members = [
    { name: "Sasha Romanov", role: "Super admin", email: "sasha@swiftcab.com", initials: "SR", tone: "bg-rose-400" },
    { name: "Maya Chen", role: "Finance admin", email: "maya@swiftcab.com", initials: "MC", tone: "bg-electric-400" },
    { name: "Marcus Junior", role: "Ops manager", email: "marcus@swiftcab.com", initials: "MJ", tone: "bg-sunny-400" },
    { name: "Daniel Okafor", role: "Support lead", email: "daniel@swiftcab.com", initials: "DO", tone: "bg-emerald-400" },
  ];
  return (
    <AdminCard title="Team members" action="Invite teammate">
      <div className="space-y-2">
        {members.map((m) => (
          <div
            key={m.email}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full ${m.tone} text-xs font-bold text-ink-950`}
              >
                {m.initials}
              </div>
              <div>
                <p className="text-sm font-semibold">{m.name}</p>
                <p className="text-[11px] text-white/55">{m.email}</p>
              </div>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/75">
              {m.role}
            </span>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}

function Input({
  label,
  defaultValue,
  icon,
}: {
  label: string;
  defaultValue?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-950/40 px-4 py-3 focus-within:border-sunny-400/40">
        {icon && <span className="text-white/55">{icon}</span>}
        <input
          defaultValue={defaultValue}
          className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
        />
      </div>
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
        {label}
      </label>
      <select
        className="mt-2 w-full rounded-2xl border border-white/10 bg-ink-950/40 px-4 py-3 text-sm outline-none focus:border-sunny-400/40"
        defaultValue={options[0]}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink-950">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle({
  label,
  desc,
  defaultOn,
}: {
  label: string;
  desc: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(Boolean(defaultOn));
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 px-4 py-3 transition-colors hover:bg-white/[0.02]">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-[11px] text-white/55">{desc}</p>
      </div>
      <button
        type="button"
        onClick={() => setOn(!on)}
        aria-pressed={on}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? "bg-sunny-400" : "bg-white/15"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${
            on ? "right-0.5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
