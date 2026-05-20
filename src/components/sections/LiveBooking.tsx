"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation2,
  Car,
  Bike,
  Crown,
  Plane,
  Clock,
  Wallet,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

// Leaflet needs `window` — load only on the client
const LiveMap = dynamic(
  () => import("../ui/LiveMap").then((m) => m.LiveMap),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex h-[480px] w-full items-center justify-center bg-ink-900/40 lg:h-full">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span className="h-2 w-2 animate-pulse rounded-full bg-sunny-400" />
          Loading live map…
        </div>
      </div>
    ),
  }
);

const rides = [
  { icon: Car, name: "SwiftLite", eta: "2 min", price: "$11", tint: "from-electric-500/30" },
  { icon: Crown, name: "Luxe", eta: "4 min", price: "$28", tint: "from-sunny-400/30", active: true },
  { icon: Bike, name: "MotoZip", eta: "1 min", price: "$5", tint: "from-neon-purple/30" },
  { icon: Plane, name: "Airport", eta: "6 min", price: "$42", tint: "from-emerald-400/30" },
];

export function LiveBooking() {
  return (
    <section id="booking" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-electric-600/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Live booking preview"
          title={
            <>
              See your ride before you{" "}
              <span className="gradient-text">tap go.</span>
            </>
          }
          subtitle="A cinematic look at our booking experience — pickup, destination, AI-routed map, and ride options, all in one breath."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-5">
          {/* MAP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/40 backdrop-blur-xl lg:col-span-3"
          >
            <LiveMap
              pickup={{ lat: 40.7506, lng: -73.9756 }}
              pickupLabel="123 Madison Ave, NYC"
              dropoff={{ lat: 40.6413, lng: -73.7781 }}
              dropoffLabel="JFK International, T4"
              driverName="Daniel"
              driverVehicle="Tesla Model Y · ABC 4421"
            />
          </motion.div>

          {/* PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-xl lg:col-span-2"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <MapPin size={16} className="text-sunny-400" />
                <input
                  defaultValue="123 Madison Ave, NYC"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                  placeholder="Pickup location"
                />
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <Navigation2 size={16} className="text-electric-400" />
                <input
                  defaultValue="JFK International, T4"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                  placeholder="Where to?"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/50">
                Ride type
              </p>
              <div className="grid grid-cols-2 gap-2">
                {rides.map((r) => (
                  <motion.button
                    key={r.name}
                    whileHover={{ y: -3 }}
                    className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition ${
                      r.active
                        ? "border-sunny-400/60 bg-sunny-400/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 -z-10 bg-gradient-to-br ${r.tint} to-transparent opacity-70`}
                    />
                    <r.icon
                      size={18}
                      className={r.active ? "text-sunny-400" : "text-white/80"}
                    />
                    <p className="mt-2 text-sm font-semibold">{r.name}</p>
                    <div className="mt-0.5 flex items-center justify-between text-[11px] text-white/55">
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {r.eta}
                      </span>
                      <span className="font-medium text-white/80">{r.price}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-1 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Estimated fare</span>
                <span className="font-display text-2xl">$28.40</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-white/55">
                <span className="flex items-center gap-1">
                  <Wallet size={12} /> SwiftPay •••• 4242
                </span>
                <span>ETA 22 min</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="mt-1 rounded-2xl bg-gradient-to-r from-sunny-400 via-sunny-300 to-sunny-400 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-yellow"
            >
              Confirm Luxe ride
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

