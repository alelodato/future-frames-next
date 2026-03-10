"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import ArticleEditor from "@/components/admin/ArticleEditor";

export default function ModificaArticolo() {
  const router = useRouter();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchArticle() {
      const supabase = createSupabaseBrowser();
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();
      setArticle(data);
      setLoading(false);
    }
    fetchArticle();
  }, [id]);

  async function handleSave(data) {
    setSaving(true);
    setError("");
    const supabase = createSupabaseBrowser();

    const { error } = await supabase
      .from("articles")
      .update(data)
      .eq("id", id);

    if (error) {
      setError("Errore durante il salvataggio. Riprova.");
      setSaving(false);
      return;
    }

    router.push("/admin/blog");
  }

  if (loading) {
    return (
      <div className="max-w-4xl space-y-4">
        <div className="h-10 w-48 rounded-xl bg-zinc-900/60 animate-pulse" />
        <div className="h-96 rounded-2xl bg-zinc-900/60 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/25 bg-violet-900/20 transition hover:bg-violet-900/40">
          <i className="fa-solid fa-arrow-left text-violet-400 text-xs" />
        </button>
        <div>
          <h1 className="font-antonio text-3xl text-white">Modifica articolo</h1>
          <p className="font-montserrat text-xs text-zinc-500 mt-0.5 truncate max-w-xs">
            {article?.title}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-900/20 px-4 py-3">
          <p className="font-montserrat text-xs text-red-300">{error}</p>
        </div>
      )}

      <ArticleEditor initialData={article} onSave={handleSave} saving={saving} />
    </div>
  );
}