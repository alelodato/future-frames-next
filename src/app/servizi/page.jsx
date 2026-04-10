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
    media: { type: "image", src: "/images/videolezioni.webp", alt: "Videolezioni aziendali" },
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
    media: { type: "image", src: "/images/podcast.webp", alt: "Podcast" },
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
    media: { type: "video", src: "/videos/moda.mp4", alt: "Moda Beauty Wellness" },
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
    media: { type: "image", src: "/images/settore-sanitario.webp", alt: "Healthcare Pharma" },
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
    media: { type: "video", src: "/videos/food.mp4", alt: "Food video" },
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
    media: { type: "image", src: "/images/e-commerce.jpg", alt: "E-commerce Still Life" },
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
    media: { type: "image", src: "/images/spot.webp", alt: "Spot pubblicitari" },
  },
  {
    id: "cinema",
    index: "09",
    icon: "fa-solid fa-film",
    label: "Montaggio Video Per Cinema & TV",
    title: "Montaggio narrativo",
    subtitle: "per produzioni strutturate.",
    body: "Collaboriamo con produzioni cinematografiche e televisive per documentari, cortometraggi e contenuti destinati alla distribuzione.",
    list: [],
    media: { type: "image", src: "/images/montaggio.webp", alt: "Montaggio Cinema TV" },
  },
];

