"use client";

import { ArrowUpRight } from "lucide-react";

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, { c: string; label: string }> = {
    completed: { c: "border-emerald-400/30 bg-emerald-400/15 text-emerald-300", label: "Completed" },
    "in-progress": { c: "border-sunny-400/30 bg-sunny-400/15 text-sunny-300", label: "In progress" },
    cancelled: { c: "border-rose-400/30 bg-rose-400/15 text-rose-300", label: "Cancelled" },
    pending: { c: "border-electric-400/30 bg-electric-400/15 text-electric-300", label: "Pending" },
    refunded: { c: "border-neon-purple/30 bg-neon-purple/15 text-purple-300", label: "Refunded" },
    open: { c: "border-rose-400/30 bg-rose-400/15 text-rose-300", label: "Open" },
    resolved: { c: "border-emerald-400/30 bg-emerald-400/15 text-emerald-300", label: "Resolved" },
    active: { c: "border-emerald-400/30 bg-emerald-400/15 text-emerald-300", label: "Active" },
    suspended: { c: "border-rose-400/30 bg-rose-400/15 text-rose-300", label: "Suspended" },
    pending_verification: { c: "border-sunny-400/30 bg-sunny-400/15 text-sunny-300", label: "Pending" },
    succeeded: { c: "border-emerald-400/30 bg-emerald-400/15 text-emerald-300", label: "Succeeded" },
    failed: { c: "border-rose-400/30 bg-rose-400/15 text-rose-300", label: "Failed" },
    processing: { c: "border-sunny-400/30 bg-sunny-400/15 text-sunny-300", label: "Processing" },
  };
  const s = map[status] ?? map.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${s.c}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

export function AdminCard({
  title,
  sub,
  action,
  onAction,
  className,
  children,
}: {
  title?: string;
  sub?: string;
  action?: string;
  onAction?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-3xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl md:p-6 ${
        className ?? ""
      }`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            {title && <h3 className="font-display text-lg">{title}</h3>}
            {sub && <p className="text-xs text-white/55">{sub}</p>}
          </div>
          {action && (
            <button
              onClick={onAction}
              className="flex items-center gap-1 text-xs text-sunny-400 hover:underline"
            >
              {action} <ArrowUpRight size={12} />
            </button>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export function FilterBar({
  filters,
  active,
  onSelect,
  counts,
}: {
  filters: string[];
  active: string;
  onSelect: (f: string) => void;
  counts?: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((f) => {
        const isActive = active === f;
        return (
          <button
            key={f}
            onClick={() => onSelect(f)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
              isActive
                ? "border-sunny-400/60 bg-sunny-400/15 text-sunny-300"
                : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {f}
            {counts?.[f] !== undefined && (
              <span className="ml-1.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-white/70">
                {counts[f]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
