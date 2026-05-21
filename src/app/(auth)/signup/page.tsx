"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Apple,
  Car,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { auth, AuthError, homeForRole, type FieldErrors } from "@/lib/auth-client";

type Role = "rider" | "driver";

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupFallback />}>
      <SignupForm />
    </Suspense>
  );
}

function SignupFallback() {
  return (
    <div>
      <h1 className="font-display text-3xl md:text-4xl">Create your account</h1>
      <p className="mt-2 text-sm text-white/60">
        Your first ride up to $20 is on us.
      </p>
      <div className="mt-8 h-96 animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]" />
    </div>
  );
}

function SignupForm() {
  const params = useSearchParams();
  const nextParam = params.get("next") || params.get("redirect");

  const [show, setShow] = useState(false);
  const [role, setRole] = useState<Role>("rider");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ── Live password rules ─────────────────────────────
  const rules = useMemo(
    () => [
      { ok: password.length >= 8, label: "At least 8 characters" },
      { ok: /[A-Z]/.test(password), label: "One uppercase letter" },
      { ok: /[0-9]/.test(password), label: "One number" },
    ],
    [password]
  );
  const strength = rules.filter((r) => r.ok).length;

  // ── Client-side validation ─────────────────────────
  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (firstName.trim().length < 1) e.firstName = "Required";
    if (lastName.trim().length < 1) e.lastName = "Required";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
    if (password.length < 8) e.password = "At least 8 characters";
    else if (!/[A-Z]/.test(password)) e.password = "Add an uppercase letter";
    else if (!/[0-9]/.test(password)) e.password = "Add a number";
    if (!accept) e.acceptTerms = "Please accept the terms";
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
      const { user } = await auth.signup({
        name: `${firstName.trim()} ${lastName.trim()}`.trim(),
        email: email.trim(),
        password,
        role: role === "rider" ? "RIDER" : "DRIVER",
        acceptTerms: true,
      });
      const dest =
        nextParam && nextParam.startsWith("/") ? nextParam : homeForRole(user.role);
      // Hard navigation so the `/signup` URL never sits in history.
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-display text-3xl md:text-4xl">Create your account</h1>
      <p className="mt-2 text-sm text-white/60">
        Your first ride up to $20 is on us.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
        <RoleBtn
          active={role === "rider"}
          onClick={() => setRole("rider")}
          icon={<Sparkles size={14} />}
          label="I want to ride"
        />
        <RoleBtn
          active={role === "driver"}
          onClick={() => setRole("driver")}
          icon={<Car size={14} />}
          label="I want to drive"
        />
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
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="First name"
            icon={<User size={15} className="text-white/50" />}
            placeholder="Maya"
            value={firstName}
            onChange={setFirstName}
            error={errors.firstName}
            autoComplete="given-name"
          />
          <Field
            label="Last name"
            icon={<User size={15} className="text-white/50" />}
            placeholder="Chen"
            value={lastName}
            onChange={setLastName}
            error={errors.lastName}
            autoComplete="family-name"
          />
        </div>

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
          <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
            Password
          </label>
          <div
            className={`mt-2 flex items-center gap-3 rounded-2xl border bg-ink-950/40 px-4 py-3 focus-within:border-sunny-400/40 ${
              errors.password ? "border-rose-400/60" : "border-white/10"
            }`}
          >
            <Lock size={15} className="text-white/50" />
            <input
              type={show ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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

          {password.length > 0 && (
            <div className="mt-2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < strength
                      ? strength === 1
                        ? "bg-rose-400"
                        : strength === 2
                        ? "bg-sunny-400"
                        : "bg-emerald-400"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          )}

          {errors.password && (
            <p className="mt-1.5 text-xs text-rose-300">{errors.password}</p>
          )}
        </div>

        <ul className="space-y-1.5 text-xs">
          {rules.map((r) => (
            <li
              key={r.label}
              className={`flex items-center gap-2 ${
                r.ok ? "text-emerald-400" : "text-white/45"
              }`}
            >
              <Check
                size={12}
                className={r.ok ? "text-emerald-400" : "text-white/30"}
              />
              {r.label}
            </li>
          ))}
        </ul>

        <div>
          <label className="flex items-start gap-2 text-sm text-white/65">
            <input
              type="checkbox"
              checked={accept}
              onChange={(e) => setAccept(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/10 accent-sunny-400"
            />
            <span>
              I agree to the{" "}
              <Link href={ROUTES.terms} className="text-sunny-400 underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href={ROUTES.privacy} className="text-sunny-400 underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-xs text-rose-300">{errors.acceptTerms}</p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: submitting ? 1 : 1.01 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sunny-400 to-sunny-300 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-yellow disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Creating account…
            </>
          ) : (
            <>
              {role === "rider" ? "Create rider account" : "Apply to drive"}{" "}
              <ArrowRight size={14} />
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
        <button
          type="button"
          disabled
          className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] py-3 text-sm transition-colors hover:bg-white/[0.08] disabled:opacity-60"
          title="OAuth coming soon"
        >
          <GoogleIcon /> Google
        </button>
        <button
          type="button"
          disabled
          className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] py-3 text-sm transition-colors hover:bg-white/[0.08] disabled:opacity-60"
          title="OAuth coming soon"
        >
          <Apple size={16} /> Apple
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-white/65">
        Already a SwiftCab member?{" "}
        <Link
          href={ROUTES.login}
          className="font-semibold text-sunny-400 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}

function RoleBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-sunny-400 text-ink-950 shadow-glow-yellow"
          : "text-white/70 hover:bg-white/[0.04]"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function Field({
  label,
  type = "text",
  icon,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
}: {
  label: string;
  type?: string;
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

function GoogleIcon() {
  return (
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
  );
}
