"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    try {
      if (PUBLIC_KEY && typeof emailjs.init === "function") emailjs.init(PUBLIC_KEY);
    } catch (e) { }
  }, []);

  const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);
  const isValidPhone = (v) => /^\+?[0-9\s().-]{7,20}$/.test(v);
  const nameTrim = name.trim(), emailTrim = email.trim();
  const phoneTrim = phone.trim(), messageTrim = message.trim();
  const emailValid = isValidEmail(emailTrim);
  const phoneValid = phoneTrim === "" || isValidPhone(phoneTrim);
  const formValid = nameTrim.length >= 2 && emailValid && phoneValid && messageTrim.length >= 6;

  async function onSubmit(e) {
    e.preventDefault();
    if (!formValid) return;
    setLoading(true); setStatus(null);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID,
        { from_name: nameTrim, from_email: emailTrim, phone: phoneTrim, message: messageTrim },
        PUBLIC_KEY || undefined
      );
      setStatus("success");
      setName(""); setEmail(""); setPhone(""); setMessage("");
    } catch (err) {
      setStatus("error");
    } finally { setLoading(false); }
  }

  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={onSubmit} noValidate>
      <label className="flex flex-col gap-2 font-montserrat text-xs sm:text-sm text-zinc-200">
        <span>Nome <span className="text-violet-300">*</span></span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required minLength={2}
          className="rounded-xl border border-violet-500/70 bg-black/60 px-3.5 py-2.5 text-sm text-white shadow-[0_0_18px_rgba(160,32,240,0.55)] outline-none transition focus:border-violet-300 focus:shadow-[0_0_26px_rgba(167,139,250,0.9)]" />
      </label>

      <label className="flex flex-col gap-2 font-montserrat text-xs sm:text-sm text-zinc-200">
        <span>Email <span className="text-violet-300">*</span></span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="nome@esempio.com"
          className="rounded-xl border border-violet-500/70 bg-black/60 px-3.5 py-2.5 text-sm text-white shadow-[0_0_18px_rgba(160,32,240,0.55)] outline-none transition placeholder:text-zinc-500 focus:border-violet-300 focus:shadow-[0_0_26px_rgba(167,139,250,0.9)]" />
        {!emailValid && emailTrim.length > 0 && (
          <small className="text-[0.75rem] text-red-400">Inserisci un&apos;email valida.</small>
        )}
      </label>

      <label className="flex flex-col gap-2 font-montserrat text-xs sm:text-sm text-zinc-200">
        <span>Telefono <span className="text-zinc-400">(facoltativo)</span></span>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+39 345 0000000"
          className="rounded-xl border border-violet-500/40 bg-black/60 px-3.5 py-2.5 text-sm text-white shadow-[0_0_12px_rgba(160,32,240,0.35)] outline-none transition placeholder:text-zinc-500 focus:border-violet-300 focus:shadow-[0_0_22px_rgba(167,139,250,0.7)]" />
        {!phoneValid && phoneTrim.length > 0 && (
          <small className="text-[0.75rem] text-red-400">Inserisci un numero valido.</small>
        )}
      </label>

      <label className="flex flex-col gap-2 font-montserrat text-xs sm:text-sm text-zinc-200">
        <span>Messaggio <span className="text-violet-300">*</span></span>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required minLength={6} rows={5}
          placeholder="Scrivi qui il tuo messaggio..."
          className="min-h-[120px] resize-vertical rounded-xl border border-violet-500/60 bg-black/60 px-3.5 py-3 text-sm text-white shadow-[0_0_20px_rgba(160,32,240,0.45)] outline-none transition placeholder:text-zinc-500 focus:border-violet-300 focus:shadow-[0_0_28px_rgba(167,139,250,0.85)]" />
      </label>

      <div className="mt-2 flex justify-center">
        <button type="submit" disabled={!formValid || loading}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-600 px-8 py-2.5 text-xs sm:text-sm font-antonio tracking-[0.2em] uppercase text-white shadow-[0_18px_45px_rgba(88,28,135,0.7)] transition hover:brightness-110 hover:shadow-[0_24px_60px_rgba(129,140,248,0.9)] disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Invio..." : "Invia messaggio"}
        </button>
      </div>

      {status === "success" && (
        <p className="mt-2 text-center font-montserrat text-sm text-emerald-400">Messaggio inviato. Ti risponderemo presto.</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-center font-montserrat text-sm text-red-400">Errore durante l&apos;invio. Riprova tra qualche secondo.</p>
      )}
    </form>
  );
}

