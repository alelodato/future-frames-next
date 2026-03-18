"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: "fa-solid fa-eye", title: "Creatività", text: "Trovare sempre l'inquadratura giusta e il taglio narrativo più efficace, progetto dopo progetto." },
  { icon: "fa-solid fa-handshake", title: "Affidabilità", text: "Dalla pianificazione alle consegne, con comunicazione chiara e rispetto delle scadenze." },
  { icon: "fa-solid fa-gem", title: "Qualità", text: "In ogni fase: riprese, color grading, montaggio e consegna finale del materiale." },
  { icon: "fa-solid fa-comments", title: "Ascolto", text: "Ogni progetto nasce dal dialogo con il cliente. La tua visione è il nostro punto di partenza." },
];

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
    <div className="text-white min-h-screen"
      style={{ background: "radial-gradient(ellipse at center, #0d0b2a 0%, #06050f 60%, #000000 100%)" }}>

      {/* ── APERTURA EDITORIALE ── */}
      <section className="pt-32 pb-0 px-6 md:px-12 max-w-5xl mx-auto">
        <FadeReveal className="flex items-center gap-4 mb-14">
          <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-zinc-600">About</span>
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-zinc-600">Future Frames</span>
        </FadeReveal>

        {/* Desktop/tablet */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start mb-16">
          <div className="space-y-2">
            {["Non facciamo solo", "foto e video.", "Raccontiamo storie", "con immagini", "che restano nel tempo."].map((line, i) => (
              <FadeReveal key={i} delay={i * 0.08}>
                <p className={`font-antonio leading-[1.05] ${i % 2 === 1 ? "text-violet-300" : "text-white"}`}
                  style={{ fontSize: "clamp(2rem, 5vw, 4.8rem)" }}>
                  {line}
                </p>
              </FadeReveal>
            ))}
          </div>
          <FadeReveal delay={0.3} className="flex-shrink-0 flex flex-col gap-4 pt-1">
            <div style={{ aspectRatio: "3/4" }}>
              <img src="/images/eventi.webp" alt="Future Frames Logo"
                className="w-[200px] lg:w-[400px] h-auto object-contain opacity-80 transition duration-700 hover:scale-[1.03]" />
            </div>
          </FadeReveal>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-2 mb-8">
          {["Non facciamo solo", "foto e video.", "Raccontiamo storie", "con immagini", "che restano nel tempo."].map((line, i) => (
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
              className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
          </div>
        </FadeReveal>

        {/* Intro testo */}
        <FadeReveal className="grid md:grid-cols-2 gap-8 md:gap-16 border-t border-zinc-800 pt-12 pb-24">
          <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-300">
            Future Frames nasce a Pomezia, alle porte di Roma, dall'incontro tra due sensibilità complementari. Gloria dietro l'obiettivo, Ivan in fase di montaggio: insieme formano un'unica visione creativa.
          </p>
          <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-500">
            Il nostro approccio è semplice: ascoltiamo prima di fotografare, capiamo prima di girare. Ogni progetto nasce da una conversazione e si chiude con immagini che parlano da sole.
          </p>
        </FadeReveal>
      </section>

      {/* Immagine full bleed desktop */}
      <FadeReveal className="hidden md:block">
        <div className="relative w-full overflow-hidden" style={{ height: "clamp(300px, 55vh, 600px)" }}>
          <img src="/images/introimg4.webp" alt="Future Frames backstage"
            className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        </div>
      </FadeReveal>

      {/* ── GLORIA ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <FadeReveal className="flex items-center gap-4 mb-16">
          <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-zinc-600">01</span>
          <div className="h-px w-12 bg-zinc-800" />
          <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-violet-500/60">Gloria Margarino</span>
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
                Gloria<br /><span className="text-zinc-500">Margarino</span>
              </h2>
            </FadeReveal>
            <FadeReveal delay={0.1}><div className="h-px w-full bg-zinc-800" /></FadeReveal>
            <FadeReveal delay={0.15}>
              <p className="font-montserrat text-sm leading-relaxed text-zinc-300">
                Gloria è il cuore visivo di Future Frames. Cura la fotografia e le riprese sul set con un approccio che unisce sensibilità estetica, attenzione alla luce e naturalezza nelle espressioni.
              </p>
            </FadeReveal>
            <FadeReveal delay={0.2}>
              <p className="font-montserrat text-sm leading-relaxed text-zinc-500">
                Dagli eventi privati ai progetti aziendali, fino ai corti cinematografici, il suo obiettivo è raccontare persone e momenti reali senza perdere eleganza e coerenza visiva. Ogni scatto è una scelta, non una casualità.
              </p>
            </FadeReveal>
            <FadeReveal delay={0.3}>
              <div className="space-y-3 pt-2">
                <p className="font-montserrat text-xs leading-relaxed text-zinc-600">
                  Segui il lavoro di Gloria sui suoi profili social.
                </p>
                <div className="flex items-center gap-4">
                  <a href="https://www.instagram.com/gloria.margarino" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-zinc-500 hover:text-violet-300 transition border-b border-zinc-800 hover:border-violet-400/40 pb-0.5">
                    <i className="fa-brands fa-instagram text-sm" />Instagram
                  </a>
                  <div className="h-3 w-px bg-zinc-800" />
                  <a href="https://www.linkedin.com/in/gloria-margarino" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-zinc-500 hover:text-violet-300 transition border-b border-zinc-800 hover:border-violet-400/40 pb-0.5">
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
        <div className="border-t border-b border-zinc-800/40 py-16 px-6 md:px-12"
          style={{ background: "radial-gradient(ellipse at center, #0d0b2a 0%, transparent 100%)" }}>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="font-antonio text-2xl md:text-3xl lg:text-4xl text-zinc-300 leading-snug italic">
              "Ogni frame è una scelta. Noi scegliamo con cura."
            </p>
            <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.4em] text-zinc-600">Future Frames</p>
          </div>
        </div>
      </FadeReveal>

      {/* ── IVAN ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <FadeReveal className="flex items-center gap-4 mb-16 justify-end">
          <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-violet-500/60">Ivan Scrofani</span>
          <div className="h-px w-12 bg-zinc-800" />
          <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-zinc-600">02</span>
        </FadeReveal>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
          <div className="space-y-8 pt-4 md:pt-12 order-2 md:order-1">
            <FadeReveal>
              <h2 className="font-antonio text-4xl md:text-5xl lg:text-6xl text-white leading-none">
                Ivan<br /><span className="text-zinc-500">Scrofani</span>
              </h2>
            </FadeReveal>
            <FadeReveal delay={0.1}><div className="h-px w-full bg-zinc-800" /></FadeReveal>
            <FadeReveal delay={0.15}>
              <p className="font-montserrat text-sm leading-relaxed text-zinc-300">
                Ivan dà ritmo e struttura alle storie. In fase di montaggio unisce immagini, suono e musica per creare narrazioni fluide, dinamiche e coerenti con l&apos;identità del cliente.
              </p>
            </FadeReveal>
            <FadeReveal delay={0.2}>
              <p className="font-montserrat text-sm leading-relaxed text-zinc-500">
                Dai social content ai video corporate, fino agli spot più cinematografici, lavora perché ogni frame abbia un ruolo preciso e un impatto chiaro. Il montaggio non è tecnica, è scrittura.
              </p>
            </FadeReveal>
            <FadeReveal delay={0.25}>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Montaggio", "Color grading", "Motion graphics", "Corporate", "Spot"].map((tag) => (
                  <span key={tag} className="font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-zinc-500 border-b border-zinc-700 pb-0.5">{tag}</span>
                ))}
              </div>
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
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-zinc-600">I nostri valori</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </FadeReveal>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeReveal key={v.title} delay={i * 0.08}>
                <div className="space-y-4 border-t border-zinc-800 pt-6">
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
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-zinc-600">Dicono di noi</span>
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
                    <p className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] text-zinc-600 mt-1">Disponibile prossimamente</p>
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
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.5em] text-violet-500/60">Dove siamo</span>
            <div className="h-px flex-1 bg-zinc-800" />
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
                <iframe title="Mappa Pomezia" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full min-h-[300px] border-0 grayscale contrast-110 opacity-60 transition duration-500 hover:grayscale-0 hover:opacity-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7469.59805370534!2d12.494142676655008!3d41.669457171703194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132599a4cfbcba4b%3A0xdee4c5c2d3b0f27b!2s00071%20Pomezia%20RM!5e0!3m2!1sit!2sit!4v1733589000000!5m2!1sit!2si" />
              </div>
            </FadeReveal>
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="relative py-32 overflow-hidden">
        <img src="/images/NeonWall.webp" alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, transparent 65%)" }} />
        <FadeReveal className="relative z-10 text-center px-6 space-y-6">
          <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.5em] text-zinc-500">Iniziamo</p>
          <h2 className="font-antonio text-4xl md:text-6xl text-white leading-tight">
            Hai un progetto<br />
            <span className="text-violet-300">in mente?</span>
          </h2>
          <p className="font-montserrat text-sm text-zinc-400 max-w-sm mx-auto">
            Raccontacelo. Ogni collaborazione nasce da una conversazione.
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