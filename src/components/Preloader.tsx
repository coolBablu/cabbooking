"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1300;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
        >
          <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-20" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-2xl bg-sunny-400/30 blur-xl" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-sunny-400 to-electric-500 shadow-glow">
                <Sparkles className="h-7 w-7 text-ink-950" strokeWidth={2.5} />
              </div>
            </div>
            <p className="font-display text-2xl tracking-tight">
              Swift<span className="text-sunny-400">Cab</span>
            </p>
            <div className="h-1 w-56 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-sunny-400 via-sunny-300 to-electric-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-mono text-xs text-white/50">
              calibrating routes · {progress}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
