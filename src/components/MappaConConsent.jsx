"use client";

import { useCookieConsent } from "@/components/CookieConsentProvider";

export default function MappaConConsent() {
    const { consent, accept } = useCookieConsent();

    if (consent === "accepted") {
        return (
            <iframe
                title="Mappa Roma"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full min-h-[300px] border-0 lg:grayscale contrast-110 opacity-60 transition duration-500 hover:grayscale-0 hover:opacity-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190029.11509582706!2d12.371185631501675!3d41.90995326729454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6196f9928ebb%3A0xb90f770693656e38!2sRoma%20RM!5e0!3m2!1sit!2sit!4v1776155315270!5m2!1sit!2sit" width="600" height="450" allowFullScreen=""
            />
        );
    }

    return (
        <div className="h-full w-full min-h-[300px] flex flex-col items-center justify-center gap-3 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <i className="fa-solid fa-map-location-dot text-zinc-600 text-2xl" />
            <p className="font-montserrat text-xs text-zinc-500 text-center px-4">
                Accetta i cookie per visualizzare la mappa.
            </p>
            <button onClick={accept}
                className="rounded-full border border-violet-500/30 px-4 py-1.5 font-montserrat text-[0.65rem] uppercase tracking-[0.15em] text-violet-400 transition hover:bg-violet-900/20">
                Accetta cookie
            </button>
        </div>
    );
}