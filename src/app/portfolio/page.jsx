"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function useParallax(strength = 0.08) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.querySelector(".parallax-inner")?.style.setProperty(
        "transform", `translateY(${center * strength}px)`
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [strength]);
  return ref;
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
      <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.4em] text-zinc-400">Scorri</span>
      <div className="relative h-10 w-px bg-zinc-700">
        <div className="absolute top-0 left-0 w-full bg-violet-400 animate-scroll-line" />
      </div>
    </div>
  );
}

function ProjectCard({ project, index, size = "normal" }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);
  const [ref, visible] = useScrollReveal();

  useEffect(() => {
    if (!videoRef.current) return;
    if (hovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [hovered]);

  const heights = {
    large: "h-[520px] md:h-[620px]",
    normal: "h-[340px] md:h-[420px]",
    small: "h-[260px] md:h-[320px]",
  };

  return (
    <Link href={`/portfolio/${project.slug}`}>
      <article
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`
          relative overflow-hidden cursor-pointer group
          ${heights[size]}
          transition-all duration-1000
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
        `}
        style={{ transitionDelay: `${(index % 3) * 120}ms` }}
      >
        {/* Immagine cover */}
        <img
          src={project.cover_image || "/images/introimg1.webp"}
          alt={project.title}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${hovered ? "scale-[1.08]" : "scale-100"}`}
        />

        {/* Video preview al hover */}
        {project.video_teaser_url && (
          <video
            ref={videoRef}
            src={project.video_teaser_url}
            muted
            loop
            playsInline
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
          />
        )}

        {/* Overlay base */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Overlay hover */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />

        {/* Categoria top left */}
        <div className="absolute top-5 left-5 z-10">
          <span className={`font-montserrat text-[0.55rem] uppercase tracking-[0.3em] px-3 py-1 rounded-full border transition-all duration-300 ${hovered ? "border-violet-400/60 bg-violet-900/60 text-violet-200" : "border-white/20 bg-black/30 text-zinc-300"} backdrop-blur-sm`}>
            {project.category}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-5 right-5 z-10">
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-amber-400/40 bg-amber-900/30 text-amber-300 backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}

        {/* Info bottom */}
        <div className={`absolute bottom-0 inset-x-0 p-6 z-10 transition-all duration-500 ${hovered ? "translate-y-0" : "translate-y-2"}`}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-montserrat text-[0.6rem] text-zinc-500">{project.year}</span>
            {project.location && (
              <>
                <span className="text-zinc-700">·</span>
                <span className="font-montserrat text-[0.6rem] text-zinc-500">{project.location}</span>
              </>
            )}
          </div>
          <h3 className={`font-antonio leading-tight text-white transition-all duration-300 ${size === "large" ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
            {project.title}
          </h3>

          {/* Excerpt e CTA — appaiono al hover */}
          <div className={`overflow-hidden transition-all duration-500 ${hovered ? "max-h-24 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
            {project.excerpt && (
              <p className="font-montserrat text-xs text-zinc-300 leading-relaxed line-clamp-2 mb-3">
                {project.excerpt}
              </p>
            )}
            <span className="inline-flex items-center gap-2 font-montserrat text-[0.65rem] uppercase tracking-[0.25em] text-violet-300 group-hover:text-violet-200">
              Guarda il progetto
              <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>

        {/* Linea bottom decorativa */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700 ${hovered ? "w-full" : "w-0"}`} />
      </article>
    </Link>
  );
}

function FeaturedSection({ project, index }) {
  const [ref, visible] = useScrollReveal();
  const parallaxRef = useParallax(0.06);
  const videoRef = useRef(null);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
    >
      <div ref={parallaxRef} className="relative h-[70vh] md:h-[85vh]">
        <div className="parallax-inner absolute inset-[-10%]">
          {project.video_teaser_url ? (
            <video
              ref={videoRef}
              src={project.video_teaser_url}
              autoPlay muted loop playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={project.cover_image || "/images/introimg1.webp"}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Overlay cinematografico */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Numero progetto decorativo */}
        <div className="absolute top-8 right-8 md:right-16 font-antonio text-[8rem] md:text-[12rem] leading-none text-white/5 select-none pointer-events-none">
          0{index + 1}
        </div>

        {/* Contenuto */}
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="px-8 md:px-16 pb-12 md:pb-0 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-violet-400" />
              <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.35em] text-violet-300">
                {project.category}
              </span>
            </div>
            <h2 className="font-antonio text-4xl md:text-6xl lg:text-7xl text-white leading-none mb-4">
              {project.title}
            </h2>
            {project.excerpt && (
              <p className="font-montserrat text-sm md:text-base text-zinc-300 leading-relaxed mb-8 max-w-lg">
                {project.excerpt}
              </p>
            )}
            <Link href={`/portfolio/${project.slug}`}
              className="group inline-flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/50 bg-violet-900/40 backdrop-blur-sm transition group-hover:bg-violet-500 group-hover:border-violet-400 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]">
                <i className="fa-solid fa-play text-white text-sm ml-0.5" />
              </div>
              <div>
                <p className="font-antonio text-sm text-white">Guarda il film</p>
                <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-violet-400">{project.year} · {project.location}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectGrid({ projects }) {
  if (!projects.length) return null;

  // Pattern layout: large, small, small, small, large, small...
  const rows = [];
  let i = 0;
  let rowIndex = 0;

  while (i < projects.length) {
    // Ogni 6 progetti, inserisci un featured se disponibile
    if (rowIndex > 0 && rowIndex % 3 === 0) {
      const featured = projects.find((p) => p.featured && !rows.flat().includes(p));
      if (featured) {
        rows.push({ type: "featured", project: featured });
        i++;
        rowIndex++;
        continue;
      }
    }

    // Pattern alternato: [large+small] o [small+small+small]
    if (rowIndex % 2 === 0) {
      // Riga: 1 grande + 1 piccola
      rows.push({
        type: "asymmetric",
        left: projects[i],
        right: projects[i + 1],
        leftFirst: rowIndex % 4 === 0,
      });
      i += 2;
    } else {
      // Riga: 2 normali
      rows.push({
        type: "double",
        left: projects[i],
        right: projects[i + 1],
      });
      i += 2;
    }
    rowIndex++;
  }

  return (
    <div className="space-y-3">
      {rows.map((row, ri) => {
        if (row.type === "featured" && row.project) {
          return <FeaturedSection key={ri} project={row.project} index={ri} />;
        }

        if (row.type === "asymmetric") {
          return (
            <div key={ri} className={`grid gap-3 ${row.leftFirst ? "md:grid-cols-[1.6fr_1fr]" : "md:grid-cols-[1fr_1.6fr]"}`}>
              {row.left && <ProjectCard project={row.left} index={ri * 2} size={row.leftFirst ? "large" : "small"} />}
              {row.right && <ProjectCard project={row.right} index={ri * 2 + 1} size={row.leftFirst ? "small" : "large"} />}
            </div>
          );
        }

        if (row.type === "double") {
          return (
            <div key={ri} className="grid gap-3 md:grid-cols-2">
              {row.left && <ProjectCard project={row.left} index={ri * 2} size="normal" />}
              {row.right && <ProjectCard project={row.right} index={ri * 2 + 1} size="normal" />}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
        <div className="h-[520px] bg-zinc-900/60 animate-pulse" />
        <div className="h-[520px] bg-zinc-900/60 animate-pulse" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="h-[380px] bg-zinc-900/60 animate-pulse" />
        <div className="h-[380px] bg-zinc-900/60 animate-pulse" />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const [categories, setCategories] = useState(["Tutti"]);
  const heroVideoRef = useRef(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

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
    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* ── HERO CINEMATOGRAFICA ── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Video reel di sfondo */}
        <video
          ref={heroVideoRef}
          src="/videos/ToyotaXReply.mp4"
          autoPlay muted loop playsInline
          onCanPlay={() => setHeroLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[3000ms] ${heroLoaded ? "scale-100 opacity-60" : "scale-110 opacity-0"}`}
          style={{ filter: "saturate(0.7)" }}
        />

        {/* Overlay gradiente cinematografico */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        {/* Contenuto hero */}
        <div className={`relative z-10 flex h-full flex-col items-center justify-center px-4 text-center transition-all duration-1000 delay-500 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-violet-400/60" />
            <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.5em] text-violet-300">
              Future Frames
            </span>
            <div className="h-px w-12 bg-violet-400/60" />
          </div>

          {/* Titolo enorme */}
          <h1 className="font-antonio text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-none text-white tracking-tight">
            PORTFOLIO
          </h1>

          {/* Sottotitolo */}
          <p className={`mt-4 font-montserrat text-sm md:text-base text-zinc-400 tracking-[0.15em] max-w-md transition-all duration-1000 delay-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Storie raccontate attraverso il movimento
          </p>

          {/* Contatore progetti */}
          {!loading && (
            <div className={`mt-8 flex items-center gap-6 transition-all duration-1000 delay-1000 ${heroLoaded ? "opacity-100" : "opacity-0"}`}>
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

      {/* ── FILTRI CATEGORIA ── */}
      <section className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`font-montserrat text-[0.6rem] uppercase tracking-[0.25em] px-4 py-1.5 rounded-full transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-white text-black border-white"
                    : "border-white/15 text-zinc-400 hover:border-white/30 hover:text-zinc-200"
                }`}>
                {cat}
              </button>
            ))}
          </div>
          <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.25em] text-zinc-600 hidden sm:block">
            {filtered.length} progett{filtered.length !== 1 ? "i" : "o"}
          </span>
        </div>
      </section>

      {/* ── GRIGLIA PROGETTI ── */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        {loading ? (
          <SkeletonGrid />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <i className="fa-solid fa-film text-zinc-700 text-5xl" />
            <p className="font-antonio text-2xl text-zinc-600">Nessun progetto trovato.</p>
          </div>
        ) : (
          <ProjectGrid projects={filtered} />
        )}
      </section>

      {/* ── CTA FINALE ── */}
      <section className="relative overflow-hidden mt-6">
        <div className="relative h-[60vh] md:h-[70vh]">
          <video
            src="/videos/ToyotaXReply.mp4"
            autoPlay muted loop playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            style={{ filter: "saturate(0.5)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)]" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-violet-500/50" />
              <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.4em] text-violet-400">Next project</span>
              <div className="h-px w-8 bg-violet-500/50" />
            </div>
            <h2 className="font-antonio text-4xl sm:text-5xl md:text-7xl text-white leading-none mb-6">
              Pronto a raccontare
              <span className="block text-violet-300">la tua storia?</span>
            </h2>
            <p className="font-montserrat text-sm text-zinc-400 max-w-md mb-10 leading-relaxed">
              Ogni progetto nasce da una conversazione. Parliamo di quello che vuoi realizzare.
            </p>
            <Link href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-violet-400/50 px-8 py-4 transition-all duration-500 hover:border-violet-400 hover:shadow-[0_0_60px_rgba(139,92,246,0.4)]">
              <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/20 transition-colors duration-500" />
              <span className="relative font-montserrat text-xs uppercase tracking-[0.3em] text-violet-300 group-hover:text-violet-200">
                Contattaci
              </span>
              <i className="relative fa-solid fa-arrow-right text-violet-400 text-xs transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STYLE ANIMAZIONI ── */}
      <style jsx global>{`
        @keyframes scroll-line {
          0% { height: 0; top: 0; }
          50% { height: 100%; top: 0; }
          100% { height: 0; top: 100%; }
        }
        .animate-scroll-line {
          animation: scroll-line 1.8s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}