import { auth } from "./auth";
import { cookies } from "next/headers";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!sessionToken) {
      return null;
    }

    // Verify the session using BetterAuth
    const session = await auth.api.getSession({
      headers: new Headers({
        cookie: `better-auth.session_token=${sessionToken}`,
      }),
    });

    return session;
  } catch (error) {
    console.error("Session verification error:", error);
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    throw new Error("Authentication required");
  }

  return session;
}
