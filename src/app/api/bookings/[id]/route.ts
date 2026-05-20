import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { handle, jsonOk, jsonError, parseBody } from "@/lib/api-utils";
import { BookingStatus } from "@prisma/client";

type Ctx = { params: Promise<{ id: string }> };

export const GET = handle(async (_req: Request, ctx: Ctx) => {
  const session = await requireSession();
  const { id } = await ctx.params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      driver: {
        select: {
          id: true,
          rating: true,
          user: { select: { name: true, avatarUrl: true, phone: true } },
          vehicles: { take: 1, select: { make: true, model: true, plate: true } },
        },
      },
      payment: true,
      rating: true,
    },
  });

  if (!booking) return jsonError("Booking not found.", 404);

  // Only the owner, the assigned driver, or admin can read
  const isOwner = booking.riderId === session.sub;
  const isDriver = booking.driver?.id && (await prisma.driver.findFirst({
    where: { id: booking.driver.id, userId: session.sub },
    select: { id: true },
  }));
  if (!isOwner && !isDriver && session.role !== "ADMIN") {
    return jsonError("Forbidden", 403);
  }

  return jsonOk({ booking });
});

const PatchBody = z.object({
  status: z.nativeEnum(BookingStatus).optional(),
  cancelReason: z.string().max(280).optional(),
  driverId: z.string().optional(),
});

export const PATCH = handle(async (req: Request, ctx: Ctx) => {
  const session = await requireSession();
  const { id } = await ctx.params;
  const { data, error } = await parseBody(req, PatchBody);
  if (error) return error;

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return jsonError("Booking not found.", 404);

  const isOwner = booking.riderId === session.sub;
  if (!isOwner && session.role !== "ADMIN") {
    return jsonError("Forbidden", 403);
  }

  const patch: Record<string, unknown> = {};
  if (data.status) {
    patch.status = data.status;
    if (data.status === "IN_PROGRESS") patch.startedAt = new Date();
    if (data.status === "COMPLETED") patch.completedAt = new Date();
    if (data.status === "CANCELLED") {
      patch.cancelledAt = new Date();
      patch.cancelReason = data.cancelReason ?? "Cancelled by user";
    }
  }
  if (data.driverId && session.role === "ADMIN") {
    patch.driverId = data.driverId;
  }

  const updated = await prisma.booking.update({ where: { id }, data: patch });
  return jsonOk({ booking: updated });
});

export const DELETE = handle(async (_req: Request, ctx: Ctx) => {
  const session = await requireSession();
  const { id } = await ctx.params;
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return jsonError("Booking not found.", 404);
  if (booking.riderId !== session.sub && session.role !== "ADMIN") {
    return jsonError("Forbidden", 403);
  }
  await prisma.booking.update({
    where: { id },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
      cancelReason: "User cancelled",
    },
  });
  return jsonOk({ message: "Cancelled" });
});
