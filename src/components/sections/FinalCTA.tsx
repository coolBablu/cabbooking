"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { GradientButton } from "../ui/GradientButton";
import { AuroraBackground } from "../ui/AuroraBackground";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-hero-gradient p-10 md:p-16">
          <AuroraBackground />

          <div className="relative grid items-center gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-xl"
              >
                <Sparkles size={12} className="text-sunny-400" />
                Your first ride is on us
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl lg:text-6xl"
              >
                Ready to feel the{" "}
                <span className="gradient-text">future move?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-5 max-w-xl text-white/75 md:text-lg"
              >
                Download SwiftCab today. Your first ride up to $20 is free — because
                first impressions deserve to be magical.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <GradientButton>
                  Book your free ride <ArrowRight size={16} />
                </GradientButton>
                <GradientButton variant="secondary">
                  Become a driver
                </GradientButton>
              </motion.div>
            </div>

            {/* Decorative right side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:col-span-2 lg:block"
            >
              <div className="relative mx-auto h-72 w-72">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sunny-400 to-electric-500 opacity-30 blur-3xl" />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border border-dashed border-white/15"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-10 rounded-full border border-white/10"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-tr from-sunny-400 to-sunny-300 shadow-glow-yellow">
                    <Sparkles size={36} className="text-ink-950" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
