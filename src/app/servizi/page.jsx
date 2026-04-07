"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "videolezioni",
    index: "01",
    icon: "fa-solid fa-video",
    label: "Videolezioni",
    title: "Formazione chiara,",
    subtitle: "organizzata e riutilizzabile.",
    body: "Progettiamo video lezioni per aziende che hanno necessità di formare team e dipendenti. Strutturiamo contenuti semplici da seguire e pronti per essere utilizzati nel tempo.",
    list: [],
    media: { type: "image", src: "/images/sfondo.jpg", alt: "Videolezioni aziendali" },
  },
  {
    id: "eventi",
    index: "02",
    icon: "fa-solid fa-calendar-star",
    label: "Eventi",
    title: "Contenuti visivi su misura",
    subtitle: "che restano anche dopo l'evento.",
    body: "Realizziamo foto e video per eventi aziendali e privati, creando materiali utili per comunicazione e marketing.",
    list: [],
    media: { type: "image", src: "/images/eventi.webp", alt: "Fotografia eventi" },
  },
  {
    id: "podcast",
    index: "03",
    icon: "fa-solid fa-microphone",
    label: "Podcast",
    title: "Un podcast completo,",
    subtitle: "pronto per essere pubblicato.",
    body: "Dall'idea al set, fino al montaggio: gestiamo ogni fase per creare contenuti coerenti e distribuiti su più piattaforme.",
    list: [],
    media: { type: "image", src: "/images/sfondo.jpg", alt: "Podcast" },
  },
  {
    id: "moda",
    index: "04",
    icon: "fa-solid fa-shirt",
    label: "Moda, Beauty & Wellness",
    title: "Immagine coerente",
    subtitle: "per brand e servizi.",
    body: "Produciamo contenuti per moda, centri estetici e spa, valorizzando prodotti, trattamenti e ambienti.",
    list: [],
    media: { type: "image", src: "/images/servizi2.webp", alt: "Moda Beauty Wellness" },
  },
  {
    id: "healthcare",
    index: "05",
    icon: "fa-solid fa-heart-pulse",
    label: "Healthcare & Pharma",
    title: "Comunicazione chiara",
    subtitle: "in ambito sanitario.",
    body: "Realizziamo contenuti per studi e aziende medicali, traducendo informazioni complesse in video comprensibili.",
    list: [],
    media: { type: "image", src: "/images/azienda.webp", alt: "Healthcare Pharma" },
  },
  {
    id: "food",
    index: "06",
    icon: "fa-solid fa-utensils",
    label: "Food",
    title: "Contenuti che",
    subtitle: "valorizzano il prodotto.",
    body: "Costruiamo l'immagine visiva di ristoranti e brand food con contenuti pensati per social, menu e campagne.",
    list: [],
    media: { type: "image", src: "/images/introimg6.webp", alt: "Food photography" },
  },
  {
    id: "ecommerce",
    index: "07",
    icon: "fa-solid fa-box-open",
    label: "E-commerce & Still Life",
    title: "Immagini pulite,",
    subtitle: "precise e coerenti.",
    body: "Realizziamo contenuti prodotto in studio, con fondali, attraverso set controllati e soluzioni adatte a cataloghi ed e-commerce.",
    list: [],
    media: { type: "image", src: "/images/servizi1.webp", alt: "E-commerce Still Life" },
  },
  {
    id: "spot",
    index: "08",
    icon: "fa-solid fa-clapperboard",
    label: "Spot Pubblicitari",
    title: "Video pensati per comunicare,",
    subtitle: "con un approccio cinematografico.",
    body: "Sviluppiamo spot partendo dal messaggio, fino alla realizzazione completa. Gestiamo produzioni strutturate con troupe, regia e organizzazione tecnica, per ottenere un risultato più curato e costruito.",
    list: [],
    media: { type: "video", src: "/videos/ToyotaXReply.mp4", alt: "Spot pubblicitari" },
  },
  {
    id: "cinema",
    index: "09",
    icon: "fa-solid fa-film",
    label: "Montaggio Cinema & TV",
    title: "Montaggio narrativo",
    subtitle: "per produzioni strutturate.",
    body: "Collaboriamo con produzioni cinematografiche e televisive per documentari, cortometraggi e contenuti destinati alla distribuzione.",
    list: [],
    media: { type: "image", src: "/images/montaggio.webp", alt: "Montaggio Cinema TV" },
  },
  {
    id: "postproduzione",
    index: "10",
    icon: "fa-solid fa-scissors",
    label: "Post-produzione",
    title: "Struttura e ritmo",
    subtitle: "per ogni contenuto.",
    body: "Gestiamo montaggio, color e finalizzazione anche su materiali forniti da terze parti, produzioni e agenzie.",
    list: [],
    media: { type: "image", src: "/images/sfondo.jpg", alt: "Post-produzione" },
  },
];