// ─── STICKY SERVICES (xl+) ────────────────────────────────────
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
    <div ref={containerRef} className="hidden xl:grid grid-cols-2 relative">
      <div className="py-24 px-16 space-y-0">
        {services.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            ref={el => textRefs.current[i] = el}
            className="min-h-screen flex flex-col justify-center py-16 space-y-5"
          >
            <div className="flex items-center gap-3">
              <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-zinc-600">{s.index}</span>
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
              <i className={`${s.icon} text-violet-400/60 text-xs`} />
              <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-violet-500/60">{s.label}</span>
            </div>
            <div>
              <h2 className="font-antonio text-4xl xl:text-5xl text-white leading-tight">{s.title}</h2>
              <h2 className="font-antonio text-4xl xl:text-5xl text-violet-300 leading-tight">{s.subtitle}</h2>
            </div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
            {s.body && (
              <p className="font-montserrat text-l leading-relaxed text-zinc-200 max-w-sm">{s.body}</p>
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
        <div className="sticky top-0 h-screen flex items-center justify-center px-12">
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
    <div className="xl:hidden px-5 md:px-8 py-8 space-y-16">
      {services.map((s) => (
        <section key={s.id} id={`${s.id}-mobile`} className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-zinc-600">{s.index}</span>
            <div className="h-px w-6 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
            <i className={`${s.icon} text-violet-400/60 text-xs`} />
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-violet-500/60">{s.label}</span>
          </div>
          <div>
            <h2 className="font-antonio text-3xl md:text-4xl text-white leading-tight">{s.title}</h2>
            <h2 className="font-antonio text-3xl md:text-4xl text-violet-300 leading-tight">{s.subtitle}</h2>
          </div>
          <div className="flex justify-center">
            <div className="relative overflow-hidden rounded-2xl border border-violet-500/15 w-full md:max-w-lg"
              style={{ height: "260px", boxShadow: "0 0 30px rgba(139,92,246,0.08)" }}>
              {s.media.type === "video" ? (
                <video src={s.media.src} autoPlay muted loop playsInline className="h-full w-full object-cover" />
              ) : (
                <img src={s.media.src} alt={s.media.alt} className="h-full w-full object-cover" loading="lazy" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
          <div className="space-y-4 border-l border-violet-500/30 pl-5">
            {s.body && <p className="font-montserrat text-sm leading-relaxed text-zinc-200">{s.body}</p>}
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
    <div className="min-h-screen text-white" style={{ background: "radial-gradient(ellipse at center, #000000 0%, #000000 8%, #1a0533 30%, #3d0b2d 50%, #1a0533 70%, #000000 88%, #000000 100%)" }}>

      {/* ── HERO ── */}
      <div className="relative min-h-[100svh] md:min-h-0 xl:min-h-[100svh] xl:mb-24">

        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-violet-700/35 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 right-0 h-48 w-48 rounded-full bg-fuchsia-600/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* ── MOBILE (< md) ── */}
        <div className="md:hidden relative z-10 flex flex-col px-5 pt-28 pb-10 gap-10">
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
            <p className="font-montserrat text-[0.8rem] leading-relaxed text-zinc-200 max-w-[90%]">
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
            <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ WebkitOverflowScrolling: "touch" }}>
              {services.map((s) => (
                <a key={s.id} href={`#${s.id}-mobile`}
                  className="flex-shrink-0 rounded-full border border-violet-500/30 px-4 py-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.1em] text-zinc-600 hover:border-violet-500/50 hover:text-violet-300 transition">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABLET md → xl (stesso layout) ── */}
        <div className="hidden md:flex xl:hidden relative z-10 flex-col px-8 lg:px-12 pt-24 pb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-violet-500 flex-shrink-0" />
              <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.4em] text-violet-400">
                Fotografia & Videomaking
              </p>
            </div>
            <h1 className="leading-[1.05]">
              <span className="block font-antonio text-[3.2rem] lg:text-[4rem] text-white">Creatività,</span>
              <span className="block font-antonio text-[2.6rem] lg:text-[3.2rem] text-zinc-400 italic ml-4">Qualità Professionale</span>
              <span className="block font-antonio text-[3.2rem] lg:text-[4rem] text-violet-300">e Affidabilità.</span>
            </h1>
          </div>

          <div className="flex gap-3 w-full lg:max-w-2xl" style={{ height: "200px" }}>
            <div className="flex-1 rounded-2xl overflow-hidden border border-violet-500/20 shadow-xl">
              <img src="/images/servizi1.webp" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden border border-violet-500/20 shadow-xl mt-6">
              <img src="/images/candela.webp" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden border border-violet-500/20 shadow-xl">
              <img src="/images/servizi3.jpg" alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:max-w-2xl">
            <p className="font-montserrat text-sm leading-relaxed text-zinc-200 max-w-lg">
              Future Frames sviluppa progetti visivi seguendo tutte le fasi operative, dalla progettazione alla consegna finale.
              Un unico processo strutturato permette di mantenere coerenza, controllo e qualità su ogni contenuto realizzato.
            </p>
            <div className="flex items-center gap-5">
              <a href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-6 py-2.5 font-montserrat text-xs uppercase tracking-[0.15em] text-white transition">
                Scopri il portfolio
                <i className="fa-solid fa-arrow-right text-[0.6rem]" />
              </a>
              <a href="/contact"
                className="font-montserrat text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition">
                Contattaci →
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <a key={s.id} href={`#${s.id}-mobile`}
                  className="rounded-full border border-violet-500/30 px-4 py-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.1em] text-zinc-600 hover:border-violet-500/50 hover:text-violet-300 transition">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── DESKTOP (xl+) ── */}
        <div className="hidden xl:flex relative z-10 h-full min-h-[100svh] items-center px-16 max-w-7xl mx-auto gap-12">
          <div className="flex-1 flex flex-col justify-center min-w-0 max-w-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-violet-500 flex-shrink-0" />
              <p className="font-montserrat text-[0.55rem] uppercase tracking-[0.45em] text-violet-400">
                Fotografia & Videomaking
              </p>
            </div>
            <h1 className="leading-none mb-6">
              <span className="block font-antonio text-5xl xl:text-6xl text-white">Creatività,</span>
              <span className="block font-antonio text-4xl xl:text-5xl text-zinc-400 font-light italic ml-6">Qualità Professionale</span>
              <span className="block font-antonio text-5xl xl:text-6xl text-violet-300">e Affidabilità.</span>
            </h1>
            <div className="mb-8 max-w-sm">
              <p className="font-montserrat text-md leading-relaxed text-zinc-200">
                Future Frames sviluppa progetti visivi seguendo tutte le fasi operative, dalla progettazione alla consegna finale.
                Un unico processo strutturato permette di mantenere coerenza, controllo e qualità su ogni contenuto realizzato.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <a href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-6 py-2.5 font-montserrat text-xs uppercase tracking-[0.2em] text-white transition">
                Scopri il portfolio
                <i className="fa-solid fa-arrow-right text-[0.6rem]" />
              </a>
              <a href="/contact"
                className="font-montserrat text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition">
                Contattaci →
              </a>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4 h-full py-16">
            <div className="flex flex-col justify-start flex-1 max-w-[220px] xl:max-w-[260px]" style={{ height: "70vh" }}>
              <div className="relative w-full rounded-2xl overflow-hidden border border-violet-500/15"
                style={{ height: "75%", boxShadow: "0 0 40px rgba(139,92,246,0.12)" }}>
                <img src="/images/servizi1.webp" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
            <div className="flex flex-col justify-center flex-1 max-w-[220px] xl:max-w-[260px]" style={{ height: "70vh" }}>
              <div className="relative w-full rounded-2xl overflow-hidden border border-violet-500/15"
                style={{ height: "85%", boxShadow: "0 0 40px rgba(139,92,246,0.12)" }}>
                <img src="/images/candela.webp" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
            <div className="flex flex-col justify-end flex-1 max-w-[220px] xl:max-w-[260px]" style={{ height: "70vh" }}>
              <div className="relative w-full rounded-2xl overflow-hidden border border-violet-500/15"
                style={{ height: "70%", boxShadow: "0 0 40px rgba(139,92,246,0.12)" }}>
                <img src="/images/servizi3.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden xl:block absolute left-6 top-1/2 -translate-y-1/2 h-28 w-px bg-gradient-to-b from-transparent via-violet-500/40 to-transparent" />
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