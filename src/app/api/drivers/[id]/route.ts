import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { handle, jsonOk, jsonError, parseBody } from "@/lib/api-utils";
import { DriverStatus } from "@prisma/client";

type Ctx = { params: Promise<{ id: string }> };

export const GET = handle(async (_req: Request, ctx: Ctx) => {
  await requireRole(["ADMIN"]);
  const { id } = await ctx.params;
  const driver = await prisma.driver.findUnique({
    where: { id },
    include: {
      user: true,
      vehicles: true,
      bookings: {
        take: 20,
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!driver) return jsonError("Driver not found.", 404);
  return jsonOk({ driver });
});

const PatchBody = z.object({
  status: z.nativeEnum(DriverStatus).optional(),
  isOnline: z.boolean().optional(),
});

export const PATCH = handle(async (req: Request, ctx: Ctx) => {
  await requireRole(["ADMIN"]);
  const { id } = await ctx.params;
  const { data, error } = await parseBody(req, PatchBody);
  if (error) return error;

  const driver = await prisma.driver.update({
    where: { id },
    data,
  });
  return jsonOk({ driver });
});
