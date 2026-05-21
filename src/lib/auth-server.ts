/**
 * Server-side auth helpers used by route group layouts.
 *
 * Reads the session cookie, hydrates the public user from the store,
 * and (on demand) redirects unauthenticated / mis-roled requests.
 */

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import { findUserById, publicUser, type StoredUser } from "./user-store";
import { homeForRole, REDIRECT_PARAM, type Role } from "./session-edge";
import type { SessionUser } from "./auth-client";

export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session) return null;
  const user = (await findUserById(session.sub)) as StoredUser | null;
  return user ? (publicUser(user) as SessionUser) : null;
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
