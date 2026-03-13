"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Credenziali non valide. Riprova.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#02010b] flex items-center justify-center px-4">
      {/* Glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-72 w-96 rounded-full bg-violet-600/15 blur-3xl" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-400 mb-2">
            Future Frames
          </p>
          <h1 className="font-antonio text-3xl text-white">Pannello Admin</h1>
          <p className="font-montserrat text-xs text-zinc-500 mt-1">
            Accedi per gestire i contenuti del sito
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60 focus:bg-violet-900/20"
                placeholder="futureframes.info@gmail.it"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60 focus:bg-violet-900/20"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-900/20 px-4 py-2.5">
                <p className="font-montserrat text-xs text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-violet-400 py-2.5 font-montserrat text-xs font-semibold uppercase tracking-wide text-[#050211] shadow-[0_0_26px_rgba(167,139,250,0.6)] transition hover:bg-violet-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-spinner animate-spin text-xs" />
                  Accesso in corso...
                </span>
              ) : "Accedi"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}