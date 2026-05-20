"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Apple, Download, Sparkles, Mail, Github, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { ROUTES, SOCIAL, APP_STORE } from "@/lib/routes";

const SOCIAL_LINKS = [
  { Icon: Twitter, href: SOCIAL.twitter, label: "Twitter" },
  { Icon: Instagram, href: SOCIAL.instagram, label: "Instagram" },
  { Icon: Linkedin, href: SOCIAL.linkedin, label: "LinkedIn" },
  { Icon: Github, href: SOCIAL.github, label: "GitHub" },
];

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "All services", href: ROUTES.services },
      { label: "Pricing", href: ROUTES.pricing },
      { label: "Book a ride", href: ROUTES.booking },
      { label: "Live tracking", href: ROUTES.ride() },
      { label: "Become a driver", href: `${ROUTES.signup}?role=driver` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: ROUTES.about },
      { label: "Blog", href: ROUTES.blog },
      { label: "FAQ", href: ROUTES.faq },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Sign in", href: ROUTES.login },
      { label: "Sign up", href: ROUTES.signup },
      { label: "Dashboard", href: ROUTES.dashboard },
      { label: "Driver portal", href: ROUTES.driverDashboard },
      { label: "Terms", href: ROUTES.terms },
      { label: "Privacy", href: ROUTES.privacy },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950 pt-20">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-electric-600/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5">
        {/* Newsletter row */}
        <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:grid-cols-2 md:p-10">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-sunny-400">
              Stay in the loop
            </p>
            <h3 className="mt-2 font-display text-3xl font-semibold leading-tight md:text-4xl">
              Mobility news, the joyful way.
            </h3>
            <p className="mt-2 text-white/65">
              City launches, ride credits, behind-the-scenes — straight to your inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full items-center gap-2 rounded-full border border-white/10 bg-ink-900/60 p-1.5 backdrop-blur-xl"
          >
            <div className="flex flex-1 items-center gap-2 px-4">
              <Mail size={16} className="text-white/50" />
              <input
                type="email"
                placeholder="you@city.com"
                className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-300 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-yellow"
            >
              Subscribe <ArrowRight size={14} />
            </motion.button>
          </form>
        </div>

        {/* Main grid */}
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href={ROUTES.home} className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sunny-400 to-electric-500 shadow-glow">
                <Sparkles className="h-4 w-4 text-ink-950" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                Swift<span className="text-sunny-400">Cab</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              AI-powered urban mobility for the cities of tomorrow. Premium rides,
              fair pricing, carbon-neutral journeys.
            </p>

            <div className="mt-6 flex gap-2">
              <a
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:bg-white/[0.08]"
                href={APP_STORE.ios}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
              >
                <div className="flex items-center gap-3">
                  <Apple size={20} />
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider text-white/55">
                      Download on
                    </p>
                    <p className="text-sm font-semibold">App Store</p>
                  </div>
                </div>
              </a>
              <a
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:bg-white/[0.08]"
                href={APP_STORE.android}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
              >
                <div className="flex items-center gap-3">
                  <Download size={20} />
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider text-white/55">
                      Get it on
                    </p>
                    <p className="text-sm font-semibold">Google Play</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-3">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/75 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 py-7 md:flex-row md:items-center">
          <p className="text-xs text-white/50" suppressHydrationWarning>
            © {new Date().getFullYear()} SwiftCab Technologies. Made with care in 142 cities.
          </p>
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="relative mt-6 select-none overflow-hidden">
        <p className="-mb-6 bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-center font-display text-[18vw] font-bold leading-none tracking-tighter text-transparent md:-mb-10 md:text-[14vw]">
          SwiftCab
        </p>
      </div>
    </footer>
  );
}
