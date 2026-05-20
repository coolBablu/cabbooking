"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BadgeDollarSign, Clock, TrendingUp, Users } from "lucide-react";
import { GradientButton } from "../ui/GradientButton";

export function DriverPartner() {
  return (
    <section id="drive" className="relative overflow-hidden py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-sunny-400/30 via-electric-500/20 to-transparent blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=1000&q=85&auto=format&fit=crop"
              alt="Happy SwiftCab driver"
              width={900}
              height={1100}
              className="h-[560px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />

            {/* Earnings card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-ink-950/80 p-4 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                    This week
                  </p>
                  <p className="font-display text-2xl">$1,428.40</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                  <TrendingUp size={12} /> +18%
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <Mini label="Trips" value="64" />
                <Mini label="Hours" value="32" />
                <Mini label="Rating" value="4.98" />
              </div>
            </motion.div>
          </div>

          {/* Floating tip card */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-6 top-12 hidden rounded-2xl border border-white/10 bg-ink-950/80 px-4 py-3 backdrop-blur-2xl shadow-soft md:flex md:items-center md:gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sunny-400/20 text-sunny-400">
              <BadgeDollarSign size={18} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/55">
                Tip received
              </p>
              <p className="font-display text-base">+$12.00</p>
            </div>
          </motion.div>
        </motion.div>

        {/* COPY */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl"
          >
            <Users size={12} className="text-sunny-400" />
            Become a SwiftPartner
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-6xl"
          >
            Drive freely.{" "}
            <span className="gradient-text">Earn brilliantly.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-lg text-white/65 md:text-lg"
          >
            Set your own hours. Keep more of what you earn. Join 120,000+ drivers
            who chose SwiftCab — the most driver-loved platform in mobility.
          </motion.p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Avg weekly" value="$1.2K" />
            <Stat label="Active drivers" value="120K+" />
            <Stat label="Driver rating" value="4.92" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <GradientButton>
              Start earning <ArrowRight size={16} />
            </GradientButton>
            <GradientButton variant="secondary">
              <Clock size={16} /> Sign-up takes 3 mins
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] py-2">
      <p className="text-[10px] uppercase tracking-wider text-white/50">{label}</p>
      <p className="font-display text-sm">{value}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-white/55">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl">{value}</p>
    </div>
  );
}
