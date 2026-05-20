import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handle, jsonOk, pagination } from "@/lib/api-utils";
import { UserStatus } from "@prisma/client";

export const GET = handle(async (req: Request) => {
  await requireRole(["ADMIN"]);
  const url = new URL(req.url);
  const { page, limit, skip } = pagination(url);
  const status = url.searchParams.get("status") as UserStatus | null;
  const q = url.searchParams.get("q")?.trim().toLowerCase();

  const where = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
            { phone: { contains: q, mode: "insensitive" as const } },
            { city: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        status: true,
        tier: true,
        city: true,
        avatarUrl: true,
        createdAt: true,
        _count: { select: { bookings: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return jsonOk({ items, page, limit, total });
});
