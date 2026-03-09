"use client";

import Link from "next/link";
import { useState } from "react";

const reviews = [
  {
    name: "Marco & Alessia R.",
    role: "Servizio matrimonio · Roma",
    stars: 5,
    text: "Professionalità e creatività fuori dal comune. Gloria e Ivan hanno saputo catturare ogni momento con una sensibilità rara. Il video finale ci ha lasciati senza parole.",
  },
  {
    name: "Chiara M.",
    role: "Shooting food · Ostia",
    stars: 5,
    text: "Ho scelto Future Frames per il lancio del mio ristorante e non potevo fare scelta migliore. Le foto parlano da sole — eleganti, appetitose, perfette per i social.",
  },
  {
    name: "Davide F.",
    role: "Evento aziendale · Roma",
    stars: 5,
    text: "Puntuali, discreti e incredibilmente professionali. Hanno fotografato il nostro evento aziendale senza mai essere invasivi, consegnando un lavoro impeccabile.",
  },
  {
    name: "Sofia & Andrea B.",
    role: "Battesimo · Pomezia",
    stars: 5,
    text: "Ci hanno regalato ricordi che non avremmo mai saputo immaginare così belli. Ogni foto racconta un'emozione vera. Consigliati a occhi chiusi.",
  },
  {
    name: "Roberto C.",
    role: "Video corporate · Latina",
    stars: 5,
    text: "Avevo già lavorato con altre agenzie ma il livello di Future Frames è un altro. Ascolto, cura e un risultato che ha superato ogni aspettativa.",
  },
];

