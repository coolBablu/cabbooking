import { getSession } from "@/lib/auth";
import { handle, jsonOk } from "@/lib/api-utils";
import { findUserById, publicUser } from "@/lib/user-store";

export const GET = handle(async () => {
  const session = await getSession();
  if (!session) return jsonOk({ user: null });

  const user = await findUserById(session.sub);
  return jsonOk({ user: user ? publicUser(user) : null });
});
