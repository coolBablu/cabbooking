import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handle, jsonOk } from "@/lib/api-utils";
import { BookingStatus } from "@prisma/client";

export const GET = handle(async () => {
  await requireRole(["ADMIN"]);

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const [
    totalUsers,
    totalDrivers,
    onlineDrivers,
    bookingsLast30,
    completed,
    inProgress,
    cancelled,
    revenueAgg,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.driver.count(),
    prisma.driver.count({ where: { isOnline: true } }),
    prisma.booking.count({ where: { createdAt: { gte: since } } }),
    prisma.booking.count({ where: { status: BookingStatus.COMPLETED, createdAt: { gte: since } } }),
    prisma.booking.count({ where: { status: BookingStatus.IN_PROGRESS } }),
    prisma.booking.count({ where: { status: BookingStatus.CANCELLED, createdAt: { gte: since } } }),
    prisma.payment.aggregate({
      where: { status: "SUCCEEDED", createdAt: { gte: since } },
      _sum: { amountCents: true },
    }),
  ]);

  return jsonOk({
    users: { total: totalUsers },
    drivers: { total: totalDrivers, online: onlineDrivers },
    bookings: {
      last30: bookingsLast30,
      completed,
      inProgress,
      cancelled,
    },
    revenueCents: revenueAgg._sum.amountCents ?? 0,
  });
});
