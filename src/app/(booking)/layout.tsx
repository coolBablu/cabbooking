import Link from "next/link";
import { Sparkles, HelpCircle, ShieldCheck } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ink-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Link href={ROUTES.home} className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sunny-400 to-electric-500 shadow-glow">
              <Sparkles className="h-4 w-4 text-ink-950" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Swift<span className="text-sunny-400">Cab</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 text-xs text-white/60 md:flex">
            <ShieldCheck size={14} className="text-emerald-400" />
            Encrypted, secure booking
          </div>

          <Link
            href={ROUTES.contact}
            className="flex items-center gap-1.5 text-sm text-white/75 hover:text-white"
          >
            <HelpCircle size={14} /> Help
          </Link>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
