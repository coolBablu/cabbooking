import { clearSessionCookie } from "@/lib/auth";
import { handle, jsonOk } from "@/lib/api-utils";

export const POST = handle(async () => {
  await clearSessionCookie();
  return jsonOk({ message: "Signed out" });
});
