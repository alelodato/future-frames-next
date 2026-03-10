"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import ArticleEditor from "@/components/admin/ArticleEditor";

export default function NuovoArticolo() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(data) {
    setSaving(true);
    setError("");
    const supabase = createSupabaseBrowser();

    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();

    const { error } = await supabase.from("articles").insert({
      ...data,
      slug,
    });

    if (error) {
      setError("Errore durante il salvataggio. Riprova.");
      setSaving(false);
      return;
    }

    router.push("/admin/blog");
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/25 bg-violet-900/20 transition hover:bg-violet-900/40">
          <i className="fa-solid fa-arrow-left text-violet-400 text-xs" />
        </button>
        <div>
          <h1 className="font-antonio text-3xl text-white">Nuovo articolo</h1>
          <p className="font-montserrat text-xs text-zinc-500 mt-0.5">
            Lo slug verrà generato automaticamente dal titolo
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-900/20 px-4 py-3">
          <p className="font-montserrat text-xs text-red-300">{error}</p>
        </div>
      )}

      <ArticleEditor onSave={handleSave} saving={saving} />
    </div>
  );
}