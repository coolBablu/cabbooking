import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handle, jsonOk, jsonError } from "@/lib/api-utils";
import { isStripeEnabled, stripe } from "@/lib/stripe";

type Ctx = { params: Promise<{ id: string }> };

export const POST = handle(async (_req: Request, ctx: Ctx) => {
  await requireRole(["ADMIN"]);
  const { id } = await ctx.params;

  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) return jsonError("Payment not found.", 404);
  if (payment.status !== "SUCCEEDED") {
    return jsonError("Only succeeded payments can be refunded.", 409);
  }

  if (isStripeEnabled() && payment.providerChargeId) {
    await stripe().refunds.create({ charge: payment.providerChargeId });
  }

  const updated = await prisma.payment.update({
    where: { id },
    data: { status: "REFUNDED", refundedAt: new Date() },
  });

  return jsonOk({ payment: updated });
});
