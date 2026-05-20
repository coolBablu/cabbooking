/**
 * Tiny client-side auth helpers.
 *
 * Wraps fetch + the `/api/auth/*` endpoints and normalizes the
 * `{ ok, data, error }` envelope into a thrown error you can catch.
 */

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "RIDER" | "DRIVER" | "ADMIN";
  status: "ACTIVE" | "PENDING" | "SUSPENDED";
  tier: "LITE" | "PLUS" | "LUXE";
  city?: string | null;
  avatarUrl?: string | null;
};

type ApiEnvelope<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      error: { message: string; details?: Record<string, string[] | undefined> };
    };

export type FieldErrors = Record<string, string | undefined>;

export class AuthError extends Error {
  fieldErrors?: FieldErrors;
  constructor(message: string, fieldErrors?: FieldErrors) {
    super(message);
    this.name = "AuthError";
    this.fieldErrors = fieldErrors;
  }
}

async function call<T>(
  path: string,
  init?: RequestInit & { json?: unknown }
): Promise<T> {
  const res = await fetch(path, {
    method: init?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    body: init?.json ? JSON.stringify(init.json) : init?.body,
    credentials: "same-origin",
  });

  let payload: ApiEnvelope<T>;
  try {
    payload = (await res.json()) as ApiEnvelope<T>;
  } catch {
    throw new AuthError(`Unexpected response (${res.status})`);
  }

  if (!payload.ok) {
    const details = payload.error.details as
      | Record<string, string[] | undefined>
      | undefined;
    const fieldErrors: FieldErrors | undefined = details
      ? Object.fromEntries(
          Object.entries(details).map(([k, v]) => [k, v?.[0]])
        )
      : undefined;
    throw new AuthError(payload.error.message, fieldErrors);
  }

  return payload.data;
}

export type LoginInput = { email: string; password: string };
export type SignupInput = {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: "RIDER" | "DRIVER";
  city?: string;
  acceptTerms: true;
};

export const auth = {
  me: () => call<{ user: SessionUser | null }>("/api/auth/me"),
  login: (input: LoginInput) =>
    call<{ user: SessionUser }>("/api/auth/login", { method: "POST", json: input }),
  signup: (input: SignupInput) =>
    call<{ user: SessionUser }>("/api/auth/signup", {
      method: "POST",
      json: input,
    }),
  logout: () => call<{ message: string }>("/api/auth/logout", { method: "POST" }),
};

/** Where to send a user once they're authenticated. */
export function homeForRole(role: SessionUser["role"]): string {
  if (role === "ADMIN") return "/admin";
  if (role === "DRIVER") return "/driver";
  return "/dashboard";
}
