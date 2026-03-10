"use client";

import { useEffect } from "react";
import Link from "next/link";

// ─── Componenti riutilizzabili ────────────────────────────────────────────────

function Divider({ icon, label }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="flex items-center gap-2">
        <i className={`${icon} text-violet-400 text-xs`} />
        <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-400">
          {label}
        </span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
    </div>
  );
}

function ServiceCTA() {
  return (
    <Link
      href="/contact"
      className="inline-flex items-center gap-2 mt-6 rounded-full bg-violet-400 px-6 py-2.5 text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#050211] shadow-[0_0_26px_rgba(167,139,250,0.7)] transition hover:bg-violet-300 hover:shadow-[0_0_40px_rgba(167,139,250,0.9)]"
    >
      Richiedi un preventivo
      <i className="fa-solid fa-circle-arrow-right text-[0.7rem]" />
    </Link>
  );
}

function ServiceImage({ src, alt, glowColor = "from-violet-600/70 via-fuchsia-500/40 to-sky-500/40", glowPosition = "-top-4 -left-4", extra }) {
  return (
    <div className="relative">
      <div className={`absolute ${glowPosition} h-36 w-36 rounded-3xl bg-gradient-to-br ${glowColor} blur-[26px] pointer-events-none`} />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_26px_90px_rgba(0,0,0,0.85)]">
        <img src={src} alt={alt} className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>
      {extra}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Servizi() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        setTimeout(() => section.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, []);

  return (
    <section className="min-h-screen bg-[#02010b] text-white">

      {/* ── HERO ── */}
      <div className="relative min-h-[70vh] overflow-hidden">
        <img
          src="/images/Tunnel2.jpg"
          alt="Tunnel viola futuristico"
          className="absolute inset-0 h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
        {/* Glow centrale */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-40 text-center min-h-[70vh]">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-900/30 px-3 py-1 backdrop-blur-sm mb-5">
            <div className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            <p className="font-montserrat text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-violet-300">
              I nostri servizi
            </p>
          </div>

          <h1 className="font-antonio font-semibold text-4xl sm:text-5xl lg:text-[3rem] leading-tight">
            Creatività, Qualità Professionale
            <span className="block text-violet-300 mt-1">e massima Affidabilità.</span>
          </h1>

          <p className="mt-5 max-w-2xl font-montserrat text-sm sm:text-base leading-relaxed text-zinc-300">
            Accompagniamo ogni passaggio, dalla prima ripresa al risultato finale,
            con uno sguardo cinematografico e cura per ogni dettaglio.
          </p>

          {/* Nav ancore */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["eventi", "aziende", "cerimonie", "food", "montaggio"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="rounded-full border border-violet-500/30 bg-violet-900/20 px-4 py-1.5 font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-300 backdrop-blur-sm transition hover:bg-violet-900/50 hover:border-violet-400/50"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVIZI ── */}
      <div className="px-4 py-14 sm:py-20 space-y-24 sm:space-y-32 bg-gradient-to-b from-black via-[#0a0b338d] to-[#45115d5c]">

        {/* ── EVENTI ── */}
        <section id="eventi" className="space-y-6" data-aos="fade-up">
          <Divider icon="fa-solid fa-calendar-star" label="Eventi" />

          <div className="grid gap-6 md:gap-12 md:grid-cols-2 items-center">
            {/* Testo + titolo */}
            <div className="space-y-4">
              <h2 className="font-antonio text-2xl md:text-3xl font-semibold leading-snug">
                Dal <span className="text-violet-300">backstage</span> al momento clou:
                <span className="block text-zinc-300 text-xl md:text-2xl mt-1 font-normal">
                  ogni istante catturato con precisione.
                </span>
              </h2>

              {/* Immagine mobile — tra titolo e card */}
              <div className="md:hidden">
                <ServiceImage
                  src="/images/eventi.webp"
                  alt="Fotografia eventi"
                  glowPosition="-top-3 -left-3"
                  extra={
                    <div className="absolute inset-0 rounded-3xl" style={{ height: "220px" }} />
                  }
                />
                <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_26px_90px_rgba(0,0,0,0.85)] h-52">
                  <img src="/images/eventi.webp" alt="Fotografia eventi" className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
              </div>

              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-6 md:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                <ul className="space-y-3 font-montserrat text-sm leading-relaxed text-zinc-300">
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-circle-check text-violet-400 text-xs mt-1 flex-shrink-0" />
                    <span><strong className="text-white">Fotografia e video</strong> per eventi privati e aziendali.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-circle-check text-violet-400 text-xs mt-1 flex-shrink-0" />
                    <span>Copertura completa con scatti spontanei e riprese dinamiche.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-circle-check text-violet-400 text-xs mt-1 flex-shrink-0" />
                    <span>Ideale per feste, lanci di prodotto, eventi culturali, convention.</span>
                  </li>
                </ul>
                <ServiceCTA />
              </div>
            </div>

            {/* Immagine desktop */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 h-44 w-44 rounded-3xl bg-gradient-to-br from-violet-600/70 via-fuchsia-500/40 to-sky-500/40 blur-[26px] pointer-events-none" />
                <div className="relative h-80 overflow-hidden rounded-3xl border border-white/10 shadow-[0_26px_90px_rgba(0,0,0,0.85)]">
                  <img src="/images/eventi.webp" alt="Fotografia eventi" className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AZIENDE ── */}
        <section id="aziende" className="space-y-6" data-aos="fade-up">
          <Divider icon="fa-solid fa-building" label="Aziende" />

          <div className="grid gap-6 md:gap-12 md:grid-cols-2 items-center">
            {/* Testo */}
            <div className="space-y-4 md:order-2">
              <h2 className="font-antonio text-2xl md:text-3xl font-semibold leading-snug">
                Contenuti visivi <span className="text-violet-300">su misura</span>
                <span className="block text-zinc-300 text-xl md:text-2xl mt-1 font-normal">
                  che rafforzano l&apos;identità del tuo brand.
                </span>
              </h2>

              {/* Video mobile */}
              <div className="md:hidden relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_26px_90px_rgba(0,0,0,0.85)] h-52">
                <div className="absolute -bottom-3 -right-3 h-32 w-32 rounded-3xl bg-gradient-to-tr from-violet-600/70 via-fuchsia-500/40 to-sky-500/40 blur-[22px] pointer-events-none" />
                <video className="h-full w-full object-cover" src="/videos/ToyotaXReply.mp4" autoPlay muted loop playsInline />
              </div>

              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-6 md:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                <p className="font-montserrat text-sm leading-relaxed text-zinc-300 mb-4">
                  Dai ritratti corporate ai video istituzionali, fino agli spot pubblicitari
                  e ai contenuti social, ogni progetto è studiato per valorizzare la tua
                  identità e distinguerti sul mercato.
                </p>
                <ul className="space-y-2 font-montserrat text-sm text-zinc-300">
                  {[
                    "Video istituzionali e corporate.",
                    "Spot pubblicitari e social video.",
                    "Ritratti e fotografia aziendale.",
                    "Contenuti per employer branding.",
                    "Shooting prodotto/servizio.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <i className="fa-solid fa-circle-check text-violet-400 text-xs mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ServiceCTA />
              </div>
            </div>

            {/* Video desktop */}
            <div className="hidden md:block md:order-1">
              <div className="relative">
                <div className="absolute -bottom-6 -right-6 h-44 w-44 rounded-3xl bg-gradient-to-tr from-violet-600/70 via-fuchsia-500/40 to-sky-500/40 blur-[26px] pointer-events-none" />
                <video className="relative w-full h-80 object-cover rounded-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)]"
                  src="/videos/ToyotaXReply.mp4" autoPlay muted loop playsInline />
              </div>
            </div>
          </div>
        </section>

        {/* ── CERIMONIE ── */}
        <section id="cerimonie" className="space-y-6" data-aos="fade-up">
          <Divider icon="fa-solid fa-heart" label="Cerimonie" />

          <div className="grid gap-6 md:gap-12 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="font-antonio text-2xl md:text-3xl font-semibold leading-snug">
                I momenti <span className="text-violet-300">più importanti</span>
                <span className="block text-zinc-300 text-xl md:text-2xl mt-1 font-normal">
                  meritano di essere ricordati per sempre.
                </span>
              </h2>

              {/* Immagine mobile */}
              <div className="md:hidden relative h-52 overflow-hidden rounded-3xl border border-white/10 shadow-[0_26px_90px_rgba(0,0,0,0.85)]">
                <img src="/images/sfondo.jpg" alt="Cerimonie" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>

              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-6 md:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                <p className="font-antonio text-base text-violet-200 mb-3">Servizi foto e video per:</p>
                <ul className="space-y-2 font-montserrat text-sm text-zinc-300 mb-4">
                  {["Matrimoni", "Anniversari di matrimonio", "Battesimi", "Diciottesimi"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <i className="fa-solid fa-circle-check text-violet-400 text-xs mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-montserrat text-sm leading-relaxed text-zinc-400">
                  Stile elegante, reportage naturale, attenzione ai dettagli e ai momenti autentici.
                </p>
                <ServiceCTA />
              </div>
            </div>

            {/* Immagine desktop con overlay */}
            <div className="hidden md:block">
              <div className="relative h-80">
                <div className="absolute -top-6 -right-6 h-44 w-44 rounded-3xl bg-gradient-to-br from-fuchsia-600/60 via-violet-500/40 to-sky-500/30 blur-[26px] pointer-events-none" />
                <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_26px_90px_rgba(0,0,0,0.85)]">
                  <img src="/images/sfondo.jpg" alt="Cerimonie" className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                {/* Mini immagine sovrapposta */}
                <div className="absolute -bottom-6 right-6 h-36 w-36 overflow-hidden rounded-2xl border border-white/10 shadow-[0_22px_70px_rgba(0,0,0,0.85)]">
                  <img src="/images/introimg5.webp" alt="Cerimonia dettaglio" className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOD ── */}
        <section id="food" className="space-y-6" data-aos="fade-up">
          <Divider icon="fa-solid fa-utensils" label="Food" />

          <div className="grid gap-6 md:gap-12 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="font-antonio text-2xl md:text-3xl font-semibold leading-snug">
                Ogni piatto diventa un&apos;immagine
                <span className="block text-violet-300">che conquista lo sguardo.</span>
              </h2>

              {/* Immagine mobile */}
              <div className="md:hidden relative h-52 overflow-hidden rounded-3xl border border-white/10 shadow-[0_26px_90px_rgba(0,0,0,0.85)]">
                <div className="absolute -top-3 -right-3 h-28 w-28 rounded-3xl bg-gradient-to-br from-amber-400/60 via-violet-500/40 to-emerald-400/40 blur-[20px] pointer-events-none" />
                <img src="/images/introimg6.webp" alt="Food photography" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>

              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-6 md:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                <ul className="space-y-3 font-montserrat text-sm leading-relaxed text-zinc-300">
                  {[
                    "Shooting fotografico e video per ristoranti, chef e aziende.",
                    "Immagini per menu, social, campagne pubblicitarie.",
                    "Riprese video con focus su estetica e storytelling del piatto.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <i className="fa-solid fa-circle-check text-violet-400 text-xs mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ServiceCTA />
              </div>
            </div>

            {/* Immagine desktop */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-6 -right-6 h-44 w-44 rounded-3xl bg-gradient-to-br from-amber-400/60 via-violet-500/40 to-emerald-400/40 blur-[26px] pointer-events-none" />
                <div className="relative h-80 overflow-hidden rounded-3xl border border-white/10 shadow-[0_26px_90px_rgba(0,0,0,0.85)]">
                  <img src="/images/introimg6.webp" alt="Food photography" className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MONTAGGIO ── */}
        <section id="montaggio" className="space-y-6 pb-20" data-aos="fade-up">
          <Divider icon="fa-solid fa-scissors" label="Montaggio" />

          <div className="grid gap-6 md:gap-12 md:grid-cols-[1.15fr_1fr] items-center">
            {/* Immagine */}
            <div className="space-y-4 md:space-y-0">
              <h2 className="font-antonio text-2xl md:text-3xl font-semibold leading-snug md:hidden">
                Dove le immagini trovano
                <span className="block text-violet-300">ritmo, senso e impatto.</span>
              </h2>

              {/* Immagine mobile */}
              <div className="md:hidden relative h-52 overflow-hidden rounded-3xl border border-white/10 shadow-[0_26px_90px_rgba(0,0,0,0.85)]">
                <img src="/images/montaggio.webp" alt="Editing professionale" className="h-full w-full object-cover object-center" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Immagine desktop */}
              <div className="hidden md:block relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_26px_90px_rgba(0,0,0,0.85)] h-80">
                <img src="/images/montaggio.webp" alt="Editing professionale" className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.03]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
            </div>

            {/* Testo */}
            <div className="space-y-4">
              <h2 className="font-antonio text-2xl md:text-3xl font-semibold leading-snug hidden md:block">
                Dove le immagini trovano
                <span className="block text-violet-300">ritmo, senso e impatto.</span>
              </h2>

              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-6 md:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                <p className="font-antonio text-base text-violet-200 mb-3">Post-produzione e editing per:</p>
                <ul className="space-y-2 font-montserrat text-sm text-zinc-300">
                  {[
                    "Spot pubblicitari",
                    "Videoclip musicali",
                    "Documentari cinematografici e televisivi",
                    "Progetti cinematografici",
                    "Social content e reel",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <i className="fa-solid fa-circle-check text-violet-400 text-xs mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ServiceCTA />
              </div>
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}