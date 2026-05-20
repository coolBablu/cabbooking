"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Headphones,
  Send,
  Check,
  Twitter,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SOCIAL } from "@/lib/routes";

const SOCIAL_LINKS = [
  { Icon: Twitter, href: SOCIAL.twitter, label: "Twitter" },
  { Icon: Instagram, href: SOCIAL.instagram, label: "Instagram" },
  { Icon: Linkedin, href: SOCIAL.linkedin, label: "LinkedIn" },
  { Icon: Github, href: SOCIAL.github, label: "GitHub" },
];

const channels = [
  {
    icon: MessageSquare,
    title: "Live chat",
    desc: "Average response time under 60 seconds.",
    cta: "Start a chat",
    color: "text-sunny-400",
  },
  {
    icon: Headphones,
    title: "24/7 phone support",
    desc: "Critical issue? Tap to call a real human anytime.",
    cta: "+1 (800) SWIFT-99",
    color: "text-electric-400",
  },
  {
    icon: Mail,
    title: "Email us",
    desc: "We reply within 4 business hours, every weekday.",
    cta: "hello@swiftcab.com",
    color: "text-neon-purple",
  },
];

const offices = [
  { city: "New York", addr: "212 Brooklyn Ave, NY 11216", flag: "🇺🇸" },
  { city: "London", addr: "44 Shoreditch High St, EC1V", flag: "🇬🇧" },
  { city: "Bangalore", addr: "MG Road, 4th Floor, 560001", flag: "🇮🇳" },
  { city: "Singapore", addr: "1 Raffles Place, 048616", flag: "🇸🇬" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        breadcrumbs={[{ label: "Contact" }]}
        title={
          <>
            Let's <span className="gradient-text">talk.</span>
          </>
        }
        subtitle="Have a question, partnership idea, or feedback? Our team typically responds in under an hour."
      />

      {/* Channels */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-5 md:grid-cols-3">
            {channels.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-colors hover:bg-white/[0.05]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-ink-900/60">
                  <c.icon size={20} className={c.color} />
                </div>
                <h3 className="mt-5 font-display text-xl">{c.title}</h3>
                <p className="mt-2 text-sm text-white/65">{c.desc}</p>
                <p className="mt-4 text-sm font-semibold text-white">{c.cta}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="lg:col-span-3 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-xl"
            >
              <h3 className="font-display text-2xl md:text-3xl">
                Send us a message
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Fill in the form and we'll be in touch within a few hours.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <Field label="First name" placeholder="Maya" />
                <Field label="Last name" placeholder="Chen" />
                <Field label="Email" placeholder="maya@city.com" type="email" />
                <Field label="Phone" placeholder="+1 555 010 9921" />
              </div>

              <div className="mt-4">
                <Select
                  label="What's this about?"
                  options={[
                    "General inquiry",
                    "Partnership",
                    "Press / media",
                    "Driver support",
                    "Rider support",
                    "Other",
                  ]}
                />
              </div>

              <div className="mt-4">
                <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us a bit about your idea or issue…"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-ink-950/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-sunny-400/40"
                />
              </div>

              <motion.button
                whileHover={{ scale: sent ? 1 : 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={sent}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sunny-400 to-sunny-300 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-yellow disabled:opacity-80"
              >
                {sent ? (
                  <>
                    <Check size={16} /> Message sent — we'll be in touch
                  </>
                ) : (
                  <>
                    Send message <Send size={14} />
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl"
            >
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.35),transparent_60%)]" />
                <div className="absolute inset-0 bg-grid-pattern bg-[size:24px_24px] opacity-30" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-md border border-white/10 bg-white/[0.03]"
                    style={{
                      width: `${30 + (i % 4) * 25}px`,
                      height: `${24 + (i % 3) * 18}px`,
                      left: `${(i * 53) % 90}%`,
                      top: `${(i * 41) % 80}%`,
                    }}
                  />
                ))}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-sunny-400/30" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-sunny-400 text-ink-950 shadow-glow-yellow">
                    <MapPin size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/55">
                    HQ
                  </p>
                  <p className="font-display text-lg">SwiftCab Tower</p>
                  <p className="text-sm text-white/65">
                    212 Brooklyn Ave, Brooklyn NY 11216
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/65">
                  <Phone size={14} className="text-sunny-400" /> +1 (800) SWIFT-99
                </div>
                <div className="flex items-center gap-2 text-sm text-white/65">
                  <Mail size={14} className="text-electric-400" /> hello@swiftcab.com
                </div>

                <div className="flex items-center gap-2 pt-2">
                  {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h3 className="font-display text-3xl md:text-4xl">
            Global <span className="gradient-text">offices.</span>
          </h3>
          <p className="mt-2 text-white/65">Find us across the world.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((o, i) => (
              <motion.div
                key={o.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="text-2xl">{o.flag}</p>
                <p className="mt-3 font-display text-lg">{o.city}</p>
                <p className="mt-1 text-sm text-white/60">{o.addr}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-ink-950/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-sunny-400/40"
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
        {label}
      </label>
      <select className="mt-2 w-full rounded-2xl border border-white/10 bg-ink-950/40 px-4 py-3 text-sm outline-none focus:border-sunny-400/40">
        {options.map((o) => (
          <option key={o} className="bg-ink-900">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
