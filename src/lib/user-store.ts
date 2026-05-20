/**
 * Unified user store.
 *
 * - If `DATABASE_URL` is set → uses Prisma (real Postgres).
 * - Otherwise → falls back to an on-disk JSON store at `.swiftcab-demo/users.json`
 *   so the signup / login flow works end-to-end in demo mode (no Postgres
 *   required). Persistent across requests, scoped to the project.
 *
 * Keep this surface minimal — auth routes are the only consumers.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { env } from "./env";

export type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  phone?: string | null;
  role: "RIDER" | "DRIVER" | "ADMIN";
  status: "ACTIVE" | "PENDING" | "SUSPENDED";
  tier: "LITE" | "PLUS" | "LUXE";
  city?: string | null;
  avatarUrl?: string | null;
  walletCents: number;
  loyaltyPoints: number;
  createdAt: string;
};

export const isDemoMode = (): boolean => !env.databaseUrl;

// ───────────────────────────────────────────────────────────
// File-backed demo store
// ───────────────────────────────────────────────────────────

const DEMO_DIR = path.join(process.cwd(), ".swiftcab-demo");
const DEMO_FILE = path.join(DEMO_DIR, "users.json");

let memoryCache: StoredUser[] | null = null;

async function readDemo(): Promise<StoredUser[]> {
  if (memoryCache) return memoryCache;
  try {
    const raw = await fs.readFile(DEMO_FILE, "utf8");
    memoryCache = JSON.parse(raw) as StoredUser[];
    return memoryCache;
  } catch {
    // First run — seed with demo accounts so the showcase works immediately.
    memoryCache = await buildSeedUsers();
    await writeDemo(memoryCache);
    return memoryCache;
  }
}

async function buildSeedUsers(): Promise<StoredUser[]> {
  const hash = await bcrypt.hash("Password123!", 10);
  const now = new Date().toISOString();
  return [
    {
      id: "u_admin_seed",
      email: "admin@swiftcab.com",
      passwordHash: hash,
      name: "Sasha Romanov",
      phone: null,
      role: "ADMIN",
      status: "ACTIVE",
      tier: "LUXE",
      city: "New York",
      avatarUrl: null,
      walletCents: 0,
      loyaltyPoints: 0,
      createdAt: now,
    },
    {
      id: "u_rider_seed",
      email: "maya@swiftcab.com",
      passwordHash: hash,
      name: "Maya Chen",
      phone: null,
      role: "RIDER",
      status: "ACTIVE",
      tier: "PLUS",
      city: "New York",
      avatarUrl: null,
      walletCents: 4200,
      loyaltyPoints: 1840,
      createdAt: now,
    },
    {
      id: "u_driver_seed",
      email: "daniel@swiftcab.com",
      passwordHash: hash,
      name: "Daniel Okafor",
      phone: null,
      role: "DRIVER",
      status: "ACTIVE",
      tier: "LITE",
      city: "New York",
      avatarUrl: null,
      walletCents: 0,
      loyaltyPoints: 0,
      createdAt: now,
    },
  ];
}

async function writeDemo(users: StoredUser[]) {
  memoryCache = users;
  await fs.mkdir(DEMO_DIR, { recursive: true });
  await fs.writeFile(DEMO_FILE, JSON.stringify(users, null, 2), "utf8");
}

// ───────────────────────────────────────────────────────────
// Public API (matches both real DB + demo)
// ───────────────────────────────────────────────────────────

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const e = email.toLowerCase();
  if (isDemoMode()) {
    const users = await readDemo();
    return users.find((u) => u.email === e) ?? null;
  }
  const { prisma } = await import("./prisma");
  const user = await prisma.user.findUnique({ where: { email: e } });
  return user ? toStored(user) : null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  if (isDemoMode()) {
    const users = await readDemo();
    return users.find((u) => u.id === id) ?? null;
  }
  const { prisma } = await import("./prisma");
  const user = await prisma.user.findUnique({ where: { id } });
  return user ? toStored(user) : null;
}

export type CreateUserInput = {
  email: string;
  passwordHash: string;
  name: string;
  phone?: string;
  role?: "RIDER" | "DRIVER";
  city?: string;
};

export async function createUser(input: CreateUserInput): Promise<StoredUser> {
  const e = input.email.toLowerCase();

  if (isDemoMode()) {
    const users = await readDemo();
    if (users.some((u) => u.email === e)) {
      throw Object.assign(new Error("An account with this email already exists."), {
        status: 409,
      });
    }
    const user: StoredUser = {
      id: `u_${crypto.randomBytes(8).toString("hex")}`,
      email: e,
      passwordHash: input.passwordHash,
      name: input.name,
      phone: input.phone ?? null,
      role: input.role ?? "RIDER",
      status: "ACTIVE",
      tier: "LITE",
      city: input.city ?? null,
      avatarUrl: null,
      walletCents: 0,
      loyaltyPoints: 0,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await writeDemo(users);
    return user;
  }

  const { prisma } = await import("./prisma");
  const exists = await prisma.user.findUnique({ where: { email: e } });
  if (exists) {
    throw Object.assign(new Error("An account with this email already exists."), {
      status: 409,
    });
  }
  const created = await prisma.user.create({
    data: {
      email: e,
      passwordHash: input.passwordHash,
      name: input.name,
      phone: input.phone,
      role: input.role ?? "RIDER",
      city: input.city,
    },
  });
  return toStored(created);
}

// ───────────────────────────────────────────────────────────
// Internal: normalize a Prisma user to StoredUser
// ───────────────────────────────────────────────────────────

type AnyPrismaUser = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  phone: string | null;
  role: "RIDER" | "DRIVER" | "ADMIN";
  status: "ACTIVE" | "PENDING" | "SUSPENDED";
  tier: "LITE" | "PLUS" | "LUXE";
  city: string | null;
  avatarUrl: string | null;
  walletCents: number;
  loyaltyPoints: number;
  createdAt: Date;
};

function toStored(u: AnyPrismaUser): StoredUser {
  return {
    id: u.id,
    email: u.email,
    passwordHash: u.passwordHash,
    name: u.name,
    phone: u.phone,
    role: u.role,
    status: u.status,
    tier: u.tier,
    city: u.city,
    avatarUrl: u.avatarUrl,
    walletCents: u.walletCents,
    loyaltyPoints: u.loyaltyPoints,
    createdAt: u.createdAt.toISOString(),
  };
}

/** Public-safe slice (no password hash). */
export function publicUser(u: StoredUser) {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    phone: u.phone,
    role: u.role,
    status: u.status,
    tier: u.tier,
    city: u.city,
    avatarUrl: u.avatarUrl,
    walletCents: u.walletCents,
    loyaltyPoints: u.loyaltyPoints,
    createdAt: u.createdAt,
  };
}
