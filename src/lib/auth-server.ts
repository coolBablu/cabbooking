/**
 * Server-side auth helpers used by route group layouts.
 *
 * Reads the session cookie, hydrates the public user from the store,
 * and (on demand) redirects unauthenticated / mis-roled requests.
 */

import { redirect } from "next/navigation";
import { getSession, type SessionPayload } from "./auth";
import { findUserById, publicUser, type StoredUser } from "./user-store";
import { homeForRole, REDIRECT_PARAM, type Role } from "./session-edge";
import type { SessionUser } from "./auth-client";

/**
 * Build a SessionUser purely from the JWT payload. Used as a fallback when
 * the user-store cannot find the record (e.g. demo mode on serverless,
 * where the in-memory / /tmp store is per-lambda and a freshly signed-up
 * user might not exist in the lambda that handles the very next request).
 *
 * The JWT was signed by us, verified by us — the identity is authoritative.
 * Missing profile fields just get sensible defaults until a real DB is wired.
 */
function userFromJwt(s: SessionPayload): SessionUser {
  return {
    id: s.sub,
    email: s.email,
    name: s.name ?? s.email.split("@")[0] ?? "Member",
    role: s.role,
    status: "ACTIVE",
    tier: "LITE",
    city: null,
    avatarUrl: null,
  };
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session) return null;
  const user = (await findUserById(session.sub)) as StoredUser | null;
  // If the store knows this user, enrich from there. Otherwise fall back to
  // the JWT payload — the session is still cryptographically valid, the user
  // simply hasn't been replicated to this lambda's ephemeral store.
  return user ? (publicUser(user) as SessionUser) : userFromJwt(session);
}

/**
 * Layout helper: enforce that a user is signed in AND has one of the
 * allowed roles. On failure, redirects to /login (preserving `?next=`)
 * or to the user's own dashboard if the role mismatches.
 *
 * Middleware already enforces this at the edge — this is defense-in-depth
 * and also the canonical place where layouts obtain the SessionUser.
 */
export async function requireSessionUser(opts: {
  allow: Role[];
  pathname: string;
}): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    const next = encodeURIComponent(opts.pathname || "/");
    redirect(`/login?${REDIRECT_PARAM}=${next}`);
  }
  if (!opts.allow.includes(user.role)) {
    redirect(homeForRole(user.role));
  }
  return user;
}
