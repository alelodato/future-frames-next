"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CinemaVideo() {
  const containerRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const topBarRef = useRef(null);
  const bottomBarRef = useRef(null);
  const videoDesktopRef = useRef(null);
  const videoMobileRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);

  // GSAP sipario
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(curtainLeftRef.current, { x: "0%" });
      gsap.set(curtainRightRef.current, { x: "0%" });
      gsap.set([topBarRef.current, bottomBarRef.current], { scaleY: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          once: true,
        },
      });

      tl.to(curtainLeftRef.current, {
        x: "-100%",
        duration: 1.2,
        ease: "power4.inOut",
      })
      .to(curtainRightRef.current, {
        x: "100%",
        duration: 1.2,
        ease: "power4.inOut",
      }, "<")
      .to([topBarRef.current, bottomBarRef.current], {
        scaleY: 0,
        duration: 0.8,
        ease: "power3.inOut",
      }, "-=0.6");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // IntersectionObserver
  useEffect(() => {
    const videos = containerRef.current?.querySelectorAll("video");
    if (!videos) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play().catch(() => {});
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  function toggleSound() {
  const newMuted = !muted;
  // Attiva solo il video visibile
  const isMobile = window.innerWidth < 768;
  const activeVideo = isMobile ? videoMobileRef.current : videoDesktopRef.current;
  if (!activeVideo) return;
  
  activeVideo.muted = newMuted;
  if (!newMuted && !started) {
    activeVideo.currentTime = 0;
    activeVideo.play().catch(() => {});
    setStarted(true);
  }
  setMuted(newMuted);
}

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden md:rounded-3xl shadow-[0_0_80px_rgba(124,58,237,0.25)] aspect-[9/16] md:aspect-[4/3] lg:aspect-[16/9]"
      style={{ background: "#000" }}>

      {/* Video mobile */}
      <video
        ref={videoMobileRef}
        src="/videos/opening-mb.mp4"
        className="absolute inset-0 w-full h-full md:hidden"
        style={{ objectFit: "contain", background: "#000" }}
        muted playsInline preload="auto"
      />

      {/* Video desktop */}
      <video
        ref={videoDesktopRef}
        src="/videos/opening.mp4"
        className="absolute inset-0 w-full h-full hidden md:block"
        style={{ objectFit: "contain", background: "#000" }}
        muted playsInline preload="auto"
      />

      {/* Barre cinema */}
      <div ref={topBarRef}
        className="absolute top-0 left-0 right-0 z-20 origin-top"
        style={{ height: "8%", background: "#000" }} />
      <div ref={bottomBarRef}
        className="absolute bottom-0 left-0 right-0 z-20 origin-bottom"
        style={{ height: "8%", background: "#000" }} />

      {/* Sipario sinistro */}
      <div ref={curtainLeftRef}
        className="absolute inset-y-0 left-0 z-30 w-1/2"
        style={{ background: "linear-gradient(to left, #0a0820, #000)" }} />

      {/* Sipario destro */}
      <div ref={curtainRightRef}
        className="absolute inset-y-0 right-0 z-30 w-1/2"
        style={{ background: "linear-gradient(to right, #0a0820, #000)" }} />

      {/* Bordo glow */}
      <div className="pointer-events-none absolute inset-0 z-10 md:rounded-3xl"
        style={{ boxShadow: "inset 0 0 40px rgba(139,92,246,0.15)" }} />

      {/* Pulsante audio */}
      <button
        onClick={toggleSound}
        className="absolute bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2 backdrop-blur-sm transition hover:bg-black/80">
        <i className={`fa-solid ${muted ? "fa-volume-xmark" : "fa-volume-high"} text-white text-xs`} />
        <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.2em] text-zinc-300">
          {muted ? "Attiva audio" : "Disattiva audio"}
        </span>
      </button>

    </div>
  );
}