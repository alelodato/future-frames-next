"use client";

import Link from "next/link";
import { useCookieConsent } from "@/components/CookieConsentProvider";

export default function CookieBanner() {
    const { consent, accept, reject, loaded } = useCookieConsent();

    // Non mostrare niente finché non abbiamo letto localStorage
    if (!loaded) return null;
    // Non mostrare se l'utente ha già scelto
    if (consent !== null) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[99998] p-4 sm:p-6">
            <div className="mx-auto max-w-3xl rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#0d0b2a] via-[#0a0820] to-black shadow-[0_0_60px_rgba(124,58,237,0.25)] px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                        <p className="font-antonio text-base text-white mb-1">Utilizziamo i cookie 🍪</p>
                        <p className="font-montserrat text-[0.65rem] text-zinc-400 leading-relaxed">
                            Questo sito utilizza cookie tecnici e di terze parti (Google Maps) per migliorare l'esperienza di navigazione.{" "}
                            <Link href="/cookie" className="text-violet-400 hover:text-violet-300 underline transition">
                                Cookie Policy
                            </Link>
                            {" "}·{" "}
                            <Link href="/privacy" className="text-violet-400 hover:text-violet-300 underline transition">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={reject}
                            className="rounded-full border border-zinc-600 px-4 py-2 font-montserrat text-[0.65rem] uppercase tracking-[0.15em] text-zinc-400 transition hover:border-zinc-400 hover:text-zinc-200">
                            Rifiuta
                        </button>
                        <button onClick={accept}
                            className="rounded-full bg-violet-400 px-4 py-2 font-montserrat text-[0.65rem] uppercase tracking-[0.15em] font-semibold text-[#050211] shadow-[0_0_20px_rgba(167,139,250,0.5)] transition hover:bg-violet-300">
                            Accetta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}