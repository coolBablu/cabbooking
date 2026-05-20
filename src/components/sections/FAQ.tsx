"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const faqs = [
  {
    q: "How fast can I get a ride?",
    a: "Most SwiftCab pickups arrive in under 3 minutes in metro areas. Our AI dispatch system pre-positions drivers based on real-time demand patterns.",
  },
  {
    q: "Is SwiftCab available in my city?",
    a: "We currently operate in 142 cities across 6 continents — and we're adding new markets every month. Enter your city in the app to check availability.",
  },
  {
    q: "How does fare estimation work?",
    a: "You see an upfront, fixed fare before you book. No surge surprises, no hidden fees. Our pricing accounts for distance, traffic, and time of day — and it's always shown before you confirm.",
  },
  {
    q: "Are drivers verified?",
    a: "Every SwiftCab driver passes a multi-stage background check, vehicle inspection, and onboarding course. We also continuously monitor ratings and trip safety in real time.",
  },
  {
    q: "What payment methods are supported?",
    a: "Credit/debit cards, Apple Pay, Google Pay, SwiftPay wallet, UPI, Stripe, Razorpay, and corporate billing. You can switch payment methods mid-trip too.",
  },
  {
    q: "Can I become a SwiftCab driver?",
    a: "Absolutely. Sign-up takes 3 minutes. You'll need a valid driver's license, vehicle documents, and to pass our short verification flow.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-4xl px-5">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Smart answers for{" "}
              <span className="gradient-text">curious riders.</span>
            </>
          }
          subtitle="Everything you wanted to know about SwiftCab — and a few things you didn't."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04 }}
                className={`group overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-sunny-400/40 bg-sunny-400/[0.04]"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display text-base md:text-lg">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen
                        ? "border-sunny-400/60 bg-sunny-400 text-ink-950"
                        : "border-white/10 bg-white/[0.04] text-white/80"
                    }`}
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-white/70 md:text-base">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
