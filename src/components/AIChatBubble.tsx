"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";

const sampleReplies = [
  "Hey Alex! Want to head home? I see your usual spot is 14 min away.",
  "I can book a SwiftCab Plus for you at $18. Confirm?",
  "Booked! Your driver Daniel is 2:14 away. Have a beautiful ride.",
];

export function AIChatBubble() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  return (
    <>
      <motion.button
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 16 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="AI assistant"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-sunny-400 to-electric-500 text-ink-950 shadow-glow"
      >
        <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-sunny-400 to-electric-500 opacity-40 blur-md" />
        {open ? <X size={20} /> : <Bot size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-5 z-50 w-[min(360px,calc(100vw-2.5rem))] overflow-hidden rounded-3xl border border-white/10 bg-ink-950/85 shadow-ring backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sunny-400 to-electric-500 text-ink-950">
                <Sparkles size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold">Swift AI Assistant</p>
                <p className="text-[11px] text-emerald-400">● online</p>
              </div>
            </div>

            <div className="space-y-3 p-4">
              <div className="flex items-start gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                  <Bot size={14} />
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-3.5 py-2.5 text-sm">
                  {sampleReplies[Math.min(step, sampleReplies.length - 1)]}
                </div>
              </div>
              {step > 0 && (
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-sunny-400 px-3.5 py-2.5 text-sm font-medium text-ink-950">
                    Yes, please!
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                placeholder="Ask anything…"
                className="flex-1 rounded-full bg-white/[0.04] px-4 py-2.5 text-sm outline-none placeholder:text-white/40"
              />
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-sunny-400 to-sunny-300 text-ink-950"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
