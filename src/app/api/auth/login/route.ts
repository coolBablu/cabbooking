import { z } from "zod";
import {
  setSessionCookie,
  signSession,
  verifyPassword,
} from "@/lib/auth";
import { handle, jsonOk, jsonError, parseBody } from "@/lib/api-utils";
import { findUserByEmail, publicUser } from "@/lib/user-store";

const Body = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export const POST = handle(async (req: Request) => {
  const { data, error } = await parseBody(req, Body);
  if (error) return error;

  const user = await findUserByEmail(data.email);
  if (!user || !(await verifyPassword(data.password, user.passwordHash))) {
    return jsonError("Incorrect email or password.", 401);
  }
  if (user.status === "SUSPENDED") {
    return jsonError("This account has been suspended.", 403);
  }

  const token = await signSession({
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });
  await setSessionCookie(token);

  return jsonOk({ user: publicUser(user) });
});
