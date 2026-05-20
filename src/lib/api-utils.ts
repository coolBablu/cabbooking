import { NextResponse } from "next/server";
import { ZodError, type ZodSchema } from "zod";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function jsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    { ok: false, error: { message, details } },
    { status }
  );
}

/** Parses & validates the JSON body against a Zod schema. */
export async function parseBody<T>(
  req: Request,
  schema: ZodSchema<T>
): Promise<{ data: T; error?: never } | { data?: never; error: NextResponse }> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return { error: jsonError("Invalid JSON body", 400) };
  }
  try {
    return { data: schema.parse(body) };
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        error: jsonError("Validation failed", 422, e.flatten().fieldErrors),
      };
    }
    return { error: jsonError("Invalid request", 400) };
  }
}

/** Wraps a handler so thrown auth/role errors return proper responses. */
export function handle<T extends (...args: never[]) => Promise<Response>>(fn: T): T {
  return (async (...args: never[]) => {
    try {
      return await fn(...args);
    } catch (e: unknown) {
      const err = e as { status?: number; message?: string };
      const status = err.status ?? 500;
      const msg = err.message ?? "Internal server error";
      if (status >= 500) {
        console.error("[api]", e);
      }
      return jsonError(msg, status);
    }
  }) as T;
}

/** Extracts ?page=&limit= with sane defaults. */
export function pagination(url: URL) {
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const limit = Math.min(
    100,
    Math.max(1, Number(url.searchParams.get("limit") ?? 20))
  );
  return { page, limit, skip: (page - 1) * limit };
}
