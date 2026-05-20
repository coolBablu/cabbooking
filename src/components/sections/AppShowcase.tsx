"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Apple, Download, Smartphone, Sparkles, Wallet, Bell, Star } from "lucide-react";
import { GradientButton } from "../ui/GradientButton";

export function AppShowcase() {
  return (
    <section id="app" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-20 h-[28rem] w-[28rem] rounded-full bg-sunny-400/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-electric-600/15 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2">
        {/* TEXT */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl"
          >
            <Sparkles size={12} className="text-sunny-400" />
            Mobile app
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-6xl"
          >
            Your city in your pocket.{" "}
            <span className="gradient-text">Beautiful.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-lg text-white/65 md:text-lg"
          >
            Book in two taps, pay with a glance, share your trip with a friend. The
            SwiftCab app is designed to make every ride feel like an upgrade.
          </motion.p>

          <ul className="mt-7 space-y-3">
            {[
              { icon: Smartphone, text: "One-tap rebooking from your favorite places" },
              { icon: Wallet, text: "Built-in SwiftPay wallet & instant refunds" },
              { icon: Bell, text: "Smart notifications — never miss your ride" },
            ].map((f, i) => (
              <motion.li
                key={f.text}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                  <f.icon size={16} className="text-sunny-400" />
                </div>
                <p className="text-sm text-white/80 md:text-base">{f.text}</p>
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <GradientButton>
              <Apple size={16} /> App Store
            </GradientButton>
            <GradientButton variant="secondary">
              <Download size={16} /> Google Play
            </GradientButton>
          </div>

          <div className="mt-7 flex items-center gap-4">
            <div className="flex items-center gap-1 text-sunny-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" stroke="none" />
              ))}
            </div>
            <p className="text-sm text-white/60">
              4.9 · <span className="text-white">180K+ reviews</span>
            </p>
          </div>
        </div>

        {/* PHONE MOCKUP */}
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-sunny-400/30 via-electric-500/20 to-neon-purple/30 blur-3xl" />

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-[600px] w-[300px] overflow-hidden rounded-[3rem] border border-white/15 bg-ink-900 p-3 shadow-ring"
            >
              {/* Notch */}
              <div className="absolute left-1/2 top-3 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />

              <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-gradient-to-b from-ink-800 to-ink-950">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=85&auto=format&fit=crop"
                  alt="App screen"
                  fill
                  sizes="300px"
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/20 to-ink-950" />

                {/* App UI overlay */}
                <div className="relative flex h-full flex-col p-5 pt-12">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>9:41</span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" /> Online
                    </span>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-wider text-white/50">
                      Good morning, Alex
                    </p>
                    <p className="mt-1 font-display text-lg">Where to today?</p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {["Home", "Work", "Brooklyn Bridge"].map((p, i) => (
                      <div
                        key={p}
                        className={`flex items-center justify-between rounded-xl border border-white/10 px-3 py-2.5 text-sm ${
                          i === 1 ? "bg-sunny-400/15" : "bg-white/[0.04]"
                        }`}
                      >
                        <span>{p}</span>
                        <span className="text-[11px] text-white/60">
                          {i === 0 ? "8 min" : i === 1 ? "22 min" : "12 min"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto rounded-2xl border border-white/10 bg-ink-950/70 p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-wider text-white/50">
                      Suggested
                    </p>
                    <p className="mt-1 font-display text-base">SwiftCab Luxe • $28</p>
                    <button className="mt-3 w-full rounded-xl bg-gradient-to-r from-sunny-400 to-sunny-300 py-2.5 text-sm font-semibold text-ink-950">
                      Book in 7s
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating mini cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-10 top-16 hidden rounded-2xl border border-white/10 bg-ink-950/70 px-4 py-3 backdrop-blur-xl shadow-soft sm:block"
            >
              <p className="text-[10px] uppercase tracking-wider text-white/50">
                Live trip
              </p>
              <p className="font-display text-sm">Arriving in 2:14</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 bottom-24 hidden rounded-2xl border border-white/10 bg-ink-950/70 px-4 py-3 backdrop-blur-xl shadow-soft sm:block"
            >
              <p className="text-[10px] uppercase tracking-wider text-white/50">
                Saved this month
              </p>
              <p className="font-display text-sm text-sunny-400">$142.50</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