function StickyServices() {
  const containerRef = useRef(null);
  const mediaRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      mediaRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === 0) { gsap.set(el, { opacity: 1, scale: 1 }); return; }
        gsap.set(el, { opacity: 0, scale: 1.04 });
      });

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === 0) { gsap.set(el, { opacity: 1, y: 0 }); return; }
        gsap.set(el, { opacity: 0, y: 32 });
      });

      services.forEach((_, i) => {
        const textEl = textRefs.current[i];
        const mediaEl = mediaRefs.current[i];
        const prevTextEl = textRefs.current[i - 1];
        const prevMediaEl = mediaRefs.current[i - 1];
        if (!textEl || i === 0) return;

        ScrollTrigger.create({
          trigger: textEl,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => {
            if (prevMediaEl) gsap.to(prevMediaEl, { opacity: 0, scale: 0.97, duration: 0.7, ease: "expo.out" });
            if (prevTextEl) gsap.to(prevTextEl, { opacity: 0, y: -24, duration: 0.5, ease: "expo.out" });
            gsap.to(mediaEl, { opacity: 1, scale: 1, duration: 0.9, ease: "expo.out" });
            gsap.to(textEl, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" });
          },
          onLeaveBack: () => {
            if (prevMediaEl) gsap.to(prevMediaEl, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" });
            if (prevTextEl) gsap.to(prevTextEl, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" });
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
      <div className="py-24 px-12 lg:px-16 space-y-0">
        {services.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            ref={el => textRefs.current[i] = el}
            className="min-h-screen flex flex-col justify-center py-16 space-y-8"
          >
            <div className="flex items-center gap-3">
              <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-zinc-600">{s.index}</span>
              <div className="h-px w-8 bg-gradient-to-b from-transparent via-violet-500/40 to-transparent" />
              <i className={`${s.icon} text-violet-400/60 text-xs`} />
              <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-violet-500/60">{s.label}</span>
            </div>

            <div>
              <h2 className="font-antonio text-4xl lg:text-5xl text-white leading-tight">{s.title}</h2>
              <h2 className="font-antonio text-4xl lg:text-5xl text-violet-300 leading-tight">{s.subtitle}</h2>
            </div>

            <div className="h-px w-16 bg-gradient-to-b from-transparent via-violet-500/40 to-transparent" />

            {s.body && (
              <p className="font-montserrat text-sm leading-relaxed text-zinc-400 max-w-sm">{s.body}</p>
            )}

            {s.list && s.list.length > 0 && (
              <ul className="space-y-3">
                {s.list.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-montserrat text-sm text-zinc-300">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <Link href="/contact"
              className="inline-flex self-start items-center gap-2 rounded-full border border-violet-400/40 px-6 py-2.5 font-montserrat text-xs uppercase tracking-[0.25em] text-violet-300 transition hover:bg-violet-900/30 hover:border-violet-400/70">
              Richiedi un preventivo
              <i className="fa-solid fa-arrow-right text-[0.6rem]" />
            </Link>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="sticky top-0 h-screen flex items-center justify-center px-8 lg:px-12">
          <div className="relative w-full" style={{ height: "70vh", maxHeight: "680px" }}>
            <div className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(139,92,246,0.18) 0%, transparent 70%)" }} />
            {services.map((s, i) => (
              <div key={s.id} ref={el => mediaRefs.current[i] = el}
                className="absolute inset-0 overflow-hidden rounded-3xl border border-white/8 shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
                {s.media.type === "video" ? (
                  <video src={s.media.src} autoPlay muted loop playsInline className="h-full w-full object-cover" />
                ) : (
                  <img src={s.media.src} alt={s.media.alt} className="h-full w-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.4em] text-zinc-400 border border-zinc-700/60 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {s.label}
                  </span>
                </div>
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

function MobileServices() {
  return (
    <div className="md:hidden px-5 py-8 space-y-20">
      {services.map((s) => (
        <section key={s.id} id={`${s.id}-mobile`} className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-zinc-600">{s.index}</span>
            <div className="h-px w-6 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
            <i className={`${s.icon} text-violet-400/60 text-xs`} />
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-violet-500/60">{s.label}</span>
          </div>

          <div>
            <h2 className="font-antonio text-3xl text-white leading-tight">{s.title}</h2>
            <h2 className="font-antonio text-3xl text-violet-300 leading-tight">{s.subtitle}</h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            style={{ height: "240px" }}>
            {s.media.type === "video" ? (
              <video src={s.media.src} autoPlay muted loop playsInline className="h-full w-full object-cover" />
            ) : (
              <img src={s.media.src} alt={s.media.alt} className="h-full w-full object-cover" loading="lazy" />
            )}
          </div>

          <div className="space-y-4 border-l border-violet-500/30 pl-5">
            {s.body && <p className="font-montserrat text-sm leading-relaxed text-zinc-400">{s.body}</p>}
            {s.list && s.list.length > 0 && (
              <ul className="space-y-2">
                {s.list.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-montserrat text-xs text-zinc-300">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
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

      <div className="relative h-[100svh] min-h-[600px] overflow-hidden md:mb-24">

        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-violet-700/35 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 right-0 h-48 w-48 rounded-full bg-fuchsia-600/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* ── HERO ── */}
        <div className="relative h-[100svh] min-h-[600px] overflow-hidden md:mb-24">

          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-violet-700/35 blur-3xl" />
          <div className="pointer-events-none absolute bottom-1/4 right-0 h-48 w-48 rounded-full bg-fuchsia-600/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

          {/* MOBILE */}
          <div className="lg:hidden relative z-10 flex flex-col px-5 pt-28 pb-10 gap-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6 bg-violet-500 flex-shrink-0" />
                <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.4em] text-violet-400">
                  Fotografia & Videomaking
                </p>
              </div>
              <h1 className="leading-[1.1] mb-6">
                <span className="block font-antonio text-[3rem] text-white">Creatività,</span>
                <span className="block font-antonio text-[2.3rem] text-zinc-400 italic ml-3">Qualità Professionale</span>
                <span className="block font-antonio text-[3rem] text-violet-300">e Affidabilità.</span>
              </h1>
              <p className="font-montserrat text-[0.8rem] leading-relaxed text-zinc-400 max-w-[90%]">
                Future Frames sviluppa progetti visivi seguendo tutte le fasi operative, dalla progettazione alla consegna finale.
                Un unico processo strutturato permette di mantenere coerenza, controllo e qualità su ogni contenuto realizzato.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <a href="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-6 py-3 font-montserrat text-[0.65rem] uppercase tracking-[0.15em] text-white transition">
                  Scopri il portfolio
                  <i className="fa-solid fa-arrow-right text-[0.6rem]" />
                </a>
                <a href="/contact"
                  className="font-montserrat text-[0.65rem] uppercase tracking-[0.15em] text-zinc-500 hover:text-white transition">
                  Contattaci →
                </a>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ WebkitOverflowScrolling: "touch" }}>
                {services.map((s) => (
                  <a key={s.id} href={`#${s.id}-mobile`}
                    className="flex-shrink-0 rounded-full border border-violet-500/30 px-4 py-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.1em] text-zinc-600 hover:border-violet-500/50 hover:text-violet-300 transition">
                    {s.label}
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  const next = document.getElementById("videolezioni-mobile");
                  if (next) next.scrollIntoView({ behavior: "smooth" });
                  else window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
                }}
                className="flex items-center gap-3 bg-transparent border-none p-0 opacity-40 hover:opacity-70 transition-opacity w-fit">
                <div className="relative h-8 w-px overflow-hidden">
                  <div className="absolute inset-0 bg-zinc-700" />
                  <div className="absolute w-full"
                    style={{ height: "50%", background: "linear-gradient(to bottom, transparent, #a78bfa, transparent)", animation: "scrollLight 1.5s ease-in-out infinite" }} />
                </div>
                <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
              </button>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:flex relative z-10 h-full items-center px-8 lg:px-16 max-w-7xl mx-auto gap-8">
            <div className="flex-1 flex flex-col justify-center min-w-0 max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-violet-500 flex-shrink-0" />
                <p className="font-montserrat text-[0.55rem] uppercase tracking-[0.45em] text-violet-400">
                  Fotografia & Videomaking
                </p>
              </div>

              <h1 className="leading-none mb-6"><span className="block font-antonio text-4xl xl:text-6xl text-white">Creatività,</span>
                <span className="block font-antonio text-3xl xl:text-5xl text-zinc-400 font-light italic ml-6">Qualità Professionale</span>
                <span className="block font-antonio text-4xl xl:text-6xl text-violet-300">e Affidabilità.</span>
              </h1>

              <div className="mb-8 max-w-sm">
                <p className="font-montserrat text-sm leading-relaxed text-zinc-400">
                  Future Frames sviluppa progetti visivi seguendo tutte le fasi operative, dalla progettazione alla consegna finale.
                  Un unico processo strutturato permette di mantenere coerenza, controllo e qualità su ogni contenuto realizzato.
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
            </div>

            {/* Immagini flottanti */}
            <div className="flex flex-1 items-center justify-center relative h-full max-w-sm lg:max-w-none">
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

          <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 h-28 w-px bg-gradient-to-b from-transparent via-violet-500/40 to-transparent" />

          <button
            type="button"
            onClick={() => {
              const next = document.getElementById("videolezioni");
              if (next) next.scrollIntoView({ behavior: "smooth" });
              else window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
            }}
            className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none p-0">
            <div className="relative h-10 w-px overflow-hidden">
              <div className="absolute inset-0 bg-zinc-700" />
              <div className="absolute w-full"
                style={{ height: "50%", background: "linear-gradient(to bottom, transparent, #a78bfa, transparent)", animation: "scrollLight 1.5s ease-in-out infinite" }} />
            </div>
            <span className="font-montserrat text-[0.5rem] uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
          </button>

        </div>

        <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 h-28 w-px bg-gradient-to-b from-transparent via-violet-500/40 to-transparent" />

        <button
          type="button"
          onClick={() => {
            const next = document.getElementById("videolezioni");
            if (next) next.scrollIntoView({ behavior: "smooth" });
            else window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none p-0">
          <div className="relative h-10 w-px overflow-hidden">
            <div className="absolute inset-0 bg-zinc-700" />
            <div className="absolute w-full"
              style={{ height: "50%", background: "linear-gradient(to bottom, transparent, #a78bfa, transparent)", animation: "scrollLight 1.5s ease-in-out infinite" }} />
          </div>
          <span className="font-montserrat text-[0.5rem] uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes scrollLight {
          0%   { top: -50%; }
          100% { top: 150%; }
        }
      `}</style>

      <StickyServices />
      <MobileServices />
    </div>
  );
}