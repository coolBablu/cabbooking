"use client";

import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { auth } from "@/lib/auth-client";
import { ROUTES } from "@/lib/routes";

export function SignOutButton({
  className,
  label = "Sign out",
}: {
  className?: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function signOut() {
    try {
      setLoading(true);
      await auth.logout().catch(() => {});
    } finally {
      // Hard navigation defeats the browser bfcache so the back button can
      // never restore the now-stale logged-in view. Using `assign` keeps
      // `/` in history (forward arrow re-tries home, not the protected
      // page); `replace` would be even more aggressive if you prefer.
      window.location.assign(ROUTES.home);
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={loading}
      className={
        className ??
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/65 transition-colors hover:bg-white/[0.04] hover:text-white disabled:opacity-60"
      }
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin text-white/55" />
      ) : (
        <LogOut size={16} className="text-white/55" />
      )}
      {label}
    </button>
  );
}
