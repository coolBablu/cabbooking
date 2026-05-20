import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handle, jsonOk, pagination, parseBody } from "@/lib/api-utils";
import { DriverStatus } from "@prisma/client";

export const GET = handle(async (req: Request) => {
  await requireRole(["ADMIN"]);
  const url = new URL(req.url);
  const { page, limit, skip } = pagination(url);
  const status = url.searchParams.get("status") as DriverStatus | null;
  const q = url.searchParams.get("q")?.trim().toLowerCase();

  const where = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          user: {
            OR: [
              { name: { contains: q, mode: "insensitive" as const } },
              { email: { contains: q, mode: "insensitive" as const } },
              { phone: { contains: q, mode: "insensitive" as const } },
            ],
          },
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.driver.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, avatarUrl: true, city: true } },
        vehicles: true,
      },
    }),
    prisma.driver.count({ where }),
  ]);

  return jsonOk({ items, page, limit, total });
});

const CreateBody = z.object({
  userId: z.string(),
  licenseNumber: z.string().min(4).max(40),
  licenseExpiry: z.string().datetime(),
  status: z.nativeEnum(DriverStatus).default("PENDING_VERIFICATION"),
});

export const POST = handle(async (req: Request) => {
  await requireRole(["ADMIN"]);
  const { data, error } = await parseBody(req, CreateBody);
  if (error) return error;

  const driver = await prisma.driver.create({
    data: {
      userId: data.userId,
      licenseNumber: data.licenseNumber,
      licenseExpiry: new Date(data.licenseExpiry),
      status: data.status,
    },
  });

  // promote user role to DRIVER
  await prisma.user.update({
    where: { id: data.userId },
    data: { role: "DRIVER" },
  });

  return jsonOk({ driver }, { status: 201 });
});
