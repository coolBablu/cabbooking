/**
 * Edge-runtime safe session utilities.
 *
 * Used by `src/middleware.ts` (Edge runtime — cannot touch Node-only APIs
 * like `next/headers`) and by Node-side helpers in `src/lib/auth.ts`.
 *
 * Keep this file dependency-free except for `jose`, which is universal.
 */

import { jwtVerify } from "jose";

export const SESSION_COOKIE = "sc_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
export const REDIRECT_PARAM = "next";

export type Role = "RIDER" | "DRIVER" | "ADMIN";

export type SessionPayload = {
  sub: string;
  email: string;
  role: Role;
  name?: string;
  iat?: number;
  exp?: number;
};

function getSecret(): Uint8Array {
  const raw =
    process.env.JWT_SECRET ||
    (process.env.NODE_ENV === "production"
      ? ""
      : "swiftcab-dev-secret-change-me-in-production");
  if (!raw) {
    // Fail loud in production rather than silently signing with a known key.
    throw new Error(
      "JWT_SECRET is not set. Refusing to verify sessions in production."
    );
  }
  return new TextEncoder().encode(raw);
}

export async function verifyEdgeSession(
  token: string | undefined
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: process.env.JWT_ISSUER || "swiftcab",
    });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

/** Canonical post-auth destination keyed on role. */
export function homeForRole(role: Role): string {
  if (role === "ADMIN") return "/admin";
  if (role === "DRIVER") return "/driver";
  return "/dashboard";
}

/** Returns the set of route prefixes a given role is allowed to access. */
export function isRoleAllowed(role: Role, pathname: string): boolean {
  if (pathname.startsWith("/admin")) return role === "ADMIN";
  if (pathname.startsWith("/driver")) return role === "DRIVER";
  if (pathname.startsWith("/dashboard")) return role === "RIDER";
  // Booking / payment / ride pages: any authenticated user can access.
  return true;
}
