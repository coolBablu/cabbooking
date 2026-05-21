import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { env } from "./env";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  type Role,
  type SessionPayload as EdgeSessionPayload,
} from "./session-edge";

const secret = new TextEncoder().encode(env.jwtSecret);

export type SessionPayload = JWTPayload &
  EdgeSessionPayload & {
    sub: string;
    email: string;
    role: Role;
    name?: string;
  };

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(env.jwtIssuer)
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: env.jwtIssuer,
    });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const c = await cookies();
  c.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSessionCookie() {
  const c = await cookies();
  c.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const c = await cookies();
  const token = c.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

/**
 * Require authentication; throws an auth error if no session.
 * Use inside API routes that need a user.
 */
export async function requireSession(): Promise<SessionPayload> {
  const s = await getSession();
  if (!s) {
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }
  return s;
}

export async function requireRole(
  roles: SessionPayload["role"][]
): Promise<SessionPayload> {
  const s = await requireSession();
  if (!roles.includes(s.role)) {
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  }
  return s;
}

export const AUTH_COOKIE = SESSION_COOKIE;
