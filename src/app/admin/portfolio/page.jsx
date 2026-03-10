"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

export default function AdminPortfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProjects(); }, []);

  async function fetchProjects() {
    const supabase = createSupabaseBrowser();
    const { data } = await supabase
      .from("projects")
      .select("id, slug, title, category, year, published, featured, cover_image")
      .order("created_at", { ascending: false });
    setProjects(data || []);
    setLoading(false);
  }

  async function togglePublished(id, current) {
    const supabase = createSupabaseBrowser();
    await supabase.from("projects").update({ published: !current }).eq("id", id);
    fetchProjects();
  }

  async function toggleFeatured(id, current) {
    const supabase = createSupabaseBrowser();
    await supabase.from("projects").update({ featured: !current }).eq("id", id);
    fetchProjects();
  }

  async function deleteProject(id) {
    if (!confirm("Sei sicuro di voler eliminare questo progetto?")) return;
    const supabase = createSupabaseBrowser();
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-antonio text-3xl text-white">Portfolio</h1>
          <p className="font-montserrat text-xs text-zinc-500 mt-1">
            {projects.length} progett{projects.length !== 1 ? "i" : "o"} totali
          </p>
        </div>
        <Link href="/admin/portfolio/nuovo"
          className="inline-flex items-center gap-2 rounded-full bg-violet-400 px-5 py-2.5 font-montserrat text-xs font-semibold uppercase tracking-wide text-[#050211] shadow-[0_0_20px_rgba(167,139,250,0.5)] transition hover:bg-violet-300">
          <i className="fa-solid fa-plus text-xs" />
          Nuovo progetto
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-zinc-900/60 border border-white/5 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-900/10 via-[#0d0b2a] to-slate-950/80">
          <i className="fa-solid fa-film text-violet-500/30 text-4xl mb-3 block" />
          <p className="font-antonio text-xl text-zinc-500">Nessun progetto ancora.</p>
          <Link href="/admin/portfolio/nuovo"
            className="inline-flex items-center gap-2 mt-4 font-montserrat text-xs uppercase tracking-[0.2em] text-violet-400 hover:text-violet-300">
            Crea il primo progetto
            <i className="fa-solid fa-arrow-right text-xs" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id}
              className="flex items-center gap-4 rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-900/10 via-[#0d0b2a] to-slate-950/80 px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

              {/* Cover mini */}
              <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-white/10">
                {project.cover_image ? (
                  <img src={project.cover_image} alt={project.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-violet-900/40 flex items-center justify-center">
                    <i className="fa-solid fa-film text-violet-500/40 text-xs" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-antonio text-base text-white truncate">{project.title}</p>
                  {project.featured && (
                    <span className="rounded-full border border-amber-400/30 bg-amber-900/20 px-2 py-0.5 font-montserrat text-[0.55rem] uppercase tracking-[0.15em] text-amber-300">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  {project.category && (
                    <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.15em] text-violet-400">
                      {project.category}
                    </span>
                  )}
                  {project.year && (
                    <span className="font-montserrat text-[0.6rem] text-zinc-600">{project.year}</span>
                  )}
                  <span className={`font-montserrat text-[0.6rem] uppercase tracking-[0.15em] ${project.published ? "text-emerald-400" : "text-zinc-500"}`}>
                    {project.published ? "Pubblicato" : "Bozza"}
                  </span>
                </div>
              </div>

              {/* Azioni */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggleFeatured(project.id, project.featured)}
                  className={`rounded-full px-3 py-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.15em] transition border ${
                    project.featured
                      ? "border-amber-400/40 text-amber-400 bg-amber-900/20"
                      : "border-zinc-600 text-zinc-500 hover:border-amber-400/40 hover:text-amber-400"
                  }`}>
                  <i className="fa-solid fa-star text-xs" />
                </button>

                <button onClick={() => togglePublished(project.id, project.published)}
                  className={`rounded-full px-3 py-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.15em] transition border ${
                    project.published
                      ? "border-zinc-600 text-zinc-400 hover:border-red-500/50 hover:text-red-400"
                      : "border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/20"
                  }`}>
                  {project.published ? "Nascondi" : "Pubblica"}
                </button>

                <Link href={`/admin/portfolio/${project.id}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-500/25 bg-violet-900/20 transition hover:bg-violet-900/40">
                  <i className="fa-solid fa-pen text-violet-400 text-xs" />
                </Link>

                <button onClick={() => deleteProject(project.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/20 bg-red-900/10 transition hover:bg-red-900/30">
                  <i className="fa-solid fa-trash text-red-400 text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}