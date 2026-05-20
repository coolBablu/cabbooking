import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import {
  handle,
  jsonOk,
  pagination,
  parseBody,
} from "@/lib/api-utils";
import {
  estimateDurationSeconds,
  estimateFare,
  haversineMeters,
} from "@/lib/fare";
import { BookingStatus, RideType } from "@prisma/client";

const CreateBody = z.object({
  rideType: z.nativeEnum(RideType),
  pickup: z.object({
    address: z.string().min(2),
    lat: z.number(),
    lng: z.number(),
  }),
  dropoff: z.object({
    address: z.string().min(2),
    lat: z.number(),
    lng: z.number(),
  }),
  scheduledFor: z.string().datetime().optional(),
  couponCode: z.string().optional(),
  notes: z.string().max(500).optional(),
});

export const GET = handle(async (req: Request) => {
  const session = await requireSession();
  const url = new URL(req.url);
  const { page, limit, skip } = pagination(url);
  const status = url.searchParams.get("status") as BookingStatus | null;

  const where = {
    riderId: session.sub,
    ...(status ? { status } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
      include: {
        driver: {
          select: {
            id: true,
            rating: true,
            user: { select: { name: true, avatarUrl: true, phone: true } },
            vehicles: {
              take: 1,
              select: { make: true, model: true, plate: true, color: true },
            },
          },
        },
      },
    }),
    prisma.booking.count({ where }),
  ]);

  return jsonOk({ items, page, limit, total });
});

export const POST = handle(async (req: Request) => {
  const session = await requireSession();

  const { data, error } = await parseBody(req, CreateBody);
  if (error) return error;

  const distanceMeters = haversineMeters(data.pickup, data.dropoff);
  const durationSeconds = estimateDurationSeconds(distanceMeters);

  let couponPercent = 0;
  let couponFlatCents = 0;
  if (data.couponCode) {
    const coupon = await prisma.coupon.findUnique({
      where: { code: data.couponCode.toUpperCase() },
    });
    if (coupon && coupon.active) {
      couponPercent = coupon.percent;
      couponFlatCents = coupon.amountCents;
    }
  }

  const fare = estimateFare({
    rideType: data.rideType,
    distanceMeters,
    durationSeconds,
    couponPercent,
    couponFlatCents,
  });

  const booking = await prisma.booking.create({
    data: {
      riderId: session.sub,
      rideType: data.rideType,
      pickupAddress: data.pickup.address,
      pickupLat: data.pickup.lat,
      pickupLng: data.pickup.lng,
      dropoffAddress: data.dropoff.address,
      dropoffLat: data.dropoff.lat,
      dropoffLng: data.dropoff.lng,
      distanceMeters,
      durationSeconds,
      baseFareCents: fare.baseFareCents,
      fareCents: fare.fareCents,
      surgeMultiplier: fare.surgeMultiplier,
      serviceFeeCents: fare.serviceFeeCents,
      discountCents: fare.discountCents,
      totalCents: fare.totalCents,
      couponCode: data.couponCode,
      notes: data.notes,
      scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : null,
      status: "PENDING",
    },
  });

  return jsonOk({ booking, fare }, { status: 201 });
});
