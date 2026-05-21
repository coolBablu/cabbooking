/**
 * Centralized environment access.
 *
 * Build never fails for missing secrets — every var is optional at build
 * time so the codebase compiles cleanly. Runtime handlers that genuinely
 * need a var call `requireEnv()` and surface a clear error.
 *
 * On Node.js server start we print a one-time banner summarising which
 * features are live vs degraded, so it's obvious whether the deploy is
 * misconfigured.
 */

export const env = {
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || "swiftcab-dev-secret-change-me-in-production",
  jwtIssuer: process.env.JWT_ISSUER || "swiftcab",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,

  razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,

  googleMapsKey: process.env.GOOGLE_MAPS_API_KEY,

  smtpHost: process.env.SMTP_HOST,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  smtpFrom: process.env.SMTP_FROM || "SwiftCab <hello@swiftcab.com>",
} as const;

export function requireEnv(key: keyof typeof env): string {
  const v = env[key];
  if (!v) {
    throw new Error(
      `Missing env var: ${key}. Set it in .env.local (see .env.example).`
    );
  }
  return v as string;
}

// ───────────────────────────────────────────────────────────────────────
// Startup banner — Node.js server only (skipped in Edge / browser).
// Runs once per cold start. Surfaces:
//   • missing JWT_SECRET in production (the #1 redeploy bug we've seen)
//   • which features are running in mock/demo mode
// ───────────────────────────────────────────────────────────────────────

declare global {
  // eslint-disable-next-line no-var
  var __swiftcab_banner_printed__: boolean | undefined;
}

const isNode = typeof process !== "undefined" && !!process.versions?.node;
const isEdge = (process as { env?: { NEXT_RUNTIME?: string } }).env?.NEXT_RUNTIME === "edge";

if (isNode && !isEdge && !globalThis.__swiftcab_banner_printed__) {
  globalThis.__swiftcab_banner_printed__ = true;

  const tick = (b: boolean) => (b ? "✓" : "·");
  const features = {
    "Real database": Boolean(env.databaseUrl),
    "Stripe payments": Boolean(env.stripeSecretKey),
    "Razorpay payments": Boolean(env.razorpayKeyId && env.razorpayKeySecret),
    "Google Maps": Boolean(env.googleMapsKey),
    "Email (SMTP)": Boolean(env.smtpHost && env.smtpUser),
  };

  const lines = [
    "  ▲ SwiftCab",
    ...Object.entries(features).map(
      ([name, on]) =>
        `    ${tick(on)} ${name.padEnd(20)} ${on ? "live" : "demo / mock"}`
    ),
  ];

  // Hard warning if JWT_SECRET is missing in a production build.
  if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
    lines.push("");
    lines.push("    ⚠️  JWT_SECRET is NOT set in production!");
    lines.push("       Login will fail with a redirect loop until you set it.");
    lines.push("       See .env.example for instructions.");
  }

  // eslint-disable-next-line no-console
  console.log("\n" + lines.join("\n") + "\n");
}
