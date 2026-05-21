import { handle, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";

export const GET = handle(async () => {
  // Delegates to the shared helper, which falls back to JWT payload when the
  // user-store (demo mode on serverless) doesn't have the record locally.
  const user = await getCurrentUser();
  return jsonOk({ user });
});
