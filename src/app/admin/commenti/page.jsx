"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

export default function AdminCommenti() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending"); // pending | approved | all

  useEffect(() => { fetchComments(); }, [filter]);

  async function fetchComments() {
    setLoading(true);
    const supabase = createSupabaseBrowser();

    let query = supabase
      .from("article_comments")
      .select("*, articles(title, slug)")
      .order("created_at", { ascending: false });

    if (filter === "pending") query = query.eq("approved", false);
    if (filter === "approved") query = query.eq("approved", true);

    const { data } = await query;
    setComments(data || []);
    setLoading(false);
  }

  async function approve(id) {
    const supabase = createSupabaseBrowser();
    await supabase.from("article_comments").update({ approved: true }).eq("id", id);
    fetchComments();
  }

  async function deleteComment(id) {
    if (!confirm("Eliminare questo commento?")) return;
    const supabase = createSupabaseBrowser();
    await supabase.from("article_comments").delete().eq("id", id);
    fetchComments();
  }

  const tabs = [
    { key: "pending", label: "Da approvare", icon: "fa-clock" },
    { key: "approved", label: "Approvati", icon: "fa-circle-check" },
    { key: "all", label: "Tutti", icon: "fa-list" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Header */}
      <div>
        <h1 className="font-antonio text-3xl text-white">Commenti</h1>
        <p className="font-montserrat text-xs text-zinc-500 mt-1">
          Gestisci i commenti degli articoli del blog
        </p>
      </div>

      {/* Tab filtri */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setFilter(tab.key)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-montserrat text-[0.65rem] uppercase tracking-[0.2em] transition border ${
              filter === tab.key
                ? "bg-violet-500 border-violet-500 text-white"
                : "border-violet-500/25 bg-violet-900/10 text-violet-400 hover:bg-violet-900/30"
            }`}>
            <i className={`fa-solid ${tab.icon} text-xs`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lista */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-zinc-900/60 border border-white/5 animate-pulse" />
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-900/10 via-[#0d0b2a] to-slate-950/80">
          <i className="fa-regular fa-comments text-violet-500/30 text-4xl mb-3 block" />
          <p className="font-antonio text-xl text-zinc-500">
            {filter === "pending" ? "Nessun commento in attesa." : "Nessun commento trovato."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id}
              className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-900/10 via-[#0d0b2a] to-slate-950/80 p-5 space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

              {/* Header commento */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-violet-400/20 bg-violet-900/40">
                    <i className="fa-solid fa-user text-violet-400 text-xs" />
                  </div>
                  <div>
                    <p className="font-antonio text-sm text-white">{comment.author_name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {comment.author_email && (
                        <span className="font-montserrat text-[0.58rem] text-zinc-500">{comment.author_email}</span>
                      )}
                      <span className="text-zinc-700">·</span>
                      <span className="font-montserrat text-[0.58rem] text-zinc-500">
                        {new Date(comment.created_at).toLocaleDateString("it-IT", {
                          day: "numeric", month: "short", year: "numeric",
                          hour: "2-digit", minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status badge */}
                <span className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 font-montserrat text-[0.55rem] uppercase tracking-[0.15em] ${
                  comment.approved
                    ? "border-emerald-500/30 bg-emerald-900/20 text-emerald-400"
                    : "border-amber-500/30 bg-amber-900/20 text-amber-400"
                }`}>
                  {comment.approved ? "Approvato" : "In attesa"}
                </span>
              </div>

              {/* Articolo di riferimento */}
              {comment.articles && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-900/15 border border-violet-500/10">
                  <i className="fa-solid fa-pen-nib text-violet-400 text-xs flex-shrink-0" />
                  <span className="font-montserrat text-[0.62rem] text-zinc-400 truncate">
                    {comment.articles.title}
                  </span>
                </div>
              )}

              {/* Testo commento */}
              <p className="font-montserrat text-sm text-zinc-300 leading-relaxed border-l-2 border-violet-500/30 pl-4">
                {comment.content}
              </p>

              {/* Azioni */}
              <div className="flex items-center gap-2 pt-1">
                {!comment.approved && (
                  <button onClick={() => approve(comment.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-900/15 px-4 py-1.5 font-montserrat text-[0.62rem] uppercase tracking-[0.15em] text-emerald-400 transition hover:bg-emerald-900/30">
                    <i className="fa-solid fa-check text-xs" />
                    Approva
                  </button>
                )}
                <button onClick={() => deleteComment(comment.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-900/10 px-4 py-1.5 font-montserrat text-[0.62rem] uppercase tracking-[0.15em] text-red-400 transition hover:bg-red-900/25">
                  <i className="fa-solid fa-trash text-xs" />
                  Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}