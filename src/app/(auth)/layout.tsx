import Link from "next/link";
import Image from "next/image";
import { Sparkles, Quote } from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ROUTES } from "@/lib/routes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-ink-950 text-white lg:grid-cols-2">
      {/* LEFT — visual */}
      <div className="relative hidden overflow-hidden bg-hero-gradient lg:block">
        <AuroraBackground />

        <Image
          src="https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=1200&q=85&auto=format&fit=crop"
          alt="Futuristic city ride"
          fill
          priority
          sizes="50vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink-950 via-ink-950/40 to-transparent" />

        <div className="relative z-10 flex h-full flex-col p-12">
          <Link href={ROUTES.home} className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sunny-400 to-electric-500 shadow-glow">
              <Sparkles className="h-4 w-4 text-ink-950" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Swift<span className="text-sunny-400">Cab</span>
            </span>
          </Link>

          <div className="mt-auto max-w-md">
            <Quote className="text-sunny-400" size={28} />
            <p className="mt-4 font-display text-3xl leading-tight">
              "SwiftCab feels less like a ride and more like a vibe. I genuinely
              smile every time I open the app."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=85&auto=format&fit=crop"
                  alt="Priya"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Priya Mehta</p>
                <p className="text-xs text-white/55">Product Designer · Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="relative flex min-h-screen items-center justify-center px-5 py-12">
        <div className="absolute right-6 top-6 lg:hidden">
          <Link href={ROUTES.home} className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sunny-400 to-electric-500 shadow-glow">
              <Sparkles className="h-4 w-4 text-ink-950" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Swift<span className="text-sunny-400">Cab</span>
            </span>
          </Link>
        </div>
        <div className="absolute left-6 top-6 hidden lg:block">
          <Link href={ROUTES.home} className="text-sm text-white/55 hover:text-white">
            ← Back to site
          </Link>
        </div>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
