"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Zap, TrendingUp, X } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientButton } from "@/components/ui/GradientButton";
import { ROUTES } from "@/lib/routes";

const plans = [
  {
    name: "Lite",
    tag: "Pay as you ride",
    price: { monthly: "0", yearly: "0" },
    description: "Perfect for occasional riders. No commitment.",
    icon: Zap,
    color: "from-electric-500/20 to-transparent",
    features: [
      "Standard fares",
      "Card & wallet payments",
      "Live tracking",
      "24/7 support",
    ],
    notIncluded: ["No surge protection", "No priority pickup"],
    cta: "Start riding",
    featured: false,
  },
  {
    name: "Plus",
    tag: "For city regulars",
    price: { monthly: "9", yearly: "79" },
    description: "Save on every ride. Priority pickups. Unmatched value.",
    icon: Sparkles,
    color: "from-sunny-400/30 to-transparent",
    features: [
      "10% off every ride",
      "Surge protection up to 1.5x",
      "Priority pickup queue",
      "3 free cancellations / month",
      "SwiftPay wallet cashback",
    ],
    notIncluded: ["No Luxe upgrades"],
    cta: "Upgrade to Plus",
    featured: true,
  },
  {
    name: "Luxe",
    tag: "Premium membership",
    price: { monthly: "29", yearly: "289" },
    description: "Top-tier rides, concierge support, and lounge access.",
    icon: Crown,
    color: "from-neon-purple/30 to-transparent",
    features: [
      "20% off + free Luxe upgrades",
      "Airport lounge access (40+ cities)",
      "Concierge ride assistant",
      "Surge fully waived",
      "Dedicated success manager",
    ],
    notIncluded: [],
    cta: "Go Luxe",
    featured: false,
  },
];

