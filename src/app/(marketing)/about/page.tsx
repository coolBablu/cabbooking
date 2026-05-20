"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Rocket,
  Globe2,
  Heart,
  Leaf,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientButton } from "@/components/ui/GradientButton";

const values = [
  {
    icon: Heart,
    title: "Joy first",
    desc: "Every interaction is engineered to put a smile on a face — rider or driver.",
    color: "text-rose-400",
  },
  {
    icon: Sparkles,
    title: "Magical UX",
    desc: "Software that feels alive — smart, anticipatory, and beautifully simple.",
    color: "text-sunny-400",
  },
  {
    icon: Leaf,
    title: "Planet-positive",
    desc: "Carbon-neutral today, fully electric by 2027. Mobility shouldn't cost the Earth.",
    color: "text-emerald-400",
  },
  {
    icon: Users,
    title: "Driver-loved",
    desc: "Our drivers keep more, earn more, and feel seen. Always.",
    color: "text-electric-400",
  },
];

const timeline = [
  { year: "2021", title: "Founded in Brooklyn", desc: "Two engineers and one yellow napkin sketch." },
  { year: "2022", title: "100K rides milestone", desc: "Launched in NYC. Earned a 4.94 rating on day 30." },
  { year: "2023", title: "Series B · $80M", desc: "Expanded to 14 cities across North America." },
  { year: "2024", title: "AI Routing v2", desc: "Average pickup time cut by 38% across all markets." },
  { year: "2025", title: "Global expansion", desc: "Live in 142 cities across 6 continents." },
  { year: "2026", title: "Fully electric pilot", desc: "First all-EV city launched in Copenhagen." },
];

const team = [
  {
    name: "Maya Chen",
    role: "Co-founder & CEO",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85&auto=format&fit=crop",
  },
  {
    name: "Arjun Patel",
    role: "Co-founder & CTO",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=85&auto=format&fit=crop",
  },
  {
    name: "Sofia Marquez",
    role: "Chief Design Officer",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=85&auto=format&fit=crop",
  },
  {
    name: "Daniel Okafor",
    role: "Head of Driver Experience",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85&auto=format&fit=crop",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SwiftCab"
        breadcrumbs={[{ label: "About" }]}
        title={
          <>
            We're rebuilding the way{" "}
            <span className="gradient-text">cities move.</span>
          </>
        }
        subtitle="A team of designers, engineers, and dreamers crafting the future of urban mobility — one joyful ride at a time."
      >
        <GradientButton>Join our mission</GradientButton>
        <GradientButton variant="secondary">Open roles</GradientButton>
      </PageHero>

      {/* Story */}
      <section className="relative py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-sunny-400/20 via-electric-500/20 to-transparent blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=85&auto=format&fit=crop"
                alt="SwiftCab team"
                width={1200}
                height={900}
                className="h-[480px] w-full object-cover"
              />
            </div>
          </motion.div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/70">
              Our story
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold md:text-5xl">
              From a napkin sketch to{" "}
              <span className="gradient-text">142 cities.</span>
            </h2>
            <div className="mt-6 space-y-4 text-white/70">
              <p>
                In 2021, Maya and Arjun were stuck in a 47-minute cab ride that
                should have taken 12. They sketched a smarter, kinder mobility
                platform on a napkin at a Brooklyn coffee shop. That napkin became
                SwiftCab.
              </p>
              <p>
                Five years later, we move millions of people every month —
                powered by AI-routed dispatch, a hand-crafted app experience, and
                a driver community that genuinely loves what they do.
              </p>
              <p>
                We're just getting started. The next decade of mobility will be
                electric, autonomous, and joyful. We're building it.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: "142", l: "Cities" },
                { v: "24M+", l: "Riders" },
                { v: "120K", l: "Drivers" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="font-display text-3xl">{s.v}</p>
                  <p className="text-xs text-white/55">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Mission & Vision"
            title={
              <>
                Built for the{" "}
                <span className="gradient-text">decade of motion.</span>
              </>
            }
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Target,
                tag: "Mission",
                title: "Make every city ride feel like a small upgrade.",
                desc: "Faster pickups, fairer pricing, friendlier drivers, smarter routes — every detail engineered for joy and trust.",
              },
              {
                icon: Rocket,
                tag: "Vision",
                title: "An autonomous, electric, equitable mobility layer.",
                desc: "By 2030, SwiftCab will be the connective tissue of urban movement — accessible, sustainable, and delightful for everyone.",
              },
            ].map((c, i) => (
              <motion.div
                key={c.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-xl"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sunny-400/10 blur-3xl" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-sunny-400 to-electric-500 text-ink-950">
                  <c.icon size={20} />
                </div>
                <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.2em] text-sunny-400">
                  {c.tag}
                </p>
                <h3 className="mt-2 font-display text-3xl leading-tight">
                  {c.title}
                </h3>
                <p className="mt-3 text-white/65">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.05]"
              >
                <v.icon size={22} className={v.color} />
                <h4 className="mt-4 font-display text-lg">{v.title}</h4>
                <p className="mt-1.5 text-sm text-white/60">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeading
            eyebrow="Our journey"
            title={
              <>
                Six years.{" "}
                <span className="gradient-text">Six continents.</span>
              </>
            }
          />

          <div className="relative mt-14">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-sunny-400 via-electric-500 to-transparent md:left-1/2 md:-translate-x-1/2" />
            <ul className="space-y-10">
              {timeline.map((t, i) => (
                <motion.li
                  key={t.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`relative grid items-center gap-4 pl-12 md:grid-cols-2 md:gap-12 md:pl-0 ${
                    i % 2 === 1 ? "md:[direction:rtl]" : ""
                  }`}
                >
                  <span className="absolute left-4 -translate-x-1/2 md:left-1/2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-sunny-400/30" />
                    <span className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-ink-950 bg-sunny-400" />
                  </span>
                  <div
                    className={`md:[direction:ltr] ${
                      i % 2 === 1 ? "md:text-right" : ""
                    }`}
                  >
                    <p className="font-display text-3xl text-sunny-400">{t.year}</p>
                    <h4 className="mt-1 font-display text-xl">{t.title}</h4>
                    <p className="mt-1.5 text-sm text-white/65">{t.desc}</p>
                  </div>
                  <div />
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Leadership"
            title={
              <>
                The team building{" "}
                <span className="gradient-text">tomorrow's roads.</span>
              </>
            }
            subtitle="A globally distributed, deeply opinionated crew of designers, engineers, drivers, and operators."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="(max-width:768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <p className="font-display text-lg">{p.name}</p>
                  <p className="text-sm text-white/60">{p.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-sunny-400/10 via-electric-500/10 to-neon-purple/10 p-10 backdrop-blur-xl md:p-16">
            <Globe2
              size={140}
              className="absolute -right-8 -top-8 text-white/5"
            />
            <h3 className="font-display text-4xl md:text-5xl">
              Let's build the next billion rides{" "}
              <span className="gradient-text">together.</span>
            </h3>
            <p className="mt-4 max-w-xl text-white/70">
              We're hiring across engineering, design, ops, and city launch teams.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <GradientButton>View open roles</GradientButton>
              <GradientButton variant="secondary">Investor relations</GradientButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
