import { z } from "zod";
import {
  estimateDurationSeconds,
  estimateFare,
  haversineMeters,
} from "@/lib/fare";
import { handle, jsonOk, parseBody } from "@/lib/api-utils";
import { RideType } from "@prisma/client";

const Body = z.object({
  pickup: z.object({ lat: z.number(), lng: z.number() }),
  dropoff: z.object({ lat: z.number(), lng: z.number() }),
  rideTypes: z
    .array(z.nativeEnum(RideType))
    .default([RideType.LITE, RideType.PLUS, RideType.LUXE, RideType.BIKE]),
  surgeMultiplier: z.number().min(1).max(3).optional(),
  couponCode: z.string().optional(),
});

export const POST = handle(async (req: Request) => {
  const { data, error } = await parseBody(req, Body);
  if (error) return error;

  const distanceMeters = haversineMeters(data.pickup, data.dropoff);
  const durationSeconds = estimateDurationSeconds(distanceMeters);

  const rideTypes = data.rideTypes ?? [
    RideType.LITE,
    RideType.PLUS,
    RideType.LUXE,
    RideType.BIKE,
  ];
  const estimates = rideTypes.map((rideType) =>
    estimateFare({
      rideType,
      distanceMeters,
      durationSeconds,
      surgeMultiplier: data.surgeMultiplier,
    })
  );

  return jsonOk({
    distanceMeters,
    durationSeconds,
    distanceKm: +(distanceMeters / 1000).toFixed(2),
    durationMinutes: +(durationSeconds / 60).toFixed(1),
    estimates,
  });
});