const values = [
  {
    icon: "fa-solid fa-eye",
    title: "Creatività",
    text: "Trovare sempre l'inquadratura giusta e il taglio narrativo più efficace, progetto dopo progetto.",
  },
  {
    icon: "fa-solid fa-handshake",
    title: "Affidabilità",
    text: "Dalla pianificazione alle consegne, con comunicazione chiara e rispetto delle scadenze.",
  },
  {
    icon: "fa-solid fa-gem",
    title: "Qualità",
    text: "In ogni fase: riprese, color grading, montaggio e consegna finale del materiale.",
  },
  {
    icon: "fa-solid fa-comments",
    title: "Ascolto",
    text: "Ogni progetto nasce dal dialogo con il cliente. La tua visione è il nostro punto di partenza.",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

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

function ImageFrame({ src, alt, className = "", imgClassName = "" }) {
  return (
    <div
      className={[
        "overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70",
        "shadow-[0_22px_60px_rgba(0,0,0,0.9)]",
        className,
      ].join(" ")}
    >
      <img
        src={src}
        alt={alt}
        className={["h-full w-full object-cover", imgClassName].join(" ")}
        loading="lazy"
      />
    </div>
  );
}

function ReviewsSlideshow() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 250);
  };
  const prev = () => go((current - 1 + reviews.length) % reviews.length);
  const next = () => go((current + 1) % reviews.length);
  const r = reviews[current];

  return (
    <div className="space-y-4">
      <div
        className="relative rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-7 sm:p-9 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-opacity duration-250"
        style={{ opacity: animating ? 0 : 1 }}
      >
        <span className="font-antonio text-[6rem] leading-none text-violet-500/15 select-none absolute top-2 left-6">"</span>
        <div className="relative z-10 space-y-5">
          <div className="flex gap-1">
            {[...Array(r.stars)].map((_, i) => (
              <i key={i} className="fa-solid fa-star text-amber-400 text-sm" />
            ))}
          </div>
          <p className="font-montserrat text-sm sm:text-base leading-relaxed text-zinc-200 italic max-w-3xl">
            &ldquo;{r.text}&rdquo;
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-violet-500/15">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex-shrink-0 rounded-full border border-violet-400/20 bg-violet-900/40 flex items-center justify-center">
                <i className="fa-solid fa-user text-violet-400 text-sm" />
              </div>
              <div>
                <p className="font-antonio text-sm tracking-wide text-white">{r.name}</p>
                <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.15em] text-violet-300">{r.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={prev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/30 bg-violet-900/30 transition hover:bg-violet-600/50 hover:border-violet-400/60"
                aria-label="Recensione precedente">
                <i className="fa-solid fa-arrow-left text-violet-300 text-xs" />
              </button>
              <span className="font-montserrat text-[0.65rem] text-zinc-500">{current + 1} / {reviews.length}</span>
              <button onClick={next}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/30 bg-violet-900/30 transition hover:bg-violet-600/50 hover:border-violet-400/60"
                aria-label="Recensione successiva">
                <i className="fa-solid fa-arrow-right text-violet-300 text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {reviews.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-violet-400" : "w-1.5 bg-violet-500/30 hover:bg-violet-500/60"}`}
            aria-label={`Vai alla recensione ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section className="bg-black text-white">

      {/* ── HERO ── */}
      <div
        className="relative h-[60vh] min-h-[420px] w-full overflow-hidden text-center"
        aria-label="Chi siamo Future Frames"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/NeonWall.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-12 sm:pb-16">
          <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-violet-300">
            About
          </p>
          <h1 className="mt-3 font-antonio font-semibold text-4xl md:text-5xl leading-tight">
            Future Frames
          </h1>
          <p className="mt-4 font-montserrat text-sm md:text-base leading-relaxed text-zinc-200">
            Un&apos;agenzia creativa specializzata in fotografia e videomaking
            professionale.
            <br />
            Raccontiamo persone, aziende ed eventi con un linguaggio visivo
            pulito, emotivo e contemporaneo.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link href="/portfolio"
              className="inline-flex items-center justify-center rounded-full bg-violet-400 px-5 py-2.5 text-xs font-montserrat font-semibold tracking-wide text-[#050211] shadow-[0_0_26px_rgba(167,139,250,0.7)] transition hover:bg-violet-300">
              Scopri il portfolio
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-violet-300/70 bg-transparent px-5 py-2.5 text-xs font-montserrat font-semibold tracking-wide text-violet-100/90 transition hover:bg-white/5">
              Contattaci
            </Link>
          </div>
        </div>

      </div>

      {/* ── BODY ── */}
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20 space-y-20 sm:space-y-28 bg-gradient-to-b from-black via-[#0a0b338d] to-[#45115d5c]">

        {/* ── PANORAMICA TEAM ── */}
        <section className="space-y-10" aria-label="Team Future Frames" data-aos="fade-up">
          <Divider icon="fa-solid fa-users" label="Il team" />
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-5">
              <h2 className="font-antonio font-semibold text-2xl md:text-3xl text-white">
                Due professionisti,
                <span className="block text-violet-300">una visione condivisa.</span>
              </h2>
              <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-300">
                <strong className="text-white">Gloria Margarino</strong>, fotografa e videomaker, e{" "}
                <strong className="text-white">Ivan Scrofani</strong>, video editor, guidano Future Frames
                unendo sensibilità visiva e montaggio narrativo. Ogni progetto nasce dal dialogo con il
                cliente e dalla cura per i dettagli.
              </p>
              <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-400">
                Dalla pianificazione alla consegna finale, il loro obiettivo è trasformare momenti, brand
                e storie in immagini che restano nel tempo.
              </p>
              <Link href="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200 transition">
                Scopri il nostro portfolio
                <i className="fa-solid fa-circle-arrow-right" />
              </Link>
            </div>
            <div className="flex md:justify-end">
              <div className="w-full max-w-[420px]">
                <ImageFrame src="/images/introimg4.webp" alt="Future Frames – backstage" className="aspect-[4/3]" />
              </div>
            </div>
          </div>
        </section>

        {/* ── BIO GLORIA ── */}
        <section className="space-y-8" aria-label="Gloria Margarino" data-aos="fade-up">
          <Divider icon="fa-solid fa-camera" label="Gloria Margarino" />
          <div className="overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 shadow-[0_0_45px_rgba(124,58,237,0.15)]">
            <div className="grid md:grid-cols-[1fr_1.1fr]">
              {/* Immagine */}
              <div className="relative min-h-[360px] md:min-h-0 overflow-hidden">
                <img src="/images/gloria2.jpeg" alt="Gloria Margarino"
                  className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0d0b2a] hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b2a] via-transparent to-transparent md:hidden" />
                {/* Badge ruolo */}
                <div className="absolute bottom-4 left-4 rounded-xl border border-violet-400/30 bg-black/70 px-3 py-2 backdrop-blur-sm">
                  <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-violet-300">Fotografa & Videomaker</p>
                </div>
              </div>
              {/* Testo */}
              <div className="px-7 py-8 sm:px-10 sm:py-10 space-y-4 flex flex-col justify-center">
                <h3 className="font-antonio text-2xl md:text-[1.8rem] text-white leading-tight">
                  Fotografa e videomaker.
                </h3>
                <p className="font-montserrat text-sm leading-relaxed text-zinc-300">
                  Gloria è il cuore visivo di Future Frames. Cura la fotografia e le riprese sul set,
                  con un approccio che unisce sensibilità estetica, attenzione alla luce e naturalezza
                  nelle espressioni.
                </p>
                <p className="font-montserrat text-sm leading-relaxed text-zinc-400">
                  Dagli eventi privati ai matrimoni, fino ai progetti aziendali, il suo obiettivo è
                  raccontare persone e momenti reali senza perdere eleganza e coerenza visiva.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Matrimoni", "Ritratti", "Food", "Aziende", "Eventi"].map((tag) => (
                    <span key={tag} className="rounded-full border border-violet-500/25 bg-violet-900/20 px-3 py-1 font-montserrat text-[0.65rem] uppercase tracking-[0.15em] text-violet-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BIO IVAN ── */}
        <section className="space-y-8" aria-label="Ivan Scrofani" data-aos="fade-up">
          <Divider icon="fa-solid fa-film" label="Ivan Scrofani" />
          <div className="overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 shadow-[0_0_45px_rgba(124,58,237,0.15)]">
            <div className="grid md:grid-cols-[1.1fr_1fr]">
              {/* Testo */}
              <div className="px-7 py-8 sm:px-10 sm:py-10 space-y-4 flex flex-col justify-center order-2 md:order-1">
                <h3 className="font-antonio text-2xl md:text-[1.8rem] text-white leading-tight">
                  Video editor e post-produzione.
                </h3>
                <p className="font-montserrat text-sm leading-relaxed text-zinc-300">
                  Ivan dà ritmo e struttura alle storie. In fase di montaggio unisce immagini, suono e
                  musica per creare narrazioni fluide, dinamiche e coerenti con l&apos;identità del cliente.
                </p>
                <p className="font-montserrat text-sm leading-relaxed text-zinc-400">
                  Dai social content ai video corporate, fino agli spot più cinematografici, lavora perché
                  ogni frame abbia un ruolo preciso e un impatto chiaro.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Montaggio", "Color grading", "Motion graphics", "Corporate", "Spot"].map((tag) => (
                    <span key={tag} className="rounded-full border border-violet-500/25 bg-violet-900/20 px-3 py-1 font-montserrat text-[0.65rem] uppercase tracking-[0.15em] text-violet-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Immagine */}
              <div className="relative min-h-[360px] md:min-h-0 overflow-hidden order-1 md:order-2">
                <img src="/images/ivan.jpeg" alt="Ivan Scrofani"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_25%]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0d0b2a] hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b2a] via-transparent to-transparent md:hidden" />
                <div className="absolute bottom-4 right-4 rounded-xl border border-violet-400/30 bg-black/70 px-3 py-2 backdrop-blur-sm">
                  <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-violet-300">Video Editor</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALORI ── */}
        <section className="space-y-8" aria-label="Valori Future Frames" data-aos="fade-up">
          <Divider icon="fa-solid fa-gem" label="I nostri valori" />
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="font-antonio text-2xl md:text-3xl tracking-[0.15em] uppercase text-zinc-100">
              Cosa portiamo sul set
            </h3>
            <p className="font-montserrat text-sm text-zinc-400">
              Qualità professionale e vicinanza umana, per contenuti non solo belli ma efficaci.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-900/40">
                  <i className={`${v.icon} text-violet-400 text-sm`} />
                </div>
                <h4 className="font-antonio text-base tracking-wide text-white">{v.title}</h4>
                <p className="font-montserrat text-xs leading-relaxed text-zinc-400">{v.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
            <Link href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-violet-400 px-6 py-2.5 text-xs font-montserrat font-semibold tracking-wide text-[#050211] shadow-[0_0_26px_rgba(167,139,250,0.7)] transition hover:bg-violet-300 hover:shadow-[0_0_40px_rgba(167,139,250,0.9)]">
              Richiedi un preventivo
            </Link>
          </div>
        </section>

        {/* ── DOVE LAVORIAMO ── */}
        <section className="space-y-8" aria-label="Dove lavoriamo" data-aos="fade-up">
          <Divider icon="fa-solid fa-location-dot" label="Dove lavoriamo" />
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] items-stretch">
            <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-7 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-center space-y-4">
              <h3 className="font-antonio text-2xl md:text-3xl text-white leading-snug">
                Con base a Pomezia,
                <span className="block text-violet-300">alle porte di Roma.</span>
              </h3>
              <p className="font-montserrat text-sm leading-relaxed text-zinc-300">
                Future Frames ha sede a <strong className="text-white">Pomezia (RM)</strong>, ma lavoriamo
                in tutta l&apos;area metropolitana di <strong className="text-white">Roma</strong>: eventi,
                aziende, location private e spazi culturali.
              </p>
              <p className="font-montserrat text-sm leading-relaxed text-zinc-400">
                Per progetti strutturati valutiamo <strong className="text-zinc-300">trasferte</strong> in
                altre città italiane, in accordo con le esigenze del cliente.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                {[
                  { icon: "fa-solid fa-location-dot", text: "Pomezia, Roma — Lazio" },
                  { icon: "fa-solid fa-map", text: "Provincia di Roma e dintorni" },
                  { icon: "fa-solid fa-car", text: "Trasferte su accordo" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-violet-500/25 bg-violet-900/30">
                      <i className={`${item.icon} text-violet-400 text-[0.6rem]`} />
                    </div>
                    <span className="font-montserrat text-xs text-zinc-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-violet-500/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)] min-h-[320px]">
              <iframe
                title="Mappa Pomezia"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0 grayscale contrast-110 opacity-80 transition duration-500 hover:grayscale-0 hover:opacity-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7469.59805370534!2d12.494142676655008!3d41.669457171703194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132599a4cfbcba4b%3A0xdee4c5c2d3b0f27b!2s00071%20Pomezia%20RM!5e0!3m2!1sit!2sit!4v1733589000000!5m2!1sit!2si"
              />
            </div>
          </div>
        </section>

        {/* ── DICONO DI NOI ── */}
        <section className="space-y-8 pb-20" aria-label="Recensioni clienti" data-aos="fade-up">
          <Divider icon="fa-solid fa-star" label="Recensioni" />

          <div className="text-center space-y-2">
            <h3 className="font-antonio text-2xl md:text-3xl tracking-[0.15em] uppercase text-zinc-100">
              Dicono di noi
            </h3>
            <p className="font-montserrat text-sm text-zinc-400 max-w-xl mx-auto">
              Ogni progetto è una storia condivisa. Ecco cosa dicono i clienti che hanno scelto
              Future Frames per raccontare la loro.
            </p>
          </div>

          <ReviewsSlideshow />

          {/* Video + virgolettato */}
          <div className="grid gap-5 md:grid-cols-[1.4fr_1fr] items-stretch">
            <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-zinc-900/80 shadow-[0_20px_65px_rgba(89,28,135,0.3)] min-h-[320px]">
              {/*
                Sostituisci con iframe Vimeo/YouTube reale:
                <iframe
                  src="https://player.vimeo.com/video/ID?autoplay=0&title=0&byline=0"
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              */}
              <video className="absolute inset-0 h-full w-full object-cover opacity-70"
                src="/videos/ToyotaXReply.mp4" loop muted playsInline />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center group/play cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition group-hover/play:border-violet-400/80 group-hover/play:bg-violet-600/80 group-hover/play:shadow-[0_0_40px_rgba(139,92,246,0.7)]">
                    <i className="fa-solid fa-play ml-1 text-xl text-white" />
                  </div>
                  <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.25em] text-zinc-300">
                    Guarda la video recensione
                  </span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star text-amber-400 text-[0.6rem]" />
                  ))}
                </div>
                <p className="font-antonio text-base text-white">Luca T. — Spot aziendale</p>
                <p className="font-montserrat text-[0.65rem] text-zinc-400">Milano, 2024</p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
              <div className="space-y-4">
                <span className="font-antonio text-[4rem] leading-none text-violet-500/20 select-none">"</span>
                <div className="flex gap-0.5 -mt-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star text-amber-400 text-xs" />
                  ))}
                </div>
                <p className="font-montserrat text-sm leading-relaxed text-zinc-200 italic">
                  &ldquo;Avevamo bisogno di uno spot che comunicasse davvero i valori della nostra
                  azienda. Future Frames ha capito subito la direzione e ha consegnato qualcosa che va
                  ben oltre le aspettative. Lo usiamo ancora oggi come biglietto da visita.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-5 mt-5 border-t border-violet-500/15">
                <div className="h-10 w-10 flex-shrink-0 rounded-full border border-violet-400/20 bg-violet-900/40 flex items-center justify-center">
                  <i className="fa-solid fa-user text-violet-400 text-sm" />
                </div>
                <div>
                  <p className="font-antonio text-sm tracking-wide text-white">Luca T.</p>
                  <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.15em] text-violet-300">
                    CEO · Azienda tech, Milano
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Trustpilot */}
          <a href="https://www.trustpilot.com/review/futureframes.it"
            target="_blank" rel="noopener noreferrer"
            className="group relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-[#00b67a]/25 bg-gradient-to-r from-[#001a10]/80 via-[#0d0b2a] to-[#001a10]/80 px-8 py-8 shadow-[0_8px_40px_rgba(0,182,122,0.1)] transition hover:border-[#00b67a]/50 hover:shadow-[0_12px_50px_rgba(0,182,122,0.2)]"
          >
            <div className="pointer-events-none absolute -left-20 top-0 h-40 w-40 rounded-full bg-[#00b67a]/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-40 w-40 rounded-full bg-[#00b67a]/10 blur-3xl" />
            <div className="relative flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-[#00b67a]/30 bg-[#00b67a]/10">
                <i className="fa-solid fa-star text-[#00b67a] text-2xl" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="font-antonio text-xl tracking-wide text-white">Trustpilot</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-[#00b67a] text-sm" />
                    ))}
                  </div>
                </div>
                <p className="font-montserrat text-sm text-zinc-300">
                  <span className="text-white font-semibold">5.0</span> su 5 —{" "}
                  <span className="text-[#00b67a]">Eccellente</span>
                </p>
                <p className="font-montserrat text-xs text-zinc-500 mt-1">
                  Basato sulle recensioni verificate dei nostri clienti
                </p>
              </div>
            </div>
            <div className="relative flex flex-col items-center sm:items-end gap-2">
              <span className="font-montserrat text-sm text-zinc-300 text-center sm:text-right">
                Leggi tutte le recensioni<br className="hidden sm:block" /> dei nostri clienti
              </span>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00b67a]/50 bg-[#00b67a]/10 px-5 py-2 transition group-hover:bg-[#00b67a]/20">
                <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#00b67a]">
                  Vai a Trustpilot
                </span>
                <i className="fa-solid fa-arrow-right text-[#00b67a] text-xs" />
              </div>
            </div>
          </a>

        </section>
      </div>
    </section>
  );
}