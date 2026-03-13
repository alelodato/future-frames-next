"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Project Card ─────────────────────────────────────────────
function ProjectCard({ project, className = "" }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (hovered) videoRef.current.play().catch(() => {});
    else { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  }, [hovered]);

  return (
    <Link href={`/portfolio/${project.slug}`} className={`relative block overflow-hidden group cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <img
        src={project.cover_image || "/images/introimg1.webp"}
        alt={project.title}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${hovered ? "scale-[1.07]" : "scale-100"}`}
      />
      {project.video_teaser_url && (
        <video ref={videoRef} src={project.video_teaser_url} muted loop playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hovered ? "opacity-100" : "opacity-0"}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className={`absolute inset-0 bg-black/25 transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />

      {/* Badge categoria */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`font-montserrat text-[0.52rem] uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border backdrop-blur-sm transition-all duration-300 ${hovered ? "border-violet-400/60 bg-violet-900/60 text-violet-200" : "border-white/20 bg-black/30 text-zinc-300"}`}>
          {project.category}
        </span>
      </div>
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="font-montserrat text-[0.52rem] uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border border-amber-400/40 bg-amber-900/30 text-amber-300 backdrop-blur-sm">
            Featured
          </span>
        </div>
      )}

      {/* Info bottom */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-10">
        <div className="flex items-center gap-2 mb-1">
          {project.year && <span className="font-montserrat text-[0.55rem] text-zinc-500">{project.year}</span>}
          {project.location && <><span className="text-zinc-700">·</span><span className="font-montserrat text-[0.55rem] text-zinc-500">{project.location}</span></>}
        </div>
        <h3 className="font-antonio text-2xl leading-tight text-white group-hover:text-violet-100 transition-colors">
          {project.title}
        </h3>
        <div className={`overflow-hidden transition-all duration-500 ${hovered ? "max-h-16 opacity-100 mt-1.5" : "max-h-0 opacity-0"}`}>
          {project.excerpt && <p className="font-montserrat text-xs text-zinc-300 line-clamp-2 mb-2">{project.excerpt}</p>}
          <span className="inline-flex items-center gap-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.22em] text-violet-300">
            Guarda il progetto <i className="fa-solid fa-arrow-right text-[0.5rem] transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700 ${hovered ? "w-full" : "w-0"}`} />
    </Link>
  );
}

// ─── PATTERN A: 50% grande | 50% due righe ───────────────────
// larghezza: 100vw
function PatternA({ projects }) {
  const [p1, p2, p3] = projects;
  return (
    <div className="flex-shrink-0 w-screen h-screen flex">
      {/* Sinistra: progetto grande */}
      <div className="w-1/2 h-full">
        {p1 && <ProjectCard project={p1} className="w-full h-full" />}
      </div>
      {/* Destra: due progetti impilati */}
      <div className="w-1/2 h-full flex flex-col">
        <div className="h-1/2">
          {p2 && <ProjectCard project={p2} className="w-full h-full" />}
        </div>
        <div className="h-1/2">
          {p3 && <ProjectCard project={p3} className="w-full h-full" />}
        </div>
      </div>
    </div>
  );
}

