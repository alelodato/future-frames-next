"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

const categories = ["Tutti", "Fotografia", "Videomaking", "Dietro le quinte", "Consigli", "Progetti"];

function Divider({ icon, label }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="flex items-center gap-2">
        <i className={`${icon} text-violet-400 text-xs`} />
        <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-400">
          {label}
        </span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
    </div>
  );
}

function ArticleCard({ article, featured = false }) {
  const date = new Date(article.created_at).toLocaleDateString("it-IT", {
    day: "numeric", month: "long", year: "numeric",
  });

  if (featured) {
    return (
      <Link href={`/blog/${article.slug}`} className="group block col-span-1 md:col-span-2">
        <article className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-zinc-900/70 shadow-[0_20px_60px_rgba(0,0,0,0.8)] h-[360px] md:h-[440px]">
          {article.cover_image ? (
            <img
              src={article.cover_image}
              alt={article.title}
              className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-70"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-[#0d0b2a] to-slate-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="absolute top-5 left-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-violet-900/70 px-3 py-1 text-[0.6rem] font-montserrat uppercase tracking-[0.2em] text-violet-300 backdrop-blur-sm">
              <i className="fa-solid fa-star text-[0.5rem]" />
              Articolo in evidenza
            </span>
          </div>

          <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
            {article.category && (
              <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.25em] text-violet-300">
                {article.category}
              </span>
            )}
            <h2 className="mt-2 font-antonio text-2xl md:text-3xl leading-snug text-white group-hover:text-violet-200 transition">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="mt-2 font-montserrat text-sm text-zinc-300 leading-relaxed line-clamp-2 max-w-2xl">
                {article.excerpt}
              </p>
            )}
            <div className="mt-4 flex items-center gap-4">
              <span className="font-montserrat text-[0.65rem] text-zinc-400">{date}</span>
              <span className="font-montserrat text-[0.65rem] text-zinc-500">·</span>
              <span className="font-montserrat text-[0.65rem] text-zinc-400">{article.author}</span>
              {article.read_time && (
                <>
                  <span className="font-montserrat text-[0.65rem] text-zinc-500">·</span>
                  <span className="font-montserrat text-[0.65rem] text-zinc-400">{article.read_time} min</span>
                </>
              )}
              <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-[0.18em] text-violet-400 group-hover:text-violet-300 transition">
                Leggi
                <i className="fa-solid fa-arrow-right text-[0.6rem]" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="h-full rounded-2xl border border-white/8 bg-zinc-900/60 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition duration-300 hover:border-violet-500/30 hover:shadow-[0_12px_40px_rgba(89,28,135,0.25)]">
        <div className="relative h-44 overflow-hidden">
          {article.cover_image ? (
            <img
              src={article.cover_image}
              alt={article.title}
              className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-85"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-violet-900/40 via-[#0d0b2a] to-slate-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {article.category && (
            <span className="absolute top-3 left-3 rounded-full border border-violet-400/30 bg-black/60 px-2.5 py-0.5 font-montserrat text-[0.58rem] uppercase tracking-[0.18em] text-violet-300 backdrop-blur-sm">
              {article.category}
            </span>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-antonio text-lg leading-snug text-white group-hover:text-violet-200 transition line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-2 font-montserrat text-xs text-zinc-400 leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-montserrat text-[0.62rem] text-zinc-500">{date}</span>
              {article.read_time && (
                <>
                  <span className="text-zinc-700">·</span>
                  <span className="font-montserrat text-[0.62rem] text-zinc-500">{article.read_time} min</span>
                </>
              )}
            </div>
            <span className="inline-flex items-center gap-1 text-[0.62rem] font-montserrat uppercase tracking-[0.15em] text-violet-400 group-hover:text-violet-300 transition">
              Leggi
              <i className="fa-solid fa-arrow-right text-[0.55rem]" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function SkeletonCard({ featured = false }) {
  if (featured) {
    return <div className="col-span-1 md:col-span-2 h-[360px] md:h-[440px] rounded-3xl bg-zinc-900/60 border border-white/5 animate-pulse" />;
  }
  return (
    <div className="rounded-2xl bg-zinc-900/60 border border-white/5 overflow-hidden animate-pulse">
      <div className="h-44 bg-zinc-800/60" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-zinc-800/60 rounded w-3/4" />
        <div className="h-3 bg-zinc-800/60 rounded w-full" />
        <div className="h-3 bg-zinc-800/60 rounded w-2/3" />
      </div>
    </div>
  );
}

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    setLoading(true);
    const supabase = createSupabaseBrowser();
    const { data, error } = await supabase
      .from("articles")
      .select("id, slug, title, excerpt, cover_image, category, author, read_time, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (!error) setArticles(data || []);
    setLoading(false);
  }

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === "Tutti" || a.category === activeCategory;
    const matchSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.excerpt || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="min-h-screen bg-[#02010b] text-white">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden py-32 md:py-40 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-[#02010b] to-[#02010b]" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[600px] rounded-full bg-violet-600/15 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-900/30 px-3 py-1 backdrop-blur-sm mb-5">
            <div className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            <p className="font-montserrat text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-violet-300">
              Future Frames Blog
            </p>
          </div>
          <h1 className="font-antonio text-4xl sm:text-5xl md:text-[3.2rem] leading-tight text-white">
            Storie, Consigli
            <span className="block text-violet-300">& Dietro le Quinte</span>
          </h1>
          <p className="mt-4 font-montserrat text-sm sm:text-base leading-relaxed text-zinc-400 max-w-xl mx-auto">
            Riflessioni sul mestiere, approfondimenti tecnici e racconti dai nostri set.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 space-y-10">

        {/* ── FILTRI ── */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 font-montserrat text-[0.65rem] uppercase tracking-[0.2em] transition border ${
                  activeCategory === cat
                    ? "bg-violet-500 border-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                    : "border-violet-500/25 bg-violet-900/10 text-violet-400 hover:bg-violet-900/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-auto">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-violet-400 text-xs" />
            <input
              type="text"
              placeholder="Cerca un articolo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 rounded-full border border-violet-500/30 bg-violet-900/10 pl-9 pr-4 py-2 font-montserrat text-xs text-white placeholder:text-zinc-500 outline-none transition focus:border-violet-400/60"
            />
          </div>
        </div>

        <Divider icon="fa-solid fa-pen-nib" label="Articoli" />

        {/* ── CONTENUTO ── */}
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            <SkeletonCard featured />
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <i className="fa-solid fa-magnifying-glass text-violet-500/40 text-4xl" />
            <p className="font-antonio text-xl text-zinc-500">
              {articles.length === 0 ? "Nessun articolo pubblicato ancora." : "Nessun articolo trovato."}
            </p>
            {articles.length > 0 && (
              <p className="font-montserrat text-xs text-zinc-600">
                Prova a cambiare categoria o parola chiave.
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {featured && <ArticleCard article={featured} featured />}
            {rest.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        )}

      </div>
    </section>
  );
}