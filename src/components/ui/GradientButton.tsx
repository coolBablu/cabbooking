"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "text-ink-950 bg-gradient-to-tr from-sunny-400 via-sunny-300 to-sunny-400 shadow-glow-yellow",
  secondary:
    "text-white bg-white/5 border border-white/15 backdrop-blur-xl hover:bg-white/10",
  ghost: "text-white/80 hover:text-white",
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-colors";

const motionProps = {
  whileHover: { y: -2, scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 320, damping: 22 },
};

type ButtonProps = Omit<HTMLMotionProps<"button">, "children" | "href"> & {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
  href?: undefined;
};

type LinkProps = {
  href: string;
  variant?: Variant;
  className?: string;
  children?: ReactNode;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

type Props = ButtonProps | LinkProps;

/**
 * Polymorphic button. Renders as a Next.js <Link> wrapping a motion.span
 * when `href` is provided; otherwise renders as a motion.button.
 * This avoids invalid <a><button> HTML nesting.
 */
export function GradientButton(props: Props) {
  const { variant = "primary", className, children } = props;
  const cls = cn(base, styles[variant], className);

  const hoverShimmer = variant === "primary" && (
    <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 hover:opacity-100 [background:radial-gradient(120%_60%_at_50%_0%,rgba(255,255,255,0.4),transparent)]" />
  );

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = props;
    return (
      <Link href={href} target={target} rel={rel} onClick={onClick} className="inline-block">
        <motion.span {...motionProps} className={cls}>
          <span className="relative z-10 flex items-center gap-2">{children}</span>
          {hoverShimmer}
        </motion.span>
      </Link>
    );
  }

  const { href: _ignored, ...rest } = props as ButtonProps & { href?: undefined };
  void _ignored;

  return (
    <motion.button {...motionProps} className={cls} {...rest}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {hoverShimmer}
    </motion.button>
  );
}
