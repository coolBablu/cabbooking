import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "sc_session";
const PUBLIC_API = ["/api/auth/login", "/api/auth/signup", "/api/auth/me", "/api/payments/webhook"];

async function readSession(token: string | undefined) {
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "swiftcab-dev-secret-change-me-in-production"
    );
    const { payload } = await jwtVerify(token, secret, {
      issuer: process.env.JWT_ISSUER || "swiftcab",
    });
    return payload as { sub: string; role?: string };
  } catch {
    return null;
  }
}

// In "demo mode" (no DATABASE_URL set) we let everything through so the
// design showcase remains fully browsable without spinning up Postgres.
const DEMO_MODE = !process.env.DATABASE_URL;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (DEMO_MODE) return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await readSession(token);

  // ── Admin gate ──
  if (pathname.startsWith("/admin")) {
    if (!session || session.role !== "ADMIN") {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // ── API gates ──
  if (pathname.startsWith("/api/")) {
    const isPublic = PUBLIC_API.some((p) => pathname === p || pathname.startsWith(p + "/"));
    const isAdminApi =
      pathname.startsWith("/api/admin") ||
      pathname.startsWith("/api/users") ||
      pathname.startsWith("/api/drivers");

    if (!isPublic && !session) {
      return NextResponse.json(
        { ok: false, error: { message: "Unauthorized" } },
        { status: 401 }
      );
    }
    if (isAdminApi && session?.role !== "ADMIN") {
      return NextResponse.json(
        { ok: false, error: { message: "Forbidden" } },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
