import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { isStripeEnabled, stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { jsonError, jsonOk } from "@/lib/api-utils";

export const runtime = "nodejs"; // raw body needed
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isStripeEnabled() || !env.stripeWebhookSecret) {
    return jsonError("Stripe webhooks are not configured.", 503);
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return jsonError("Missing signature", 400);

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(raw, sig, env.stripeWebhookSecret);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid signature";
    return jsonError(msg, 400);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const pi = event.data.object as Stripe.PaymentIntent;
        const chargeId =
          typeof pi.latest_charge === "string" ? pi.latest_charge : pi.latest_charge?.id;
        await prisma.payment.updateMany({
          where: { providerIntentId: pi.id },
          data: {
            status: "SUCCEEDED",
            providerChargeId: chargeId ?? undefined,
          },
        });
        if (pi.metadata?.bookingId) {
          await prisma.booking.update({
            where: { id: pi.metadata.bookingId },
            data: { status: "ASSIGNED" },
          });
        }
        break;
      }
      case "payment_intent.payment_failed": {
        const pi = event.data.object as Stripe.PaymentIntent;
        await prisma.payment.updateMany({
          where: { providerIntentId: pi.id },
          data: {
            status: "FAILED",
            failureReason: pi.last_payment_error?.message ?? "Unknown",
          },
        });
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        await prisma.payment.updateMany({
          where: { providerChargeId: charge.id },
          data: { status: "REFUNDED", refundedAt: new Date() },
        });
        break;
      }
      default:
        // ignore other events
        break;
    }
  } catch (e) {
    console.error("[stripe webhook]", e);
    return jsonError("Webhook handler error", 500);
  }

  return jsonOk({ received: true });
}
