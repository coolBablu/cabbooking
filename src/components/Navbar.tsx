"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Sparkles, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { GradientButton } from "./ui/GradientButton";
import { cn } from "@/lib/utils";
import { MAIN_NAV, ROUTES } from "@/lib/routes";
import { auth, homeForRole, type SessionUser } from "@/lib/auth-client";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const navWidth = useTransform(scrollY, [0, 200], ["min(1200px,92%)", "min(960px,88%)"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Hydrate the current user on mount so signed-in visitors see their
  // profile instead of the "Sign in" CTA. Recheck on focus to keep the
  // chrome fresh after logout in another tab.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { user } = await auth.me();
        if (!cancelled) setUser(user);
      } catch {
        if (!cancelled) setUser(null);
      }
    }
    load();
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
    };
  }, [pathname]);

  return (
    <motion.header
      style={{ width: navWidth }}
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2"
    >
      <nav
        className={cn(
          "relative flex items-center justify-between rounded-2xl border border-white/10 px-4 py-2.5 transition-all duration-500",
          scrolled
            ? "bg-ink-950/70 shadow-ring backdrop-blur-2xl"
            : "bg-white/[0.04] backdrop-blur-xl"
        )}
      >
        <Link href={ROUTES.home} className="flex items-center gap-2 px-2">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sunny-400 to-electric-500 shadow-glow">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-sunny-400 to-electric-500 opacity-50 blur-md" />
            <Sparkles className="relative h-4 w-4 text-ink-950" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Swift<span className="text-sunny-400">Cab</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {MAIN_NAV.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "group relative rounded-full px-4 py-2 text-sm transition-colors",
                    active ? "text-white" : "text-white/65 hover:text-white"
                  )}
                >
                  <span className="relative z-10">{l.label}</span>
                  <span
                    className={cn(
                      "absolute inset-0 -z-0 rounded-full transition-colors",
                      active ? "bg-white/[0.07]" : "bg-white/0 group-hover:bg-white/[0.06]"
                    )}
                  />
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-sunny-400"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link
              href={ROUTES.login}
              className="rounded-full px-4 py-2 text-sm text-white/80 hover:text-white"
            >
              Sign in
            </Link>
          )}
          <GradientButton href={ROUTES.booking} className="px-5 py-2.5 text-[13px]">
            Book a ride
          </GradientButton>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-ink-950/90 p-3 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col">
              {MAIN_NAV.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/[0.05] hover:text-white"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-2 flex gap-2 px-2 pb-1">
                {user ? (
                  <Link
                    href={homeForRole(user.role)}
                    className="flex-1 rounded-full border border-white/10 px-4 py-2.5 text-center text-sm text-white"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href={ROUTES.login}
                    className="flex-1 rounded-full border border-white/10 px-4 py-2.5 text-center text-sm text-white"
                  >
                    Sign in
                  </Link>
                )}
                <GradientButton
                  href={ROUTES.booking}
                  className="flex-1 w-full px-5 py-2.5 text-[13px]"
                  onClick={() => setOpen(false)}
                >
                  Book a ride
                </GradientButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function UserMenu({ user }: { user: SessionUser }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const initial = user.name?.trim().charAt(0).toUpperCase() || "U";

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  async function signOut() {
    try {
      await auth.logout();
    } catch {
      /* swallow — we still hard-reload to clear bfcache */
    }
    // Hard navigation defeats the browser bfcache so the back button
    // can never restore a logged-in view after sign-out.
    window.location.assign(ROUTES.home);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-sm text-white/85 hover:bg-white/[0.08]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-sunny-400 to-electric-500 text-[11px] font-bold text-ink-950">
          {initial}
        </span>
        <span className="hidden max-w-[8rem] truncate sm:inline">
          {user.name?.split(" ")[0] ?? "Account"}
        </span>
        <ChevronDown size={13} className="opacity-70" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-12 w-60 overflow-hidden rounded-2xl border border-white/10 bg-ink-950/95 p-1.5 shadow-ring backdrop-blur-2xl"
            role="menu"
          >
            <div className="px-3 py-2.5">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-[11px] text-white/55">{user.email}</p>
              <span className="mt-2 inline-flex rounded-full border border-sunny-400/30 bg-sunny-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sunny-300">
                {user.role}
              </span>
            </div>
            <div className="my-1 h-px bg-white/10" />
            <Link
              href={homeForRole(user.role)}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/[0.05] hover:text-white"
              role="menuitem"
            >
              <LayoutDashboard size={14} className="text-white/55" /> Dashboard
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-rose-300 hover:bg-rose-400/10"
              role="menuitem"
            >
              <LogOut size={14} /> Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
