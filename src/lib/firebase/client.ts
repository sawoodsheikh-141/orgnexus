/**
 * Firebase CLIENT SDK — browser only.
 *
 * Scope is intentionally narrow: this is used ONLY to sign users in/out
 * (email+password) and obtain an ID token to exchange for a session
 * cookie. It is NOT used to read/write Firestore data — all data access
 * goes through server actions / route handlers using the Admin SDK
 * (src/lib/firebase/admin.ts), so authorization is always enforced
 * server-side and never relies on Firestore Security Rules alone.
 */
import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseClientApp =
  getApps()[0] ?? initializeApp(firebaseConfig);

export const clientAuth = getAuth(firebaseClientApp);
