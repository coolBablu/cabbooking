import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handle, jsonOk, pagination } from "@/lib/api-utils";
import { PaymentStatus } from "@prisma/client";

export const GET = handle(async (req: Request) => {
  await requireRole(["ADMIN"]);
  const url = new URL(req.url);
  const { page, limit, skip } = pagination(url);
  const status = url.searchParams.get("status") as PaymentStatus | null;

  const where = { ...(status ? { status } : {}) };

  const [items, total, sum] = await Promise.all([
    prisma.payment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
      include: {
        user: { select: { id: true, name: true, email: true } },
        booking: { select: { id: true, rideType: true, totalCents: true } },
      },
    }),
    prisma.payment.count({ where }),
    prisma.payment.aggregate({
      where: { status: "SUCCEEDED" },
      _sum: { amountCents: true },
    }),
  ]);

  return jsonOk({
    items,
    page,
    limit,
    total,
    grossCents: sum._sum.amountCents ?? 0,
  });
});