const compareRows = [
  { feature: "Fare discount", lite: "—", plus: "10%", luxe: "20%" },
  { feature: "Surge protection", lite: false, plus: "Up to 1.5x", luxe: "Unlimited" },
  { feature: "Priority pickup", lite: false, plus: true, luxe: true },
  { feature: "Free cancellations / mo", lite: "1", plus: "3", luxe: "Unlimited" },
  { feature: "Luxe upgrades", lite: false, plus: false, luxe: true },
  { feature: "Airport lounge access", lite: false, plus: false, luxe: true },
  { feature: "Concierge support", lite: false, plus: false, luxe: true },
  { feature: "Carbon offset", lite: true, plus: true, luxe: true },
  { feature: "24/7 support", lite: true, plus: true, luxe: true },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        breadcrumbs={[{ label: "Pricing" }]}
        title={
          <>
            Fair fares.{" "}
            <span className="gradient-text">No surprises.</span>
          </>
        }
        subtitle="Upfront pricing on every ride. Pick a membership only when it pays for itself in your first week."
      >
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1 text-sm">
          {(["monthly", "yearly"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className={`relative rounded-full px-4 py-1.5 transition ${
                billing === b ? "text-ink-950" : "text-white/70 hover:text-white"
              }`}
            >
              {billing === b && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 -z-0 rounded-full bg-sunny-400"
                  transition={{ type: "spring", duration: 0.45 }}
                />
              )}
              <span className="relative z-10 capitalize">
                {b}
                {b === "yearly" && (
                  <span
                    className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                      billing === b ? "bg-ink-950 text-sunny-400" : "bg-sunny-400/20 text-sunny-400"
                    }`}
                  >
                    −30%
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </PageHero>

      {/* Pricing cards */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`relative overflow-hidden rounded-3xl border p-1 transition-shadow ${
                  p.featured
                    ? "border-sunny-400/50 shadow-glow-yellow"
                    : "border-white/10"
                }`}
              >
                {p.featured && (
                  <div className="absolute right-5 top-5 z-10 rounded-full bg-sunny-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-950">
                    Most popular
                  </div>
                )}
                <div
                  className={`relative h-full rounded-[1.4rem] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 backdrop-blur-xl`}
                >
                  <div
                    className={`absolute inset-0 -z-10 bg-gradient-to-br ${p.color} opacity-60`}
                  />
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-900/60">
                      <p.icon size={18} className="text-sunny-400" />
                    </div>
                    <div>
                      <p className="font-display text-2xl">{p.name}</p>
                      <p className="text-xs text-white/55">{p.tag}</p>
                    </div>
                  </div>

                  <div className="mt-7 flex items-baseline gap-2">
                    <span className="font-display text-6xl font-semibold">
                      ${p.price[billing]}
                    </span>
                    <span className="text-white/55">
                      / {billing === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-white/65">{p.description}</p>

                  <GradientButton
                    href={ROUTES.signup}
                    variant={p.featured ? "primary" : "secondary"}
                    className="mt-7 w-full"
                  >
                    {p.cta}
                  </GradientButton>

                  <ul className="mt-7 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check size={14} className="mt-0.5 text-emerald-400" />
                        <span className="text-white/85">{f}</span>
                      </li>
                    ))}
                    {p.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white/40">
                        <X size={14} className="mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Surge transparency */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 backdrop-blur-xl md:grid-cols-2 md:p-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sunny-400/30 bg-sunny-400/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-sunny-400">
                <TrendingUp size={12} /> Surge transparency
              </div>
              <h3 className="mt-5 font-display text-3xl md:text-4xl">
                We cap surge.{" "}
                <span className="gradient-text">Always.</span>
              </h3>
              <p className="mt-3 text-white/65">
                Maximum surge multiplier on any SwiftCab ride is 1.8x — even on
                New Year's Eve in Times Square. You'll always see the multiplier
                before you book.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/75">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" /> Hard cap at 1.8x
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" /> Plus members: 1.5x cap
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" /> Luxe members: zero surge
                </li>
              </ul>
            </div>

            {/* Visual surge meter */}
            <div className="relative rounded-2xl border border-white/10 bg-ink-950/50 p-6">
              <div className="flex items-center justify-between text-xs text-white/55">
                <span>Live multiplier · Brooklyn</span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                  CALM
                </span>
              </div>
              <p className="mt-3 font-display text-6xl">1.0x</p>

              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "20%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sunny-400 to-rose-400"
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] text-white/45">
                <span>1.0x</span>
                <span>1.5x</span>
                <span className="text-rose-300">1.8x (cap)</span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  { t: "Now", v: "1.0x" },
                  { t: "5pm", v: "1.3x" },
                  { t: "8pm", v: "1.5x" },
                ].map((p) => (
                  <div
                    key={p.t}
                    className="rounded-xl border border-white/10 bg-white/[0.03] py-2"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-white/55">
                      {p.t}
                    </p>
                    <p className="font-display text-sm">{p.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Compare plans"
            title={
              <>
                Side-by-side.{" "}
                <span className="gradient-text">Honest details.</span>
              </>
            }
          />

          <div className="mt-12 overflow-hidden rounded-3xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white/[0.04] text-white/85">
                  <th className="px-6 py-5 font-display text-base font-semibold">Feature</th>
                  <th className="px-6 py-5 font-display text-base font-semibold">Lite</th>
                  <th className="px-6 py-5 font-display text-base font-semibold">
                    <span className="rounded-full bg-sunny-400/15 px-2 py-0.5 text-sunny-400">
                      Plus
                    </span>
                  </th>
                  <th className="px-6 py-5 font-display text-base font-semibold">Luxe</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r, i) => (
                  <tr
                    key={r.feature}
                    className={i % 2 === 0 ? "bg-white/[0.015]" : ""}
                  >
                    <td className="px-6 py-4 text-white/85">{r.feature}</td>
                    <Cell value={r.lite} />
                    <Cell value={r.plus} accent />
                    <Cell value={r.luxe} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h3 className="font-display text-3xl md:text-4xl">
            Try Plus risk-free.{" "}
            <span className="gradient-text">7 days on us.</span>
          </h3>
          <p className="mt-3 text-white/65">
            Cancel anytime. Most riders save 3x their membership in the first week.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <GradientButton href={ROUTES.signup}>Start free trial</GradientButton>
            <GradientButton href={ROUTES.contact} variant="secondary">
              Talk to sales
            </GradientButton>
          </div>
        </div>
      </section>
    </>
  );
}

function Cell({ value, accent }: { value: string | boolean; accent?: boolean }) {
  return (
    <td className={`px-6 py-4 ${accent ? "bg-sunny-400/[0.04]" : ""}`}>
      {typeof value === "boolean" ? (
        value ? (
          <Check size={16} className="text-emerald-400" />
        ) : (
          <X size={16} className="text-white/30" />
        )
      ) : (
        <span className="text-white/85">{value}</span>
      )}
    </td>
  );
}
