"use client";

import { motion } from "framer-motion";
import { PageHero } from "./PageHero";

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  effectiveDate: string;
  sections: Section[];
  crumbLabel: string;
};

export function LegalShell({
  eyebrow,
  title,
  subtitle,
  effectiveDate,
  sections,
  crumbLabel,
}: Props) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        breadcrumbs={[{ label: crumbLabel }]}
        title={title}
        subtitle={subtitle}
        align="center"
      />

      <section className="relative py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-12">
          {/* TOC */}
          <aside className="lg:col-span-3">
            <div className="sticky top-28 rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">
                On this page
              </p>
              <ul className="mt-4 space-y-1.5">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block rounded-lg px-2 py-1.5 text-sm text-white/65 transition-colors hover:bg-white/[0.04] hover:text-white"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-white/10 pt-4 text-[11px] text-white/45">
                Effective: {effectiveDate}
              </p>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9">
            <article className="prose-invert space-y-12">
              {sections.map((s, i) => (
                <motion.section
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                  className="scroll-mt-32"
                >
                  <h2 className="font-display text-2xl md:text-3xl">{s.title}</h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-white/75 md:text-base">
                    {s.body}
                  </div>
                </motion.section>
              ))}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
