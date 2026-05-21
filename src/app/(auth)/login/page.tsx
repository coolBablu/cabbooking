"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Apple,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { auth, AuthError, homeForRole, type FieldErrors } from "@/lib/auth-client";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginFallback() {
  return (
    <div>
      <h1 className="font-display text-3xl md:text-4xl">Welcome back</h1>
      <p className="mt-2 text-sm text-white/60">
        Sign in to continue your SwiftCab journey.
      </p>
      <div className="mt-8 h-72 animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]" />
    </div>
  );
}

function LoginForm() {
  const params = useSearchParams();
  // Accept both `?next=` (canonical) and the legacy `?redirect=`.
  const nextParam = params.get("next") || params.get("redirect");

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
    if (password.length < 1) e.password = "Enter your password";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setFormError(null);

    const v = validate();
    setErrors(v);
    if (Object.values(v).some(Boolean)) return;

    try {
      setSubmitting(true);
      const { user } = await auth.login({ email: email.trim(), password });
      const dest =
        nextParam && nextParam.startsWith("/") ? nextParam : homeForRole(user.role);
      // Hard navigation: replaces the SPA push so the `/login` URL does NOT
      // sit in browser history (back button can never bring it back), and
      // it busts every client cache for protected routes.
      window.location.assign(dest);
    } catch (e) {
      if (e instanceof AuthError) {
        if (e.fieldErrors) setErrors(e.fieldErrors);
        setFormError(e.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  function quickFill(kind: "admin" | "rider" | "driver") {
    const presets = {
      admin: "admin@swiftcab.com",
      rider: "maya@swiftcab.com",
      driver: "daniel@swiftcab.com",
    };
    setEmail(presets[kind]);
    setPassword("Password123!");
    setErrors({});
    setFormError(null);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-display text-3xl md:text-4xl">Welcome back</h1>
      <p className="mt-2 text-sm text-white/60">
        Sign in to continue your SwiftCab journey.
      </p>

      {/* Demo account quick-fills */}
      <div className="mt-5 rounded-2xl border border-sunny-400/25 bg-sunny-400/[0.06] p-3">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-sunny-300">
          <Sparkles size={11} /> Demo accounts
        </div>
        <p className="mt-1 text-[11px] text-white/55">
          Click to autofill — password is{" "}
          <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px]">
            Password123!
          </code>
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(["admin", "rider", "driver"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => quickFill(k)}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] capitalize text-white/80 hover:bg-white/[0.08]"
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {formError && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-start gap-2 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
          role="alert"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {formError}
        </motion.div>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
        <Field
          label="Email"
          type="email"
          icon={<Mail size={15} className="text-white/50" />}
          placeholder="you@city.com"
          value={email}
          onChange={setEmail}
          error={errors.email}
          autoComplete="email"
        />

        <div>
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
              Password
            </label>
            <Link
              href={ROUTES.forgotPassword}
              className="text-[11px] text-sunny-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div
            className={`mt-2 flex items-center gap-3 rounded-2xl border bg-ink-950/40 px-4 py-3 focus-within:border-sunny-400/40 ${
              errors.password ? "border-rose-400/60" : "border-white/10"
            }`}
          >
            <Lock size={15} className="text-white/50" />
            <input
              type={show ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="text-white/50 hover:text-white"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-rose-300">{errors.password}</p>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-white/65">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-white/10 accent-sunny-400"
          />
          Remember me on this device
        </label>

        <motion.button
          whileHover={{ scale: submitting ? 1 : 1.01 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sunny-400 to-sunny-300 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-yellow disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Signing in…
            </>
          ) : (
            <>
              Sign in <ArrowRight size={14} />
            </>
          )}
        </motion.button>
      </form>

      <div className="my-7 flex items-center gap-3 text-xs text-white/45">
        <span className="h-px flex-1 bg-white/10" />
        OR CONTINUE WITH
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SocialBtn provider="google" />
        <SocialBtn provider="apple" />
      </div>

      <p className="mt-8 text-center text-sm text-white/65">
        New to SwiftCab?{" "}
        <Link
          href={ROUTES.signup}
          className="font-semibold text-sunny-400 hover:underline"
        >
          Create an account
        </Link>
      </p>

      <p className="mt-6 text-center text-[11px] text-white/40">
        By signing in, you agree to our{" "}
        <Link href={ROUTES.terms} className="underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href={ROUTES.privacy} className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </motion.div>
  );
}

function Field({
  label,
  type,
  icon,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
}: {
  label: string;
  type: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
        {label}
      </label>
      <div
        className={`mt-2 flex items-center gap-3 rounded-2xl border bg-ink-950/40 px-4 py-3 focus-within:border-sunny-400/40 ${
          error ? "border-rose-400/60" : "border-white/10"
        }`}
      >
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-300">{error}</p>}
    </div>
  );
}

function SocialBtn({ provider }: { provider: "google" | "apple" }) {
  const common =
    "flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] py-3 text-sm transition-colors hover:bg-white/[0.08] disabled:opacity-60";
  if (provider === "apple") {
    return (
      <button type="button" disabled title="OAuth coming soon" className={common}>
        <Apple size={16} /> Apple
      </button>
    );
  }
  return (
    <button type="button" disabled title="OAuth coming soon" className={common}>
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.12A6.6 6.6 0 0 1 5.5 12c0-.74.13-1.45.34-2.12V7.04H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.96l3.66-2.84z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
        />
      </svg>
      Google
    </button>
  );
}
