"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  Search,
  Car,
  CreditCard,
  Shield,
  Users,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ROUTES } from "@/lib/routes";

const groups = [
  {
    icon: Car,
    title: "Rides & Booking",
    color: "text-sunny-400",
    items: [
      {
        q: "How fast can I get a ride?",
        a: "Most SwiftCab pickups arrive in under 3 minutes in metro areas. Our AI dispatch system pre-positions drivers based on real-time demand patterns.",
      },
      {
        q: "Can I schedule a ride in advance?",
        a: "Yes! You can pre-book any ride up to 30 days in advance. We guarantee on-time pickup or your fare is on us.",
      },
      {
        q: "What if my plans change mid-trip?",
        a: "Add a stop or change the destination at any time from the app. We'll recalculate the fare upfront with no penalty fees.",
      },
      {
        q: "Can I book a ride for someone else?",
        a: "Absolutely — choose 'Ride for someone else' at checkout. They'll get the live tracking link directly.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Pricing & Payments",
    color: "text-electric-400",
    items: [
      {
        q: "How does fare estimation work?",
        a: "You see an upfront, fixed fare before you book. No surge surprises, no hidden fees. Our pricing accounts for distance, traffic, and time of day.",
      },
      {
        q: "What payment methods do you support?",
        a: "Credit/debit cards, Apple Pay, Google Pay, SwiftPay wallet, UPI, Stripe, Razorpay, and corporate billing.",
      },
      {
        q: "Do you offer corporate billing?",
        a: "Yes — SwiftCab for Business gives your team unified billing, expense codes, and a dedicated success manager.",
      },
      {
        q: "How do refunds work?",
        a: "Refunds are typically processed within 24 hours back to your original payment method. Wallet refunds are instant.",
      },
    ],
  },
  {
    icon: Shield,
    title: "Safety",
    color: "text-emerald-400",
    items: [
      {
        q: "Are drivers verified?",
        a: "Every SwiftCab driver passes a multi-stage background check, vehicle inspection, and onboarding course. We continuously monitor ratings and trip safety in real time.",
      },
      {
        q: "Is there an SOS feature?",
        a: "Yes — a one-tap SOS button is available throughout your ride. It connects you to local emergency services and shares your live location.",
      },
      {
        q: "Can I share my ride status with family?",
        a: "Of course. Tap 'Share ride' to send a live tracking link to anyone. They'll see your driver, route, and ETA in real time.",
      },
    ],
  },
  {
    icon: Users,
    title: "Driver-partners",
    color: "text-neon-purple",
    items: [
      {
        q: "How do I become a SwiftCab driver?",
        a: "Sign-up takes about 3 minutes. You'll need a valid driver's license, vehicle documents, insurance, and to pass our short verification flow.",
      },
      {
        q: "How much can I earn?",
        a: "Drivers in active markets earn between $900–$1,500/week working full-time. Plus tips, bonuses, and weekend incentives.",
      },
      {
        q: "Do I keep tips?",
        a: "100% of every tip goes directly to the driver. SwiftCab never takes a cut of gratuities.",
      },
    ],
  },
  {
    icon: Smartphone,
    title: "App & Account",
    color: "text-neon-cyan",
    items: [
      {
        q: "Is SwiftCab available on iOS and Android?",
        a: "Yes — get us on the App Store, Google Play, or use the web app at swiftcab.com.",
      },
      {
        q: "How do I delete my account?",
        a: "Go to Settings → Account → Delete account. We'll erase your data within 30 days per GDPR/CCPA.",
      },
      {
        q: "Can I use SwiftCab abroad?",
        a: "Your account works across all 142 cities we operate in. Your wallet, profile, and ride history travel with you.",
      },
    ],
  },
];

const ALL = groups.flatMap((g) =>
  g.items.map((i) => ({ ...i, group: g.title, color: g.color }))
);

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(`0-0`);
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? ALL.filter(
        (item) =>
          item.q.toLowerCase().includes(query.toLowerCase()) ||
          item.a.toLowerCase().includes(query.toLowerCase())
      )
    : null;

  return (
    <>
      <PageHero
        eyebrow="Help Center"
        breadcrumbs={[{ label: "FAQ" }]}
        title={
          <>
            Smart answers for{" "}
            <span className="gradient-text">curious riders.</span>
          </>
        }
        subtitle="Everything you wanted to know about SwiftCab — and a few things you didn't."
      >
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the help center…"
            className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-sunny-400/40"
          />
        </div>
      </PageHero>

      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-5">
          {filtered ? (
            <div className="space-y-3">
              <p className="mb-4 text-sm text-white/55">
                {filtered.length} result{filtered.length !== 1 && "s"} for "{query}"
              </p>
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                  <p className="font-display text-xl">No matches found</p>
                  <p className="mt-2 text-sm text-white/60">
                    Try a different keyword or{" "}
                    <Link href={ROUTES.contact} className="text-sunny-400 underline">
                      contact support
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                filtered.map((item, i) => (
                  <Item
                    key={i}
                    id={`s-${i}`}
                    open={open === `s-${i}`}
                    onToggle={() => setOpen(open === `s-${i}` ? null : `s-${i}`)}
                    question={item.q}
                    answer={item.a}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="space-y-14">
              {groups.map((g, gi) => (
                <div key={g.title}>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-ink-900/60">
                      <g.icon size={18} className={g.color} />
                    </div>
                    <h3 className="font-display text-2xl">{g.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {g.items.map((item, i) => {
                      const id = `${gi}-${i}`;
                      return (
                        <Item
                          key={id}
                          id={id}
                          open={open === id}
                          onToggle={() => setOpen(open === id ? null : id)}
                          question={item.q}
                          answer={item.a}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sunny-400/10 via-electric-500/10 to-transparent p-8 backdrop-blur-xl md:p-10">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sunny-400">
                  <Sparkles size={12} /> Still curious?
                </div>
                <h4 className="mt-2 font-display text-2xl md:text-3xl">
                  Our team replies in under an hour.
                </h4>
              </div>
              <Link href={ROUTES.contact}>
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-6 py-3 text-sm font-semibold text-ink-950 shadow-glow-yellow">
                  Contact support
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Item({
  id,
  open,
  onToggle,
  question,
  answer,
}: {
  id: string;
  open: boolean;
  onToggle: () => void;
  question: string;
  answer: string;
}) {
  return (
    <motion.div
      layout
      className={`overflow-hidden rounded-2xl border transition-colors ${
        open
          ? "border-sunny-400/40 bg-sunny-400/[0.04]"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-display text-base md:text-lg">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
            open
              ? "border-sunny-400/60 bg-sunny-400 text-ink-950"
              : "border-white/10 bg-white/[0.04] text-white/80"
          }`}
        >
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-white/70 md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
