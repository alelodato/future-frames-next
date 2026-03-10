"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

export default function AdminBlog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const supabase = createSupabaseBrowser();
    const { data } = await supabase
      .from("articles")
      .select("id, title, category, published, created_at, excerpt")
      .order("created_at", { ascending: false });
    setArticles(data || []);
    setLoading(false);
  }

  async function togglePublished(id, current) {
    const supabase = createSupabaseBrowser();
    await supabase.from("articles").update({ published: !current }).eq("id", id);
    fetchArticles();
  }

  async function deleteArticle(id) {
    if (!confirm("Sei sicuro di voler eliminare questo articolo?")) return;
    const supabase = createSupabaseBrowser();
    await supabase.from("articles").delete().eq("id", id);
    fetchArticles();
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-antonio text-3xl text-white">Blog</h1>
          <p className="font-montserrat text-xs text-zinc-500 mt-1">
            {articles.length} articol{articles.length !== 1 ? "i" : "o"} totali
          </p>
        </div>
        <Link
          href="/admin/blog/nuovo"
          className="inline-flex items-center gap-2 rounded-full bg-violet-400 px-5 py-2.5 font-montserrat text-xs font-semibold uppercase tracking-wide text-[#050211] shadow-[0_0_20px_rgba(167,139,250,0.5)] transition hover:bg-violet-300"
        >
          <i className="fa-solid fa-plus text-xs" />
          Nuovo articolo
        </Link>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-zinc-900/60 border border-white/5 animate-pulse" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-900/10 via-[#0d0b2a] to-slate-950/80">
          <i className="fa-solid fa-pen-nib text-violet-500/30 text-4xl mb-3 block" />
          <p className="font-antonio text-xl text-zinc-500">Nessun articolo ancora.</p>
          <Link href="/admin/blog/nuovo"
            className="inline-flex items-center gap-2 mt-4 font-montserrat text-xs uppercase tracking-[0.2em] text-violet-400 hover:text-violet-300">
            Crea il primo articolo
            <i className="fa-solid fa-arrow-right text-xs" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div key={article.id}
              className="flex items-center gap-4 rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-900/10 via-[#0d0b2a] to-slate-950/80 px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

              {/* Status dot */}
              <div className={`h-2 w-2 flex-shrink-0 rounded-full ${article.published ? "bg-emerald-400" : "bg-zinc-600"}`} />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-antonio text-base text-white truncate">{article.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  {article.category && (
                    <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.15em] text-violet-400">
                      {article.category}
                    </span>
                  )}
                  <span className="font-montserrat text-[0.6rem] text-zinc-600">
                    {new Date(article.created_at).toLocaleDateString("it-IT")}
                  </span>
                  <span className={`font-montserrat text-[0.6rem] uppercase tracking-[0.15em] ${article.published ? "text-emerald-400" : "text-zinc-500"}`}>
                    {article.published ? "Pubblicato" : "Bozza"}
                  </span>
                </div>
              </div>

              {/* Azioni */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Toggle pubblicato */}
                <button
                  onClick={() => togglePublished(article.id, article.published)}
                  className={`rounded-full px-3 py-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.15em] transition border ${
                    article.published
                      ? "border-zinc-600 text-zinc-400 hover:border-red-500/50 hover:text-red-400"
                      : "border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/20"
                  }`}
                >
                  {article.published ? "Nascondi" : "Pubblica"}
                </button>

                {/* Modifica */}
                <Link
                  href={`/admin/blog/${article.id}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-500/25 bg-violet-900/20 transition hover:bg-violet-900/40"
                >
                  <i className="fa-solid fa-pen text-violet-400 text-xs" />
                </Link>

                {/* Elimina */}
                <button
                  onClick={() => deleteArticle(article.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/20 bg-red-900/10 transition hover:bg-red-900/30"
                >
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