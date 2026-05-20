"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    // UI-only flow — pretend to send a magic link.
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={ROUTES.login}
        className="mb-6 inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white"
      >
        <ArrowLeft size={12} /> Back to sign in
      </Link>

      <h1 className="font-display text-3xl md:text-4xl">Reset your password</h1>
      <p className="mt-2 text-sm text-white/60">
        We&apos;ll email you a magic link to set a new one.
      </p>

      {sent ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6"
        >
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 size={18} /> Reset link sent
          </div>
          <p className="mt-2 text-sm text-white/75">
            If an account exists for <span className="font-semibold">{email}</span>,
            we just sent a secure link. Check your inbox (and spam, just in case).
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setSent(false)}
              className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] py-3 text-sm font-semibold transition-colors hover:bg-white/[0.08]"
            >
              Use a different email
            </button>
            <Link
              href={ROUTES.login}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sunny-400 to-sunny-300 py-3 text-sm font-semibold text-ink-950 shadow-glow-yellow"
            >
              Back to sign in <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
          <div>
            <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
              Email
            </label>
            <div
              className={`mt-2 flex items-center gap-3 rounded-2xl border bg-ink-950/40 px-4 py-3 focus-within:border-sunny-400/40 ${
                error ? "border-rose-400/60" : "border-white/10"
              }`}
            >
              <Mail size={15} className="text-white/50" />
              <input
                type="email"
                placeholder="you@city.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
              />
            </div>
            {error && <p className="mt-1 text-xs text-rose-300">{error}</p>}
          </div>

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sunny-400 to-sunny-300 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-yellow disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Sending link…
              </>
            ) : (
              <>
                Send reset link <ArrowRight size={14} />
              </>
            )}
          </motion.button>

          <p className="text-center text-xs text-white/55">
            Remembered it?{" "}
            <Link href={ROUTES.login} className="text-sunny-400 hover:underline">
              Back to sign in
            </Link>
          </p>
        </form>
      )}
    </motion.div>
  );
}
