"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import ProjectEditor from "@/components/admin/ProjectEditor";

export default function ModificaProgetto() {
  const router = useRouter();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetch() {
      const supabase = createSupabaseBrowser();
      const { data } = await supabase
        .from("projects")
        .select("*, project_images(*)")
        .eq("id", id)
        .single();
      setProject(data);
      setLoading(false);
    }
    fetch();
  }, [id]);

  async function handleSave(data) {
    setSaving(true);
    setError("");
    const supabase = createSupabaseBrowser();
    const { _images, ...projectData } = data;

    const { error: updateError } = await supabase
      .from("projects")
      .update(projectData)
      .eq("id", id);

    if (updateError) {
      setError("Errore durante il salvataggio. Riprova.");
      setSaving(false);
      return;
    }

    // Aggiorna galleria
    await supabase.from("project_images").delete().eq("project_id", id);
    if (_images?.length) {
      await supabase.from("project_images").insert(
        _images.map((img, i) => ({
          project_id: id,
          url: img.url,
          position: i,
        }))
      );
    }

    router.push("/admin/portfolio");
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
          <h1 className="font-antonio text-3xl text-white">Modifica progetto</h1>
          <p className="font-montserrat text-xs text-zinc-500 mt-0.5 truncate max-w-xs">{project?.title}</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-900/20 px-4 py-3">
          <p className="font-montserrat text-xs text-red-300">{error}</p>
        </div>
      )}

      <ProjectEditor initialData={project} onSave={handleSave} saving={saving} />
    </div>
  );
}