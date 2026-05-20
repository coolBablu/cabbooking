"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated aurora / blob background used behind hero & CTA sections.
 * Pure CSS + Framer Motion — no images required.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-[0.25] mask-fade-bottom" />

      {/* Soft radial spotlight */}
      <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-radial-glow opacity-70" />

      {/* Animated blobs */}
      <motion.div
        initial={{ x: -120, y: -60, scale: 1 }}
        animate={{ x: 80, y: 40, scale: 1.15 }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute -top-32 -left-32 h-[36rem] w-[36rem] rounded-full bg-electric-600/40 blur-3xl"
      />
      <motion.div
        initial={{ x: 100, y: 60, scale: 1 }}
        animate={{ x: -60, y: -40, scale: 1.2 }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute -bottom-40 -right-32 h-[40rem] w-[40rem] rounded-full bg-sunny-400/25 blur-3xl"
      />
      <motion.div
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={{ x: -80, y: 80, scale: 1.1 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-neon-purple/30 blur-3xl"
      />

      {/* Subtle noise */}
      <div className="absolute inset-0 noise opacity-40 mix-blend-overlay" />
    </div>
  );
}
