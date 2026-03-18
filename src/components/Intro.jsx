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
    id: "podcast",
    img: "/images/sfondo.jpg",
    title: "PODCAST",
    text: "Servizi foto e video per interviste, registrazioni e contenuti audiovisivi.",
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
        <div className="px-4 py-10 sm:py-16 space-y-20 sm:space-y-24 min-h-screen" style={{ background: "radial-gradient(ellipse at center, #0d0b2a 0%, #06050f 60%, #000000 100%)" }}>
          <div className="relative mx-auto max-w-6xl px-0 sm:px-4 py-10 sm:py-16 space-y-16 sm:space-y-20">
            {/* ── HERO CARD ── */}
            <div className="mx-auto max-w-6xl px-0 sm:px-4">
              <div className="overflow-hidden rounded-3xl border border-white/8 bg-[#080618] shadow-[0_0_80px_rgba(124,58,237,0.25)]">
                <div className="grid items-stretch lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">

                  {/* ── TESTO ── */}
                  <div className="relative px-8 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-20 flex flex-col justify-center overflow-hidden">

                    {/* Glow di sfondo sul testo */}
                    <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-violet-600/15 blur-[80px]" />
                    <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-fuchsia-600/10 blur-[60px]" />

                    {/* Label agenzia */}
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-px w-8 bg-violet-500/40" />
                      <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.55em] text-violet-400/80">
                        Fotografia & Videomaking
                      </span>
                    </div>

                    {/* Titolo principale */}
                    <div className="space-y-1 mb-6">
                      <h2 className="font-antonio leading-[1.0] text-white"
                        style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>
                        Immagini
                      </h2>
                      <h2 className="font-antonio leading-[1.0] text-white"
                        style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>
                        che restano
                      </h2>
                      <h2 className="font-antonio leading-[1.0] text-violet-300"
                        style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>
                        nel tempo.
                      </h2>
                    </div>

                    {/* Testo descrittivo — più diretto e con personalità */}
                    <p className="max-w-md font-montserrat text-sm leading-relaxed text-zinc-400 mb-8">
                      Future Frames è un’agenzia creativa specializzata in <span className="text-zinc-200">Fotografia</span> e{" "}
                      <span className="text-zinc-200">videomaking </span> professionale.
                      <br />
                      Diamo forma ai tuoi momenti e alla tua identità, con immagini che comunicano e restano nel tempo.
                    </p>

                    {/* Stats */}
                    <div className="flex gap-8 mb-10 border-t border-zinc-800 pt-8">
                      {[
                        { num: "—", label: "Progetti completati" },
                        { num: "—", label: "Anni di esperienza" },
                        { num: "—", label: "Clienti soddisfatti" },
                      ].map((s) => (
                        <div key={s.label}>
                          <p className="font-antonio text-2xl text-violet-300">{s.num}</p>
                          <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.18em] text-zinc-600 mt-0.5 leading-tight">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-wrap gap-3">
                      <Link href="/about"
                        className="inline-flex items-center gap-2 rounded-full bg-violet-400 px-6 py-2.5 text-xs font-montserrat font-semibold tracking-wide text-[#050211] shadow-[0_0_26px_rgba(167,139,250,0.6)] transition hover:bg-violet-300 hover:shadow-[0_0_40px_rgba(167,139,250,0.9)]">
                        Scopri di più
                        <i className="fa-solid fa-arrow-right text-[0.6rem]" />
                      </Link>
                    </div>
                  </div>

                  {/* ── IMMAGINE ── */}
                  <div className="relative min-h-[360px] lg:min-h-0 overflow-hidden">
                    <img
                      src="/images/introimg1.webp"
                      alt="Future Frames — behind the scenes"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 hover:scale-[1.04]"
                    />

                    {/* Gradienti fusione */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#080618] via-[#080618]/30 to-transparent hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080618] via-[#080618]/20 to-transparent lg:hidden" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Badge bottom */}
                    <div className="absolute bottom-6 left-6 right-6 z-10">
                      <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/65 px-4 py-4 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.8)] max-w-[260px]">
                        <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-violet-400/25 bg-violet-900/40">
                          <i className="fa-solid fa-film text-violet-400 text-[0.6rem]" />
                        </div>
                        <div>
                          <p className="font-antonio text-sm text-white leading-tight">
                            Ogni frame è una scelta.
                          </p>
                          <p className="font-montserrat text-[0.62rem] text-zinc-400 mt-0.5 leading-snug">
                            Dalla luce al montaggio, niente è lasciato al caso.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ── SERVIZI ── */}
            <section aria-label="Panoramica servizi" className="space-y-5" data-aos="fade-up">

              {/* Separatore */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-camera text-violet-400 text-xs" />
                  <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-400">
                    Cosa facciamo
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
              </div>

              {/* Intestazione */}
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-antonio text-xl md:text-2xl tracking-[0.15em] uppercase text-zinc-100">
                    I Nostri Servizi
                  </h3>
                  <p className="mt-1 font-montserrat text-xs text-zinc-400">
                    Dalla fotografia al videomaking, ogni formato raccontato con cura.
                  </p>
                </div>
                <Link
                  href="/servizi"
                  className="hidden md:inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200 transition"
                >
                  Tutti i servizi
                  <i className="fa-solid fa-circle-arrow-right" />
                </Link>
              </div>

              {/* Griglia cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {services.map((s) => (
                  <Link key={s.id} href={`/servizi#${s.id}`}>
                    <article className="group relative h-52 sm:h-56 overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/70 shadow-[0_20px_55px_rgba(0,0,0,0.75)] transition duration-300 hover:border-violet-500/30 hover:shadow-[0_20px_55px_rgba(89,28,135,0.3)]">
                      <img
                        src={s.img}
                        alt={s.title}
                        className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-500 group-hover:scale-[1.05] group-hover:opacity-75"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      {/* Freccia hover */}
                      <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/40 opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                        <i className="fa-solid fa-arrow-right text-[0.6rem] text-violet-300" />
                      </div>
                      <div className="relative flex h-full flex-col justify-end p-4">
                        <h4 className="font-antonio text-lg tracking-[0.18em] uppercase text-white mb-1">
                          {s.title}
                        </h4>
                        <p className="font-montserrat text-xs text-zinc-300 leading-snug">
                          {s.text}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              <Link
                href="/servizi"
                className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200 md:hidden transition"
              >
                Tutti i servizi
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
                    Dal Nostro Portfolio
                  </h3>
                  <p className="mt-1 font-montserrat text-xs text-zinc-400">
                    I nostri lavori, raccontati attraverso immagini e movimento.
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
                        Esplora il portfolio <i className="fa-solid fa-circle-arrow-right" />
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

            {/* ── TEAM ── */}
            <section
              className="relative pb-20"
              aria-label="Team Future Frames"
              data-aos="fade-up"
            >
              {/* Separatore coerente con le altre sezioni */}
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-users text-violet-400 text-xs" />
                  <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-400">
                    Chi siamo
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
              </div>

              <div className="overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 shadow-[0_0_45px_rgba(124,58,237,0.15)]">
                <div className="grid items-center gap-0 md:grid-cols-2">

                  {/* COLONNA SINISTRA — TESTO */}
                  <div className="px-8 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16 space-y-6">
                    <div>
                      <p className="font-montserrat text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-violet-300">
                        Il team
                      </p>
                      <h3 className="mt-3 font-antonio text-2xl sm:text-3xl md:text-[2rem] leading-tight text-white">
                        Due professionisti,
                        <span className="block text-violet-300">una visione condivisa.</span>
                      </h3>
                    </div>

                    <p className="font-montserrat text-sm leading-relaxed text-zinc-300 max-w-md">
                      <strong className="text-white">Gloria Margarino</strong>, fotografa e videomaker, e{" "}
                      <strong className="text-white">Ivan Scrofani</strong>, video editor, guidano Future Frames
                      unendo sensibilità visiva e montaggio narrativo. Ogni progetto nasce dal dialogo con il
                      cliente e dalla cura per i dettagli.
                    </p>

                    {/* Mini cards team */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 rounded-2xl border border-violet-500/15 bg-white/[0.03] px-4 py-3">
                        <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-xl border border-violet-400/20">
                          <img src="/images/gloria2.jpeg" alt="Gloria" className="h-full w-full object-cover" loading="lazy" />
                        </div>
                        <div>
                          <p className="font-antonio text-sm tracking-wide text-white">Gloria Margarino</p>
                          <p className="font-montserrat text-[0.65rem] text-violet-300 tracking-[0.15em] uppercase">Co-Founder Fotografa & Videomaker</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-2xl border border-violet-500/15 bg-white/[0.03] px-4 py-3">
                        <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-xl border border-violet-400/20">
                          <img src="/images/ivan.jpeg" alt="Ivan" className="h-full w-full object-cover" loading="lazy" />
                        </div>
                        <div>
                          <p className="font-antonio text-sm tracking-wide text-white">Ivan Scrofani</p>
                          <p className="font-montserrat text-[0.65rem] text-violet-300 tracking-[0.15em] uppercase">Co-Founder & Video Editor</p>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 rounded-full border border-violet-300/60 bg-transparent px-5 py-2.5 text-xs font-montserrat font-semibold tracking-wide text-violet-100/90 shadow-[0_0_18px_rgba(129,140,248,0.4)] transition hover:bg-white/5"
                    >
                      Conosci il nostro team
                      <i className="fa-solid fa-circle-arrow-right" />
                    </Link>
                  </div>

                  {/* COLONNA DESTRA — IMMAGINI */}
                  <Link
                    href="/about"
                    aria-label="Vai alla pagina About"
                    className="relative flex h-[420px] md:h-[520px] items-end justify-end overflow-hidden"
                  >
                    {/* Sfondo gradient lato destro */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-fuchsia-900/20" />

                    {/* Glow */}
                    <div className="pointer-events-none absolute top-10 right-10 h-72 w-72 rounded-full bg-gradient-to-br from-violet-600/40 via-fuchsia-500/20 to-sky-500/15 blur-3xl" />

                    {/* Gloria (dietro, sinistra) */}
                    <div className="absolute top-8 left-8 md:left-12 z-10 w-[170px] md:w-[195px] h-[300px] md:h-[360px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] group-hover:scale-[1.02] transition duration-500">
                      <img
                        src="/images/gloria2.jpeg"
                        alt="Gloria Margarino"
                        className="w-full h-full object-cover transition duration-700 hover:scale-[1.04]"
                        loading="lazy"
                      />
                      {/* Label in basso */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-3">
                        <p className="font-antonio text-[0.7rem] tracking-wide text-white">Gloria</p>
                      </div>
                    </div>

                    {/* Ivan (davanti, destra) */}
                    <div className="absolute bottom-8 right-8 md:right-12 z-20 w-[170px] md:w-[195px] h-[300px] md:h-[360px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.92)] transition duration-700 hover:scale-[1.04]">
                      <img
                        src="/images/ivan.jpeg"
                        alt="Ivan Scrofani"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-3">
                        <p className="font-antonio text-[0.7rem] tracking-wide text-white">Ivan</p>
                      </div>
                    </div>

                    {/* Badge hover CTA */}
                    <div className="absolute top-4 right-4 z-30 rounded-full border border-violet-400/40 bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                      <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-violet-300">
                        Scopri di più →
                      </span>
                    </div>
                  </Link>

                </div>
              </div>
            </section>

            {/* ── DICONO DI NOI ── */}
            <section aria-label="Recensioni clienti" className="space-y-5" data-aos="fade-up">

              {/* Separatore */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-star text-violet-400 text-xs" />
                  <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-400">
                    Recensioni
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
              </div>

              {/* Intestazione */}
              <div>
                <h3 className="font-antonio text-xl md:text-2xl tracking-[0.15em] uppercase text-zinc-100">
                  Dicono di noi
                </h3>
                <p className="mt-1 font-montserrat text-xs text-zinc-400">
                  Le parole dei nostri clienti sono la nostra migliore presentazione.
                </p>
              </div>

              {/* Grid: virgolettato + video recensione */}
              <div className="grid gap-5 md:grid-cols-2 items-stretch">

                {/* VIRGOLETTATO */}
                <div className="relative flex flex-col justify-between rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-7 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                  {/* Virgolette decorative */}
                  <span className="font-antonio text-[5rem] leading-none text-violet-500/20 select-none absolute top-3 left-6">
                    "
                  </span>

                  <div className="relative z-10 space-y-5">
                    {/* Stelle */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star text-amber-400 text-xs" />
                      ))}
                    </div>

                    <p className="font-montserrat text-sm sm:text-base leading-relaxed text-zinc-200 italic">
                      "Ho avuto il piacere di collaborare con Gloria per la realizzazione di contenuti video destinati ad un locale/club e l’esperienza è stata estremamente positiva.
                      Ha dimostrato grande professionalità in ogni fase del lavoro: dall’organizzazione iniziale alle riprese, fino alla post-produzione. Il risultato finale è stato un video curato nei dettagli, coerente con l’identità del locale e capace di valorizzarne al meglio l’atmosfera e i punti di forza.
                      Gloria è stata molto affidabile, precisa e con ottime competenze tecniche.
                      La consiglio vivamente a chi cerca una videomaker competente e attenta alle esigenze del cliente."
                    </p>

                    {/* Autore */}
                    <div className="flex items-center gap-3 pt-2 border-t border-violet-500/15">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden border border-violet-400/20 bg-violet-900/40">
                        {/* Placeholder avatar — sostituisci con foto reale */}
                        <div className="h-full w-full flex items-center justify-center">
                          <i className="fa-solid fa-user text-violet-400 text-sm" />
                        </div>
                      </div>
                      <div>
                        <p className="font-antonio text-sm tracking-wide text-white">Veronica</p>
                        <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.15em] text-violet-300">
                          Servizio Foto/Video Per Attivitá · Roma
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VIDEO RECENSIONE */}
                <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-zinc-900/80 shadow-[0_20px_65px_rgba(89,28,135,0.3)] min-h-[280px]">
                  {/* 
        Sostituisci il src con il video recensione reale.
        Se è un embed Vimeo/YouTube usa un <iframe> al posto del <video>.
        Esempio iframe Vimeo:
        <iframe
          src="https://player.vimeo.com/video/ID_VIDEO?autoplay=0&title=0&byline=0&portrait=0"
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      */}
                  <video
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                    src="/videos/ToyotaXReply.mp4"
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play button */}
                  <button
                    onClick={() => {
                      const v = document.querySelector("#recensione-video");
                      if (v) { v.muted = false; v.play(); }
                    }}
                    className="absolute inset-0 flex items-center justify-center group/play"
                    aria-label="Riproduci video recensione"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition group-hover/play:border-violet-400/80 group-hover/play:bg-violet-600/80 group-hover/play:shadow-[0_0_40px_rgba(139,92,246,0.7)]">
                        <i className="fa-solid fa-play ml-1 text-xl text-white" />
                      </div>
                      <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.25em] text-zinc-300">
                        Guarda la video recensione
                      </span>
                    </div>
                  </button>

                  {/* Label cliente in basso */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star text-amber-400 text-[0.6rem]" />
                      ))}
                    </div>
                    <p className="font-antonio text-base text-white">Luca T. — Spot aziendale</p>
                    <p className="font-montserrat text-[0.65rem] text-zinc-400">Milano, 2024</p>
                  </div>
                </div>

              </div>

              {/* LINK TRUSTPILOT */}
              <a
                href="https://www.trustpilot.com/review/futureframes.it"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-gradient-to-r from-[#0d0b2a] via-[#1a1040]/80 to-[#0d0b2a] px-6 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition hover:border-violet-500/30 hover:shadow-[0_8px_30px_rgba(89,28,135,0.25)]"
              >
                <div className="flex items-center gap-4">
                  {/* Logo Trustpilot */}
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl bg-[#00b67a]/15 border border-[#00b67a]/30">
                    {/* Stelle Trustpilot in verde */}
                    <i className="fa-solid fa-star text-[#00b67a] text-sm" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-antonio text-sm tracking-wide text-white">Trustpilot</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fa-solid fa-star text-[#00b67a] text-[0.6rem]" />
                        ))}
                      </div>
                      <span className="font-montserrat text-xs text-zinc-300 font-semibold">5.0</span>
                    </div>
                    <p className="font-montserrat text-xs text-zinc-400">
                      Leggi tutte le recensioni dei nostri clienti su Trustpilot
                    </p>
                  </div>
                </div>

                {/* Freccia */}
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-violet-500/30 bg-violet-900/30 transition group-hover:bg-violet-600/50 group-hover:border-violet-400/60">
                  <i className="fa-solid fa-arrow-right text-violet-300 text-xs transition group-hover:translate-x-0.5" />
                </div>
              </a>

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
                  Ci troviamo a <span className="text-violet-300 font-semibold">Pomezia</span> e operiamo principalmente
                  nel territorio della provincia di Roma.
                  <br />
                  Disponibili a trasferte su accordo con il cliente.
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
                        <p className="font-montserrat text-sm text-zinc-200">Pomezia (RM)</p>
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
                          <span className="text-zinc-400">Trasferte disponibili in accordo con il cliente.</span>
                        </p>
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
