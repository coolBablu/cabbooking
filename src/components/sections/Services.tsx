"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  Plane,
  Crown,
  Bike,
  CalendarClock,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const services = [
  {
    icon: Building2,
    title: "City Rides",
    desc: "Glide through downtown with AI-optimized routes and zero hassle.",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=85&auto=format&fit=crop",
    gradient: "from-electric-500/30 to-transparent",
  },
  {
    icon: Plane,
    title: "Airport Transfer",
    desc: "Flight-tracked pickups, fixed pricing, premium fleet. Land relaxed.",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85&auto=format&fit=crop",
    gradient: "from-sunny-400/30 to-transparent",
  },
  {
    icon: Crown,
    title: "Premium Rides",
    desc: "Tesla, BMW & Mercedes — for moments that deserve more.",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&auto=format&fit=crop",
    gradient: "from-neon-purple/30 to-transparent",
  },
  {
    icon: Bike,
    title: "Bike Taxi",
    desc: "Skip the traffic. Arrive in minutes. Zero emissions, full smiles.",
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=85&auto=format&fit=crop",
    gradient: "from-emerald-400/30 to-transparent",
  },
  {
    icon: CalendarClock,
    title: "Hourly Rentals",
    desc: "Your driver, your itinerary, by the hour. Built for explorers.",
    img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900&q=85&auto=format&fit=crop",
    gradient: "from-neon-cyan/30 to-transparent",
  },
  {
    icon: Briefcase,
    title: "Corporate Rides",
    desc: "Unified billing, priority pickups, dedicated account managers.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=85&auto=format&fit=crop",
    gradient: "from-rose-400/30 to-transparent",
  },
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              One app. <span className="gradient-text">Every way</span> to move.
            </>
          }
          subtitle="From a 5-minute coffee run to a transcontinental airport transfer — SwiftCab has a ride built for the moment."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-1 backdrop-blur-xl"
            >
              {/* glow border on hover */}
              <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:linear-gradient(135deg,rgba(250,204,21,0.35),rgba(59,130,246,0.35))] [mask:linear-gradient(#fff,#fff)_content-box,linear-gradient(#fff,#fff)] [-webkit-mask-composite:xor] [mask-composite:exclude] p-px" />

              <div className="relative overflow-hidden rounded-[1.4rem] bg-ink-900/60">
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${s.gradient}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-ink-950/60 backdrop-blur-xl">
                    <s.icon size={18} className="text-sunny-400" />
                  </div>
                </div>

                <div className="space-y-2 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl">{s.title}</h3>
                    <motion.span
                      whileHover={{ rotate: 45 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors group-hover:bg-sunny-400 group-hover:text-ink-950"
                    >
                      <ArrowUpRight size={14} />
                    </motion.span>
                  </div>
                  <p className="text-sm text-white/65">{s.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
