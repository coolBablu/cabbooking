import Stripe from "stripe";
import { env, requireEnv } from "./env";

let _stripe: Stripe | null = null;

export function stripe(): Stripe {
  if (_stripe) return _stripe;
  const key = requireEnv("stripeSecretKey");
  _stripe = new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  });
  return _stripe;
}

export function isStripeEnabled(): boolean {
  return Boolean(env.stripeSecretKey);
}
