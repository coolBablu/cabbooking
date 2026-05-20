import { z } from "zod";
import {
  hashPassword,
  setSessionCookie,
  signSession,
} from "@/lib/auth";
import { handle, jsonOk, parseBody } from "@/lib/api-utils";
import { createUser, publicUser } from "@/lib/user-store";

const Body = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password is too long.")
    .regex(/[A-Z]/, "Password needs at least one uppercase letter.")
    .regex(/[0-9]/, "Password needs at least one number."),
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name is too long."),
  phone: z.string().trim().min(6).max(20).optional().or(z.literal("")),
  role: z.enum(["RIDER", "DRIVER"]).default("RIDER"),
  city: z.string().trim().optional().or(z.literal("")),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Terms and Privacy Policy." }),
  }),
});

export const POST = handle(async (req: Request) => {
  const { data, error } = await parseBody(req, Body);
  if (error) return error;

  const passwordHash = await hashPassword(data.password);

  const user = await createUser({
    email: data.email,
    passwordHash,
    name: data.name,
    phone: data.phone || undefined,
    role: data.role,
    city: data.city || undefined,
  });

  const token = await signSession({
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });
  await setSessionCookie(token);

  return jsonOk({ user: publicUser(user) }, { status: 201 });
});
