"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-label="Future Frames hero"
      className="relative h-[100dvh] w-full grid place-items-center overflow-hidden z-[2]"
    >
      {/* MOBILE VIDEO */}
      <video
        className="absolute top-1/2 left-1/2 h-full w-full object-cover -translate-x-1/2 -translate-y-1/2 lg:hidden"
        src="/videos/Showreel-Mobile.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* DESKTOP VIDEO */}
      <video
        className="hidden lg:block absolute top-1/2 left-1/2 h-full w-full object-cover -translate-x-1/2 -translate-y-1/2"
        src="/videos/Showreel-Desktop.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/85"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center w-full px-4 pt-[var(--nav-h)] h-full justify-center">
        <h1
          data-aos="zoom-in"
          data-aos-delay="3000"
          className="font-antonio font-bold text-white
                     text-[1.8rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[3.5rem]
                     tracking-[2px]
                     drop-shadow-[0_0_4px_white]
                     [text-shadow:_0_0_2px_white,0_0_10px_rgba(160,32,240,0.7),0_0_22px_rgba(160,32,240,0.55)]"
        >
          LA VISIONE<br />PRENDE FORMA.
        </h1>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center mt-8 w-full px-4">
          <Link
            href="/portfolio"
            data-aos="fade-up"
            data-aos-delay="3000"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-md font-montserrat font-semibold tracking-wide text-sm sm:text-base
                       bg-violet-500 text-black
                       shadow-[0_0_22px_rgba(160,32,240,0.6),0_0_44px_rgba(160,32,240,0.35)]
                       transition duration-200 hover:shadow-[0_0_30px_rgba(160,32,240,0.8),0_0_60px_rgba(160,32,240,0.5)]
                       active:translate-y-[1px]"
          >
            SCOPRI I NOSTRI LAVORI
          </Link>

          <Link
            href="/contact"
            data-aos="fade-up"
            data-aos-delay="3000"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-md font-montserrat font-semibold tracking-wide text-sm sm:text-base
                       text-white border border-violet-500/80 bg-transparent
                       shadow-[0_0_10px_rgba(160,32,240,0.45)]
                       hover:bg-violet-500/10
                       transition duration-200 active:translate-y-[1px]"
          >
            RICHIEDI UN PREVENTIVO
          </Link>
        </div>
      </div>
    </section>
  );
}
