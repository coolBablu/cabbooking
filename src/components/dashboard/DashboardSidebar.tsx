"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Car,
  Map,
  Wallet,
  Bell,
  Settings,
  LifeBuoy,
  Sparkles,
  ChevronRight,
  Gauge,
  TrendingUp,
  Users,
  CalendarClock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { NotificationDropdown } from "@/components/ui/NotificationDropdown";

type Variant = "user" | "driver";

const userNav = [
  { label: "Overview", href: ROUTES.dashboard, icon: LayoutDashboard },
  { label: "Book a ride", href: ROUTES.booking, icon: Car },
  { label: "Trips", href: `${ROUTES.dashboard}#trips`, icon: Map },
  { label: "Wallet", href: `${ROUTES.dashboard}#wallet`, icon: Wallet },
  { label: "Notifications", href: `${ROUTES.dashboard}#alerts`, icon: Bell },
  { label: "Settings", href: `${ROUTES.dashboard}#settings`, icon: Settings },
];

const driverNav = [
  { label: "Overview", href: ROUTES.driverDashboard, icon: LayoutDashboard },
  { label: "Earnings", href: `${ROUTES.driverDashboard}#earnings`, icon: TrendingUp },
  { label: "Trip requests", href: `${ROUTES.driverDashboard}#requests`, icon: Car },
  { label: "Schedule", href: `${ROUTES.driverDashboard}#schedule`, icon: CalendarClock },
  { label: "Analytics", href: `${ROUTES.driverDashboard}#analytics`, icon: Gauge },
  { label: "Riders", href: `${ROUTES.driverDashboard}#riders`, icon: Users },
];

export function DashboardSidebar({ variant }: { variant: Variant }) {
  const pathname = usePathname();
  const nav = variant === "user" ? userNav : driverNav;
  const user =
    variant === "user"
      ? {
          name: "Alex Morgan",
          role: "SwiftCab Plus member",
          img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=120&q=85&auto=format&fit=crop",
        }
      : {
          name: "Daniel Okafor",
          role: "Driver-partner · 4.98★",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=85&auto=format&fit=crop",
        };

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
        <span
          className={`ml-auto rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
            variant === "driver"
              ? "border-emerald-400/30 bg-emerald-400/15 text-emerald-300"
              : "border-sunny-400/30 bg-sunny-400/15 text-sunny-300"
          }`}
        >
          {variant === "driver" ? "Driver" : "Rider"}
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map((n) => {
          const active = pathname === n.href || pathname.startsWith(n.href + "/");
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
          href={ROUTES.contact}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/65 hover:bg-white/[0.04] hover:text-white"
        >
          <LifeBuoy size={16} className="text-white/55" /> Help & Support
        </Link>
        <SignOutButton />

        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-white/10">
            <Image src={user.img} alt={user.name} fill sizes="40px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-[11px] text-white/55">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function DashboardTopbar({
  title,
  subtitle,
  variant = "user",
}: {
  title: string;
  subtitle?: string;
  variant?: Variant;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/10 bg-ink-950/70 px-5 py-4 backdrop-blur-xl md:px-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
          {variant === "driver" ? "Driver dashboard" : "Rider dashboard"}
        </p>
        <h1 className="mt-0.5 font-display text-2xl md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-white/60">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <NotificationDropdown variant={variant} />
        <Link
          href={ROUTES.booking}
          className="hidden rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-yellow sm:inline-flex"
        >
          {variant === "driver" ? "Go online" : "Book a ride"}
        </Link>
      </div>
    </header>
  );
}

export function DashboardShell({
  variant,
  children,
}: {
  variant: Variant;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-ink-950 text-white">
      <DashboardSidebar variant={variant} />
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