// ─── PATTERN B: 2 progetti con taglio diagonale ───────────────
// larghezza: 100vw
function PatternB({ projects }) {
  const [p1, p2] = projects;
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  useEffect(() => {
    if (!video1Ref.current) return;
    if (hovered1) video1Ref.current.play().catch(() => {});
    else { video1Ref.current.pause(); video1Ref.current.currentTime = 0; }
  }, [hovered1]);

  useEffect(() => {
    if (!video2Ref.current) return;
    if (hovered2) video2Ref.current.play().catch(() => {});
    else { video2Ref.current.pause(); video2Ref.current.currentTime = 0; }
  }, [hovered2]);

  return (
    <div className="flex-shrink-0 w-screen h-screen relative">
      {/* Progetto 1 — sinistra con clip diagonale */}
      {p1 && (
        <Link href={`/portfolio/${p1.slug}`}
          className="absolute inset-0 group cursor-pointer"
          style={{ clipPath: "polygon(0 0, 62% 0, 50% 100%, 0 100%)" }}
          onMouseEnter={() => setHovered1(true)}
          onMouseLeave={() => setHovered1(false)}>
          <img src={p1.cover_image || "/images/introimg1.webp"} alt={p1.title}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${hovered1 ? "scale-[1.06]" : "scale-100"}`} />
          {p1.video_teaser_url && (
            <video ref={video1Ref} src={p1.video_teaser_url} muted loop playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hovered1 ? "opacity-100" : "opacity-0"}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${hovered1 ? "opacity-100" : "opacity-0"}`} />
          <div className="absolute bottom-10 left-10 z-10 max-w-xs">
            <span className={`font-montserrat text-[0.52rem] uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border backdrop-blur-sm transition-all duration-300 ${hovered1 ? "border-violet-400/60 bg-violet-900/60 text-violet-200" : "border-white/20 bg-black/30 text-zinc-300"}`}>
              {p1.category}
            </span>
            <h3 className="font-antonio text-4xl text-white mt-3 group-hover:text-violet-100 transition-colors">{p1.title}</h3>
            <div className={`overflow-hidden transition-all duration-500 ${hovered1 ? "max-h-16 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
              <span className="inline-flex items-center gap-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.22em] text-violet-300">
                Guarda il progetto <i className="fa-solid fa-arrow-right text-[0.5rem]" />
              </span>
            </div>
          </div>
          <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700 ${hovered1 ? "w-full" : "w-0"}`} />
        </Link>
      )}

      {/* Progetto 2 — destra con clip diagonale inverso */}
      {p2 && (
        <Link href={`/portfolio/${p2.slug}`}
          className="absolute inset-0 group cursor-pointer"
          style={{ clipPath: "polygon(52% 0, 100% 0, 100% 100%, 40% 100%)" }}
          onMouseEnter={() => setHovered2(true)}
          onMouseLeave={() => setHovered2(false)}>
          <img src={p2.cover_image || "/images/introimg1.webp"} alt={p2.title}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${hovered2 ? "scale-[1.06]" : "scale-100"}`} />
          {p2.video_teaser_url && (
            <video ref={video2Ref} src={p2.video_teaser_url} muted loop playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hovered2 ? "opacity-100" : "opacity-0"}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${hovered2 ? "opacity-100" : "opacity-0"}`} />
          <div className="absolute bottom-10 right-10 z-10 max-w-xs text-right">
            <span className={`font-montserrat text-[0.52rem] uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border backdrop-blur-sm transition-all duration-300 ${hovered2 ? "border-violet-400/60 bg-violet-900/60 text-violet-200" : "border-white/20 bg-black/30 text-zinc-300"}`}>
              {p2.category}
            </span>
            <h3 className="font-antonio text-4xl text-white mt-3 group-hover:text-violet-100 transition-colors">{p2.title}</h3>
            <div className={`overflow-hidden transition-all duration-500 ${hovered2 ? "max-h-16 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
              <span className="inline-flex items-center gap-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.22em] text-violet-300 flex-row-reverse">
                Guarda il progetto <i className="fa-solid fa-arrow-left text-[0.5rem]" />
              </span>
            </div>
          </div>
          <div className={`absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-violet-500 to-fuchsia-500 transition-all duration-700 ${hovered2 ? "w-full" : "w-0"}`} />
        </Link>
      )}

      {/* Separatore diagonale decorativo */}
      <div className="absolute inset-0 pointer-events-none z-20"
        style={{ background: "linear-gradient(to right, transparent 48%, rgba(139,92,246,0.4) 50%, transparent 52%)" }} />
    </div>
  );
}

// ─── PATTERN C: 3 progetti uguali affiancati ──────────────────
// larghezza: 100vw
function PatternC({ projects }) {
  const [p1, p2, p3] = projects;
  return (
    <div className="flex-shrink-0 w-screen h-screen flex">
      {p1 && <ProjectCard project={p1} className="w-1/3 h-full" />}
      {p2 && <ProjectCard project={p2} className="w-1/3 h-full" />}
      {p3 && <ProjectCard project={p3} className="w-1/3 h-full" />}
    </div>
  );
}

// ─── Layout engine ─────────────────────────────────────────────
function buildPanels(projects) {
  const panels = [];
  let i = 0;
  const sequence = ["A", "B", "C"];
  let si = 0;

  while (i < projects.length) {
    const type = sequence[si % sequence.length];
    if (type === "A") {
      panels.push({ type: "A", projects: projects.slice(i, i + 3) });
      i += 3;
    } else if (type === "B") {
      panels.push({ type: "B", projects: projects.slice(i, i + 2) });
      i += 2;
    } else if (type === "C") {
      panels.push({ type: "C", projects: projects.slice(i, i + 3) });
      i += 3;
    }
    si++;
  }
  return panels;
}

function HorizontalPortfolio({ projects }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const panels = buildPanels(projects);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || panels.length === 0) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });

    return () => mm.revert();
  }, [projects]);

  return (
    <div ref={sectionRef} className="relative hidden md:block overflow-hidden bg-black">
      <div ref={trackRef} className="flex will-change-transform"
        style={{ width: `${(panels.length + 1) * 100}vw` }}>

        {/* Hero panel */}
        <div className="flex-shrink-0 w-screen h-screen relative overflow-hidden flex items-center justify-center">
          <video src="/videos/ToyotaXReply.mp4" autoPlay muted loop playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-50"
            style={{ filter: "saturate(0.6)" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

          <div className="relative z-10 text-center px-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-violet-400/60" />
              <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.5em] text-violet-300">Future Frames</span>
              <div className="h-px w-12 bg-violet-400/60" />
            </div>
            <h1 className="font-antonio text-[5rem] sm:text-[7rem] md:text-[10rem] leading-none text-white tracking-tight">
              PORTFOLIO
            </h1>
            <p className="mt-4 font-montserrat text-sm md:text-base text-zinc-400 tracking-[0.15em]">
              Storie raccontate attraverso il movimento
            </p>
            {/*<div className="mt-8 flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="font-antonio text-3xl text-white">{projects.length}</p>
                <p className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] text-zinc-500 mt-0.5">Progetti</p>
              </div>
              <div className="h-8 w-px bg-zinc-700" />
              <div className="text-center">
                <p className="font-antonio text-3xl text-white">{panels.length}</p>
                <p className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] text-zinc-500 mt-0.5">Sequenze</p>
              </div>
            </div> */}
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-10 right-12 flex items-center gap-3 z-20">
            <span className="font-montserrat text-[0.52rem] uppercase tracking-[0.4em] text-zinc-500">Scorri</span>
            <div className="flex items-center gap-1">
              <div className="h-px w-8 bg-zinc-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-violet-400" style={{ animation: "slideRight 1.6s ease-in-out infinite" }} />
              </div>
              <i className="fa-solid fa-arrow-right text-zinc-500 text-xs animate-pulse" />
            </div>
          </div>
          <style>{`@keyframes slideRight { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }`}</style>
        </div>

        {/* Pannelli progetti */}
        {panels.map((panel, i) => {
          if (panel.type === "A") return <PatternA key={i} projects={panel.projects} />;
          if (panel.type === "B") return <PatternB key={i} projects={panel.projects} />;
          if (panel.type === "C") return <PatternC key={i} projects={panel.projects} />;
          return null;
        })}
      </div>
    </div>
  );
}

// ─── PATTERN MOBILE A: 1 grande + 2 sotto ─────────────────────
function MobilePatternA({ projects }) {
  const [p1, p2, p3] = projects;
  return (
    <div className="flex flex-col gap-0.5">
      <ProjectCard project={p1} className="w-full h-[70vw]" />
      <div className="flex gap-0.5">
        {p2 && <ProjectCard project={p2} className="flex-1 h-[45vw]" />}
        {p3 && <ProjectCard project={p3} className="flex-1 h-[45vw]" />}
      </div>
    </div>
  );
}

// ─── PATTERN MOBILE B: due affiancati con altezza piena ──────
function MobilePatternB({ projects }) {
  const [p1, p2] = projects;
  return (
    <div className="flex gap-0.5 h-[75vw]">
      {p1 && <ProjectCard project={p1} className="flex-1 h-full" />}
      {p2 && <ProjectCard project={p2} className="flex-1 h-full" />}
    </div>
  );
}

function MobilePortfolio({ projects }) {
  const panels = buildPanels(projects);
  return (
    <div className="md:hidden">
      {/* Hero */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <video src="/videos/ToyotaXReply.mp4" autoPlay muted loop playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          style={{ filter: "saturate(0.6)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black" />
        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-violet-400/60" />
            <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.5em] text-violet-300">Future Frames</span>
            <div className="h-px w-12 bg-violet-400/60" />
          </div>
          <h1 className="font-antonio text-[5rem] leading-none text-white tracking-tight">PORTFOLIO</h1>
          <p className="mt-4 font-montserrat text-sm text-zinc-400 tracking-[0.15em]">Storie raccontate attraverso il movimento</p>
          <div className="mt-8 flex items-center justify-center gap-6">
          </div>
        </div>
      </section>

      {/* Pannelli con pattern */}
      <div className="flex flex-col gap-0.5">
        {panels.map((panel, i) => {
          if (panel.type === "A") return <MobilePatternA key={i} projects={panel.projects} />;
          if (panel.type === "B") return <MobilePatternB key={i} projects={panel.projects} />;
          return null;
        })}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProjects(); }, []);

  async function fetchProjects() {
    const supabase = createSupabaseBrowser();
    const { data } = await supabase
      .from("projects")
      .select("id, slug, title, category, year, location, excerpt, cover_image, video_teaser_url, featured")
      .eq("published", true)
      .order("created_at", { ascending: false });

    setProjects(data || []);
    setLoading(false);
  }

  return (
    <div className="bg-black text-white min-h-screen">

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <i className="fa-solid fa-spinner animate-spin text-violet-400 text-2xl" />
        </div>
      ) : (
        <>
          <HorizontalPortfolio projects={projects} />
          <MobilePortfolio projects={projects} />
        </>
      )}

      {/* ── CTA FINALE ── */}
      <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
        <video src="/videos/ToyotaXReply.mp4" autoPlay muted loop playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          style={{ filter: "saturate(0.4)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center px-4 space-y-6">
          <h2 className="font-antonio text-5xl md:text-7xl text-white leading-none">
            Pronto a raccontare
            <span className="block text-violet-300">la tua storia?</span>
          </h2>
          <p className="font-montserrat text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Rendi la tua idea il nostro prossimo progetto. 
          </p>
          <Link href="/contact"
            className="group inline-flex items-center gap-3 rounded-full border border-violet-400/50 px-8 py-4 font-montserrat text-xs uppercase tracking-[0.3em] text-violet-300 transition-all hover:bg-violet-900/30 hover:border-violet-400 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]">
            Contattaci
            <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  );
}