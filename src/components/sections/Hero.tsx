"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation2,
  ArrowRight,
  Zap,
  ShieldCheck,
  Star,
  Play,
} from "lucide-react";
import { AuroraBackground } from "../ui/AuroraBackground";
import { GradientButton } from "../ui/GradientButton";
import { BookingFormModal } from "../ui/BookingFormModal";
import { VideoModal } from "../ui/VideoModal";

const trustLogos = ["Forbes", "TechCrunch", "Wired", "The Verge", "Bloomberg"];

export function Hero() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-hero-gradient pt-28 pb-16 md:pt-32"
    >
      <AuroraBackground />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* LEFT */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              AI Mobility • Live in 42 cities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="mt-6 font-display text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl"
            >
              Rides that feel like{" "}
              <span className="gradient-text">tomorrow.</span>
              <br className="hidden md:block" />
              Happiness on{" "}
              <span className="relative inline-block">
                wheels.
                <motion.svg
                  viewBox="0 0 220 18"
                  className="absolute -bottom-3 left-0 h-3 w-full text-sunny-400"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                >
                  <motion.path
                    d="M2 12 C 60 2, 160 2, 218 12"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl text-base text-white/70 md:text-lg"
            >
              SwiftCab blends AI route intelligence with premium electric fleets to
              give you the smoothest, safest, and most joyful way to move across
              the modern city.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <GradientButton onClick={() => setBookingOpen(true)}>
                Book your ride <ArrowRight size={16} />
              </GradientButton>
              <GradientButton
                variant="secondary"
                onClick={() => setVideoOpen(true)}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sunny-400 text-ink-950">
                  <Play size={10} fill="currentColor" />
                </span>
                Watch the magic
              </GradientButton>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=80&q=80&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&q=80&auto=format&fit=crop",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-ink-950 ring-1 ring-white/10"
                    >
                      <Image
                        src={src}
                        alt="happy rider"
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-sunny-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" stroke="none" />
                    ))}
                    <span className="ml-2 text-white/85">4.96</span>
                  </div>
                  <p className="text-white/55">
                    Loved by <span className="text-white">2.4M+ riders</span> worldwide
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-white/40">
                {trustLogos.map((logo) => (
                  <span key={logo} className="font-medium">
                    {logo}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Booking card + Taxi visual */}
          <div className="relative lg:col-span-5">
            <BookingCard />
            <TaxiVisual />
            <FloatingStats />
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-950" />

      <BookingFormModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}

function BookingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 110, damping: 18 }}
      className="relative z-20 mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 shadow-ring backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-white/70">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          Live booking
        </div>
        <span className="rounded-full bg-sunny-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-sunny-300">
          AI route
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <Field
          icon={<MapPin size={16} className="text-sunny-400" />}
          label="Pickup"
          value="Brooklyn Bridge, NYC"
        />
        <Field
          icon={<Navigation2 size={16} className="text-electric-400" />}
          label="Drop-off"
          value="JFK International Airport"
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { name: "Lite", price: "$12", eta: "2 min", glow: "from-electric-500/30" },
          { name: "Plus", price: "$18", eta: "3 min", glow: "from-sunny-400/30", active: true },
          { name: "Lux", price: "$29", eta: "5 min", glow: "from-neon-purple/30" },
        ].map((t) => (
          <button
            key={t.name}
            className={`group relative overflow-hidden rounded-xl border p-3 text-left transition ${
              t.active
                ? "border-sunny-400/60 bg-sunny-400/10"
                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
            }`}
          >
            <div
              className={`absolute inset-0 -z-10 bg-gradient-to-br ${t.glow} to-transparent opacity-70`}
            />
            <p className="text-[11px] uppercase tracking-wider text-white/55">
              {t.name}
            </p>
            <p className="mt-1 font-display text-lg">{t.price}</p>
            <p className="text-[11px] text-white/50">{t.eta} away</p>
          </button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="mt-5 flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-sunny-400 via-sunny-300 to-sunny-400 px-5 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-yellow"
      >
        <span>Confirm SwiftCab Plus</span>
        <ArrowRight size={16} />
      </motion.button>

      <div className="mt-3 flex items-center justify-between text-[11px] text-white/55">
        <span className="flex items-center gap-1">
          <ShieldCheck size={12} className="text-emerald-400" /> Insured & verified
        </span>
        <span>ETA 22 min • 18.4 mi</span>
      </div>
    </motion.div>
  );
}

function Field({
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
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">
          {label}
        </p>
        <p className="truncate text-sm text-white">{value}</p>
      </div>
    </div>
  );
}

function TaxiVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="pointer-events-none absolute -top-10 -right-6 hidden h-72 w-72 md:block lg:-right-12 lg:-top-8 lg:h-80 lg:w-80"
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-full w-full"
      >
        <div className="absolute inset-0 rounded-full bg-sunny-400/25 blur-3xl" />
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=640&q=85&auto=format&fit=crop"
          alt="Futuristic taxi"
          fill
          sizes="320px"
          className="rounded-[2rem] object-cover shadow-2xl"
        />
      </motion.div>
    </motion.div>
  );
}

function FloatingStats() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute -left-4 top-10 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/70 px-4 py-3 backdrop-blur-xl shadow-soft"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric-500/20 text-electric-400">
            <Zap size={16} />
          </div>
          <div>
            <p className="text-xs text-white/55">Avg pickup</p>
            <p className="font-display text-base">2.4 min</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute -bottom-4 -left-6 z-10 hidden md:block lg:-bottom-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/70 px-4 py-3 backdrop-blur-xl shadow-soft"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sunny-400/20 text-sunny-400">
            <ShieldCheck size={16} />
          </div>
          <div>
            <p className="text-xs text-white/55">Verified drivers</p>
            <p className="font-display text-base">100%</p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
