"use client";

import { use } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation2,
  Phone,
  MessageSquare,
  Shield,
  Share2,
  Music2,
  ThermometerSun,
  Sparkles,
  Clock,
  ArrowRight,
  Star,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

// Leaflet uses `window` — load only on the client to avoid SSR errors.
const LiveMap = dynamic(
  () => import("@/components/ui/LiveMap").then((m) => m.LiveMap),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex h-[560px] w-full items-center justify-center bg-ink-900/40">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span className="h-2 w-2 animate-pulse rounded-full bg-sunny-400" />
          Loading live map…
        </div>
      </div>
    ),
  }
);

// Pickup: 1255 Court St, Brooklyn (Carroll Gardens). Dropoff: JFK Terminal 4.
const PICKUP = { lat: 40.677, lng: -74.006 } as const;
const DROPOFF = { lat: 40.644, lng: -73.7822 } as const;

export default function RideDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-5">
      {/* Live tracking map */}
      <div className="lg:col-span-3">
        <div className="relative h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-ink-900/40 backdrop-blur-xl">
          <LiveMap
            pickup={PICKUP}
            pickupLabel="Home"
            dropoff={DROPOFF}
            dropoffLabel="JFK · T4"
            driverName="Daniel Okafor"
            driverVehicle="Tesla Model Y · ABC 4421"
            className="h-full"
          />

          {/* Top status pill — sits above the map's own "Live" badge */}
          <div className="pointer-events-none absolute left-1/2 top-5 z-[450] flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-ink-950/80 px-4 py-2 backdrop-blur-2xl">
            <div className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-sm font-semibold">Daniel is on the way</p>
            <span className="h-3 w-px bg-white/15" />
            <p className="font-display text-base text-sunny-400">02:14</p>
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div className="space-y-4 lg:col-span-2">
        {/* Driver card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-2xl ring-2 ring-sunny-400/40">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=85&auto=format&fit=crop"
                alt="Daniel"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-display text-lg">Daniel Okafor</p>
              <p className="flex items-center gap-1 text-xs text-white/65">
                <Star size={11} className="text-sunny-400" fill="currentColor" stroke="none" />
                4.98 · 2,481 trips
              </p>
            </div>
            <p className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-300">
              Elite
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/55">Vehicle</p>
                <p className="text-sm font-semibold">Tesla Model Y · Pearl White</p>
              </div>
              <p className="rounded-lg bg-ink-950/60 px-3 py-1.5 font-mono text-sm tracking-widest">
                ABC · 4421
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2">
            <ActionBtn icon={<Phone size={14} />} label="Call" />
            <ActionBtn icon={<MessageSquare size={14} />} label="Chat" />
            <ActionBtn icon={<Share2 size={14} />} label="Share" />
            <ActionBtn icon={<Shield size={14} />} label="SOS" danger />
          </div>
        </motion.div>

        {/* Trip details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
        >
          <p className="text-[10px] uppercase tracking-wider text-white/55">
            Trip {id.toUpperCase()}
          </p>

          <div className="mt-3 space-y-3">
            <Row
              icon={<MapPin size={14} className="text-sunny-400" />}
              label="Pickup"
              value="Home · 1255 Court St, Brooklyn"
            />
            <Row
              icon={<Navigation2 size={14} className="text-electric-400" />}
              label="Destination"
              value="JFK International, Terminal 4"
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Mini label="ETA" value="22 min" icon={<Clock size={11} />} />
            <Mini label="Distance" value="18.4 mi" icon={<Navigation2 size={11} />} />
            <Mini label="Fare" value="$27.40" icon={<Sparkles size={11} />} />
          </div>
        </motion.div>

        {/* In-ride controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
        >
          <p className="text-[10px] uppercase tracking-wider text-white/55">
            In-ride preferences
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Pref icon={<Music2 size={14} />} label="Music" value="Lo-fi vibes" />
            <Pref icon={<ThermometerSun size={14} />} label="Cabin" value="22°C" />
          </div>

          <Link
            href={ROUTES.dashboard}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] py-3 text-sm text-white/85 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            Open dashboard <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`flex flex-col items-center gap-1 rounded-xl border p-2.5 text-xs transition-colors ${
        danger
          ? "border-rose-400/40 bg-rose-400/10 text-rose-300 hover:bg-rose-400/20"
          : "border-white/10 bg-white/[0.04] text-white/80 hover:bg-white/[0.08]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Row({
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
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-white/50">
          {label}
        </p>
        <p className="truncate text-sm">{value}</p>
      </div>
    </div>
  );
}

function Mini({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2">
      <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-white/55">
        {icon} {label}
      </div>
      <p className="mt-0.5 font-display text-base">{value}</p>
    </div>
  );
}

function Pref({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/55">
        {icon} {label}
      </div>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
