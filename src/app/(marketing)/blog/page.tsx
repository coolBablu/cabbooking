"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, ArrowUpRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";

const categories = [
  "All",
  "AI Mobility",
  "City Stories",
  "Driver Diaries",
  "Sustainability",
  "Product",
  "Travel Tips",
];

const featured = {
  title: "How AI dispatch shaved 38% off our average pickup time",
  excerpt:
    "A deep dive into the next-gen routing engine that learns from every ride. Spoiler: it predicts demand 12 minutes into the future.",
  img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=85&auto=format&fit=crop",
  category: "AI Mobility",
  date: "May 14, 2026",
  read: "9 min read",
  author: "Arjun Patel",
};

const posts = [
  {
    title: "10 hidden ways to save on rides this summer",
    excerpt: "Smart coupon stacking, off-peak booking windows, and the magic of pre-booking.",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=85&auto=format&fit=crop",
    category: "Travel Tips",
    date: "May 12, 2026",
    read: "6 min",
  },
  {
    title: "Inside our all-EV pilot launch in Copenhagen",
    excerpt: "The world's first carbon-zero rideshare city — built in 11 months. Here's how.",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=900&q=85&auto=format&fit=crop",
    category: "Sustainability",
    date: "May 9, 2026",
    read: "8 min",
  },
  {
    title: "Maya's driver story: 4 years, 22,000 rides, one rule",
    excerpt: "What 22,000 rides teaches you about people — and why she still loves driving.",
    img: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=900&q=85&auto=format&fit=crop",
    category: "Driver Diaries",
    date: "May 6, 2026",
    read: "5 min",
  },
  {
    title: "What autonomous urban mobility actually means",
    excerpt: "A practical look at where self-driving rides will (and won't) be in 2030.",
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&q=85&auto=format&fit=crop",
    category: "AI Mobility",
    date: "May 3, 2026",
    read: "11 min",
  },
  {
    title: "How Mumbai built our most loved corridor",
    excerpt: "Behind the scenes of a 6 a.m. airport corridor that hit 4.98 stars.",
    img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=900&q=85&auto=format&fit=crop",
    category: "City Stories",
    date: "Apr 28, 2026",
    read: "7 min",
  },
  {
    title: "Designing a payment flow people enjoy",
    excerpt: "How we obsessed over micro-animations to make checkout feel like delight.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=85&auto=format&fit=crop",
    category: "Product",
    date: "Apr 22, 2026",
    read: "10 min",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="The SwiftCab Journal"
        breadcrumbs={[{ label: "Blog" }]}
        title={
          <>
            Stories about{" "}
            <span className="gradient-text">moving people.</span>
          </>
        }
        subtitle="Driver diaries, mobility futures, design deep-dives, and city stories — straight from the SwiftCab team."
      />

      {/* Search + Categories */}
      <section className="relative pt-6">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 md:max-w-md">
              <Search size={16} className="text-white/50" />
              <input
                placeholder="Search articles…"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((c, i) => (
                <button
                  key={c}
                  className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                    i === 0
                      ? "border-sunny-400/50 bg-sunny-400/15 text-sunny-300"
                      : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-5">
          <Link href={`/blog/featured`}>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative grid items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-2 backdrop-blur-xl md:grid-cols-2 md:p-4"
            >
              <div className="relative h-72 overflow-hidden rounded-2xl md:h-96">
                <Image
                  src={featured.img}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-sunny-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-950">
                  <Sparkles size={10} /> Featured
                </span>
              </div>

              <div className="p-4 md:p-8">
                <div className="flex items-center gap-3 text-xs text-white/55">
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-1">
                    {featured.category}
                  </span>
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {featured.read}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-white/65 md:text-lg">{featured.excerpt}</p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-white/75">By {featured.author}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors group-hover:bg-sunny-400 group-hover:text-ink-950">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </motion.article>
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-colors hover:bg-white/[0.05]"
              >
                <Link href="/blog/post" className="block">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-ink-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-[11px] text-white/55">
                      <span>{p.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {p.read}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/65">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sunny-400">
                      Read article <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm text-white/85 transition-colors hover:bg-white/[0.08] hover:text-white">
              Load more articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sunny-400/10 via-electric-500/10 to-transparent p-10 backdrop-blur-xl md:p-14">
            <h3 className="font-display text-3xl md:text-4xl">
              Stories in your inbox.{" "}
              <span className="gradient-text">Every Tuesday.</span>
            </h3>
            <p className="mt-3 max-w-xl text-white/70">
              The best of the SwiftCab Journal, plus city launches and rider credits.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex w-full max-w-lg items-center gap-2 rounded-full border border-white/10 bg-ink-950/60 p-1.5"
            >
              <input
                type="email"
                placeholder="you@city.com"
                className="w-full bg-transparent px-4 py-2 text-sm outline-none placeholder:text-white/40"
              />
              <button className="rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-yellow">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
