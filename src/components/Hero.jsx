"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const logoFRef = useRef(null);
  const logoScrittaRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.5 });

    gsap.set(logoFRef.current, { x: "-40vw", opacity: 0 });
    gsap.set(logoScrittaRef.current, { x: "40vw", opacity: 0 });
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });

    tl
      .to(logoFRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
      })
      .to(logoScrittaRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
      }, "<")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "expo.out",
      }, "-=0.3");

    return () => tl.kill();
  }, []);

  return (
    <section
      aria-label="Future Frames hero"
      className="relative h-[100dvh] w-full grid place-items-center overflow-hidden z-[2]"
    >
      {/* MOBILE VIDEO */}
      <video
        className="absolute top-1/2 left-1/2 h-full w-full object-cover -translate-x-1/2 -translate-y-1/2 lg:hidden"
        src="/videos/Showreel-Mobile.mp4"
        autoPlay loop muted playsInline
      />

      {/* DESKTOP VIDEO */}
      <video
        className="hidden lg:block absolute top-1/2 left-1/2 h-full w-full object-cover -translate-x-1/2 -translate-y-1/2"
        src="/videos/Showreel-Desktop.mp4"
        autoPlay loop muted playsInline
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/85" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center w-full px-4 pt-[var(--nav-h)] h-full justify-center gap-10">

        {/* LOGO */}
        <div className="flex items-center justify-center">
          <img
            ref={logoFRef}
            src="/images/ff-logo.png"
            alt="Future Frames F"
            className="h-50 w-auto object-contain"
            style={{ filter: "drop-shadow(0 0 16px rgba(160,32,240,0.7))" }}
          />
          <img
            ref={logoScrittaRef}
            src="/images/ff-scritta.png"
            alt="Future Frames"
            className="h-40 w-auto object-contain"
            style={{ filter: "drop-shadow(0 0 12px rgba(160,32,240,0.5))" }}
          />
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center w-full px-4">
          <Link
            href="/portfolio"
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