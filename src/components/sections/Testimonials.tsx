"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const testimonials = [
  {
    name: "Priya Mehta",
    role: "Product Designer · Mumbai",
    quote:
      "SwiftCab feels less like a ride and more like a vibe. The app is gorgeous and my driver was an actual delight.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=85&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "Engineer · San Francisco",
    quote:
      "The AI routing shaves real minutes off every commute. I haven't been late to a meeting in months.",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=85&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Sara Linde",
    role: "Founder · Berlin",
    quote:
      "I use SwiftCab Luxe for every airport run. Fixed pricing, immaculate cars, and the in-app vibe is unmatched.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=85&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Daniel Okafor",
    role: "Driver-partner · Lagos",
    quote:
      "I doubled my income in three months. The driver app is the friendliest tool I've ever used.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=85&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Emma Larsen",
    role: "Photographer · Copenhagen",
    quote:
      "I genuinely smile every time I open the app. That should be illegal for a taxi service.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=85&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Ravi Sharma",
    role: "Student · Bangalore",
    quote:
      "Bike taxis at this price, this fast, this fun — SwiftCab is the only app I trust for college runs.",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=85&auto=format&fit=crop",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-electric-600/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Loved everywhere"
          title={
            <>
              Riders & drivers can't{" "}
              <span className="gradient-text">stop smiling.</span>
            </>
          }
          subtitle="Six continents. Hundreds of cities. Millions of stories. Here are a few."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sunny-400/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <Quote className="text-sunny-400" size={22} />
              <p className="mt-4 text-[15px] leading-relaxed text-white/85">
                "{t.quote}"
              </p>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-white/10">
                    <Image
                      src={t.img}
                      alt={t.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-white/55">{t.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-sunny-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" stroke="none" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee city strip */}
        <div className="relative mt-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-950 to-transparent" />
          <div className="flex w-max gap-12 animate-marquee whitespace-nowrap text-2xl font-display tracking-tight text-white/30 md:text-3xl">
            {[..."NEW YORK · LONDON · TOKYO · BANGALORE · DUBAI · BERLIN · PARIS · LAGOS · SYDNEY · SÃO PAULO · SEOUL · MUMBAI · ".repeat(
              2
            )]
              .join("")
              .split("·")
              .filter(Boolean)
              .map((city, i) => (
                <span key={i} className="flex items-center gap-12">
                  <span>{city.trim()}</span>
                  <span className="text-sunny-400">✦</span>
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
