"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type Size = "sm" | "md" | "lg" | "xl";

const SIZES: Record<Size, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  size = "md",
  children,
  hideClose,
  panelClassName,
}: {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  size?: Size;
  children: React.ReactNode;
  hideClose?: boolean;
  panelClassName?: string;
}) {
  // ESC + scroll lock while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[1000] flex items-end justify-center bg-ink-950/70 p-4 backdrop-blur-md md:items-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-900 to-ink-950 shadow-2xl shadow-black/50 ${SIZES[size]} ${panelClassName ?? ""}`}
          >
            {(title || subtitle) && (
              <div className="border-b border-white/10 px-6 py-4">
                {title && (
                  <h2 className="font-display text-xl md:text-2xl">{title}</h2>
                )}
                {subtitle && (
                  <p className="mt-0.5 text-sm text-white/60">{subtitle}</p>
                )}
              </div>
            )}

            {!hideClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/80 backdrop-blur transition-colors hover:bg-white/[0.12] hover:text-white"
              >
                <X size={16} />
              </button>
            )}

            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
