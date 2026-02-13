"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Servizi() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section className="min-h-screen bg-[#02010b] text-white">
      <div className="relative min-h-screen overflow-hidden">
        {/* Background tunnel */}
        <div className="absolute inset-0">
          <img
            src="/images/Tunnel2.jpg"
            alt="Tunnel viola futuristico"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        </div>

        {/* Contenuto centrato in basso */}
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-end px-4 pb-24 pt-60 text-center md:pb-32 md:pt-36 lg:pb-40 lg:pt-40">
          <p className="mb-3 font-montserrat text-[0.65rem] sm:text-xs uppercase tracking-[0.28em] text-violet-200">
            I NOSTRI SERVIZI
          </p>

          <h1
            className="hero-services-title font-antonio font-semibold text-3xl sm:text-4xl lg:text-[2.9rem] leading-snug md:leading-[1.15]"
          >
            Creatività, Qualità Professionale
            <br className="hidden sm:block" />
            <span className="block">
              e massima Affidabilità.
            </span>
          </h1>

          <p className="hero-services-subtitle mt-5 max-w-2xl font-montserrat text-sm sm:text-base leading-relaxed text-zinc-100/90">
            Accompagniamo ogni passaggio, dalla prima ripresa al risultato
            finale, con uno sguardo cinematografico e cura per ogni dettaglio.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16 space-y-16 sm:space-y-24 min-h-screen bg-gradient-to-b from-black via-[#0a0b338d] to-[#45115d5c]">

        {/* EVENTI */}
        <section
          id="eventi"
          className="grid gap-10 md:grid-cols-[1.1fr,1.1fr] items-center"
          data-aos="fade-up"
        >
          <div>
            <h2 className="font-antonio text-2xl md:text-3xl font-semibold mb-5 leading-snug">
              DAL <strong>BACKSTAGE</strong> AL <strong>MOMENTO</strong> CLOU:
            </h2>

            {/* IMG MOBILE */}
            <div className="relative mb-6 md:hidden">
              <div className="absolute -top-3 -left-3 h-32 w-32 rounded-3xl bg-gradient-to-br from-violet-600/70 via-fuchsia-500/40 to-sky-500/40 blur-[22px]" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/12 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.95)]">
                <img
                  src="/images/eventi.webp"
                  alt="Eventi"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 md:p-7 shadow-[0_22px_60px_rgba(0,0,0,0.85)]">
              <ul className="space-y-3 font-montserrat text-sm md:text-base leading-relaxed text-zinc-200">
                <li>
                  <strong>Fotografia e video</strong> per eventi privati e aziendali.
                </li>
                <li>Copertura completa con scatti spontanei e riprese dinamiche.</li>
                <li>
                  Ideale per feste, lanci di prodotto, eventi culturali, convention.
                </li>
              </ul>

              <Link
                href="/contact"
                className="inline-block mt-6 rounded-full bg-violet-500 px-6 py-2 text-xs font-montserrat uppercase tracking-[0.2em] text-black hover:bg-violet-400 transition shadow-[0_0_30px_rgba(167,139,250,0.7)]"
              >
                Richiedi un preventivo
              </Link>
            </div>
          </div>

          {/* IMG DESKTOP */}
          <div className="relative hidden md:block">
            <div className="absolute -top-4 -left-4 h-40 w-40 rounded-3xl bg-gradient-to-br from-violet-600/70 via-fuchsia-500/40 to-sky-500/40 blur-[26px]" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/12 bg-black/50 shadow-[0_26px_80px_rgba(0,0,0,0.95)]">
              <img
                src="/images/eventi.webp"
                alt="Eventi"
                className="h-full w-full object-cover scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            </div>
          </div>
        </section>

        {/* AZIENDE */}
        <section
          id="aziende"
          className="grid gap-10 md:grid-cols-[1.1fr,1.1fr] items-center"
          data-aos="fade-up"
        >
          <div className="order-1 md:order-2">
            <h2 className="font-antonio text-2xl md:text-3xl font-semibold leading-snug mb-3">
              CONTENUTI VISIVI <strong>SU MISURA</strong> CHE RAFFORZANO
              L&apos;<strong>IDENTITÀ</strong> DEL TUO BRAND
            </h2>
            <h3 className="font-antonio text-lg md:text-xl mb-5">
              E <strong>PARLANO</strong> DIRETTAMENTE AL TUO PUBBLICO.
            </h3>

            {/* VIDEO MOBILE */}
            <div className="relative mb-6 md:hidden">
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-3xl bg-gradient-to-tr from-violet-600/70 via-fuchsia-500/40 to-sky-500/40 blur-[22px]" />
              <video
                className="relative w-full h-56 object-cover rounded-3xl border border-violet-400/40 shadow-[0_24px_80px_rgba(0,0,0,0.95)]"
                src="/videos/ToyotaXReply.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 md:p-7 shadow-[0_22px_60px_rgba(0,0,0,0.85)]">
              <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-200 mb-5">
                Dai ritratti corporate ai video istituzionali, fino agli spot pubblicitari
                e ai contenuti social, ogni progetto è studiato per valorizzare la tua
                identità e distinguerti sul mercato.
              </p>

              <ul className="space-y-3 font-montserrat text-sm md:text-base leading-relaxed text-zinc-200">
                <li>Video istituzionali e corporate.</li>
                <li>Spot pubblicitari e social video.</li>
                <li>Ritratti e fotografia aziendale.</li>
                <li>Contenuti per employer branding.</li>
                <li>Shooting prodotto/servizio.</li>
              </ul>

              <Link
                href="/contact"
                className="inline-block mt-6 rounded-full bg-violet-500 px-6 py-2 text-xs font-montserrat uppercase tracking-[0.2em] text-black hover:bg-violet-400 transition"
              >
                Richiedi un preventivo
              </Link>
            </div>
          </div>

          {/* VIDEO DESKTOP */}
          <div className="order-2 md:order-1 hidden md:block">
            <div className="relative">
              <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-3xl bg-gradient-to-tr from-violet-600/70 via-fuchsia-500/40 to-sky-500/40 blur-[26px]" />
              <video
                className="relative w-full h-64 md:h-80 object-cover rounded-3xl border border-violet-400/40 shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
                src="/videos/ToyotaXReply.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </section>

        {/* CERIMONIE */}
        <section id="cerimonie" className="space-y-6" data-aos="fade-up">
          <h2 className="font-antonio text-2xl md:text-3xl font-semibold leading-snug">
            I momenti <strong>PIÙ IMPORTANTI</strong> meritano di essere ricordati{" "}
            <strong>PER SEMPRE</strong>, con <strong>EMOZIONI</strong> vere e spontanee.
          </h2>

          <div className="grid gap-6 md:grid-cols-[1.1fr,1.1fr] items-start">
            <div className="relative">
              <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-3xl border border-white/12 bg-black/60 shadow-[0_26px_80px_rgba(0,0,0,0.95)]">
                <img
                  src="/images/sfondo.jpg"
                  alt="cerimonie"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="absolute -bottom-8 right-4 h-36 sm:h-44 w-40 sm:w-48 overflow-hidden rounded-3xl border border-violet-300/40 bg-black/70 shadow-[0_22px_60px_rgba(0,0,0,0.95)]">
                <img
                  src="/images/introimg5.webp"
                  alt="cerimonie2"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 md:p-8 shadow-[0_22px_60px_rgba(0,0,0,0.85)]">
              <h4 className="font-antonio text-lg mb-4">Servizi foto e video per:</h4>

              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 font-montserrat text-sm md:text-base text-zinc-200">
                  <li>Matrimoni</li>
                  <li>Anniversari di matrimonio</li>
                  <li>Battesimi</li>
                  <li>Diciottesimi</li>
                </ul>

                <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-300">
                  Seguendo uno stile elegante, reportage naturale, attenzione ai dettagli
                  e ai momenti autentici.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-block mt-6 rounded-full bg-violet-500 px-6 py-2 text-xs font-montserrat uppercase tracking-[0.2em] text-black hover:bg-violet-400 transition"
              >
                Richiedi un preventivo
              </Link>
            </div>
          </div>
        </section>

        {/* FOOD */}
        <section
          id="food"
          className="grid gap-10 md:grid-cols-[1.1fr,1.1fr] items-center"
          data-aos="fade-up"
        >
          <div>
            <h2 className="font-antonio text-2xl md:text-3xl font-semibold mb-6 leading-snug">
              Ogni piatto diventa un&apos;immagine che <strong>CONQUISTA</strong> lo
              sguardo e <strong>RACCONTA</strong> la tua cucina.
            </h2>

            {/* IMG MOBILE */}
            <div className="relative mb-6 md:hidden">
              <div className="absolute -top-4 -right-4 h-32 w-32 rounded-3xl bg-gradient-to-br from-amber-400/60 via-violet-500/40 to-emerald-400/40 blur-[22px]" />
              <div className="relative h-56 w-full overflow-hidden rounded-3xl border border-white/12 bg-black/60 shadow-[0_26px_80px_rgba(0,0,0,0.95)]">
                <img
                  src="/images/introimg6.webp"
                  alt="food"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 md:p-8 shadow-[0_22px_60px_rgba(0,0,0,0.85)]">
              <ul className="space-y-3 font-montserrat text-sm md:text-base leading-relaxed text-zinc-200">
                <li>Shooting fotografico e video per ristoranti, chef e aziende.</li>
                <li>Immagini per menu, social, campagne pubblicitarie.</li>
                <li>Riprese video con focus su estetica e storytelling del piatto.</li>
              </ul>

              <Link
                href="/contact"
                className="inline-block mt-6 rounded-full bg-violet-500 px-6 py-2 text-xs font-montserrat uppercase tracking-[0.2em] text-black hover:bg-violet-400 transition"
              >
                Richiedi un preventivo
              </Link>
            </div>
          </div>

          {/* IMG DESKTOP */}
          <div className="relative hidden md:block">
            <div className="absolute -top-4 -right-4 h-40 w-40 rounded-3xl bg-gradient-to-br from-amber-400/60 via-violet-500/40 to-emerald-400/40 blur-[26px]" />
            <div className="relative h-56 md:h-72 w-full overflow-hidden rounded-3xl border border-white/12 bg-black/60 shadow-[0_26px_80px_rgba(0,0,0,0.95)]">
              <img
                src="/images/introimg6.webp"
                alt="food"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* MONTAGGIO */}
        <div id="montaggio" className="space-y-6">
          <h3 className="font-antonio text-2xl md:text-3xl leading-tight text-white">
            Dove le immagini trovano <strong>RITMO</strong>, <strong>SENSO</strong>{" "}
            e <strong>IMPATTO</strong>.
          </h3>

          <div className="grid gap-6 md:grid-cols-[1fr,1.1fr] items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-violet-400/40 bg-black/40 shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
              <img
                src="/images/montaggio.webp"
                alt="Editing professionale"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 md:p-8 shadow-[0_22px_60px_rgba(0,0,0,0.85)]">
              <ul className="space-y-3 font-montserrat text-sm text-zinc-200">
                <h4 className="font-antonio text-lg text-white mb-3">
                  Post-produzione e editing professionale per:
                </h4>
                <li><h5 className="text-zinc-100">Spot pubblicitari</h5></li>
                <li><h5 className="text-zinc-100">Videoclip musicali</h5></li>
                <li>
                  <h5 className="text-zinc-100">
                    Documentari cinematografici, televisivi e progetti cinematografici
                  </h5>
                </li>
              </ul>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-2 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-violet-400"
              >
                Richiedi un preventivo
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
