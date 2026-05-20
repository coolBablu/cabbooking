"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  ShieldCheck,
  Gauge,
  Radio,
  HandCoins,
  Leaf,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Route Intelligence",
    desc: "Our models reroute around traffic, weather, and events in real time — saving you minutes on every trip.",
    accent: "text-electric-400",
    glow: "shadow-[0_0_60px_-15px_#3b82f6]",
  },
  {
    icon: ShieldCheck,
    title: "Verified, Safe Rides",
    desc: "Background-checked drivers, 24/7 SOS, live trip sharing, and insured journeys — every single time.",
    accent: "text-emerald-400",
    glow: "shadow-[0_0_60px_-15px_#34d399]",
  },
  {
    icon: Gauge,
    title: "Lightning Booking",
    desc: "From tap to road in under 7 seconds. The fastest checkout in mobility.",
    accent: "text-sunny-400",
    glow: "shadow-[0_0_60px_-15px_#facc15]",
  },
  {
    icon: Radio,
    title: "Live Tracking",
    desc: "Sub-second GPS updates. Share your ETA with one tap. Loved ones in the loop.",
    accent: "text-neon-cyan",
    glow: "shadow-[0_0_60px_-15px_#22d3ee]",
  },
  {
    icon: HandCoins,
    title: "Fair, Transparent Pricing",
    desc: "Upfront fares, zero surprise fees. Surge capped & explained — the way it should be.",
    accent: "text-neon-purple",
    glow: "shadow-[0_0_60px_-15px_#8b5cf6]",
  },
  {
    icon: Leaf,
    title: "Carbon-Neutral Fleet",
    desc: "Every SwiftCab ride is 100% carbon-offset. By 2027, our fleet will be fully electric.",
    accent: "text-emerald-300",
    glow: "shadow-[0_0_60px_-15px_#6ee7b7]",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:48px_48px] opacity-[0.06]" />
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Why SwiftCab"
          title={
            <>
              Built for the way{" "}
              <span className="gradient-text">cities will move next.</span>
            </>
          }
          subtitle="A new generation of mobility — engineered for joy, speed, safety, and the planet."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-shadow duration-500 hover:bg-white/[0.05]"
            >
              <div
                className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/[0.05] blur-2xl transition duration-700 group-hover:scale-110 ${f.glow}`}
              />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-ink-900/70 backdrop-blur-xl">
                <f.icon size={22} className={f.accent} />
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-white/65">{f.desc}</p>

              <div className="mt-5 flex items-center gap-2 text-xs text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-sunny-400" />
                Available everywhere SwiftCab operates
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
