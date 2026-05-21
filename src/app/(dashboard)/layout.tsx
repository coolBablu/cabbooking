import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-server";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { homeForRole, REDIRECT_PARAM } from "@/lib/session-edge";
import { headers } from "next/headers";

/**
 * Authenticated route group covering /dashboard (RIDER) and /driver (DRIVER).
 *
 * Middleware enforces the same checks at the edge; this layout repeats them
 * server-side as defense-in-depth AND is the canonical place to load the
 * current user and seed the AuthProvider for the client tree.
 *
 * `dynamic = "force-dynamic"` plus the `Cache-Control: no-store` headers we
 * emit from middleware ensure that the browser bfcache will not serve a
 * stale logged-in page after the user signs out.
 */
export const dynamic = "force-dynamic";

export default async function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "/dashboard";

  const user = await getCurrentUser();
  if (!user) {
    const next = encodeURIComponent(pathname);
    redirect(`/login?${REDIRECT_PARAM}=${next}`);
  }

  // Role-route alignment. Middleware also enforces this, but if someone
  // somehow lands on the wrong segment, send them to their own home.
  if (pathname.startsWith("/driver") && user.role !== "DRIVER") {
    redirect(homeForRole(user.role));
  }
  if (pathname.startsWith("/dashboard") && user.role !== "RIDER") {
    redirect(homeForRole(user.role));
  }

  return <AuthProvider user={user}>{children}</AuthProvider>;
}
