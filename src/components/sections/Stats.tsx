"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  color: string;
};

const stats: Stat[] = [
  { label: "Rides completed", value: 142, suffix: "M+", color: "text-sunny-400" },
  { label: "Happy users", value: 24, suffix: "M+", color: "text-electric-400" },
  { label: "Active drivers", value: 120, suffix: "K+", color: "text-neon-purple" },
  { label: "Cities served", value: 142, suffix: "+", color: "text-emerald-400" },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:48px_48px] opacity-[0.06]" />

      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-white/[0.05] p-8 backdrop-blur-xl md:p-12"
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <StatItem key={s.label} stat={s} delay={i * 0.08} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(stat.value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative"
    >
      <p
        className={`font-display text-5xl font-semibold tracking-tight md:text-6xl ${stat.color}`}
      >
        {stat.prefix}
        {count}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-white/60">{stat.label}</p>
    </motion.div>
  );
}
