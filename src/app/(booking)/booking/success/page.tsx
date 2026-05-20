"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  Car,
  MapPin,
  Navigation2,
  Clock,
  Share2,
  CalendarPlus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ROUTES } from "@/lib/routes";

const confettiColors = [
  "#facc15",
  "#3b82f6",
  "#a78bfa",
  "#22d3ee",
  "#34d399",
  "#f472b6",
];

export default function BookingSuccessPage() {
  return (
    <div className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-hero-gradient">
      <AuroraBackground />

      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ y: -40, x: `${(i * 53) % 100}%`, rotate: 0, opacity: 0 }}
            animate={{
              y: ["-10%", "110%"],
              rotate: 360 * (i % 2 === 0 ? 1 : -1),
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4 + (i % 5),
              delay: i * 0.08,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute block h-2 w-3 rounded-sm"
            style={{ background: confettiColors[i % confettiColors.length] }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl px-5 py-20">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-400 text-ink-950 shadow-[0_0_60px_-10px_#34d399]"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 240, damping: 20 }}
          >
            <Check size={42} strokeWidth={3} />
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 text-center font-display text-4xl font-semibold leading-tight md:text-5xl"
        >
          Booking confirmed.{" "}
          <span className="gradient-text">Enjoy the ride!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-3 text-center text-white/70 md:text-lg"
        >
          We've sent you a confirmation at{" "}
          <span className="text-white">alex@swiftcab.com</span>. Your driver is
          assigned and on the way.
        </motion.p>

        {/* Booking summary card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mx-auto mt-10 max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                Booking #
              </p>
              <p className="mt-1 font-display text-lg">SW-2451-MAY</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                Total paid
              </p>
              <p className="mt-1 font-display text-xl text-sunny-400">$17.60</p>
            </div>
          </div>

          <div className="space-y-3 p-5">
            <Row
              icon={<MapPin size={14} className="text-sunny-400" />}
              label="Pickup"
              value="Home · 1255 Court St, Brooklyn"
            />
            <Row
              icon={<Navigation2 size={14} className="text-electric-400" />}
              label="Destination"
              value="JFK International, Terminal 4"
            />
            <Row
              icon={<Car size={14} className="text-neon-purple" />}
              label="Ride"
              value="SwiftCab Plus · Tesla Model Y"
            />
            <Row
              icon={<Clock size={14} className="text-white/80" />}
              label="ETA"
              value="2 min · 22 min total trip"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-white/10 p-3">
            <Btn icon={<Share2 size={14} />} label="Share" />
            <Btn icon={<CalendarPlus size={14} />} label="Add to calendar" />
            <Btn
              icon={<Sparkles size={14} />}
              label="Track live"
              full
              href={ROUTES.ride("SW-2451-MAY")}
            />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href={ROUTES.ride("SW-2451-MAY")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-6 py-3 text-sm font-semibold text-ink-950 shadow-glow-yellow transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Track your ride <ArrowRight size={14} />
          </Link>
          <Link
            href={ROUTES.dashboard}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Open dashboard
          </Link>
        </motion.div>

        {/* Bonus */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur-xl"
        >
          <p className="text-[11px] uppercase tracking-[0.18em] text-sunny-400">
            Bonus
          </p>
          <p className="mt-1.5 text-sm text-white/85">
            Refer 3 friends to SwiftCab and unlock a $30 ride credit. Your code:{" "}
            <span className="font-mono font-semibold text-sunny-400">ALEX-SC30</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-white/50">
          {label}
        </p>
        <p className="truncate text-sm">{value}</p>
      </div>
    </div>
  );
}

function Btn({
  icon,
  label,
  full,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  full?: boolean;
  href?: string;
}) {
  const cls = `flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-colors ${
    full
      ? "bg-sunny-400 text-ink-950 hover:bg-sunny-300 w-full"
      : "border border-white/10 bg-white/[0.04] text-white/85 hover:bg-white/[0.08]"
  }`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {icon} {label}
      </Link>
    );
  }
  return (
    <button className={cls}>
      {icon} {label}
    </button>
  );
}
