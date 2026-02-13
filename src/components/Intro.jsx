"use client";

import Link from "next/link";

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
                  <div className="relative h-full">
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
                          Ogni frame è curato nei dettagli — dalla luce al montaggio
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

              <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3">
                {services.map((s) => (
                  <Link key={s.id} href={`/servizi#${s.id}`}>
                    <article className="group relative h-44 sm:h-56 overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/70 shadow-[0_20px_55px_rgba(0,0,0,0.75)]">
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

                {/* cell extra con video teaser */}
                <div className="relative h-56 overflow-hidden rounded-2xl border border-violet-500/40 bg-zinc-900/80 shadow-[0_20px_65px_rgba(89,28,135,0.329)] col-span-2 md:col-span-3">
                  <video
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                    src="/videos/ToyotaXReply.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <Link href="/portfolio">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/70" />
                    <div className="relative flex h-full flex-col justify-center px-6 md:px-10">
                      <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-violet-300 mb-2">
                        NOME PROGETTO TEASER
                      </p>
                      <p className="font-antonio text-lg md:text-2xl max-w-xl leading-snug">
                        Una selezione dei nostri lavori in un unico flusso
                        cinematografico.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              <Link
                href="/servizi"
                className="mt-3 inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200 md:hidden"
              >
                Scopri di più sui servizi
                <i className="fa-solid fa-circle-arrow-right" />
              </Link>
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
                  <div className="absolute top-2 right-24 z-10 w-[320px] h-[320px] md:w-[340px] md:h-[340px] rounded-3xl overflow-hidden border border-white/15 bg-zinc-900/40 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
                    <img
                      src="/images/gloria2.jpeg"
                      alt="Gloria Margarino"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Ivan (davanti) — più in basso e un pelo più a destra */}
                  <div className="absolute bottom-0 right-0 z-20 w-[360px] h-[300px] md:w-[400px] md:h-[320px] rounded-3xl overflow-hidden border border-white/15 bg-zinc-900/40 shadow-[0_25px_70px_rgba(0,0,0,0.92)]">
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
          </div>
        </div>
      </div>
    </section>
  );
}
