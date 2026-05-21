"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SessionUser } from "@/lib/auth-client";

const AuthCtx = createContext<SessionUser | null>(null);

export function AuthProvider({
  user,
  children,
}: {
  user: SessionUser | null;
  children: ReactNode;
}) {
  return <AuthCtx.Provider value={user}>{children}</AuthCtx.Provider>;
}

/** Returns the current session user, or `null` if unauthenticated. */
export function useUser(): SessionUser | null {
  return useContext(AuthCtx);
}

/** Throws if no user — useful inside layouts already gated by middleware. */
export function useRequiredUser(): SessionUser {
  const u = useContext(AuthCtx);
  if (!u) {
    throw new Error(
      "useRequiredUser() called without an authenticated user. " +
        "Wrap this component in a route group that enforces auth."
    );
  }
  return u;
}
