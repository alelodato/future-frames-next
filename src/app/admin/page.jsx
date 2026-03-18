"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    publishedProjects: 0,
    articles: 0,
    publishedArticles: 0,
    pendingComments: 0,
    totalComments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [videoRecensione, setVideoRecensione] = useState("");
  const [uploadingVideoRecensione, setUploadingVideoRecensione] = useState(false);
  const [videoRecensioneUploaded, setVideoRecensioneUploaded] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const supabase = createSupabaseBrowser();

    const [
      { count: projects },
      { count: publishedProjects },
      { count: articles },
      { count: publishedArticles },
      { count: pendingComments },
      { count: totalComments },
      { data: videoSetting },
    ] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }).eq("published", true),
      supabase.from("articles").select("*", { count: "exact", head: true }),
      supabase.from("articles").select("*", { count: "exact", head: true }).eq("published", true),
      supabase.from("article_comments").select("*", { count: "exact", head: true }).eq("approved", false),
      supabase.from("article_comments").select("*", { count: "exact", head: true }),
      supabase.from("site_settings").select("value").eq("key", "video_recensione_url").single(),
    ]);

    if (videoSetting?.value) setVideoRecensione(videoSetting.value);

    setStats({
      projects: projects || 0,
      publishedProjects: publishedProjects || 0,
      articles: articles || 0,
      publishedArticles: publishedArticles || 0,
      pendingComments: pendingComments || 0,
      totalComments: totalComments || 0,
    });
    setLoading(false);
  }

  async function handleVideoRecensioneUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingVideoRecensione(true);
    const supabase = createSupabaseBrowser();
    const filename = `recensioni/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(filename, file);
    if (!error) {
      const { data } = supabase.storage.from("media").getPublicUrl(filename);
      setVideoRecensione(data.publicUrl);
      await supabase.from("site_settings").upsert({ key: "video_recensione_url", value: data.publicUrl });
      setVideoRecensioneUploaded(true);
      setTimeout(() => setVideoRecensioneUploaded(false), 2000);
    }
    setUploadingVideoRecensione(false);
  }

  const cards = [
    {
      title: "Portfolio",
      href: "/admin/portfolio",
      icon: "fa-film",
      color: "violet",
      main: stats.publishedProjects,
      mainLabel: "pubblicati",
      secondary: stats.projects,
      secondaryLabel: "totali",
    },
    {
      title: "Blog",
      href: "/admin/blog",
      icon: "fa-pen-nib",
      color: "fuchsia",
      main: stats.publishedArticles,
      mainLabel: "pubblicati",
      secondary: stats.articles,
      secondaryLabel: "totali",
    },
    {
      title: "Commenti",
      href: "/admin/commenti",
      icon: "fa-comments",
      color: "amber",
      main: stats.pendingComments,
      mainLabel: "in attesa",
      secondary: stats.totalComments,
      secondaryLabel: "totali",
      alert: stats.pendingComments > 0,
    },
  ];

  const colorMap = {
    violet: {
      border: "border-violet-500/20",
      bg: "from-violet-900/20",
      icon: "text-violet-400",
      iconBg: "bg-violet-900/40 border-violet-400/20",
      main: "text-violet-300",
      badge: "border-violet-500/30 text-violet-400",
    },
    fuchsia: {
      border: "border-fuchsia-500/20",
      bg: "from-fuchsia-900/20",
      icon: "text-fuchsia-400",
      iconBg: "bg-fuchsia-900/40 border-fuchsia-400/20",
      main: "text-fuchsia-300",
      badge: "border-fuchsia-500/30 text-fuchsia-400",
    },
    amber: {
      border: "border-amber-500/20",
      bg: "from-amber-900/20",
      icon: "text-amber-400",
      iconBg: "bg-amber-900/40 border-amber-400/20",
      main: "text-amber-300",
      badge: "border-amber-500/30 text-amber-400",
    },
  };

  return (
    <div className="space-y-8 max-w-4xl">

      {/* Header */}
      <div>
        <h1 className="font-antonio text-3xl text-white">Dashboard</h1>
        <p className="font-montserrat text-xs text-zinc-500 mt-1">
          Benvenuto nel pannello di gestione Future Frames.
        </p>
      </div>

      {/* Cards stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => {
          const c = colorMap[card.color];
          return (
            <Link key={card.title} href={card.href}
              className={`group relative rounded-2xl border ${c.border} bg-gradient-to-br ${c.bg} via-[#0d0b2a] to-slate-950/80 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]`}>

              {card.alert && (
                <div className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]">
                  <span className="font-montserrat text-[0.55rem] font-bold text-black">!</span>
                </div>
              )}

              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full border ${c.iconBg}`}>
                <i className={`fa-solid ${card.icon} ${c.icon} text-sm`} />
              </div>

              <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500 mb-2">
                {card.title}
              </p>

              {loading ? (
                <div className="space-y-2">
                  <div className="h-8 w-16 rounded-lg bg-zinc-800/60 animate-pulse" />
                  <div className="h-3 w-20 rounded bg-zinc-800/60 animate-pulse" />
                </div>
              ) : (
                <>
                  <p className={`font-antonio text-4xl ${c.main}`}>{card.main}</p>
                  <p className="font-montserrat text-[0.62rem] text-zinc-500 mt-1">
                    {card.mainLabel}
                    <span className="mx-1.5 text-zinc-700">·</span>
                    {card.secondary} {card.secondaryLabel}
                  </p>
                </>
              )}

              <div className={`mt-4 inline-flex items-center gap-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.2em] ${c.badge} border rounded-full px-2.5 py-1 transition group-hover:bg-white/5`}>
                Gestisci
                <i className="fa-solid fa-arrow-right text-[0.55rem] transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="space-y-3">
        <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-zinc-600">Azioni rapide</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/portfolio/nuovo"
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-900/10 px-4 py-2 font-montserrat text-xs uppercase tracking-[0.18em] text-violet-400 transition hover:bg-violet-900/30">
            <i className="fa-solid fa-plus text-xs" />
            Nuovo progetto
          </Link>
          <Link href="/admin/blog/nuovo"
            className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/25 bg-fuchsia-900/10 px-4 py-2 font-montserrat text-xs uppercase tracking-[0.18em] text-fuchsia-400 transition hover:bg-fuchsia-900/30">
            <i className="fa-solid fa-plus text-xs" />
            Nuovo articolo
          </Link>
          {stats.pendingComments > 0 && (
            <Link href="/admin/commenti"
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-900/10 px-4 py-2 font-montserrat text-xs uppercase tracking-[0.18em] text-amber-400 transition hover:bg-amber-900/30">
              <i className="fa-solid fa-clock text-xs" />
              {stats.pendingComments} comment{stats.pendingComments === 1 ? "o" : "i"} da approvare
            </Link>
          )}
        </div>
      </div>

      {/* Video recensione */}
      <div className="space-y-3">
        <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-zinc-600">Video recensione — About</p>
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-5 space-y-4">
          <p className="font-montserrat text-xs text-zinc-400">
            Carica il video recensione da mostrare nella pagina About. Sostituirà automaticamente quello precedente.
          </p>

          {videoRecensione && (
            <div className="relative overflow-hidden rounded-xl">
              <video src={videoRecensione} className="w-full h-40 object-cover rounded-xl" controls />
              <button
                type="button"
                onClick={async () => {
                  const supabase = createSupabaseBrowser();
                  await supabase.from("site_settings").upsert({ key: "video_recensione_url", value: "" });
                  setVideoRecensione("");
                }}
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-900/80 transition">
                <i className="fa-solid fa-xmark text-xs" />
              </button>
              <div className="absolute bottom-2 left-2">
                <span className="font-montserrat text-[0.5rem] uppercase tracking-wider text-zinc-300 bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm">
                  Video attuale
                </span>
              </div>
            </div>
          )}

          <label className={`flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-violet-500/30 bg-violet-900/10 px-4 py-4 transition hover:border-violet-400/50 ${uploadingVideoRecensione ? "opacity-50 pointer-events-none" : ""}`}>
            <i className={`fa-solid ${uploadingVideoRecensione ? "fa-spinner animate-spin" : videoRecensioneUploaded ? "fa-check" : "fa-video"} text-violet-400 text-sm`} />
            <div>
              <p className="font-montserrat text-xs text-zinc-300">
                {uploadingVideoRecensione ? "Caricamento in corso..." : videoRecensioneUploaded ? "Video caricato!" : "Carica nuovo video recensione"}
              </p>
            </div>
            <input type="file" accept="video/*" onChange={handleVideoRecensioneUpload} className="hidden" />
          </label>
        </div>
      </div>

    </div>
  );
}