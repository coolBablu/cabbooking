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
  Check,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientButton } from "@/components/ui/GradientButton";
import { ROUTES } from "@/lib/routes";

const services = [
  {
    id: "city",
    icon: Building2,
    title: "City Rides",
    short: "Glide through downtown with AI-optimized routes.",
    price: "from $5",
    eta: "2 min",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=85&auto=format&fit=crop",
    color: "from-electric-500/30",
    features: [
      "AI route intelligence — beats traffic in real time",
      "Sub-3-min average pickup in every metro",
      "Pay with card, Apple Pay, UPI, or SwiftPay wallet",
      "Live trip share with friends & family",
    ],
  },
  {
    id: "airport",
    icon: Plane,
    title: "Airport Transfer",
    short: "Flight-tracked pickups, fixed pricing, premium fleet.",
    price: "from $24",
    eta: "Scheduled",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=85&auto=format&fit=crop",
    color: "from-sunny-400/30",
    features: [
      "Flight tracking — driver waits if you're delayed",
      "Fixed price quoted up front, never any surge",
      "60 mins free wait at airport",
      "Premium SUVs & sedans available",
    ],
  },
  {
    id: "premium",
    icon: Crown,
    title: "Premium / Luxe",
    short: "Tesla, BMW & Mercedes for moments that deserve more.",
    price: "from $28",
    eta: "4 min",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop",
    color: "from-neon-purple/30",
    features: [
      "Tesla Model Y / S, BMW 7-Series, Mercedes E-Class",
      "Top-rated 4.95+ drivers only",
      "Complimentary water, mints, phone chargers",
      "Concierge ride assistant included",
    ],
  },
  {
    id: "bike",
    icon: Bike,
    title: "Bike Taxi",
    short: "Skip traffic. Arrive in minutes. Zero emissions.",
    price: "from $3",
    eta: "1 min",
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=85&auto=format&fit=crop",
    color: "from-emerald-400/30",
    features: [
      "Fastest option for short city hops",
      "Helmet provided for every rider",
      "100% electric two-wheelers in pilot cities",
      "Most affordable category in our lineup",
    ],
  },
  {
    id: "rentals",
    icon: CalendarClock,
    title: "Hourly Rentals",
    short: "Your driver, your itinerary, by the hour.",
    price: "from $19/hr",
    eta: "Custom",
    img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=85&auto=format&fit=crop",
    color: "from-neon-cyan/30",
    features: [
      "1-hour, 4-hour, 8-hour, or full-day packages",
      "Unlimited stops within booked window",
      "Perfect for events, shoots, city tours",
      "Switch drivers / vehicles mid-day if needed",
    ],
  },
  {
    id: "corporate",
    icon: Briefcase,
    title: "Corporate Rides",
    short: "Unified billing, priority pickups, dedicated account managers.",
    price: "Custom",
    eta: "Priority",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85&auto=format&fit=crop",
    color: "from-rose-400/30",
    features: [
      "Unlimited team accounts under one bill",
      "Custom expense policies and cost centers",
      "Dedicated success manager + SLA",
      "API access for HR & travel platforms",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        breadcrumbs={[{ label: "Services" }]}
        title={
          <>
            One app.{" "}
            <span className="gradient-text">Every way to move.</span>
          </>
        }
        subtitle="From a 5-minute coffee run to a transcontinental airport transfer — SwiftCab has a service designed for the moment."
      >
        <GradientButton href={ROUTES.booking}>Book a ride</GradientButton>
        <GradientButton href={ROUTES.pricing} variant="secondary">
          See pricing
        </GradientButton>
      </PageHero>

      {/* Quick service grid */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-1 backdrop-blur-xl"
              >
                <div className="relative overflow-hidden rounded-[1.4rem] bg-ink-900/60">
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr ${s.color} to-transparent`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-ink-950/60 backdrop-blur-xl">
                      <s.icon size={18} className="text-sunny-400" />
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/80">
                      <span className="rounded-full bg-ink-950/70 px-2 py-1 backdrop-blur">
                        {s.price}
                      </span>
                      <span className="rounded-full bg-ink-950/70 px-2 py-1 backdrop-blur">
                        ETA {s.eta}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl">{s.title}</h3>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors group-hover:bg-sunny-400 group-hover:text-ink-950">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                    <p className="text-sm text-white/65">{s.short}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Detail rows */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-5 space-y-32">
          {services.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              className="scroll-mt-32 grid items-center gap-12 lg:grid-cols-2"
            >
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-sunny-400/20 via-electric-500/20 to-transparent blur-2xl" />
                <div className="overflow-hidden rounded-[2rem] border border-white/10">
                  <Image
                    src={s.img}
                    alt={s.title}
                    width={1200}
                    height={800}
                    className="h-[460px] w-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/70">
                  <s.icon size={12} className="text-sunny-400" /> {s.title}
                </div>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-tight md:text-5xl">
                  {s.short}
                </h2>
                <ul className="mt-7 space-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sunny-400/15 text-sunny-400">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-sm text-white/80 md:text-base">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/55">
                      Starting at
                    </p>
                    <p className="font-display text-2xl">{s.price}</p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/55">
                      Avg ETA
                    </p>
                    <p className="font-display text-2xl">{s.eta}</p>
                  </div>
                  <div className="ml-auto">
                    <GradientButton
                      href={ROUTES.booking}
                      className="px-5 py-2.5 text-[13px]"
                    >
                      Book now
                    </GradientButton>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
