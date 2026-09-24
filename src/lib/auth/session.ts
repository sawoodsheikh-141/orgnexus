import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { AppUser } from "@/lib/types/entities";

const SESSION_COOKIE = "__session";
const SESSION_MAX_AGE_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

/**
 * Exchange a fresh Firebase ID token (from the client sign-in call)
 * for an HttpOnly session cookie. Call this from the login server
 * action immediately after the client SDK confirms sign-in.
 */
export async function createSessionCookie(idToken: string) {
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn: SESSION_MAX_AGE_MS,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionCookie, {
    maxAge: SESSION_MAX_AGE_MS / 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionCookie) {
    try {
      const decoded = await adminAuth.verifySessionCookie(sessionCookie);
      await adminAuth.revokeRefreshTokens(decoded.sub);
    } catch {
      // Cookie was already invalid/expired — nothing to revoke.
    }
  }

  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Verifies the session cookie and loads the corresponding AppUser doc.
 * Returns null if there is no session, it's invalid/expired, or the
 * user doc is missing/suspended. This is the single source of truth
 * for "who is making this request" in every server action / route
 * handler / layout.
 */
export async function getCurrentUser(): Promise<AppUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionCookie) return null;

  let uid: string;
  try {
    // checkRevoked: true so a revoked/logged-out session can't be replayed.
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    uid = decoded.sub;
  } catch {
    return null;
  }

  const snap = await adminDb.collection(COLLECTIONS.users).doc(uid).get();
  if (!snap.exists) return null;

  const user = snap.data() as Omit<AppUser, "id">;
  if (user.status !== "active") return null;

  return { id: snap.id, ...user };
}

/** Throws if there is no authenticated user. Use at the top of server actions. */
export async function requireUser(): Promise<AppUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return user;
}

/**
 * Page-level guard: redirects to /login instead of throwing. Use this
 * at the top of page.tsx server components (not server actions, which
 * should use requireUser/requirePermission and let the error surface).
 */
export async function requireUserOrRedirect(): Promise<AppUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
