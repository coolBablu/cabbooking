import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { handle, jsonOk, jsonError, parseBody } from "@/lib/api-utils";
import { isStripeEnabled, stripe } from "@/lib/stripe";

const Body = z.object({
  bookingId: z.string(),
  method: z.enum(["CARD", "WALLET", "APPLE_PAY", "GOOGLE_PAY", "UPI"]).default("CARD"),
});

export const POST = handle(async (req: Request) => {
  const session = await requireSession();
  const { data, error } = await parseBody(req, Body);
  if (error) return error;

  const booking = await prisma.booking.findUnique({
    where: { id: data.bookingId },
  });
  if (!booking) return jsonError("Booking not found.", 404);
  if (booking.riderId !== session.sub) return jsonError("Forbidden", 403);

  if (!isStripeEnabled()) {
    // Local-dev safe fallback: create a mock payment record and return
    // a fake client secret so the UI works end-to-end without keys.
    const fake = await prisma.payment.upsert({
      where: { bookingId: booking.id },
      create: {
        bookingId: booking.id,
        userId: session.sub,
        amountCents: booking.totalCents,
        method: data.method,
        provider: "STRIPE",
        status: "PROCESSING",
        providerIntentId: `pi_dev_${booking.id.slice(0, 12)}`,
      },
      update: { status: "PROCESSING", method: data.method },
    });
    return jsonOk({
      clientSecret: `pi_dev_${booking.id}_secret_dev`,
      payment: fake,
      mock: true,
    });
  }

  const intent = await stripe().paymentIntents.create({
    amount: booking.totalCents,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: {
      bookingId: booking.id,
      userId: session.sub,
    },
  });

  const payment = await prisma.payment.upsert({
    where: { bookingId: booking.id },
    create: {
      bookingId: booking.id,
      userId: session.sub,
      amountCents: booking.totalCents,
      method: data.method,
      provider: "STRIPE",
      status: "PENDING",
      providerIntentId: intent.id,
    },
    update: {
      method: data.method,
      providerIntentId: intent.id,
      status: "PENDING",
    },
  });

  return jsonOk({ clientSecret: intent.client_secret, payment });
});
