"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ─────────────────────────────────────────────────────
const services = [
  {
    id: "eventi",
    index: "01",
    icon: "fa-solid fa-calendar-star",
    label: "Eventi",
    title: "Dal backstage al momento clou:",
    subtitle: "ogni istante catturato con precisione.",
    titleAccent: false,
    body: null,
    list: [
      "Fotografia e video per eventi privati e aziendali.",
      "Copertura completa con scatti spontanei e riprese dinamiche.",
      "Ideale per feste, lanci di prodotto, eventi culturali, convention.",
    ],
    media: { type: "image", src: "/images/eventi.webp", alt: "Fotografia eventi" },
  },
  {
    id: "aziende",
    index: "02",
    icon: "fa-solid fa-building",
    label: "Aziende",
    title: "Contenuti visivi su misura",
    subtitle: "che rafforzano l'identità del tuo brand.",
    body: "Dai ritratti corporate ai video istituzionali, fino agli spot pubblicitari e ai contenuti social, ogni progetto è studiato per valorizzare la tua identità e distinguerti sul mercato.",
    list: [
      "Video istituzionali e corporate.",
      "Spot pubblicitari e social video.",
      "Ritratti e fotografia aziendale.",
      "Contenuti per employer branding.",
      "Shooting prodotto/servizio.",
    ],
    media: { type: "video", src: "/videos/ToyotaXReply.mp4", alt: "Video aziendale" },
  },
  {
    id: "podcast",
    index: "03",
    icon: "fa-solid fa-microphone",
    label: "Podcast",
    title: "Il tuo podcast, professionale",
    subtitle: "fin dal primo episodio.",
    body: "Trasformiamo le tue conversazioni in contenuti video di alta qualità. Dalla regia alla distribuzione, ti seguiamo in ogni fase.",
    listLabel: "Cosa includiamo:",
    list: [
      "Riprese video multi-camera",
      "Registrazione audio professionale",
      "Montaggio video e audio",
      "Grafiche e intro animate",
      "Clip social per Instagram e YouTube",
    ],
    media: { type: "image", src: "/images/sfondo.jpg", alt: "Podcast" },
  },
  {
    id: "food",
    index: "04",
    icon: "fa-solid fa-utensils",
    label: "Food",
    title: "Ogni piatto diventa un'immagine",
    subtitle: "che conquista lo sguardo.",
    body: null,
    list: [
      "Shooting fotografico e video per ristoranti, chef e aziende.",
      "Immagini per menu, social, campagne pubblicitarie.",
      "Riprese video con focus su estetica e storytelling del piatto.",
    ],
    media: { type: "image", src: "/images/introimg6.webp", alt: "Food photography" },
  },
  {
    id: "montaggio",
    index: "05",
    icon: "fa-solid fa-scissors",
    label: "Montaggio",
    title: "Dove le immagini trovano",
    subtitle: "ritmo, senso e impatto.",
    listLabel: "Post-produzione e editing per:",
    list: [
      "Spot pubblicitari",
      "Videoclip musicali",
      "Documentari cinematografici e televisivi",
      "Progetti cinematografici",
      "Social content e reel",
    ],
    media: { type: "image", src: "/images/montaggio.webp", alt: "Editing professionale" },
  },
];

