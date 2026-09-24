"use server";

import { redirect } from "next/navigation";
import { createSessionCookie, destroySession } from "@/lib/auth/session";

/**
 * The client already authenticated with Firebase Auth (email/password)
 * and obtained a fresh ID token — this action's only job is to turn
 * that token into a server-verifiable HttpOnly session cookie.
 * Never trust the token's claims directly; createSessionCookie asks
 * the Admin SDK to mint a new cookie, which re-verifies it server-side.
 */
export async function completeLoginAction(idToken: string) {
  await createSessionCookie(idToken);
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
