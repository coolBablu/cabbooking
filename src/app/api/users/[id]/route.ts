import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole, requireSession } from "@/lib/auth";
import { handle, jsonOk, jsonError, parseBody } from "@/lib/api-utils";
import { MembershipTier, UserStatus } from "@prisma/client";

type Ctx = { params: Promise<{ id: string }> };

export const GET = handle(async (_req: Request, ctx: Ctx) => {
  const session = await requireSession();
  const { id } = await ctx.params;

  if (id !== session.sub && session.role !== "ADMIN") {
    return jsonError("Forbidden", 403);
  }

  const user = await prisma.user.findUnique({
    where: { id },
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
      walletCents: true,
      loyaltyPoints: true,
      createdAt: true,
    },
  });

  if (!user) return jsonError("User not found.", 404);
  return jsonOk({ user });
});

const PatchBody = z.object({
  name: z.string().min(2).max(80).optional(),
  phone: z.string().min(6).max(20).optional(),
  city: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  status: z.nativeEnum(UserStatus).optional(),
  tier: z.nativeEnum(MembershipTier).optional(),
});

export const PATCH = handle(async (req: Request, ctx: Ctx) => {
  const session = await requireSession();
  const { id } = await ctx.params;
  const isSelf = id === session.sub;
  if (!isSelf && session.role !== "ADMIN") return jsonError("Forbidden", 403);

  const { data, error } = await parseBody(req, PatchBody);
  if (error) return error;

  // Only admins can change status/tier
  const safe = { ...data };
  if (!session.role || session.role !== "ADMIN") {
    delete safe.status;
    delete safe.tier;
  }

  const user = await prisma.user.update({ where: { id }, data: safe });
  return jsonOk({ user });
});

export const DELETE = handle(async (_req: Request, ctx: Ctx) => {
  await requireRole(["ADMIN"]);
  const { id } = await ctx.params;
  await prisma.user.update({
    where: { id },
    data: { status: "SUSPENDED" },
  });
  return jsonOk({ message: "User suspended" });
});