const services = [
  {
    id: "eventi",
    img: "/images/eventi.webp",
    title: "EVENTI",
    text: "Fotografia e video per eventi privati e aziendali.",
  },
  {
    id: "aziende",
    img: "/images/azienda.webp",
    title: "AZIENDE",
    text: "Raccontiamo la tua azienda con immagini che non si limitano a mostrare, ma comunicano valore.",
  },
  {
    id: "cerimonie",
    img: "/images/sfondo.jpg",
    title: "CERIMONIE",
    text: "Servizi foto e video per matrimoni, battesimi, 18esimi e anniversari.",
  },
  {
    id: "food",
    img: "/images/introimg6.webp",
    title: "FOOD",
    text: "Shooting fotografico e video per ristoranti, chef e aziende del settore.",
  },
  {
    id: "montaggio",
    img: "/images/montaggio.webp",
    title: "MONTAGGIO",
    text: "Servizio di post-produzione e editing professionale.",
  },
];

export default function Intro() {
  return (
    <section
      id="intro"
      aria-label="sezione riassuntiva del sito"
      className="bg-black text-white"
    >
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16 space-y-20 sm:space-y-24 min-h-screen bg-gradient-to-b from-black via-[#0a0b33ad] to-[#45115d5c]">
          <div className="relative mx-auto max-w-6xl px-0 sm:px-4 py-10 sm:py-16 space-y-16 sm:space-y-20">
            {/* INTRO 1 – frase + card destra */}
            <div className="mx-auto max-w-6xl px-0 sm:px-4">
              <div className="overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-900/30 via-[#151333] to-slate-950/90 shadow-[0_0_45px_rgba(124,58,237,0.35)]">
                <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                  {/* TESTO */}
                  <div className="px-6 py-10 sm:px-10 sm:py-12 lg:py-16">
                    <p className="font-montserrat text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-violet-300">
                      FUTURE FRAMES
                    </p>

                    <h2 className="mt-4 font-antonio text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight text-white">
                      Un&apos;agenzia creativa
                      <span className="block text-violet-300">
                        per immagini che restano.
                      </span>
                    </h2>

                    <p className="mt-5 max-w-xl font-montserrat text-sm sm:text-base leading-relaxed text-slate-100/90">
                      Future Frames è un&apos;agenzia specializzata in{" "}
                      <span className="font-semibold">fotografia</span> e{" "}
                      <span className="font-semibold">
                        videomaking professionale
                      </span>
                      : raccontiamo persone, aziende ed eventi con un linguaggio
                      visivo pulito, emotivo e contemporaneo.
                    </p>

                    <p className="mt-4 max-w-xl font-montserrat text-sm sm:text-base leading-relaxed text-slate-300">
                      Diamo forma ai tuoi momenti e alla tua identità con contenuti
                      pensati per durare nel tempo, dai social alle campagne più
                      strutturate.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href="/portfolio"
                        className="inline-flex items-center justify-center rounded-full bg-violet-400 px-5 py-2.5 text-xs sm:text-sm font-montserrat font-semibold tracking-wide text-[#050211] shadow-[0_0_26px_rgba(167,139,250,0.7)] transition hover:bg-violet-300 hover:shadow-[0_0_40px_rgba(167,139,250,0.9)]"
                      >
                        Scopri il nostro portfolio
                      </Link>
                      <Link
                        href="/servizi"
                        className="inline-flex items-center justify-center rounded-full border border-violet-300/70 bg-transparent px-5 py-2.5 text-xs sm:text-sm font-montserrat font-semibold tracking-wide text-violet-100/90 shadow-[0_0_18px_rgba(129,140,248,0.5)] transition hover:bg-white/5"
                      >
                        Esplora i servizi
                      </Link>
                    </div>
                  </div>

                  {/* IMMAGINE / CARD DESTRA */}
                  <div className="relative h-full lg:mt-16">
                    <div className="relative mx-6 mb-10 lg:mb-0 lg:mr-10">
                      <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-violet-400/40 bg-black/40 shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
                        <img
                          src="/images/introimg1.webp"
                          alt="Coppia durante le riprese di un matrimonio"
                          className="h-full w-full object-cover object-center"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/0 to-transparent" />
                      </div>

                      <div className="absolute -bottom-7 left-8 rounded-2xl border border-violet-400/40 bg-black/75 px-4 py-3 backdrop-blur-md shadow-[0_18px_35px_rgba(0,0,0,0.9)]">
                        <p className="font-antonio text-[0.7rem] uppercase tracking-[0.26em] text-violet-200">
                          Behind the scenes
                        </p>
                        <p className="mt-1 max-w-xs font-montserrat text-[0.78rem] leading-snug text-slate-100">
                          Ogni frame è curato nei dettagli:
                          dalla luce al montaggio
                          finale.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVIZI – griglia */}
            <section
              aria-label="Panoramica servizi"
              className="space-y-6"
              data-aos="fade-up"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-antonio text-xl md:text-2xl tracking-[0.18em] uppercase text-zinc-100">
                  I NOSTRI SERVIZI
                </h3>
                <Link
                  href="/servizi"
                  className="hidden md:inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200"
                >
                  Vai alla pagina servizi
                  <i className="fa-solid fa-circle-arrow-right" />
                </Link>
              </div>

              <div className="md:grid gap-4 md:grid-cols-3">
                {services.map((s) => (
                  <Link key={s.id} href={`/servizi#${s.id}`}>
                    <article className="group my-4 lg:my-0 relative h-44 sm:h-56 overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/70 shadow-[0_20px_55px_rgba(0,0,0,0.75)]">
                      <img
                        src={s.img}
                        alt={s.title}
                        className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-80"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      <div className="relative flex h-full flex-col justify-end p-4">
                        <h4 className="font-antonio text-lg tracking-[0.18em] uppercase text-white mb-1">
                          {s.title}
                        </h4>
                        <p className="font-montserrat text-xs text-zinc-200 leading-snug">
                          {s.text}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
              <Link
                href="/servizi"
                className="mt-3 inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200 md:hidden"
              >
                Scopri di più sui servizi
                <i className="fa-solid fa-circle-arrow-right" />
              </Link>
            </section>
            {/* VIDEO TEASER PORTFOLIO — separato dai servizi */}
            <section aria-label="Anteprima portfolio" className="space-y-5" data-aos="fade-up">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-film text-violet-400 text-xs" />
                  <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-400">
                    I nostri lavori
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-antonio text-xl md:text-2xl tracking-[0.15em] uppercase text-zinc-100">
                    Dal Portfolio
                  </h3>
                  <p className="mt-1 font-montserrat text-xs text-zinc-400">
                    Una selezione dei progetti che ci rappresentano di più.
                  </p>
                </div>
                <Link href="/portfolio" className="hidden md:inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200 transition">
                  Tutti i progetti <i className="fa-solid fa-circle-arrow-right" />
                </Link>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-violet-500/40 bg-zinc-900/80 shadow-[0_20px_65px_rgba(89,28,135,0.4)]">
                <video className="absolute inset-0 h-full w-full object-cover opacity-65"
                  src="/videos/ToyotaXReply.mp4" autoPlay loop muted playsInline />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/30" />
                <Link href="/portfolio">
                  <div className="relative flex h-64 md:h-72 flex-col justify-between px-6 md:px-10 py-6 md:py-8">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/50 bg-violet-900/60 px-3 py-1 text-[0.6rem] font-montserrat uppercase tracking-[0.2em] text-violet-300 backdrop-blur-sm">
                        <i className="fa-solid fa-play text-[0.5rem]" /> Spot aziendale
                      </span>
                    </div>
                    <div>
                      <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.25em] text-violet-300 mb-2">
                        Toyota × Reply
                      </p>
                      <p className="font-antonio text-2xl md:text-3xl max-w-lg leading-snug text-white">
                        Una selezione dei nostri lavori in un unico flusso cinematografico.
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200 transition">
                        Esplora tutti i progetti <i className="fa-solid fa-circle-arrow-right" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
            {/* BLOG */}
            <section aria-label="Anteprima blog" className="space-y-5" data-aos="fade-up">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-pen-nib text-violet-400 text-xs" />
                  <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-400">
                    Risorse & ispirazioni
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-antonio text-xl md:text-2xl tracking-[0.15em] uppercase text-zinc-100">Dal Blog</h3>
                  <p className="mt-1 font-montserrat text-xs text-zinc-400">Storie, consigli e dietro le quinte dei nostri progetti.</p>
                </div>
                <Link href="/blog" className="hidden md:inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200 transition">
                  Tutti gli articoli <i className="fa-solid fa-circle-arrow-right" />
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-[1fr_1.6fr] items-stretch">
                <div className="flex flex-col justify-between rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                  <div>
                    <p className="font-montserrat text-sm leading-relaxed text-zinc-300">
                      Sul nostro blog condividiamo riflessioni sul mestiere, consigli pratici per valorizzare i contenuti visivi e racconti dietro le quinte dei nostri progetti.
                    </p>
                    <p className="mt-4 font-montserrat text-sm leading-relaxed text-zinc-400">
                      Da come scegliere il servizio fotografico giusto, a come raccontare un&apos;azienda attraverso le immagini: ogni articolo nasce dall&apos;esperienza sul campo.
                    </p>
                  </div>
                  <Link href="/blog" className="mt-8 inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200 transition">
                    Leggi tutti gli articoli <i className="fa-solid fa-circle-arrow-right" />
                  </Link>
                </div>

                <Link href="/blog/ultimo-articolo" className="group block">
                  <article className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-white/8 bg-zinc-900/70 shadow-[0_20px_55px_rgba(0,0,0,0.75)]">
                    <img src="/images/introimg1.webp" alt="Anteprima ultimo articolo"
                      className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-65" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
                    <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
                      <div>
                        <span className="inline-flex items-center rounded-full border border-violet-400/40 bg-violet-900/50 px-2.5 py-0.5 text-[0.6rem] font-montserrat uppercase tracking-[0.2em] text-violet-300 backdrop-blur-sm">
                          Ultimo articolo
                        </span>
                      </div>
                      <div>
                        <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.25em] text-violet-300 mb-2">
                          Fotografia · 5 min di lettura
                        </p>
                        <h4 className="font-antonio text-xl md:text-2xl leading-snug text-white transition group-hover:text-violet-200">
                          Come raccontare un matrimonio attraverso la luce naturale
                        </h4>
                        <p className="mt-2 font-montserrat text-xs text-zinc-300 leading-relaxed line-clamp-2">
                          Un approfondimento su come utilizziamo la luce disponibile per creare immagini cinematografiche nelle cerimonie più intime.
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-[0.18em] text-violet-400 transition group-hover:text-violet-300">
                          Leggi l&apos;articolo <i className="fa-solid fa-arrow-right text-[0.6rem]" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            </section>
            {/* VIDEOLEZIONI */}
            <section aria-label="Videolezioni Future Frames" className="space-y-5" data-aos="fade-up">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-clapperboard text-violet-400 text-xs" />
                  <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-400">
                    Impara con noi
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-antonio text-xl md:text-2xl tracking-[0.15em] uppercase text-zinc-100">Videolezioni & Tutorial</h3>
                  <p className="mt-1 font-montserrat text-xs text-zinc-400">Tecniche e strumenti del nostro mestiere, condivisi gratuitamente.</p>
                </div>
                <a href="https://vimeo.com/futureframes" target="_blank" rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200 transition">
                  Canale Vimeo <i className="fa-solid fa-circle-arrow-right" />
                </a>
              </div>

              <div className="grid gap-5 md:grid-cols-[1.6fr_1fr] items-stretch">
                <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-zinc-900/80 shadow-[0_20px_65px_rgba(89,28,135,0.3)] min-h-[260px]">
                  <video className="absolute inset-0 h-full w-full object-cover opacity-55"
                    src="/videos/ToyotaXReply.mp4" autoPlay loop muted playsInline />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <a href="https://vimeo.com/futureframes" target="_blank" rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center group/play">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition group-hover/play:border-violet-400/80 group-hover/play:bg-violet-600/80 group-hover/play:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                      <i className="fa-solid fa-play ml-0.5 text-lg text-white" />
                    </div>
                  </a>
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.25em] text-violet-300 mb-1">In evidenza</p>
                    <p className="font-antonio text-base md:text-lg text-white">Come impostare la luce in studio</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                  <div>
                    <p className="font-montserrat text-sm leading-relaxed text-zinc-300">
                      Abbiamo creato una serie di videolezioni gratuite per condividere le tecniche che usiamo ogni giorno: dall&apos;illuminazione al color grading, dal montaggio narrativo alla fotografia in location.
                    </p>
                    <p className="mt-4 font-montserrat text-sm leading-relaxed text-zinc-400">
                      Tutto il materiale è disponibile gratuitamente sul nostro canale Vimeo, pensato per fotografi e videomaker che vogliono crescere.
                    </p>
                  </div>
                  <a href="https://vimeo.com/futureframes" target="_blank" rel="noopener noreferrer"
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-violet-300/60 bg-transparent px-5 py-2.5 text-xs font-montserrat font-semibold tracking-wide text-violet-100/90 shadow-[0_0_18px_rgba(129,140,248,0.4)] transition hover:bg-white/5">
                    <i className="fa-brands fa-vimeo text-sm" /> Vai al canale Vimeo
                  </a>
                </div>
              </div>
            </section>

            {/* TEAM */}
            <section
              className="relative grid items-center gap-12 md:grid-cols-2 pb-20"
              aria-label="Team Future Frames"
              data-aos="fade-up"
            >
              {/* COLONNA SINISTRA — TESTO */}
              <div className="text-left space-y-5">
                <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-violet-300">
                  Il team
                </p>

                <h3 className="font-antonio font-semibold text-2xl md:text-3xl text-white">
                  Due professionisti, una visione condivisa.
                </h3>

                <p className="font-montserrat text-sm leading-relaxed text-zinc-300 max-w-xl">
                  <strong>Gloria Margarino</strong>, fotografa e videomaker, e{" "}
                  <strong>Ivan Scrofani</strong>, video editor, guidano Future Frames
                  unendo sensibilità visiva e montaggio narrativo. Ogni progetto
                  nasce dal dialogo con il cliente e dalla cura per i dettagli.
                </p>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200"
                >
                  Conosci il nostro team
                  <i className="fa-solid fa-circle-arrow-right" />
                </Link>
              </div>

              {/* COLONNA DESTRA — IMMAGINI */}
              <Link
                href="/about"
                className="relative w-full justify-self-end flex justify-end"
                aria-label="Vai alla pagina About"
              >
                {/* box immagini: niente overflow-hidden (serve vedere l’incrocio) */}
                <div className="relative w-full max-w-[560px] h-[420px] md:h-[460px]">
                  {/* Glow */}
                  <div className="pointer-events-none absolute -top-10 right-10 h-64 w-64 rounded-3xl bg-gradient-to-br from-violet-600/60 via-fuchsia-500/30 to-sky-500/25 blur-3xl" />

                  {/* Gloria (dietro) */}
                  <div className="absolute top-2 right-40 md:right-45 z-10 w-[180px] h-[300px] md:w-[200px] md:h-[350px] rounded-3xl overflow-hidden border border-white/15 bg-zinc-900/40 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
                    <img
                      src="/images/gloria2.jpeg"
                      alt="Gloria Margarino"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Ivan (davanti) — più in basso e un pelo più a destra */}
                  <div className="absolute bottom-0 right-0 z-20 w-[180px] h-[300px] md:w-[200px] md:h-[350px] rounded-3xl overflow-hidden border border-white/15 bg-zinc-900/40 shadow-[0_25px_70px_rgba(0,0,0,0.92)]">
                    <img
                      src="/images/ivan.jpeg"
                      alt="Ivan Scrofani"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Link>
            </section>
            {/* CONTATTI + MAPPA */}
            <section id="contatti" aria-label="Contatti e posizione" className="space-y-5 pb-20" data-aos="fade-up">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-location-dot text-violet-400 text-xs" />
                  <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-400">Dove siamo</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
              </div>

              <div>
                <h3 className="font-antonio text-xl md:text-2xl tracking-[0.15em] uppercase text-zinc-100">
                  Parliamo del tuo progetto
                </h3>
                <p className="mt-1 font-montserrat text-xs text-zinc-400 max-w-2xl">
                  Siamo basati a <span className="text-violet-300 font-semibold">Pomezia</span> e operiamo principalmente
                  nel territorio della provincia di Roma. Disponibili a trasferte su accordo con il cliente.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2 items-start">
                {/* Form */}
                <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                  <p className="font-montserrat text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-violet-300 mb-1">Scrivici</p>
                  <h4 className="font-antonio text-lg md:text-xl tracking-wide text-white mb-5">Raccontaci il tuo progetto</h4>
                  <ContactForm />
                </div>

                {/* Mappa + info */}
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-violet-500/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                    <iframe
                      title="Future Frames — Pomezia, Roma"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47696.4!2d12.5050!3d41.6700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13258b0e6b3f7f5f%3A0x4073a08f5ba1c24c!2sPomezia%20RM!5e0!3m2!1sit!2sit!4v1700000000000"
                      width="100%" height="280"
                      style={{ border: 0, display: "block" }}
                      allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale contrast-110 opacity-80 transition duration-500 hover:grayscale-0 hover:opacity-100"
                    />
                  </div>

                  <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-900/40">
                        <i className="fa-solid fa-location-dot text-violet-400 text-xs" />
                      </div>
                      <div>
                        <p className="font-montserrat text-[0.7rem] uppercase tracking-[0.2em] text-violet-300 mb-0.5">Sede</p>
                        <p className="font-montserrat text-sm text-zinc-200">Pomezia, Roma — Lazio</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-900/40">
                        <i className="fa-solid fa-map text-violet-400 text-xs" />
                      </div>
                      <div>
                        <p className="font-montserrat text-[0.7rem] uppercase tracking-[0.2em] text-violet-300 mb-0.5">Area operativa</p>
                        <p className="font-montserrat text-sm text-zinc-200">
                          Provincia di Roma e dintorni.{" "}
                          <span className="text-zinc-400">Trasferte disponibili su accordo con il cliente.</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-900/40">
                        <i className="fa-solid fa-clock text-violet-400 text-xs" />
                      </div>
                      <div>
                        <p className="font-montserrat text-[0.7rem] uppercase tracking-[0.2em] text-violet-300 mb-0.5">Risposta</p>
                        <p className="font-montserrat text-sm text-zinc-200">Di solito entro 24–48 ore lavorative.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
