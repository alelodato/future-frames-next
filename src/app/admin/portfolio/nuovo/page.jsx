"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import ProjectEditor from "@/components/admin/ProjectEditor";

export default function NuovoProgetto() {
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

    const { _images, ...projectData } = data;

    const { data: inserted, error: insertError } = await supabase
      .from("projects")
      .insert({ ...projectData, slug })
      .select("id")
      .single();

    if (insertError) {
      setError("Errore durante il salvataggio. Riprova.");
      setSaving(false);
      return;
    }

    // Salva immagini galleria
    if (_images?.length) {
      await supabase.from("project_images").insert(
        _images.map((img, i) => ({
          project_id: inserted.id,
          url: img.url,
          position: i,
        }))
      );
    }

    router.push("/admin/portfolio");
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/25 bg-violet-900/20 transition hover:bg-violet-900/40">
          <i className="fa-solid fa-arrow-left text-violet-400 text-xs" />
        </button>
        <div>
          <h1 className="font-antonio text-3xl text-white">Nuovo progetto</h1>
          <p className="font-montserrat text-xs text-zinc-500 mt-0.5">Lo slug viene generato automaticamente dal titolo</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-900/20 px-4 py-3">
          <p className="font-montserrat text-xs text-red-300">{error}</p>
        </div>
      )}

      <ProjectEditor onSave={handleSave} saving={saving} />
    </div>
  );
}