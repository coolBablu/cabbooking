"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Car,
  Users,
  CreditCard,
  Headphones,
  Settings,
  Search,
  Sparkles,
  ChevronRight,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { NotificationDropdown } from "@/components/ui/NotificationDropdown";

const nav = [
  { label: "Dashboard", href: ROUTES.admin, icon: LayoutDashboard },
  { label: "Bookings", href: ROUTES.adminBookings, icon: Calendar },
  { label: "Drivers", href: ROUTES.adminDrivers, icon: Car },
  { label: "Users", href: ROUTES.adminUsers, icon: Users },
  { label: "Payments", href: ROUTES.adminPayments, icon: CreditCard },
  { label: "Support tickets", href: ROUTES.adminSupport, icon: Headphones },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-ink-950/60 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-2 px-6 py-6">
        <Link href={ROUTES.home} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sunny-400 to-electric-500 shadow-glow">
            <Sparkles className="h-4 w-4 text-ink-950" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Swift<span className="text-sunny-400">Cab</span>
          </span>
        </Link>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-rose-400/30 bg-rose-400/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-rose-300">
          <Shield size={10} /> Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map((n) => {
          const active = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-white/[0.06] text-white"
                  : "text-white/65 hover:bg-white/[0.04] hover:text-white"
              )}
            >
              <n.icon
                size={16}
                className={active ? "text-sunny-400" : "text-white/55"}
              />
              <span className="flex-1">{n.label}</span>
              <ChevronRight
                size={14}
                className={cn(
                  "opacity-0 transition-opacity",
                  active ? "opacity-100 text-sunny-400" : "group-hover:opacity-60"
                )}
              />
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-3 pb-3">
        <Link
          href={ROUTES.adminSettings}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/65 hover:bg-white/[0.04] hover:text-white"
        >
          <Settings size={16} className="text-white/55" /> Settings
        </Link>
        <SignOutButton />

        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-sunny-400 text-ink-950 font-bold">
            S
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Sasha Romanov</p>
            <p className="truncate text-[11px] text-white/55">Super admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function AdminTopbar({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/10 bg-ink-950/70 px-5 py-4 backdrop-blur-xl md:px-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-rose-300">
          Admin
        </p>
        <h1 className="mt-0.5 font-display text-2xl md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-white/60">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 md:flex">
          <Search size={14} className="text-white/55" />
          <input
            placeholder="Search…"
            className="w-44 bg-transparent text-sm outline-none placeholder:text-white/40"
          />
          <kbd className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-white/55">
            ⌘K
          </kbd>
        </div>
        <NotificationDropdown variant="admin" />
        {action}
      </div>
    </header>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ink-950 text-white">
      <AdminSidebar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </div>
  );
}
