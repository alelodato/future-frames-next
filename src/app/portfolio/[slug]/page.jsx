"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

// ─── Lightbox ────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}>
      <button onClick={onClose}
        className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20">
        <i className="fa-solid fa-xmark" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); }}
        className="absolute left-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20">
        <i className="fa-solid fa-chevron-left text-sm" />
      </button>

      <img
        src={images[current].url}
        alt=""
        className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); }}
        className="absolute right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20">
        <i className="fa-solid fa-chevron-right text-sm" />
      </button>

      <div className="absolute bottom-6 font-montserrat text-xs text-zinc-400 tracking-[0.2em]">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}

// ─── Video embed ──────────────────────────────────────────────
function VideoEmbed({ url, platform }) {
  if (!url) return null;

  let embedUrl = "";
  if (platform === "vimeo") {
    const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
    if (id) embedUrl = `https://player.vimeo.com/video/${id}?autoplay=0&title=0&byline=0&portrait=0`;
  } else if (platform === "youtube") {
    const id = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1];
    if (id) embedUrl = `https://www.youtube.com/embed/${id}`;
  }

  if (!embedUrl) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
      style={{ paddingTop: "56.25%" }}>
      <iframe
        src={embedUrl}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────
export default function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  // Parallax hero
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const inner = heroRef.current.querySelector(".hero-inner");
      if (inner) inner.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function fetchProject() {
    const supabase = createSupabaseBrowser();
    const { data } = await supabase
      .from("projects")
      .select("*, project_images(*)")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (data) {
      setProject(data);
      const sorted = (data.project_images || []).sort((a, b) => a.position - b.position);
      setImages(sorted);

      if (data.category) {
        const { data: rel } = await supabase
          .from("projects")
          .select("id, slug, title, cover_image, category, year")
          .eq("published", true)
          .eq("category", data.category)
          .neq("slug", slug)
          .limit(3);
        setRelated(rel || []);
      }
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <i className="fa-solid fa-spinner animate-spin text-violet-400 text-2xl" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-antonio text-3xl text-zinc-400">Progetto non trovato.</p>
          <Link href="/portfolio" className="font-montserrat text-xs uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200">
            ← Torna al portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-[85vh] overflow-hidden">
        <div className="hero-inner absolute inset-[-15%]">
          {project.cover_image ? (
            <img src={project.cover_image} alt={project.title}
              className="h-full w-full object-cover opacity-60" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-violet-900/40 via-[#0d0b2a] to-black" />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Numero decorativo */}
        <div className="absolute top-8 right-8 font-antonio text-[10rem] leading-none text-white/4 select-none pointer-events-none hidden md:block">
          {String(project.id).padStart(2, "0")}
        </div>

        {/* Contenuto */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-14 max-w-4xl">
          <Link href="/portfolio"
            className="inline-flex items-center gap-2 mb-6 w-fit rounded-full border border-white/15 bg-black/40 px-4 py-1.5 font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-zinc-300 backdrop-blur-sm transition hover:bg-black/60">
            <i className="fa-solid fa-arrow-left text-xs" />
            Portfolio
          </Link>

          <div className="flex items-center gap-3 mb-3">
            {project.category && (
              <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.35em] text-violet-300">
                {project.category}
              </span>
            )}
            {project.featured && (
              <span className="rounded-full border border-amber-400/40 bg-amber-900/30 px-2.5 py-0.5 font-montserrat text-[0.55rem] uppercase tracking-[0.2em] text-amber-300">
                Featured
              </span>
            )}
          </div>

          <h1 className="font-antonio text-5xl sm:text-6xl md:text-8xl leading-none text-white mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            {project.year && (
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-calendar text-violet-400 text-xs" />
                <span className="font-montserrat text-xs text-zinc-400">{project.year}</span>
              </div>
            )}
            {project.location && (
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-violet-400 text-xs" />
                <span className="font-montserrat text-xs text-zinc-400">{project.location}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CONTENUTO ── */}
      <section className="mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 md:gap-16">

          {/* Colonna sinistra */}
          <div className="space-y-10">

            {/* Video embed */}
            {project.video_full_url && (
              <VideoEmbed url={project.video_full_url} platform={project.video_platform} />
            )}

            {/* Descrizione */}
            {project.description && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-violet-500/50" />
                  <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.35em] text-violet-400">Il progetto</span>
                </div>
                <p className="font-montserrat text-sm md:text-base text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag}
                    className="rounded-full border border-violet-500/25 bg-violet-900/15 px-3 py-1 font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-violet-300">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Galleria */}
            {images.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-violet-500/50" />
                  <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.35em] text-violet-400">Galleria</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {images.map((img, i) => (
                    <div key={img.id} onClick={() => setLightbox(i)}
                      className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer">
                      <img src={img.url} alt={`${project.title} ${i + 1}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <i className="fa-solid fa-expand text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-900/10 via-[#0d0b2a] to-slate-950/80 p-6 space-y-5 sticky top-24">

              <h3 className="font-antonio text-lg text-white">Dettagli</h3>

              <div className="space-y-4">
                {project.category && (
                  <div>
                    <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.25em] text-zinc-600 mb-1">Tipo</p>
                    <p className="font-montserrat text-sm text-zinc-300">{project.category}</p>
                  </div>
                )}
                {project.year && (
                  <div>
                    <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.25em] text-zinc-600 mb-1">Anno</p>
                    <p className="font-montserrat text-sm text-zinc-300">{project.year}</p>
                  </div>
                )}
                {project.location && (
                  <div>
                    <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.25em] text-zinc-600 mb-1">Location</p>
                    <p className="font-montserrat text-sm text-zinc-300">{project.location}</p>
                  </div>
                )}
              </div>

              <div className="h-px bg-violet-500/15" />

              {/* CTA sidebar */}
              <div className="space-y-3">
                <p className="font-montserrat text-xs text-zinc-400 leading-relaxed">
                  Vuoi un progetto simile?
                </p>
                <Link href="/contact"
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-violet-400 px-5 py-2.5 font-montserrat text-xs font-semibold uppercase tracking-wide text-[#050211] shadow-[0_0_20px_rgba(167,139,250,0.4)] transition hover:bg-violet-300">
                  <i className="fa-solid fa-circle-arrow-right text-xs" />
                  Contattaci
                </Link>
                <Link href="/portfolio"
                  className="flex items-center justify-center gap-2 w-full rounded-full border border-violet-500/30 px-5 py-2.5 font-montserrat text-xs uppercase tracking-wide text-violet-400 transition hover:bg-violet-900/20">
                  <i className="fa-solid fa-grid-2 text-xs" />
                  Tutti i progetti
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGETTI CORRELATI ── */}
      {related.length > 0 && (
        <section className="border-t border-white/5 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-8 space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
              <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.35em] text-violet-400">Progetti correlati</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link key={p.id} href={`/portfolio/${p.slug}`} className="group block">
                  <article className="relative overflow-hidden rounded-2xl h-56">
                    {p.cover_image ? (
                      <img src={p.cover_image} alt={p.title}
                        className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-[1.06] group-hover:opacity-80" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-black" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 p-5">
                      <span className="font-montserrat text-[0.58rem] uppercase tracking-[0.2em] text-violet-400">{p.category}</span>
                      <h4 className="font-antonio text-lg text-white group-hover:text-violet-200 transition mt-0.5">{p.title}</h4>
                      <span className="font-montserrat text-[0.58rem] text-zinc-500">{p.year}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-violet-500/0 group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-fuchsia-500 w-full transition-all duration-500" />
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINALE ── */}
      <section className="py-20 md:py-28 text-center px-4">
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="relative space-y-5">
          <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.4em] text-violet-400">Next step</p>
          <h2 className="font-antonio text-4xl md:text-6xl text-white leading-none">
            Raccontiamo insieme
            <span className="block text-violet-300">la tua storia.</span>
          </h2>
          <p className="font-montserrat text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Ogni progetto nasce da una conversazione. Parliamo di quello che vuoi realizzare.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-3 rounded-full border border-violet-400/50 px-8 py-4 font-montserrat text-xs uppercase tracking-[0.3em] text-violet-300 transition hover:bg-violet-900/30 hover:border-violet-400 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]">
            Contattaci
            <i className="fa-solid fa-arrow-right text-xs" />
          </Link>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <Lightbox images={images} startIndex={lightbox} onClose={() => setLightbox(null)} />
      )}

    </div>
  );
}