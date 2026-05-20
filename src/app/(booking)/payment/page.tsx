"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CreditCard,
  Apple,
  Wallet,
  Smartphone,
  Shield,
  Ticket,
  Check,
  ArrowRight,
  Lock,
  MapPin,
  Navigation2,
  Sparkles,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const methods = [
  { id: "card", icon: CreditCard, label: "Credit / Debit card", sub: "Visa, Mastercard, Amex" },
  { id: "apple", icon: Apple, label: "Apple Pay", sub: "Face ID required" },
  { id: "gpay", icon: Smartphone, label: "Google Pay", sub: "Linked to your Google account" },
  { id: "wallet", icon: Wallet, label: "SwiftPay wallet", sub: "Balance $48.20" },
];

export default function PaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl">
          <Lock size={12} className="text-emerald-400" /> Stripe / Razorpay secure
        </span>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Complete your <span className="gradient-text">payment.</span>
        </h1>
      </motion.div>

      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        {/* LEFT — method + card form */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl md:p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
              Payment method
            </p>

            <div className="mt-4 grid gap-2.5 md:grid-cols-2">
              {methods.map((m) => {
                const active = m.id === method;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-sunny-400/60 bg-sunny-400/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        active ? "bg-sunny-400 text-ink-950" : "bg-white/[0.05] text-white/80"
                      }`}
                    >
                      <m.icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{m.label}</p>
                      <p className="text-[11px] text-white/55">{m.sub}</p>
                    </div>
                    {active && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sunny-400 text-ink-950">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {method === "card" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl md:p-6"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                Card details
              </p>

              {/* Visual card */}
              <div className="mt-4 relative overflow-hidden rounded-2xl bg-gradient-to-br from-electric-700 via-electric-600 to-ink-900 p-6 text-white">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/70">SwiftPay debit</p>
                  <Sparkles size={18} className="text-sunny-400" />
                </div>
                <p className="mt-8 font-mono text-xl tracking-[0.3em]">
                  •••• •••• •••• 4242
                </p>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/55">Cardholder</p>
                    <p className="text-sm">Alex Morgan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-white/55">Expires</p>
                    <p className="text-sm">11 / 28</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <Field label="Card number" placeholder="1234 5678 9012 3456" />
                <Field label="Cardholder name" placeholder="Alex Morgan" />
                <Field label="Expiry" placeholder="MM / YY" />
                <Field label="CVV" placeholder="123" />
              </div>

              <label className="mt-4 flex items-center gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-white/20 bg-white/10 accent-sunny-400"
                />
                Save this card for future rides
              </label>
            </motion.div>
          )}

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <Ticket size={16} className="text-sunny-400" />
              <input
                placeholder="Coupon code"
                defaultValue="SWIFT30"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
              />
              <button className="rounded-full bg-sunny-400 px-3.5 py-1.5 text-xs font-bold text-ink-950">
                Apply
              </button>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-300">
              <Check size={11} /> SWIFT30 applied — you saved $1.80
            </p>
          </div>
        </div>

        {/* RIGHT — order summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 backdrop-blur-xl md:p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
              Trip summary
            </p>

            <div className="mt-4 space-y-2">
              <Mini
                icon={<MapPin size={12} className="text-sunny-400" />}
                label="Pickup"
                value="Home · Brooklyn"
              />
              <Mini
                icon={<Navigation2 size={12} className="text-electric-400" />}
                label="Destination"
                value="JFK International T4"
              />
            </div>

            <div className="mt-5 space-y-2">
              <Row label="SwiftCab Plus" value="$18.00" />
              <Row label="Distance · 18.4 mi" value="" muted />
              <Row label="Service fee" value="$1.40" />
              <Row label="SWIFT30 coupon" value="−$1.80" accent />
            </div>

            <div className="my-4 h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <p className="text-sm text-white/70">Total</p>
              <p className="font-display text-3xl">$17.60</p>
            </div>

            <motion.button
              whileHover={{ scale: processing ? 1 : 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setProcessing(true);
                setTimeout(() => {
                  router.push(ROUTES.bookingSuccess);
                }, 1500);
              }}
              disabled={processing}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sunny-400 to-sunny-300 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-yellow disabled:opacity-80"
            >
              {processing ? (
                <>
                  <Sparkles size={14} className="animate-spin" /> Securing payment…
                </>
              ) : (
                <>
                  Pay $17.60 <ArrowRight size={14} />
                </>
              )}
            </motion.button>

            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-white/55">
              <Shield size={12} className="text-emerald-400" /> 256-bit AES encryption · PCI-DSS
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
              Need help?
            </p>
            <p className="mt-2 text-sm text-white/85">
              We're here 24/7. Reach our team if you have questions about this charge.
            </p>
            <Link
              href={ROUTES.contact}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sunny-400 hover:underline"
            >
              Contact support <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-ink-950/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-sunny-400/40"
      />
    </div>
  );
}

function Mini({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-white/50">{label}</p>
        <p className="truncate text-sm">{value}</p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
  muted,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className={`text-sm ${muted ? "text-white/50" : "text-white/80"}`}>{label}</p>
      <p
        className={`text-sm ${
          accent ? "text-emerald-300" : muted ? "text-white/50" : "text-white/95"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
