/**
 * Seed script for local development.
 *   npx prisma db seed
 *
 * Creates an admin user, a few riders, and a sample driver+vehicle.
 */

import { PrismaClient, RideType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@swiftcab.com" },
    update: {},
    create: {
      email: "admin@swiftcab.com",
      passwordHash,
      name: "Sasha Romanov",
      role: "ADMIN",
      tier: "LUXE",
      status: "ACTIVE",
      city: "New York",
    },
  });

  const maya = await prisma.user.upsert({
    where: { email: "maya@swiftcab.com" },
    update: {},
    create: {
      email: "maya@swiftcab.com",
      passwordHash,
      name: "Maya Chen",
      role: "RIDER",
      tier: "PLUS",
      city: "New York",
    },
  });

  const danielUser = await prisma.user.upsert({
    where: { email: "daniel@swiftcab.com" },
    update: {},
    create: {
      email: "daniel@swiftcab.com",
      passwordHash,
      name: "Daniel Okafor",
      role: "DRIVER",
      city: "New York",
    },
  });

  const driver = await prisma.driver.upsert({
    where: { userId: danielUser.id },
    update: {},
    create: {
      userId: danielUser.id,
      licenseNumber: "DL-NY-4421",
      licenseExpiry: new Date(Date.now() + 365 * 24 * 3600 * 1000),
      status: "ACTIVE",
      tier: "ELITE",
      rating: 4.98,
      totalTrips: 2481,
      isOnline: true,
    },
  });

  await prisma.vehicle.upsert({
    where: { plate: "ABC 4421" },
    update: {},
    create: {
      driverId: driver.id,
      make: "Tesla",
      model: "Model Y",
      year: 2024,
      color: "Pearl White",
      plate: "ABC 4421",
      category: RideType.PLUS,
      insuranceExp: new Date(Date.now() + 365 * 24 * 3600 * 1000),
    },
  });

  await prisma.coupon.upsert({
    where: { code: "WELCOME50" },
    update: {},
    create: {
      code: "WELCOME50",
      type: "PERCENTAGE",
      percent: 50,
      maxDiscountCents: 1500,
      usageLimit: 1000,
    },
  });

  console.log("✅ Seeded:", {
    admin: admin.email,
    rider: maya.email,
    driver: danielUser.email,
    password: "Password123!",
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
