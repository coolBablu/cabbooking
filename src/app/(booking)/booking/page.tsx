"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Navigation2,
  Car,
  Crown,
  Bike,
  Plane,
  CreditCard,
  Wallet,
  Apple,
  Smartphone,
  Check,
  ArrowRight,
  ArrowLeft,
  Clock,
  Users,
  Ticket,
  Sparkles,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const steps = [
  { id: 1, label: "Where to" },
  { id: 2, label: "Ride type" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Confirm" },
];

const rides = [
  { id: "lite", icon: Car, name: "Lite", desc: "Solo or duo", price: 11, eta: "2 min", capacity: 3 },
  { id: "plus", icon: Sparkles, name: "Plus", desc: "Roomier sedan", price: 18, eta: "3 min", capacity: 4, popular: true },
  { id: "luxe", icon: Crown, name: "Luxe", desc: "Tesla / BMW", price: 28, eta: "5 min", capacity: 4 },
  { id: "bike", icon: Bike, name: "Bike", desc: "Fastest option", price: 5, eta: "1 min", capacity: 1 },
  { id: "xl", icon: Users, name: "SwiftXL", desc: "Up to 6 seats", price: 32, eta: "6 min", capacity: 6 },
  { id: "airport", icon: Plane, name: "Airport", desc: "Flight tracked", price: 42, eta: "Scheduled", capacity: 4 },
];

const payments = [
  { id: "card", icon: CreditCard, label: "Visa •••• 4242", sub: "Default" },
  { id: "wallet", icon: Wallet, label: "SwiftPay wallet", sub: "$48.20 balance" },
  { id: "apple", icon: Apple, label: "Apple Pay", sub: "Face ID" },
  { id: "gpay", icon: Smartphone, label: "Google Pay", sub: "Linked" },
];

export default function BookingFlowPage() {
  const [step, setStep] = useState(1);
  const [ride, setRide] = useState("plus");
  const [payment, setPayment] = useState("card");
  const [pickup, setPickup] = useState("Home · 1255 Court St, Brooklyn");
  const [destination, setDestination] = useState("JFK International, Terminal 4");

  const selected = rides.find((r) => r.id === ride)!;
  const pay = payments.find((p) => p.id === payment)!;
  const subtotal = selected.price;
  const fees = 1.4;
  const discount = 1.8;
  const total = (subtotal + fees - discount).toFixed(2);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      {/* Stepper */}
      <Stepper step={step} />

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        {/* MAP */}
        <div className="order-2 lg:order-1 lg:col-span-3">
          <FuturisticMap from={pickup} to={destination} />
        </div>

        {/* PANEL */}
        <div className="order-1 lg:order-2 lg:col-span-2">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="p-6"
                >
                  <h2 className="font-display text-2xl">Where are you going?</h2>
                  <p className="mt-1 text-sm text-white/60">
                    Tap a saved place or type your own.
                  </p>

                  <div className="mt-6 space-y-3">
                    <Input
                      icon={<MapPin size={16} className="text-sunny-400" />}
                      label="Pickup"
                      value={pickup}
                      onChange={setPickup}
                    />
                    <Input
                      icon={<Navigation2 size={16} className="text-electric-400" />}
                      label="Destination"
                      value={destination}
                      onChange={setDestination}
                    />
                  </div>

                  <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-white/55">
                    Saved places
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                      { icon: "🏠", label: "Home" },
                      { icon: "💼", label: "Work" },
                      { icon: "✈️", label: "Airport" },
                      { icon: "💪", label: "Gym" },
                    ].map((q) => (
                      <button
                        key={q.label}
                        onClick={() => setDestination(q.label)}
                        className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/[0.06]"
                      >
                        <span className="text-base">{q.icon}</span> {q.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="p-6"
                >
                  <h2 className="font-display text-2xl">Pick your ride</h2>
                  <p className="mt-1 text-sm text-white/60">
                    AI matched these to your route.
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {rides.map((r) => {
                      const active = r.id === ride;
                      return (
                        <button
                          key={r.id}
                          onClick={() => setRide(r.id)}
                          className={`relative flex w-full items-center gap-4 rounded-2xl border p-3.5 text-left transition ${
                            active
                              ? "border-sunny-400/60 bg-sunny-400/10"
                              : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                          }`}
                        >
                          {r.popular && (
                            <span className="absolute right-3 top-3 rounded-full bg-sunny-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-950">
                              Popular
                            </span>
                          )}
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                              active ? "bg-sunny-400 text-ink-950" : "bg-white/[0.05] text-white/80"
                            }`}
                          >
                            <r.icon size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">{r.name}</p>
                            <p className="text-[11px] text-white/55">
                              {r.desc} · {r.capacity} seats · {r.eta}
                            </p>
                          </div>
                          <p className="font-display text-base">${r.price}</p>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="p-6"
                >
                  <h2 className="font-display text-2xl">How would you like to pay?</h2>
                  <p className="mt-1 text-sm text-white/60">
                    Add a coupon for an instant discount.
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {payments.map((p) => {
                      const active = p.id === payment;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setPayment(p.id)}
                          className={`flex w-full items-center gap-4 rounded-2xl border p-3.5 text-left transition ${
                            active
                              ? "border-sunny-400/60 bg-sunny-400/10"
                              : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                          }`}
                        >
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                              active ? "bg-sunny-400 text-ink-950" : "bg-white/[0.05] text-white/80"
                            }`}
                          >
                            <p.icon size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">{p.label}</p>
                            <p className="text-[11px] text-white/55">{p.sub}</p>
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

                  <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <Ticket size={16} className="text-sunny-400" />
                    <input
                      placeholder="Apply coupon — try SWIFT30"
                      defaultValue="SWIFT30"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                    />
                    <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                      −$1.80
                    </span>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="s4"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="p-6"
                >
                  <h2 className="font-display text-2xl">Confirm your ride</h2>
                  <p className="mt-1 text-sm text-white/60">
                    One last look before takeoff.
                  </p>

                  <div className="mt-5 space-y-3">
                    <SummaryRow
                      icon={<MapPin size={14} className="text-sunny-400" />}
                      label="Pickup"
                      value={pickup}
                    />
                    <SummaryRow
                      icon={<Navigation2 size={14} className="text-electric-400" />}
                      label="Destination"
                      value={destination}
                    />
                    <SummaryRow
                      icon={<selected.icon size={14} className="text-neon-purple" />}
                      label="Ride"
                      value={`SwiftCab ${selected.name} · ETA ${selected.eta}`}
                    />
                    <SummaryRow
                      icon={<pay.icon size={14} className="text-white/80" />}
                      label="Payment"
                      value={pay.label}
                    />
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                    <Row label="Service fee" value={`$${fees.toFixed(2)}`} />
                    <Row label="SWIFT30 coupon" value={`–$${discount.toFixed(2)}`} accent />
                    <div className="my-3 h-px bg-white/10" />
                    <Row
                      label="Total"
                      value={`$${total}`}
                      bold
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer actions */}
            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-ink-950/40 p-4">
              <button
                disabled={step === 1}
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-white/65 transition-colors hover:text-white disabled:opacity-30"
              >
                <ArrowLeft size={14} /> Back
              </button>

              {step < 4 ? (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep((s) => Math.min(4, s + 1))}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-yellow"
                >
                  Continue <ArrowRight size={14} />
                </motion.button>
              ) : (
                <Link href={ROUTES.payment}>
                  <motion.span
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-yellow"
                  >
                    Book SwiftCab ${total} <ArrowRight size={14} />
                  </motion.span>
                </Link>
              )}
            </div>
          </div>

          {/* Trust */}
          <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-white/55">
            <span className="flex items-center gap-1">
              <Check size={11} className="text-emerald-400" /> Insured & verified
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={11} /> Free cancel within 2 min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="mx-auto flex max-w-3xl items-center gap-2">
      {steps.map((s, i) => {
        const done = step > s.id;
        const active = step === s.id;
        return (
          <li key={s.id} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                  done
                    ? "bg-sunny-400 text-ink-950"
                    : active
                    ? "border-2 border-sunny-400 text-sunny-400"
                    : "border border-white/15 text-white/55"
                }`}
              >
                {done ? <Check size={14} /> : s.id}
              </span>
              <span
                className={`hidden text-[11px] font-medium uppercase tracking-[0.16em] sm:inline ${
                  active || done ? "text-white" : "text-white/45"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={`h-px flex-1 transition ${
                  done ? "bg-sunny-400" : "bg-white/15"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Input({
  icon,
  label,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      {icon}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">
          {label}
        </p>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
        />
      </div>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/50">
          {label}
        </p>
        <p className="truncate text-sm text-white">{value}</p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span
        className={`text-sm ${
          bold ? "font-semibold text-white" : "text-white/65"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-sm ${
          bold
            ? "font-display text-lg text-white"
            : accent
            ? "text-emerald-300"
            : "text-white/85"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function FuturisticMap({ from, to }: { from: string; to: string }) {
  return (
    <div className="relative h-[460px] overflow-hidden rounded-3xl border border-white/10 bg-ink-900/40 backdrop-blur-xl lg:h-full lg:min-h-[560px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(250,204,21,0.18),transparent_45%)]" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:32px_32px] opacity-30" />

      {Array.from({ length: 22 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.03 }}
          className="absolute rounded-md border border-white/10 bg-white/[0.03]"
          style={{
            width: `${30 + (i % 5) * 28}px`,
            height: `${24 + (i % 4) * 18}px`,
            left: `${(i * 47) % 92}%`,
            top: `${(i * 33) % 86}%`,
          }}
        />
      ))}

      <svg
        viewBox="0 0 700 560"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="route2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <motion.path
          d="M70 450 C 200 420, 240 280, 360 280 S 540 160, 640 100"
          stroke="url(#route2)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
      </svg>

      <Pin x="10%" y="80%" color="sunny" icon={<MapPin size={14} />} label={from} />
      <Pin x="92%" y="18%" color="electric" icon={<Navigation2 size={14} />} label={to} />

      <motion.div
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          offsetPath:
            "path('M70 450 C 200 420, 240 280, 360 280 S 540 160, 640 100')",
        }}
        className="absolute flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-ink-950/80 backdrop-blur"
      >
        <Car size={14} className="text-sunny-400" />
      </motion.div>

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-ink-950/70 p-4 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sunny-400/20 text-sunny-400">
            <Car size={18} />
          </div>
          <div>
            <p className="text-xs text-white/55">Approx. trip</p>
            <p className="font-display text-base">22 min · 18.4 mi</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/55">AI route</p>
          <p className="font-display text-base text-sunny-400">Optimized</p>
        </div>
      </div>
    </div>
  );
}

function Pin({
  x,
  y,
  color,
  icon,
  label,
}: {
  x: string;
  y: string;
  color: "sunny" | "electric";
  icon: React.ReactNode;
  label: string;
}) {
  const cls =
    color === "sunny"
      ? "bg-sunny-400 text-ink-950 shadow-glow-yellow"
      : "bg-electric-500 text-white shadow-glow";
  return (
    <div
      style={{ left: x, top: y }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative">
        <span
          className={`absolute inset-0 animate-ping rounded-full ${
            color === "sunny" ? "bg-sunny-400/40" : "bg-electric-400/40"
          }`}
        />
        <div
          className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink-950 ${cls}`}
        >
          {icon}
        </div>
        <span className="absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-ink-950/80 px-2 py-1 text-[11px] backdrop-blur">
          {label.length > 24 ? label.slice(0, 22) + "…" : label}
        </span>
      </div>
    </div>
  );
}
