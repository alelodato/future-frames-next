"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import MappaConConsent from "@/components/MappaConConsent";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: "fa-solid fa-eye", title: "Creatività", text: "Ogni progetto viene sviluppato con una direzione visiva precisa, coerente con l’identità del cliente." },
  { icon: "fa-solid fa-handshake", title: "Affidabilità", text: "Organizzazione chiara, rispetto delle tempistiche e gestione ordinata di ogni fase del lavoro." },
  { icon: "fa-solid fa-gem", title: "Qualità", text: "Dalla ripresa al montaggio, ogni fase è gestita con attenzione a luce, dettagli e resa finale dei contenuti." },
  { icon: "fa-solid fa-comments", title: "Ascolto", text: "Ogni progetto parte da un confronto concreto, per tradurre esigenze e obiettivi in contenuti efficaci." },
];

// ─── Linea decorativa con glow ───────────────────────────────
function GlowLine({ className = "" }) {
  return (
    <div className={`h-px ${className}`}
      style={{ background: "linear-gradient(to right, transparent, #818cf8, #a855f7, #818cf8, transparent)", boxShadow: "0 0 8px rgba(129,140,248,0.6)" }} />
  );
}

function FadeReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
      ScrollTrigger.refresh();
    }, 100);
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

export default function About() {
  const [videoRecensioneUrl, setVideoRecensioneUrl] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => ScrollTrigger.refresh(), 200);

    async function loadVideoUrl() {
      const supabase = createSupabaseBrowser();
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "video_recensione_url")
        .single();
      if (data?.value) setVideoRecensioneUrl(data.value);
    }
    loadVideoUrl();
  }, []);

  return (
    <div className="relative text-white min-h-screen"
      style={{ background: "radial-gradient(ellipse at center, #000000 0%, #000000 8%, #1a0533 30%, #3d0b2d 50%, #1a0533 70%, #000000 88%, #000000 100%)" }}>

      {/* ── APERTURA EDITORIALE ── */}
      <section className="pt-32 pb-0 px-6 md:px-12 max-w-5xl mx-auto">
        <FadeReveal className="flex items-center gap-4 mb-14">
          <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-indigo-400/70">About</span>
          <GlowLine className="flex-1" />
          <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-indigo-400/70">Future Frames</span>
        </FadeReveal>

        {/* Desktop/tablet */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-stretch mb-16">
          <div className="space-y-2">
            {["Raccontiamo storie", "con immagini", "che restano nel tempo."].map((line, i) => (
              <FadeReveal key={i} delay={i * 0.08}>
                <p className={`font-antonio leading-[1.05] ${i % 2 === 1 ? "text-violet-300" : "text-white"}`}
                  style={{ fontSize: "clamp(2rem, 5vw, 4.8rem)" }}>
                  {line}
                </p>
              </FadeReveal>
            ))}
            {/* Intro testo */}
            <FadeReveal className="pt-12 pb-24">
              <div>
                <GlowLine className="w-full mb-12" />
                <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-300">
                  Future Frames è un’agenzia creativa specializzata in fotografia e filmmaking professionale. Diamo forma ai tuoi momenti e alla tua identità, con immagini che comunicano e restano nel tempo.
                </p>
              </div>
            </FadeReveal>
          </div>

          <FadeReveal delay={0.3} className="flex-shrink-0">
            <div className="h-full w-[200px] lg:w-[320px] rounded-xl overflow-hidden">
              <img
                src="/images/eventi.webp"
                alt="Future Frames"
                className="w-full h-full object-cover opacity-80 transition duration-700 hover:scale-[1.03]"
              />
            </div>
          </FadeReveal>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-2 mb-8">
          {["Raccontiamo storie", "con immagini", "che restano nel tempo."].map((line, i) => (
            <FadeReveal key={i} delay={i * 0.08}>
              <p className={`font-antonio leading-[1.05] ${i % 2 === 1 ? "text-violet-300" : "text-white"}`}
                style={{ fontSize: "clamp(2.2rem, 10vw, 3.5rem)" }}>
                {line}
              </p>
            </FadeReveal>
          ))}
        </div>

        {/* Immagine full bleed mobile */}
        <FadeReveal className="md:hidden -mx-6 mb-10">
          <div className="relative w-full overflow-hidden" style={{ height: "clamp(260px, 50vw, 420px)" }}>
            <img src="/images/introimg4.webp" alt="Future Frames backstage"
              className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,1) 100%)" }} />
          </div>
        </FadeReveal>
        {/* Intro testo */}
        <FadeReveal>
          <div>
            <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-300">
              Future Frames è un’agenzia creativa specializzata in fotografia e filmmaking professionale. Diamo forma ai tuoi momenti e alla tua identità, con immagini che comunicano e restano nel tempo.
            </p>
          </div>
        </FadeReveal>
      </section>

      {/* Immagine full bleed desktop */}
      <FadeReveal className="hidden md:block">
        <div className="relative w-full overflow-hidden" style={{ height: "clamp(300px, 55vh, 600px)" }}>
          {/* Sfumatura esterna — sopra e sotto */}
          <div className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #000000 0%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-32 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to top, #000000 0%, transparent 100%)" }} />
          {/* Sfumatura esterna — lati */}
          <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #000000 0%, transparent 100%)" }} />
          <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #000000 0%, transparent 100%)" }} />
          <img src="/images/introimg4.webp" alt="Future Frames backstage"
            className="w-full h-full object-cover" />
        </div>
      </FadeReveal>

      {/* ── GLORIA ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <FadeReveal className="flex items-center gap-4 mb-16">
          <div className="h-px w-12"
            style={{ background: "linear-gradient(to right, #818cf8, transparent)", boxShadow: "0 0 6px rgba(129,140,248,0.5)" }} />
          <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-violet-400/80">Gloria Margarino</span>
        </FadeReveal>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">
          <FadeReveal>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl aspect-[3/4]">
                <img src="/images/gloria2.jpeg" alt="Gloria Margarino"
                  className="w-full h-full object-cover object-top transition duration-700 hover:scale-[1.03]" />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-violet-400/20 bg-[#02010b] px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
                <p className="font-montserrat text-[0.55rem] uppercase tracking-[0.25em] text-violet-400">Fotografa & Videomaker</p>
              </div>
            </div>
          </FadeReveal>

          <div className="space-y-8 pt-4 md:pt-12">
            <FadeReveal>
              <h2 className="font-antonio text-4xl md:text-5xl lg:text-6xl text-white leading-none">
                Gloria<br /><span className="text-[#790d50]">Margarino</span>
              </h2>
            </FadeReveal>
            <FadeReveal delay={0.1}><GlowLine className="w-full" /></FadeReveal>
            <FadeReveal delay={0.15}>
              <p className="font-montserrat text-sm leading-relaxed text-zinc-300">
                Gloria è il cuore visivo di Future Frames.
                Lavora sui progetti in prima linea, mantenendo sempre una linea visiva coerente.
              </p>
            </FadeReveal>
            <FadeReveal delay={0.2}>
              <p className="font-montserrat text-sm leading-relaxed text-zinc-500">
                Dagli eventi privati ai progetti aziendali, fino ai corti cinematografici, il suo obiettivo è costruire immagini solide, riconoscibili e in linea con il contesto in cui vengono utilizzate.
              </p>
            </FadeReveal>
            <FadeReveal delay={0.3}>
              <div className="space-y-3 pt-2">
                <p className="font-montserrat text-xs leading-relaxed text-indigo-400/60">
                  Segui il lavoro di Gloria sui suoi profili social.
                </p>
                <div className="flex items-center gap-4">
                  <a href="https://www.instagram.com/gloria.margarino" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-indigo-400/60 hover:text-violet-300 transition border-b border-indigo-500/30 hover:border-violet-400/40 pb-0.5">
                    <i className="fa-brands fa-instagram text-sm" />Instagram
                  </a>
                  <div className="h-3 w-px"
                    style={{ background: "linear-gradient(to bottom, transparent, #818cf8, transparent)" }} />
                  <a href="https://www.linkedin.com/in/gloria-margarino" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-indigo-400/60 hover:text-violet-300 transition border-b border-indigo-500/30 hover:border-violet-400/40 pb-0.5">
                    <i className="fa-brands fa-linkedin text-sm" />LinkedIn
                  </a>
                </div>
              </div>
            </FadeReveal>
          </div>
        </div>
      </section>

      {/* ── SEPARATORE CITAZIONE ── */}
      <FadeReveal>
        <div className="py-6 px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="font-antonio text-4xl md:text-4xl lg:text-6xl text-zinc-300 leading-snug italic">
              "Ogni frame è una scelta. Noi scegliamo con cura."
            </p>
            <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.4em] text-indigo-400/60">Future Frames</p>
          </div>
        </div>
      </FadeReveal>

      {/* ── IVAN ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <FadeReveal className="flex items-center gap-4 mb-16 justify-end">
          <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-violet-400/80">Ivan Scrofani</span>
          <div className="h-px w-12"
            style={{ background: "linear-gradient(to left, #818cf8, transparent)", boxShadow: "0 0 6px rgba(129,140,248,0.5)" }} />
        </FadeReveal>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
          <div className="space-y-8 pt-4 md:pt-12 order-2 md:order-1">
            <FadeReveal>
              <h2 className="font-antonio text-4xl md:text-5xl lg:text-6xl text-white leading-none">
                Ivan<br /><span className="text-[#31a0a6]">Scrofani</span>
              </h2>
            </FadeReveal>
            <FadeReveal delay={0.1}><GlowLine className="w-full" /></FadeReveal>
            <FadeReveal delay={0.15}>
              <p className="font-montserrat text-sm leading-relaxed text-zinc-300">
                Ivan affianca lo sviluppo dei progetti e la gestione operativa, contribuendo all’organizzazione del lavoro e al rapporto con i clienti, così da garantire continuità, chiarezza e una gestione fluida in ogni fase.
              </p>
            </FadeReveal>
          </div>

          <FadeReveal className="order-1 md:order-2">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl aspect-[3/4]">
                <img src="/images/ivan.jpeg" alt="Ivan Scrofani"
                  className="w-full h-full object-cover object-[50%_25%] transition duration-700 hover:scale-[1.03]" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl border border-violet-400/20 bg-[#02010b] px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
                <p className="font-montserrat text-[0.55rem] uppercase tracking-[0.25em] text-violet-400">Video Editor</p>
              </div>
            </div>
          </FadeReveal>
        </div>
      </section>

      {/* ── VALORI ── */}
      <section className="py-24">
        <div className="px-6 md:px-12 max-w-5xl mx-auto space-y-16">
          <FadeReveal className="flex items-center gap-4">
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-indigo-400/70">I nostri valori</span>
            <GlowLine className="flex-1" />
          </FadeReveal>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeReveal key={v.title} delay={i * 0.08}>
                <div className="space-y-4 pt-6">
                  <div className="h-px w-full mb-6"
                    style={{ background: "linear-gradient(to right, #818cf8, #a855f7, transparent)", boxShadow: "0 0 6px rgba(129,140,248,0.4)" }} />
                  <i className={`${v.icon} text-violet-400/60 text-sm`} />
                  <h4 className="font-antonio text-xl text-white">{v.title}</h4>
                  <p className="font-montserrat text-xs leading-relaxed text-zinc-500">{v.text}</p>
                </div>
              </FadeReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO RECENSIONE ── */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto space-y-12">
        <FadeReveal className="flex items-center gap-4">
          <GlowLine className="flex-1" />
          <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-indigo-400/70">Dicono di noi</span>
        </FadeReveal>

        <div>
          <FadeReveal>
            <div className="relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 aspect-video">
              {videoRecensioneUrl ? (
                <video
                  src={videoRecensioneUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  playsInline
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 to-transparent" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-violet-400/30 bg-violet-900/30 backdrop-blur-sm">
                    <i className="fa-solid fa-play ml-1 text-lg text-white" />
                  </div>
                  <div className="relative">
                    <p className="font-antonio text-base text-white">Video recensione</p>
                    <p className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] text-indigo-400/60 mt-1">Disponibile prossimamente</p>
                  </div>
                </div>
              )}
            </div>
          </FadeReveal>
        </div>

        <FadeReveal>
          <a href="https://www.trustpilot.com/review/futureframes.it" target="_blank" rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 px-8 py-7 transition hover:border-[#00b67a]/30 hover:bg-[#00b67a]/5">
            <div className="flex items-center gap-5">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#00b67a]/20 bg-[#00b67a]/8">
                <i className="fa-solid fa-star text-[#00b67a] text-lg" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-antonio text-lg text-white">Trustpilot</span>
                  <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star text-[#00b67a] text-xs" />)}</div>
                  <span className="font-montserrat text-sm text-white font-semibold">5.0</span>
                </div>
                <p className="font-montserrat text-xs text-zinc-500 mt-0.5">Recensioni verificate dei nostri clienti</p>
              </div>
            </div>
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#00b67a] border-b border-[#00b67a]/30 pb-0.5 transition group-hover:border-[#00b67a]/60">
              Leggi tutte le recensioni →
            </span>
          </a>
        </FadeReveal>
      </section>

      {/* ── DOVE LAVORIAMO ── */}
      <section className="py-24">
        <div className="px-6 md:px-12 max-w-5xl mx-auto space-y-12">
          <FadeReveal className="flex items-center gap-4">
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-violet-400/80">Dove siamo</span>
            <GlowLine className="flex-1" />
          </FadeReveal>
          <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] items-stretch">
            <FadeReveal className="space-y-6">
              <h3 className="font-antonio text-3xl md:text-4xl text-white leading-tight">
                Con base a Pomezia,
                <span className="block text-violet-300">alle porte di Roma.</span>
              </h3>
              <p className="font-montserrat text-sm leading-relaxed text-zinc-300">
                Operiamo principalmente nell&apos;area metropolitana di Roma. Per progetti strutturati valutiamo trasferte in altre città italiane.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  { icon: "fa-solid fa-location-dot", text: "Pomezia, Roma — Lazio" },
                  { icon: "fa-solid fa-map", text: "Provincia di Roma e dintorni" },
                  { icon: "fa-solid fa-car", text: "Trasferte su accordo" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <i className={`${item.icon} text-violet-400/50 text-xs w-4`} />
                    <span className="font-montserrat text-xs text-zinc-300">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact"
                className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-[0.25em] text-violet-400 hover:text-violet-300 transition border-b border-violet-400/30 pb-0.5">
                Scrivici <i className="fa-solid fa-arrow-right text-[0.6rem]" />
              </Link>
            </FadeReveal>
            <FadeReveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-violet-500/15 min-h-[300px] shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                <MappaConConsent />
              </div>
            </FadeReveal>
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="relative py-32 overflow-hidden">
        {/* Sfumatura bordi */}
        <FadeReveal className="relative z-10 text-center px-6 space-y-6">
          <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.5em] text-indigo-400/70">Iniziamo</p>
          <h2 className="font-antonio text-4xl md:text-6xl text-white leading-tight">
            Hai un progetto<br />
            <span className="text-violet-300">in mente?</span>
          </h2>
          <p className="font-montserrat text-sm text-zinc-300 max-w-sm mx-auto">
            Raccontacelo. Trasformiamo le tue idee in immagini che restano nel tempo.
          </p>
          <Link href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-violet-400 px-8 py-3 text-xs font-montserrat font-semibold tracking-wide text-[#050211] shadow-[0_0_26px_rgba(167,139,250,0.5)] transition hover:bg-violet-300 hover:shadow-[0_0_40px_rgba(167,139,250,0.8)]">
            Parliamo del tuo progetto
          </Link>
        </FadeReveal>
      </section>

    </div>
  );
}