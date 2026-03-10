"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

function LikeButton({ articleId }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchLikes();
    checkIfLiked();
  }, [articleId]);

  async function fetchLikes() {
    const supabase = createSupabaseBrowser();
    const { count } = await supabase
      .from("article_likes")
      .select("*", { count: "exact", head: true })
      .eq("article_id", articleId);
    setLikes(count || 0);
  }

  function getSessionId() {
    let id = localStorage.getItem("ff_session");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("ff_session", id);
    }
    return id;
  }

  async function checkIfLiked() {
    const supabase = createSupabaseBrowser();
    const sessionId = getSessionId();
    const { data } = await supabase
      .from("article_likes")
      .select("id")
      .eq("article_id", articleId)
      .eq("session_id", sessionId)
      .single();
    setLiked(!!data);
  }

  async function toggleLike() {
    const supabase = createSupabaseBrowser();
    const sessionId = getSessionId();

    if (liked) {
      await supabase
        .from("article_likes")
        .delete()
        .eq("article_id", articleId)
        .eq("session_id", sessionId);
      setLikes((l) => l - 1);
      setLiked(false);
    } else {
      await supabase
        .from("article_likes")
        .insert({ article_id: articleId, session_id: sessionId });
      setLikes((l) => l + 1);
      setLiked(true);
    }
  }

  return (
    <button
      onClick={toggleLike}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-montserrat text-xs uppercase tracking-[0.2em] transition ${
        liked
          ? "border-red-400/50 bg-red-900/20 text-red-400 shadow-[0_0_20px_rgba(248,113,113,0.2)]"
          : "border-violet-500/30 bg-violet-900/10 text-violet-400 hover:bg-violet-900/30"
      }`}
    >
      <i className={`fa-${liked ? "solid" : "regular"} fa-heart text-sm`} />
      {likes} {likes === 1 ? "like" : "likes"}
    </button>
  );
}

function CommentSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  async function fetchComments() {
    const supabase = createSupabaseBrowser();
    const { data } = await supabase
      .from("article_comments")
      .select("*")
      .eq("article_id", articleId)
      .eq("approved", true)
      .order("created_at", { ascending: true });
    setComments(data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    const supabase = createSupabaseBrowser();
    await supabase.from("article_comments").insert({
      article_id: articleId,
      author_name: name,
      author_email: email,
      content,
    });
    setSending(false);
    setSent(true);
    setName("");
    setEmail("");
    setContent("");
  }

  return (
    <div className="space-y-8">
      {/* Lista commenti */}
      {comments.length > 0 && (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-900/10 via-[#0d0b2a] to-slate-950/80 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-400/20 bg-violet-900/40">
                  <i className="fa-solid fa-user text-violet-400 text-xs" />
                </div>
                <div>
                  <p className="font-antonio text-sm text-white">{c.author_name}</p>
                  <p className="font-montserrat text-[0.6rem] text-zinc-500">
                    {new Date(c.created_at).toLocaleDateString("it-IT", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                  </p>
                </div>
              </div>
              <p className="font-montserrat text-sm text-zinc-300 leading-relaxed">{c.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Form commento */}
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-6 space-y-4">
        <h4 className="font-antonio text-lg text-white">Lascia un commento</h4>

        {sent ? (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-900/20 px-4 py-3">
            <p className="font-montserrat text-xs text-emerald-300">
              Commento inviato! Sarà visibile dopo l&apos;approvazione.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">
                  Nome *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">
                Commento *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
                className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60 resize-none"
              />
            </div>
            <p className="font-montserrat text-[0.6rem] text-zinc-600">
              Il commento sarà visibile dopo approvazione.
            </p>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-full bg-violet-400 px-6 py-2.5 font-montserrat text-xs font-semibold uppercase tracking-wide text-[#050211] shadow-[0_0_20px_rgba(167,139,250,0.5)] transition hover:bg-violet-300 disabled:opacity-50"
            >
              {sending ? (
                <><i className="fa-solid fa-spinner animate-spin text-xs" />Invio...</>
              ) : (
                <><i className="fa-solid fa-paper-plane text-xs" />Invia commento</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  async function fetchArticle() {
    const supabase = createSupabaseBrowser();
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    setArticle(data);

    if (data?.category) {
      const { data: rel } = await supabase
        .from("articles")
        .select("id, slug, title, cover_image, category, created_at")
        .eq("published", true)
        .eq("category", data.category)
        .neq("slug", slug)
        .limit(2);
      setRelated(rel || []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02010b] flex items-center justify-center">
        <i className="fa-solid fa-spinner animate-spin text-violet-400 text-2xl" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#02010b] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-antonio text-3xl text-zinc-400">Articolo non trovato.</p>
          <Link href="/blog" className="font-montserrat text-xs uppercase tracking-[0.2em] text-violet-300 hover:text-violet-200">
            ← Torna al blog
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(article.created_at).toLocaleDateString("it-IT", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <section className="min-h-screen bg-[#02010b] text-white">

      {/* ── HERO ── */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {article.cover_image ? (
          <img
            src={article.cover_image}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-[#0d0b2a] to-slate-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#02010b]" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-violet-600/15 blur-3xl" />

        <div className="relative mx-auto flex h-full max-w-3xl flex-col justify-end px-4 pb-10">
          <Link href="/blog"
            className="inline-flex items-center gap-2 mb-4 w-fit rounded-full border border-white/15 bg-black/40 px-4 py-1.5 font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-zinc-300 backdrop-blur-sm transition hover:bg-black/60">
            <i className="fa-solid fa-arrow-left text-xs" />
            Blog
          </Link>

          {article.category && (
            <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-300 mb-2">
              {article.category}
            </span>
          )}
          <h1 className="font-antonio text-3xl sm:text-4xl md:text-5xl leading-tight text-white">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="font-montserrat text-[0.65rem] text-zinc-400">{date}</span>
            <span className="text-zinc-600">·</span>
            <span className="font-montserrat text-[0.65rem] text-zinc-400">{article.author}</span>
            {article.read_time && (
              <>
                <span className="text-zinc-600">·</span>
                <span className="font-montserrat text-[0.65rem] text-zinc-400">
                  {article.read_time} min di lettura
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── CONTENUTO ── */}
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-12">

        {/* Testo articolo */}
        <div
          className="prose prose-invert prose-violet max-w-none font-montserrat text-sm leading-relaxed text-zinc-300
            prose-headings:font-antonio prose-headings:text-white
            prose-h2:text-2xl prose-h3:text-xl
            prose-a:text-violet-400 prose-a:no-underline hover:prose-a:text-violet-300
            prose-blockquote:border-violet-500 prose-blockquote:text-zinc-400
            prose-strong:text-white prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Like */}
        <div className="flex items-center gap-4 py-6 border-t border-violet-500/15">
          <p className="font-montserrat text-xs text-zinc-400">Ti è piaciuto questo articolo?</p>
          <LikeButton articleId={article.id} />
        </div>

        {/* Commenti */}
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-comments text-violet-400 text-xs" />
              <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-400">Commenti</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
          </div>
          <CommentSection articleId={article.id} />
        </div>

        {/* Articoli correlati */}
        {related.length > 0 && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-pen-nib text-violet-400 text-xs" />
                <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.3em] text-violet-400">Articoli correlati</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((a) => (
                <Link key={a.id} href={`/blog/${a.slug}`} className="group block">
                  <article className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-900/10 via-[#0d0b2a] to-slate-950/80 overflow-hidden transition hover:border-violet-500/30">
                    {a.cover_image && (
                      <div className="h-32 overflow-hidden">
                        <img src={a.cover_image} alt={a.title}
                          className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-80" />
                      </div>
                    )}
                    <div className="p-4">
                      <span className="font-montserrat text-[0.58rem] uppercase tracking-[0.18em] text-violet-400">{a.category}</span>
                      <h4 className="font-antonio text-base text-white group-hover:text-violet-200 transition mt-1 line-clamp-2">{a.title}</h4>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center pt-6 pb-10 space-y-4">
          <p className="font-montserrat text-sm text-zinc-400">Hai un progetto in mente?</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-violet-400 px-7 py-3 text-xs font-montserrat font-semibold uppercase tracking-wide text-[#050211] shadow-[0_0_26px_rgba(167,139,250,0.7)] transition hover:bg-violet-300">
            Contattaci
            <i className="fa-solid fa-circle-arrow-right" />
          </Link>
        </div>

      </div>
    </section>
  );
}