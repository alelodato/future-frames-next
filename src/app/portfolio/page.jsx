"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

// ─── Scroll reveal hook ───────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible, delay];
}

// ─── Project Card ─────────────────────────────────────────────
function ProjectCard({ project, height = "h-[420px]", priority = false }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (hovered) videoRef.current.play().catch(() => {});
    else { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  }, [hovered]);

  return (
    <Link href={`/portfolio/${project.slug}`}>
      <article
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`
          relative overflow-hidden cursor-pointer group ${height}
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        {/* Immagine */}
        <img
          src={project.cover_image || "/images/introimg1.webp"}
          alt={project.title}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${hovered ? "scale-[1.07]" : "scale-100"}`}
        />

        {/* Video teaser */}
        {project.video_teaser_url && (
          <video ref={videoRef} src={project.video_teaser_url} muted loop playsInline
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-600 ${hovered ? "opacity-100" : "opacity-0"}`} />
        )}

        {/* Overlay base */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {/* Overlay hover */}
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />

        {/* Categoria */}
        <div className="absolute top-5 left-5">
          <span className={`font-montserrat text-[0.55rem] uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border backdrop-blur-sm transition-all duration-300 ${hovered ? "border-violet-400/60 bg-violet-900/60 text-violet-200" : "border-white/20 bg-black/30 text-zinc-300"}`}>
            {project.category}
          </span>
        </div>

        {project.featured && (
          <div className="absolute top-5 right-5">
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border border-amber-400/40 bg-amber-900/30 text-amber-300 backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}

        {/* Info bottom */}
        <div className={`absolute bottom-0 inset-x-0 p-5 transition-all duration-500 ${hovered ? "translate-y-0" : "translate-y-1"}`}>
          <div className="flex items-center gap-2 mb-1.5">
            {project.year && <span className="font-montserrat text-[0.58rem] text-zinc-500">{project.year}</span>}
            {project.location && <><span className="text-zinc-700">·</span><span className="font-montserrat text-[0.58rem] text-zinc-500">{project.location}</span></>}
          </div>
          <h3 className="font-antonio text-2xl md:text-3xl leading-tight text-white group-hover:text-violet-100 transition-colors">
            {project.title}
          </h3>
          <div className={`overflow-hidden transition-all duration-500 ${hovered ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
            {project.excerpt && (
              <p className="font-montserrat text-xs text-zinc-300 leading-relaxed line-clamp-2 mb-2">{project.excerpt}</p>
            )}
            <span className="inline-flex items-center gap-1.5 font-montserrat text-[0.62rem] uppercase tracking-[0.22em] text-violet-300">
              Guarda il progetto
              <i className="fa-solid fa-arrow-right text-[0.55rem] transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>

        {/* Linea bottom */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700 ${hovered ? "w-full" : "w-0"}`} />
      </article>
    </Link>
  );
}

// ─── PATTERN A: Grande sinistra + destra alta che sfonda ──────
// [  GRANDE  |  ALTO  ]
// [          | PICCOLO]
function PatternA({ projects }) {
  const [p1, p2, p3] = projects;
  return (
    <div className="grid grid-cols-2 gap-1">
      {/* Sinistra grande */}
      <div className="row-span-2">
        {p1 && <ProjectCard project={p1} height="h-full min-h-[600px]" />}
      </div>
      {/* Destra alto */}
      <div>
        {p2 && <ProjectCard project={p2} height="h-[400px]" />}
      </div>
      {/* Destra basso */}
      <div>
        {p3 && <ProjectCard project={p3} height="h-[300px]" />}
      </div>
    </div>
  );
}

// ─── PATTERN B: Tre colonne con altezze sfalsate ──────────────
// [ MED | TALL | MED ]
function PatternB({ projects }) {
  const [p1, p2, p3] = projects;
  const heights = ["h-[500px]", "h-[500px]", "h-[500px]"];
  return (
    <div className="grid grid-cols-3 gap-1 items-end">
      <div className={`${heights[0]} -mb-0`}>
        {p1 && <ProjectCard project={p1} height={heights[0]} />}
      </div>
      <div className={`${heights[1]}`}>
        {p2 && <ProjectCard project={p2} height={heights[1]} />}
      </div>
      <div className={`${heights[2]} -mb-0`}>
        {p3 && <ProjectCard project={p3} height={heights[2]} />}
      </div>
    </div>
  );
}

// ─── PATTERN C: Piccolo + grande destra + piccolo sotto ───────
// [ SMALL | GRANDE ]
// [ WIDE        -- ]
function PatternC({ projects }) {
  const [p1, p2, p3] = projects;
  return (
    <div className="grid grid-cols-3 gap-1">
      {/* Piccolo sinistra */}
      <div>
        {p1 && <ProjectCard project={p1} height="h-[300px]" />}
      </div>
      {/* Grande destra — occupa 2 colonne e 2 righe */}
      <div className="col-span-2 row-span-2">
        {p2 && <ProjectCard project={p2} height="h-full min-h-[300px]" />}
      </div>
      {/* Largo sotto a sinistra */}
      <div>
        {p3 && <ProjectCard project={p3} height="h-[300px]" />}
      </div>
    </div>
  );
}

// ─── PATTERN D: Full width cinematografico ────────────────────
function PatternD({ project }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (hovered) videoRef.current.play().catch(() => {});
    else { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  }, [hovered]);

  if (!project) return null;

  return (
    <Link href={`/portfolio/${project.slug}`}>
      <article
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative overflow-hidden cursor-pointer group h-[70vh] transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <img src={project.cover_image || "/images/introimg1.webp"} alt={project.title}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${hovered ? "scale-[1.04]" : "scale-100"}`} />
        {project.video_teaser_url && (
          <video ref={videoRef} src={project.video_teaser_url} muted loop playsInline
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hovered ? "opacity-100" : "opacity-0"}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Numero decorativo */}
        <div className="absolute top-8 right-12 font-antonio text-[10rem] leading-none text-white/5 select-none pointer-events-none hidden md:block">
          {project.featured ? "★" : ""}
        </div>

        <div className="absolute inset-0 flex items-center px-12 md:px-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-violet-400" />
              <span className="font-montserrat text-[0.58rem] uppercase tracking-[0.35em] text-violet-300">{project.category}</span>
            </div>
            <h2 className="font-antonio text-5xl md:text-7xl leading-none text-white mb-4 group-hover:text-violet-100 transition-colors">
              {project.title}
            </h2>
            {project.excerpt && (
              <p className={`font-montserrat text-sm text-zinc-300 leading-relaxed max-w-lg transition-all duration-500 ${hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                {project.excerpt}
              </p>
            )}
            <div className={`mt-5 transition-all duration-500 delay-100 ${hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
              <span className="inline-flex items-center gap-2 font-montserrat text-[0.65rem] uppercase tracking-[0.25em] text-violet-300">
                Guarda il progetto
                <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-1000 ${hovered ? "w-full" : "w-0"}`} />
      </article>
    </Link>
  );
}

// ─── Scroll indicator ─────────────────────────────────────────
function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
      <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.4em] text-zinc-400">Scorri</span>
      <div className="relative h-10 w-px bg-zinc-700 overflow-hidden">
        <div className="absolute top-0 left-0 w-full bg-violet-400"
          style={{ animation: "scrollLine 1.8s ease-in-out infinite" }} />
      </div>
      <style>{`@keyframes scrollLine { 0%{height:0;top:0} 50%{height:100%;top:0} 100%{height:0;top:100%} }`}</style>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-2 gap-1">
        <div className="h-[500px] bg-zinc-900/60 animate-pulse" />
        <div className="space-y-1">
          <div className="h-[300px] bg-zinc-900/60 animate-pulse" />
          <div className="h-[195px] bg-zinc-900/60 animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        <div className="h-[380px] bg-zinc-900/60 animate-pulse" />
        <div className="h-[380px] bg-zinc-900/60 animate-pulse" />
        <div className="h-[380px] bg-zinc-900/60 animate-pulse" />
      </div>
    </div>
  );
}

// ─── Layout engine ────────────────────────────────────────────
function ProjectLayout({ projects }) {
  const sections = [];
  let i = 0;
  let patternIndex = 0;
  const patterns = ["A", "D", "B", "C", "D", "A", "C", "B"];

  while (i < projects.length) {
    const pattern = patterns[patternIndex % patterns.length];

    if (pattern === "D") {
      // Full width — 1 progetto
      if (projects[i]) {
        sections.push({ type: "D", projects: [projects[i]] });
        i += 1;
      }
    } else if (pattern === "A" || pattern === "C") {
      // 3 progetti
      const chunk = projects.slice(i, i + 3);
      if (chunk.length >= 1) {
        sections.push({ type: pattern, projects: chunk });
        i += chunk.length;
      }
    } else if (pattern === "B") {
      // 3 progetti
      const chunk = projects.slice(i, i + 3);
      if (chunk.length >= 1) {
        sections.push({ type: pattern, projects: chunk });
        i += chunk.length;
      }
    }
    patternIndex++;
  }

  return (
    <div className="space-y-1">
      {sections.map((section, si) => {
        if (section.type === "D") return <PatternD key={si} project={section.projects[0]} />;
        if (section.type === "A") return <PatternA key={si} projects={section.projects} />;
        if (section.type === "B") return <PatternB key={si} projects={section.projects} />;
        if (section.type === "C") return <PatternC key={si} projects={section.projects} />;
        return null;
      })}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────
export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const [categories, setCategories] = useState(["Tutti"]);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  async function fetchProjects() {
    const supabase = createSupabaseBrowser();
    const { data } = await supabase
      .from("projects")
      .select("id, slug, title, category, year, location, excerpt, cover_image, video_teaser_url, featured, tags")
      .eq("published", true)
      .order("created_at", { ascending: false });

    const list = data || [];
    setProjects(list);
    const cats = ["Tutti", ...new Set(list.map((p) => p.category).filter(Boolean))];
    setCategories(cats);
    setLoading(false);
  }

  const filtered = projects.filter(
    (p) => activeCategory === "Tutti" || p.category === activeCategory
  );

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ── HERO ── */}
      <section className="relative h-screen overflow-hidden">
        <video
          src="/videos/ToyotaXReply.mp4"
          autoPlay muted loop playsInline
          onCanPlay={() => setHeroLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[3000ms] ${heroLoaded ? "scale-100 opacity-50" : "scale-110 opacity-0"}`}
          style={{ filter: "saturate(0.6)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

        <div className={`relative z-10 flex h-full flex-col items-center justify-center px-4 text-center transition-all duration-1000 delay-300 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-violet-400/60" />
            <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.5em] text-violet-300">Future Frames</span>
            <div className="h-px w-12 bg-violet-400/60" />
          </div>
          <h1 className="font-antonio text-[5rem] sm:text-[7rem] md:text-[10rem] leading-none text-white tracking-tight">
            PORTFOLIO
          </h1>
          <p className={`mt-4 font-montserrat text-sm md:text-base text-zinc-400 tracking-[0.15em] transition-all duration-1000 delay-500 ${heroLoaded ? "opacity-100" : "opacity-0"}`}>
            Storie raccontate attraverso il movimento
          </p>
          {!loading && (
            <div className={`mt-8 flex items-center gap-6 transition-all duration-1000 delay-700 ${heroLoaded ? "opacity-100" : "opacity-0"}`}>
              <div className="text-center">
                <p className="font-antonio text-3xl text-white">{projects.length}</p>
                <p className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] text-zinc-500 mt-0.5">Progetti</p>
              </div>
              <div className="h-8 w-px bg-zinc-700" />
              <div className="text-center">
                <p className="font-antonio text-3xl text-white">{categories.length - 1}</p>
                <p className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] text-zinc-500 mt-0.5">Categorie</p>
              </div>
            </div>
          )}
        </div>
        <ScrollIndicator />
      </section>

      {/* ── FILTRI STICKY ── */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`font-montserrat text-[0.6rem] uppercase tracking-[0.25em] px-4 py-1.5 rounded-full transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-white text-black border-white"
                    : "border-white/15 text-zinc-400 hover:border-white/30 hover:text-white"
                }`}>
                {cat}
              </button>
            ))}
          </div>
          <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.25em] text-zinc-600 hidden sm:block">
            {filtered.length} progett{filtered.length !== 1 ? "i" : "o"}
          </span>
        </div>
      </div>

      {/* ── GRIGLIA ── */}
      <div className="mt-1">
        {loading ? <Skeleton /> : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <i className="fa-solid fa-film text-zinc-700 text-5xl" />
            <p className="font-antonio text-2xl text-zinc-600">Nessun progetto trovato.</p>
          </div>
        ) : (
          <ProjectLayout projects={filtered} />
        )}
      </div>

      {/* ── CTA FINALE ── */}
      <section className="relative h-[70vh] overflow-hidden flex items-center justify-center mt-1">
        <video src="/videos/ToyotaXReply.mp4" autoPlay muted loop playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          style={{ filter: "saturate(0.4)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />

        <div className="relative z-10 text-center px-4 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-violet-500/50" />
            <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.4em] text-violet-400">Next project</span>
            <div className="h-px w-8 bg-violet-500/50" />
          </div>
          <h2 className="font-antonio text-5xl md:text-7xl text-white leading-none">
            Pronto a raccontare
            <span className="block text-violet-300">la tua storia?</span>
          </h2>
          <p className="font-montserrat text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Ogni progetto nasce da una conversazione.
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