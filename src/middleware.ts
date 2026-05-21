import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  REDIRECT_PARAM,
  homeForRole,
  isRoleAllowed,
  verifyEdgeSession,
  type Role,
} from "@/lib/session-edge";

const PUBLIC_API = [
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/logout",
  "/api/auth/me",
  "/api/payments/webhook",
];

const PROTECTED_PAGE_PREFIXES = [
  "/dashboard",
  "/driver",
  "/admin",
  "/booking",
  "/payment",
  "/ride",
];

const ADMIN_API_PREFIXES = [
  "/api/admin",
  "/api/users",
  "/api/drivers",
  "/api/payments",
];

const AUTH_PAGES = new Set(["/login", "/signup", "/forgot-password"]);

function isProtectedPage(pathname: string) {
  return PROTECTED_PAGE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

function isAdminApi(pathname: string) {
  return ADMIN_API_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

function isPublicApi(pathname: string) {
  return PUBLIC_API.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function redirectToLogin(req: NextRequest, pathname: string) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  if (pathname !== "/" && pathname !== "/login") {
    url.searchParams.set(REDIRECT_PARAM, pathname + req.nextUrl.search);
  }
  return NextResponse.redirect(url);
}

function noStore(res: NextResponse) {
  // Defeat both the browser bfcache and intermediate caches on authenticated
  // pages so the "back button shows a stale logged-in view" class of bugs
  // can never happen.
  res.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  return res;
}

function buildRequestHeaders(req: NextRequest): Headers {
  // Surface the current pathname to server components / layouts via
  // `headers()` — they cannot otherwise see the URL of the current request.
  const h = new Headers(req.headers);
  h.set("x-pathname", req.nextUrl.pathname);
  return h;
}

function next(req: NextRequest, opts?: { cache?: "no-store" }) {
  const res = NextResponse.next({
    request: { headers: buildRequestHeaders(req) },
  });
  if (opts?.cache === "no-store") return noStore(res);
  return res;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifyEdgeSession(token);
  const role = session?.role as Role | undefined;

  // ── Authenticated users on /login or /signup → send to their home ──
  if (session && AUTH_PAGES.has(pathname)) {
    const url = req.nextUrl.clone();
    const nextParam = req.nextUrl.searchParams.get(REDIRECT_PARAM);
    url.pathname = nextParam && nextParam.startsWith("/") ? nextParam : homeForRole(role!);
    url.search = "";
    return NextResponse.redirect(url);
  }

  // ── Protected page gates ──
  if (isProtectedPage(pathname)) {
    if (!session) return redirectToLogin(req, pathname);

    if (!isRoleAllowed(role!, pathname)) {
      // Wrong role → send them to their own home rather than login.
      const url = req.nextUrl.clone();
      url.pathname = homeForRole(role!);
      url.search = "";
      return NextResponse.redirect(url);
    }
    return next(req, { cache: "no-store" });
  }

  // ── API gates ──
  if (pathname.startsWith("/api/")) {
    if (isPublicApi(pathname)) return next(req);
    if (!session) {
      return NextResponse.json(
        { ok: false, error: { message: "Unauthorized" } },
        { status: 401 }
      );
    }
    if (isAdminApi(pathname) && role !== "ADMIN") {
      return NextResponse.json(
        { ok: false, error: { message: "Forbidden" } },
        { status: 403 }
      );
    }
  }

  return next(req);
}

export const config = {
  // Run on auth pages, every protected segment, and the API surface.
  // Public marketing pages (home, about, services, pricing, blog, contact,
  // faq, terms, privacy) are intentionally excluded for performance.
  matcher: [
    "/login",
    "/signup",
    "/forgot-password",
    "/dashboard/:path*",
    "/driver/:path*",
    "/admin/:path*",
    "/booking/:path*",
    "/payment/:path*",
    "/ride/:path*",
    "/api/:path*",
  ],
};
