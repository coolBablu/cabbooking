/**
 * Centralized environment access.
 * All env vars are optional at build time so that the codebase compiles
 * without secrets; runtime handlers fail loud if they're missing.
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
