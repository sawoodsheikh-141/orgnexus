"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { clientAuth } from "@/lib/firebase/client";
import { completeLoginAction } from "@/app/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(
        clientAuth,
        email,
        password,
      );
      const idToken = await credential.user.getIdToken();
      await completeLoginAction(idToken);
      router.push("/");
      router.refresh();
    } catch {
      setError("Invalid email or password.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-full items-center justify-center bg-[#090a0c] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/[0.07] bg-[#101113] p-7">
        <div className="mb-6 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35">
            OrgNexus
          </span>
        </div>

        <h1 className="text-[22px] font-semibold tracking-[-0.03em] text-white">
          Sign in
        </h1>
        <p className="mt-1.5 text-[12px] text-white/35">
          Access your organisation dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-white/45">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-[13px] text-white outline-none transition focus:border-white/20"
              placeholder="admin@company.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-white/45">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-[13px] text-white outline-none transition focus:border-white/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[11px] text-red-400/80">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-white px-3.5 py-2.5 text-[12px] font-semibold text-black transition hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
