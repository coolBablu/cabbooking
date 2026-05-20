"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { AuroraBackground } from "./AuroraBackground";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: Crumb[];
  align?: "left" | "center";
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  align = "center",
  children,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pt-36 pb-20 md:pt-40 md:pb-28">
      <AuroraBackground />

      <div className="relative mx-auto max-w-7xl px-5">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mb-6 flex items-center gap-1.5 text-xs text-white/55 ${
              align === "center" ? "justify-center" : ""
            }`}
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="flex items-center gap-1 transition-colors hover:text-white"
            >
              <Home size={12} />
              Home
            </Link>
            {breadcrumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="text-white/30" />
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <div
          className={`flex flex-col gap-5 ${
            align === "center" ? "items-center text-center" : "items-start text-left"
          }`}
        >
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sunny-400 shadow-[0_0_10px_#facc15]" />
              {eyebrow}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-balance text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`max-w-2xl text-base text-white/70 md:text-lg ${
                align === "center" ? "mx-auto" : ""
              }`}
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-2 flex flex-wrap items-center gap-3"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-950" />
    </section>
  );
}
