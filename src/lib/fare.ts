/**
 * Fare estimation engine.
 *
 * Pure functions: no DB or env reads, so it is safe to call from
 * any context (client or server). Mirrors the pricing displayed
 * in /pricing.
 */

import type { RideType } from "@prisma/client";

export type RideKind = RideType;

type Tier = {
  baseCents: number;
  perKmCents: number;
  perMinCents: number;
  minimumCents: number;
  capacity: number;
};

const TIERS: Record<RideKind, Tier> = {
  LITE:     { baseCents: 250, perKmCents: 120, perMinCents: 20,  minimumCents: 350,  capacity: 4 },
  PLUS:     { baseCents: 350, perKmCents: 165, perMinCents: 25,  minimumCents: 480,  capacity: 4 },
  LUXE:     { baseCents: 800, perKmCents: 300, perMinCents: 45,  minimumCents: 1200, capacity: 4 },
  BIKE:     { baseCents: 120, perKmCents: 60,  perMinCents: 10,  minimumCents: 200,  capacity: 1 },
  XL:       { baseCents: 450, perKmCents: 220, perMinCents: 30,  minimumCents: 650,  capacity: 6 },
  AIRPORT:  { baseCents: 1500, perKmCents: 180, perMinCents: 25, minimumCents: 1800, capacity: 4 },
  RENTAL:   { baseCents: 2500, perKmCents: 100, perMinCents: 15, minimumCents: 2500, capacity: 4 },
  CORPORATE:{ baseCents: 500, perKmCents: 200, perMinCents: 30,  minimumCents: 700,  capacity: 4 },
};

export type FareEstimate = {
  rideType: RideKind;
  distanceMeters: number;
  durationSeconds: number;
  baseFareCents: number;
  fareCents: number;
  surgeMultiplier: number;
  serviceFeeCents: number;
  discountCents: number;
  totalCents: number;
  capacity: number;
};

export type EstimateInput = {
  rideType: RideKind;
  distanceMeters: number;
  durationSeconds: number;
  surgeMultiplier?: number;
  couponPercent?: number;
  couponFlatCents?: number;
};

export function estimateFare(input: EstimateInput): FareEstimate {
  const tier = TIERS[input.rideType];
  const surge = Math.max(1, Math.min(input.surgeMultiplier ?? 1, 3));
  const distanceKm = input.distanceMeters / 1000;
  const durationMin = input.durationSeconds / 60;

  const variable = Math.round(
    tier.perKmCents * distanceKm + tier.perMinCents * durationMin
  );
  const rawBase = tier.baseCents + variable;
  const surged = Math.max(tier.minimumCents, Math.round(rawBase * surge));
  const serviceFee = Math.round(surged * 0.07);

  let discount = 0;
  if (input.couponPercent && input.couponPercent > 0) {
    discount = Math.round(surged * (input.couponPercent / 100));
  } else if (input.couponFlatCents && input.couponFlatCents > 0) {
    discount = input.couponFlatCents;
  }
  if (discount > surged) discount = surged;

  const total = surged + serviceFee - discount;

  return {
    rideType: input.rideType,
    distanceMeters: input.distanceMeters,
    durationSeconds: input.durationSeconds,
    baseFareCents: tier.baseCents,
    fareCents: surged,
    surgeMultiplier: surge,
    serviceFeeCents: serviceFee,
    discountCents: discount,
    totalCents: Math.max(0, total),
    capacity: tier.capacity,
  };
}

/** Haversine distance in meters between two lat/lng points. */
export function haversineMeters(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6_371_000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

/** Rough seconds estimate at ~28km/h average city speed. */
export function estimateDurationSeconds(distanceMeters: number): number {
  return Math.round(distanceMeters / (28_000 / 3600));
}
