import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getCurrentUser } from "@/lib/auth-server";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { homeForRole, REDIRECT_PARAM } from "@/lib/session-edge";

/**
 * Admin-only route group.
 *
 * Middleware already enforces ADMIN role at the edge — this layout
 * repeats the check server-side (defense-in-depth) and loads the
 * SessionUser into the AuthProvider so admin pages can greet the
 * real user instead of hard-coded placeholders.
 */
export const dynamic = "force-dynamic";

export default async function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "/admin";

  const user = await getCurrentUser();
  if (!user) {
    const next = encodeURIComponent(pathname);
    redirect(`/login?${REDIRECT_PARAM}=${next}`);
  }
  if (user.role !== "ADMIN") {
    redirect(homeForRole(user.role));
  }

  return <AuthProvider user={user}>{children}</AuthProvider>;
}
