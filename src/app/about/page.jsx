import Link from "next/link";

export const metadata = {
  title: "Chi Siamo – Future Frames",
  description:
    "Scopri il team di Future Frames: Gloria Margarino e Ivan Scrofani, professionisti della fotografia e del videomaking.",
};

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

export default function About() {
  return (
    <section className="bg-black text-white">
      {/* HERO */}
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
            Chi siamo
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
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16 space-y-16 sm:space-y-24 min-h-screen bg-gradient-to-b from-black via-[#0a0b338d] to-[#45115d5c]">
        {/* PANORAMICA TEAM (come reference: testo sx + 1 immagine dx “card”) */}
        <section
          className="grid items-center gap-10 md:grid-cols-2"
          aria-label="Team Future Frames"
          data-aos="fade-up"
        >
          {/* LEFT: TEXT */}
          <div className="space-y-4 md:pr-6">
            <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-violet-300">
              Il team
            </p>
            <h2 className="font-antonio font-semibold text-2xl md:text-3xl text-white">
              Due professionisti, una visione condivisa.
            </h2>
            <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-300">
              <strong>Gloria Margarino</strong>, fotografa e videomaker, e{" "}
              <strong>Ivan Scrofani</strong>, video editor, guidano Future Frames unendo
              sensibilità visiva e montaggio narrativo. Ogni progetto nasce dal dialogo
              con il cliente e dalla cura per i dettagli.
            </p>
            <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-300">
              Dalla pianificazione alla consegna finale, il loro obiettivo è trasformare
              momenti, brand e storie in immagini che restano nel tempo.
            </p>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200"
            >
              Scopri il nostro portfolio
              <i className="fa-solid fa-circle-arrow-right" />
            </Link>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex md:justify-end">
            <div className="w-full max-w-[420px]">
              <ImageFrame
                src="/images/introimg4.webp"
                alt="Future Frames – backstage"
                className="aspect-[4/3]"
              />
            </div>
          </div>
        </section>

        {/* BIO GLORIA (testo sx + immagine dx come screenshot) */}
        <section
          className="grid items-center gap-10 md:grid-cols-2"
          aria-label="Gloria Margarino"
          data-aos="fade-up"
        >
          {/* LEFT: TEXT */}
          <div className="space-y-4 md:pr-6">
            <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-violet-300">
              Gloria Margarino
            </p>
            <h3 className="font-antonio font-semibold text-2xl text-white">
              Fotografa e videomaker.
            </h3>
            <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-300">
              Gloria è il cuore visivo di Future Frames. Cura la fotografia e le riprese
              sul set, con un approccio che unisce sensibilità estetica, attenzione alla
              luce e naturalezza nelle espressioni.
            </p>
            <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-300">
              Dagli eventi privati ai matrimoni, fino ai progetti aziendali, il suo
              obiettivo è raccontare persone e momenti reali senza perdere eleganza e
              coerenza visiva.
            </p>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex md:justify-end">
            <div className="w-full max-w-[380px]">
              <ImageFrame
                src="/images/gloria2.jpeg"
                alt="Gloria Margarino al lavoro"
                className="aspect-[3/4]"
              />
            </div>
          </div>
        </section>

        {/* BIO IVAN (immagine sx + testo dx come screenshot) */}
        <section
          className="grid items-center gap-10 md:grid-cols-2"
          aria-label="Ivan Scrofani"
          data-aos="fade-up"
        >
          {/* LEFT: TEXT */}
          <div className="space-y-4 md:pr-6">
            <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-violet-300">
              Ivan Scrofani
            </p>
            <h3 className="font-antonio font-semibold text-2xl text-white">
              Video editor e post-produzione.
            </h3>
            <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-300">
              Ivan dà ritmo e struttura alle storie. In fase di montaggio unisce immagini,
              suono e musica per creare narrazioni fluide, dinamiche e coerenti con
              l&apos;identità del cliente.
            </p>
            <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-300">
              Dai social content ai video corporate, fino agli spot più cinematografici,
              lavora perché ogni frame abbia un ruolo preciso e un impatto chiaro.
            </p>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex md:justify-end">
            <div className="w-full max-w-[380px]">
              <ImageFrame
                src="/images/ivan.jpeg"
                alt="Ivan Scrofani"
                className="aspect-[3/4]"
                imgClassName="object-[50%_25%]"
              />
            </div>
          </div>
        </section>

        {/* DOVE LAVORIAMO (come reference: card sx + mappa dx) */}
        <section
          aria-label="Dove lavoriamo"
          className="mt-16 md:mt-20"
          data-aos="fade-up"
        >
          <div className="grid gap-10 md:grid-cols-[1.05fr,1.15fr] items-stretch">
            {/* card testo */}
            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 md:p-8 shadow-[0_22px_60px_rgba(0,0,0,0.85)] flex flex-col justify-center">
              <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-violet-300 mb-2">
                Dove lavoriamo
              </p>
              <h3 className="font-antonio text-2xl md:text-3xl font-semibold text-white leading-snug mb-4">
                Con base a Pomezia, alle porte di Roma.
              </h3>
              <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-200">
                Future Frames ha sede a <strong>Pomezia (RM)</strong>, ma lavoriamo
                in tutta l&apos;area metropolitana di <strong>Roma</strong>: eventi,
                aziende, location private e spazi culturali.
              </p>
              <p className="mt-3 font-montserrat text-sm md:text-base leading-relaxed text-zinc-200">
                Per progetti strutturati e produzioni più articolate valutiamo
                <strong> trasferte</strong> in altre città italiane, in accordo con
                le esigenze del cliente.
              </p>
            </div>

            {/* mappa */}
            <div className="rounded-3xl border border-violet-500/40 bg-black/60 shadow-[0_26px_80px_rgba(0,0,0,0.95)] overflow-hidden min-h-[320px]">
              <iframe
                title="Mappa Pomezia"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7469.59805370534!2d12.494142676655008!3d41.669457171703194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132599a4cfbcba4b%3A0xdee4c5c2d3b0f27b!2s00071%20Pomezia%20RM!5e0!3m2!1sit!2sit!4v1733589000000!5m2!1sit!2si"
              />
            </div>
          </div>
        </section>

        {/* MISSION + VALORI */}
        <section className="grid gap-10 md:grid-cols-2" aria-label="Missione e valori">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            <h3 className="font-antonio text-xl md:text-2xl text-white mb-4">
              La nostra missione
            </h3>
            <p className="font-montserrat text-sm md:text-base leading-relaxed text-zinc-300">
              Trasformare momenti, esperienze e progetti in immagini che lasciano
              il segno. Future Frames nasce con l&apos;idea di unire qualità
              professionale e vicinanza umana, per contenuti che non siano solo
              belli da vedere, ma anche efficaci nel comunicare.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-900/60 via-zinc-900 to-black p-6 md:p-8 shadow-[0_25px_70px_rgba(88,28,135,0.85)] flex flex-col justify-between gap-4">
            <h3 className="font-antonio text-xl md:text-2xl text-violet-100 mb-2">
              I valori che portiamo sul set
            </h3>
            <ul className="space-y-2 font-montserrat text-sm md:text-base text-violet-50">
              <li>
                <strong>Creatività</strong>, per trovare sempre l&apos;inquadratura
                giusta e il taglio narrativo più efficace.
              </li>
              <li>
                <strong>Affidabilità</strong>, dalla pianificazione alle consegne,
                con comunicazione chiara e rispetto delle scadenze.
              </li>
              <li>
                <strong>Qualità professionale</strong>, in ogni fase: riprese,
                color, montaggio, consegna finale.
              </li>
            </ul>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-2.5 text-xs font-montserrat uppercase tracking-[0.2em] text-black hover:bg-violet-400 transition shadow-[0_0_30px_rgba(167,139,250,0.75)]"
              >
                Richiedi un preventivo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}