// ─── STICKY SERVICES (desktop) ────────────────────────────────
function StickyServices() {
  const containerRef = useRef(null);
  const mediaRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      mediaRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === 0) {
          gsap.set(el, { opacity: 1, scale: 1 });
          return;
        }
        gsap.set(el, { opacity: 0, scale: 1.04 });
      });

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === 0) {
          gsap.set(el, { opacity: 1, y: 0 });
          return;
        }
        gsap.set(el, { opacity: 0, y: 32 });
      });

      services.forEach((_, i) => {
        const textEl = textRefs.current[i];
        const mediaEl = mediaRefs.current[i];
        const prevTextEl = textRefs.current[i - 1];
        const prevMediaEl = mediaRefs.current[i - 1];
        if (!textEl || i === 0) return;

        // Trigger su ogni text block
        ScrollTrigger.create({
          trigger: textEl,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => {
            // Fade out previous
            if (prevMediaEl) gsap.to(prevMediaEl, { opacity: 0, scale: 0.97, duration: 0.7, ease: "expo.out" });
            if (prevTextEl) gsap.to(prevTextEl, { opacity: 0, y: -24, duration: 0.5, ease: "expo.out" });
            // Fade in current
            gsap.to(mediaEl, { opacity: 1, scale: 1, duration: 0.9, ease: "expo.out" });
            gsap.to(textEl, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" });
          },
          onLeaveBack: () => {
            // Restore previous
            if (prevMediaEl) gsap.to(prevMediaEl, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" });
            if (prevTextEl) gsap.to(prevTextEl, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" });
            // Hide current
            gsap.to(mediaEl, { opacity: 0, scale: 1.04, duration: 0.6, ease: "expo.out" });
            gsap.to(textEl, { opacity: 0, y: 32, duration: 0.5, ease: "expo.out" });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="hidden md:grid grid-cols-2 relative">

      {/* ── SINISTRA: testi che scorrono ── */}
      <div className="py-24 px-12 lg:px-16 space-y-0">
        {services.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            ref={el => textRefs.current[i] = el}
            className="min-h-screen flex flex-col justify-center py-16 space-y-8"
          >
            {/* Label */}
            <div className="flex items-center gap-3">
              <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-zinc-600">{s.index}</span>
              <div className="h-px w-8 bg-zinc-800" />
              <i className={`${s.icon} text-violet-400/60 text-xs`} />
              <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-violet-500/60">{s.label}</span>
            </div>

            {/* Titolo */}
            <div>
              <h2 className="font-antonio text-4xl lg:text-5xl text-white leading-tight">
                {s.title}
              </h2>
              <h2 className="font-antonio text-4xl lg:text-5xl text-violet-300 leading-tight">
                {s.subtitle}
              </h2>
            </div>

            <div className="h-px w-16 bg-zinc-800" />

            {/* Body */}
            {s.listLabel && (
              <p className="font-antonio text-sm text-violet-200/80 uppercase tracking-[0.15em]">{s.listLabel}</p>
            )}
            {s.body && (
              <p className="font-montserrat text-sm leading-relaxed text-zinc-400 max-w-sm">{s.body}</p>
            )}

            {/* Lista */}
            <ul className="space-y-3">
              {s.list.map((item) => (
                <li key={item} className="flex items-start gap-3 font-montserrat text-sm text-zinc-300">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-violet-400" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/contact"
              className="inline-flex self-start items-center gap-2 rounded-full border border-violet-400/40 px-6 py-2.5 font-montserrat text-xs uppercase tracking-[0.25em] text-violet-300 transition hover:bg-violet-900/30 hover:border-violet-400/70">
              Richiedi un preventivo
              <i className="fa-solid fa-arrow-right text-[0.6rem] transition group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>

      {/* ── DESTRA: media sticky ── */}
      <div className="relative">
        <div className="sticky top-0 h-screen flex items-center justify-center px-8 lg:px-12">
          <div className="relative w-full" style={{ height: "70vh", maxHeight: "680px" }}>

            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(139,92,246,0.18) 0%, transparent 70%)" }} />

            {/* Media layers */}
            {services.map((s, i) => (
              <div key={s.id} ref={el => mediaRefs.current[i] = el}
                className="absolute inset-0 overflow-hidden rounded-3xl border border-white/8 shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
                {s.media.type === "video" ? (
                  <video src={s.media.src} autoPlay muted loop playsInline
                    className="h-full w-full object-cover" />
                ) : (
                  <img src={s.media.src} alt={s.media.alt}
                    className="h-full w-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Service label overlay */}
                <div className="absolute top-6 left-6">
                  <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.4em] text-zinc-400 border border-zinc-700/60 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {s.label}
                  </span>
                </div>

                {/* Index bottom right */}
                <div className="absolute bottom-6 right-6">
                  <span className="font-antonio text-6xl text-white/8 select-none">{s.index}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MOBILE: verticale semplice ───────────────────────────────
function MobileServices() {
  return (
    <div className="md:hidden px-5 py-8 space-y-20">
      {services.map((s) => (
        <section key={s.id} id={`${s.id}-mobile`} className="space-y-6">
          {/* Label */}
          <div className="flex items-center gap-3">
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-zinc-600">{s.index}</span>
            <div className="h-px w-6 bg-zinc-800" />
            <i className={`${s.icon} text-violet-400/60 text-xs`} />
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-violet-500/60">{s.label}</span>
          </div>

          {/* Titolo */}
          <div>
            <h2 className="font-antonio text-3xl text-white leading-tight">{s.title}</h2>
            <h2 className="font-antonio text-3xl text-violet-300 leading-tight">{s.subtitle}</h2>
          </div>

          {/* Media */}
          <div className="overflow-hidden rounded-2xl border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            style={{ height: "240px" }}>
            {s.media.type === "video" ? (
              <video src={s.media.src} autoPlay muted loop playsInline className="h-full w-full object-cover" />
            ) : (
              <img src={s.media.src} alt={s.media.alt} className="h-full w-full object-cover" loading="lazy" />
            )}
          </div>

          {/* Contenuto */}
          <div className="space-y-4 border-l border-zinc-800 pl-5">
            {s.listLabel && <p className="font-antonio text-sm text-violet-200/80 uppercase tracking-[0.1em]">{s.listLabel}</p>}
            {s.body && <p className="font-montserrat text-sm leading-relaxed text-zinc-400">{s.body}</p>}
            <ul className="space-y-2">
              {s.list.map((item) => (
                <li key={item} className="flex items-start gap-3 font-montserrat text-xs text-zinc-300">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-violet-400" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 px-5 py-2 font-montserrat text-xs uppercase tracking-[0.2em] text-violet-300 transition hover:bg-violet-900/30">
              Richiedi un preventivo
              <i className="fa-solid fa-arrow-right text-[0.6rem]" />
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
}

// ─── VIDEO RECENSIONE CINEMATOGRAFICA ─────────────────────────
function VideoReview() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video di sfondo */}
      <video
        src="/videos/ToyotaXReply.mp4"
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay a strati */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#02010b] via-transparent to-[#02010b]" />

      {/* Contenuto */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-10">

        {/* Stelle */}
        <div className="flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="fa-solid fa-star text-amber-400 text-sm" />
          ))}
        </div>

        {/* Virgolette decorative */}
        <div className="relative">
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 font-antonio text-[8rem] leading-none text-violet-400/10 select-none">"</span>
          <blockquote className="font-antonio text-2xl md:text-4xl lg:text-5xl text-white leading-snug">
            Che sia per un evento aziendale, per lanciare un nuovo videocorso o per lavorare sul Brand della propria azienda attraverso il video marketing, Future Frames è sicuramente la scelta migliore.
          </blockquote>
        </div>

        {/* Autore */}
        <div className="space-y-1">
          <p className="font-antonio text-lg text-violet-300">Shady I.</p>
          <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.4em] text-zinc-500">Servizio video aziendale · Roma</p>
        </div>

        {/* Pulsante play */}
        <div className="flex flex-col items-center gap-3 pt-2 group cursor-pointer">
          {/*
            Quando hai il video reale sostituisci questo div con:
            <button onClick={() => setModalOpen(true)} ...>
            oppure un <iframe Vimeo/YouTube> in un modal
          */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-violet-400/60 group-hover:bg-violet-600/30 group-hover:shadow-[0_0_60px_rgba(139,92,246,0.5)]">
            {/* Ring animato */}
            <div className="absolute inset-0 rounded-full border border-violet-400/20 scale-100 group-hover:scale-125 opacity-100 group-hover:opacity-0 transition-all duration-700" />
            <i className="fa-solid fa-play ml-1.5 text-xl text-white" />
          </div>
          <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.4em] text-zinc-400 group-hover:text-zinc-300 transition">
            Guarda la video recensione
          </span>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-32 px-6 text-center space-y-8 bg-[#02010b]">
      <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.5em] text-zinc-600">Impara con noi</p>
      <h2 className="font-antonio text-4xl md:text-6xl text-white leading-tight mx-auto max-w-2xl">
        Vuoi imparare<br />
        <span className="text-violet-300">il nostro mestiere?</span>
      </h2>
      <p className="font-montserrat text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
        Segui le nostre videolezioni su Vimeo: tecniche di ripresa, montaggio e post-produzione per chi vuole fare sul serio.
      </p>
      <a
        href="https://vimeo.com/futureframes"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-400 px-8 py-3.5 font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-[#050211] shadow-[0_0_30px_rgba(167,139,250,0.5)] transition hover:bg-violet-300 hover:shadow-[0_0_50px_rgba(167,139,250,0.8)]">
        <i className="fa-brands fa-vimeo text-sm" />
        Guarda le videolezioni
      </a>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────
export default function Servizi() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const section = document.querySelector(hash);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#02010b] text-white" style={{ background: "radial-gradient(ellipse at center, #000000 0%, #000000 8%, #1a0533 30%, #3d0b2d 50%, #1a0533 70%, #000000 88%, #000000 100%)" }}>

      {/* ── HERO ── */}
      <div className="relative h-[100svh] min-h-[600px] overflow-hidden md:mb-24">

        {/* Sfondi glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-violet-700/35 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 right-0 h-48 w-48 rounded-full bg-fuchsia-600/15 blur-3xl" />

        {/* Griglia decorativa */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* ── MOBILE ── */}
        <div className="md:hidden relative z-10 flex flex-col px-5 pt-28 pb-10 gap-10">

          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-violet-500 flex-shrink-0" />
              <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.4em] text-violet-400">
                Fotografia & Videomaking
              </p>
            </div>

            <h1 className="leading-[1.1] mb-6">
              <span className="block font-antonio text-[3rem] text-white">
                Creatività,
              </span>
              <span className="block font-antonio text-[2.3rem] text-zinc-400 italic ml-3">
                Qualità Professionale
              </span>
              <span className="block font-antonio text-[3rem] text-violet-300">
                e Affidabilità.
              </span>
            </h1>

            <p className="font-montserrat text-[0.8rem] leading-relaxed text-zinc-400 max-w-[90%]">
              Accompagniamo ogni passaggio, dalla prima ripresa al risultato finale,
              con uno sguardo cinematografico e cura per ogni dettaglio.
            </p>
          </div>

          <div className="flex flex-col gap-5">

            <div className="flex items-center gap-5">
              <a href="#servizi"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-6 py-3 font-montserrat text-[0.65rem] uppercase tracking-[0.15em] text-white transition">
                Scopri i servizi
                <i className="fa-solid fa-arrow-right text-[0.6rem]" />
              </a>
              <a href="#portfolio"
                className="font-montserrat text-[0.65rem] uppercase tracking-[0.15em] text-zinc-500 hover:text-white transition">
                Portfolio →
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <a key={s.id} href={`#${s.id}`}
                  className="rounded-full border border-zinc-800 px-4 py-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.1em] text-zinc-600 hover:border-violet-500/50 hover:text-violet-300 transition">
                  {s.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                const next = document.getElementById("servizi");
                if (next) next.scrollIntoView({ behavior: "smooth" });
                else window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
              }}
              className="flex items-center gap-3 bg-transparent border-none p-0 opacity-40 hover:opacity-70 transition-opacity w-fit">
              <div className="relative h-8 w-px overflow-hidden">
                <div className="absolute inset-0 bg-zinc-700" />
                <div className="absolute w-full"
                  style={{
                    height: "50%",
                    background: "linear-gradient(to bottom, transparent, #a78bfa, transparent)",
                    animation: "scrollLight 1.5s ease-in-out infinite",
                  }} />
              </div>
              <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
            </button>
          </div>
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden md:flex relative z-10 h-full items-center px-8 md:px-16 max-w-7xl mx-auto gap-8">

          <div className="flex-1 flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-violet-500 flex-shrink-0" />
              <p className="font-montserrat text-[0.55rem] uppercase tracking-[0.45em] text-violet-400">
                Fotografia & Videomaking
              </p>
            </div>

            <h1 className="leading-none mb-6">
              <span className="block font-antonio text-6xl lg:text-7xl xl:text-8xl text-white">
                Creatività,
              </span>
              <span className="block font-antonio text-5xl lg:text-6xl xl:text-7xl text-zinc-400 font-light italic ml-8">
                Qualità Professionale
              </span>
              <span className="block font-antonio text-6xl lg:text-7xl xl:text-8xl text-violet-300">
                e Affidabilità.
              </span>
            </h1>

            <div className="flex items-start gap-3 mb-8 max-w-sm">
              <span className="font-montserrat text-[0.5rem] text-zinc-600 pt-1 flex-shrink-0">01</span>
              <p className="font-montserrat text-sm leading-relaxed text-zinc-400">
                Accompagniamo ogni passaggio, dalla prima ripresa al risultato finale,
                con uno sguardo cinematografico e cura per ogni dettaglio.
              </p>
            </div>

            <div className="flex items-center gap-5 mb-8">
              <a href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-6 py-2.5 font-montserrat text-xs uppercase tracking-[0.2em] text-white transition">
                Scopri il portfolio
                <i className="fa-solid fa-arrow-right text-[0.6rem]" />
              </a>
              <a href="#contact"
                className="font-montserrat text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition">
                Contattaci →
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <a key={s.id} href={`#${s.id}`}
                  className="rounded-full border border-zinc-800 px-3 py-1 font-montserrat text-[0.58rem] uppercase tracking-[0.15em] text-zinc-600 hover:border-violet-500/50 hover:text-violet-300 transition">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Colonna destra immagini */}
          <div className="hidden md:flex flex-1 items-center justify-center relative h-full max-w-sm lg:max-w-none">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-[320px] w-[320px] lg:h-[420px] lg:w-[420px] rounded-full border border-violet-500/10 animate-spin"
                style={{ animationDuration: "20s" }} />
              <div className="absolute h-[260px] w-[260px] lg:h-[340px] lg:w-[340px] rounded-full border border-violet-500/8 animate-spin"
                style={{ animationDuration: "15s", animationDirection: "reverse" }} />
            </div>

            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-44 h-64 lg:w-56 lg:h-80 rounded-2xl overflow-hidden border border-zinc-800/60 shadow-2xl rotate-[-3deg]"
              style={{ boxShadow: "0 0 40px rgba(139,92,246,0.15)" }}>
              <img src="/images/servizi2.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="absolute right-4 top-[18%] w-36 h-48 lg:w-44 lg:h-56 rounded-2xl overflow-hidden border border-zinc-800/60 shadow-2xl rotate-[4deg]"
              style={{ boxShadow: "0 0 30px rgba(139,92,246,0.1)" }}>
              <img src="/images/azienda.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="absolute right-16 bottom-[15%] w-44 h-36 lg:w-52 lg:h-44 rounded-2xl overflow-hidden border border-zinc-800/60 shadow-2xl rotate-[-1deg]"
              style={{ boxShadow: "0 0 30px rgba(139,92,246,0.1)" }}>
              <img src="/images/servizi1.webp" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Linea verticale sinistra — desktop */}
        <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 h-28 w-px bg-gradient-to-b from-transparent via-violet-500/40 to-transparent" />

        {/* Scroll indicator desktop */}
        <button
          type="button"
          onClick={() => {
            const next = document.getElementById("servizi");
            if (next) next.scrollIntoView({ behavior: "smooth" });
            else window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none p-0">
          <div className="relative h-10 w-px overflow-hidden">
            <div className="absolute inset-0 bg-zinc-700" />
            <div className="absolute w-full"
              style={{
                height: "50%",
                background: "linear-gradient(to bottom, transparent, #a78bfa, transparent)",
                animation: "scrollLight 1.5s ease-in-out infinite",
              }} />
          </div>
          <span className="font-montserrat text-[0.5rem] uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
        </button>

      </div>

      {/* Keyframe per la luce scorrevole */}
      <style jsx>{`
  @keyframes scrollLight {
    0%   { top: -50%; }
    100% { top: 150%; }
  }
`}</style>

      {/* ── SERVIZI ── */}
      <StickyServices />
      <MobileServices />

      {/* ── VIDEO RECENSIONE ── */}
      <VideoReview />

      {/* ── CTA ── */}
      <FinalCTA />
    </div>
  );
}