"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

const categories = ["Spot Aziendale", "Podcast", "Matrimonio", "Food", "Evento", "Videoclip", "Corporate", "Altro"];

export default function ProjectEditor({ initialData, onSave, saving }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [year, setYear] = useState(initialData?.year || new Date().getFullYear().toString());
  const [location, setLocation] = useState(initialData?.location || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || "");
  const [videoTeaserUrl, setVideoTeaserUrl] = useState(initialData?.video_teaser_url || "");
  const [videoFullUrl, setVideoFullUrl] = useState(initialData?.video_full_url || "");
  const [videoPlatform, setVideoPlatform] = useState(initialData?.video_platform || "vimeo");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [published, setPublished] = useState(initialData?.published || false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingTeaser, setUploadingTeaser] = useState(false);
  const [images, setImages] = useState(initialData?.project_images || []);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingGalleryVideo, setUploadingGalleryVideo] = useState(false);

  async function handleCoverUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCover(true);
    const supabase = createSupabaseBrowser();
    const filename = `portfolio/covers/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(filename, file);
    if (!error) {
      const { data } = supabase.storage.from("media").getPublicUrl(filename);
      setCoverImage(data.publicUrl);
    }
    setUploadingCover(false);
  }

  async function handleTeaserUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingTeaser(true);
    const supabase = createSupabaseBrowser();
    const filename = `portfolio/teasers/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(filename, file);
    if (!error) {
      const { data } = supabase.storage.from("media").getPublicUrl(filename);
      setVideoTeaserUrl(data.publicUrl);
    }
    setUploadingTeaser(false);
  }

  async function handleGalleryUpload(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadingGallery(true);
    const supabase = createSupabaseBrowser();
    const newImages = [];
    for (const file of files) {
      const filename = `portfolio/gallery/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("media").upload(filename, file);
      if (!error) {
        const { data } = supabase.storage.from("media").getPublicUrl(filename);
        newImages.push({ url: data.publicUrl, type: "image", position: images.length + newImages.length });
      }
    }
    setImages((prev) => [...prev, ...newImages]);
    setUploadingGallery(false);
  }

  async function handleGalleryVideoUpload(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadingGalleryVideo(true);
    const supabase = createSupabaseBrowser();
    const newVideos = [];
    for (const file of files) {
      const filename = `portfolio/gallery/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("media").upload(filename, file);
      if (!error) {
        const { data } = supabase.storage.from("media").getPublicUrl(filename);
        newVideos.push({ url: data.publicUrl, type: "video", position: images.length + newVideos.length });
      }
    }
    setImages((prev) => [...prev, ...newVideos]);
    setUploadingGalleryVideo(false);
  }

  function removeGalleryItem(idx) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    onSave({
      title, category, year, location, excerpt, description,
      cover_image: coverImage,
      video_teaser_url: videoTeaserUrl,
      video_full_url: videoFullUrl,
      video_platform: videoPlatform, featured, published,
      _images: images,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ── INFO BASE ── */}
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-5 space-y-4">
        <h3 className="font-antonio text-base text-violet-300">Informazioni base</h3>

        <div className="space-y-1.5">
          <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">Titolo *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
            placeholder="Nome del progetto"
            className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">Categoria</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-violet-500/25 bg-[#0d0b2a] px-4 py-2.5 font-montserrat text-sm text-white outline-none transition focus:border-violet-400/60">
              <option value="">Seleziona...</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">Anno</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)}
              placeholder="2024"
              className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white outline-none transition focus:border-violet-400/60" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
            placeholder="Roma, Milano..."
            className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white outline-none transition focus:border-violet-400/60" />
        </div>

        <div className="space-y-1.5">
          <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">Anteprima</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2}
            placeholder="Breve descrizione mostrata nell'anteprima della pagina portfolio"
            className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60 resize-none" />
        </div>

        <div className="space-y-1.5">
          <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">Descrizione completa</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
            placeholder="Descrizione dettagliata del progetto..."
            className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60 resize-none" />
        </div>
      </div>

      {/* ── MEDIA ── */}
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-5 space-y-4">
        <h3 className="font-antonio text-base text-violet-300">Media</h3>

        {/* Cover image */}
        <div className="space-y-2">
          <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">Immagine di copertina</label>
          {coverImage && (
            <div className="relative h-36 overflow-hidden rounded-xl">
              <img src={coverImage} alt="Cover" className="h-full w-full object-cover" />
              <button type="button" onClick={() => setCoverImage("")}
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-900/80 transition">
                <i className="fa-solid fa-xmark text-xs" />
              </button>
            </div>
          )}
          <label className={`flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-violet-500/30 bg-violet-900/10 px-4 py-3 transition hover:border-violet-400/50 ${uploadingCover ? "opacity-50 pointer-events-none" : ""}`}>
            <i className={`fa-solid ${uploadingCover ? "fa-spinner animate-spin" : "fa-image"} text-violet-400 text-sm`} />
            <span className="font-montserrat text-xs text-zinc-400">
              {uploadingCover ? "Caricamento..." : "Carica immagine copertina"}
            </span>
            <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
          </label>
        </div>

        {/* Video teaser */}
        <div className="space-y-2">
          <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">Video teaser (hover preview)</label>
          {videoTeaserUrl && (
            <div className="relative">
              <video src={videoTeaserUrl} className="w-full h-24 object-cover rounded-xl" muted />
              <button type="button" onClick={() => setVideoTeaserUrl("")}
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-900/80 transition">
                <i className="fa-solid fa-xmark text-xs" />
              </button>
            </div>
          )}
          <label className={`flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-violet-500/30 bg-violet-900/10 px-4 py-3 transition hover:border-violet-400/50 ${uploadingTeaser ? "opacity-50 pointer-events-none" : ""}`}>
            <i className={`fa-solid ${uploadingTeaser ? "fa-spinner animate-spin" : "fa-video"} text-violet-400 text-sm`} />
            <span className="font-montserrat text-xs text-zinc-400">
              {uploadingTeaser ? "Caricamento..." : "Carica video teaser (max 30s consigliato)"}
            </span>
            <input type="file" accept="video/*" onChange={handleTeaserUpload} className="hidden" />
          </label>
        </div>

        {/* Video completo URL */}
        <div className="space-y-2">
          <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">Link video completo</label>
          <div className="flex gap-2">
            <select value={videoPlatform} onChange={(e) => setVideoPlatform(e.target.value)}
              className="rounded-xl border border-violet-500/25 bg-[#0d0b2a] px-3 py-2.5 font-montserrat text-sm text-white outline-none transition focus:border-violet-400/60">
              <option value="vimeo">Vimeo</option>
              <option value="youtube">YouTube</option>
            </select>
            <input type="url" value={videoFullUrl} onChange={(e) => setVideoFullUrl(e.target.value)}
              placeholder="https://vimeo.com/..."
              className="flex-1 rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60" />
          </div>
        </div>
      </div>

      {/* ── GALLERIA ── */}
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-5 space-y-4">
        <h3 className="font-antonio text-base text-violet-300">Galleria</h3>

        {images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {images.map((item, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl group">
                {item.type === "video" ? (
                  <>
                    <video src={item.url} className="h-full w-full object-cover" muted playsInline />
                    <div className="absolute top-1.5 left-1.5 rounded-md bg-black/70 px-1.5 py-0.5 flex items-center gap-1">
                      <i className="fa-solid fa-film text-violet-400 text-[0.5rem]" />
                      <span className="font-montserrat text-[0.45rem] uppercase tracking-wider text-zinc-300">Video</span>
                    </div>
                  </>
                ) : (
                  <img src={item.url} alt={`Gallery ${i}`} className="h-full w-full object-cover" />
                )}
                <button type="button" onClick={() => removeGalleryItem(i)}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition">
                  <i className="fa-solid fa-trash text-red-400 text-sm" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload immagini */}
        <label className={`flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-violet-500/30 bg-violet-900/10 px-4 py-3 transition hover:border-violet-400/50 ${uploadingGallery ? "opacity-50 pointer-events-none" : ""}`}>
          <i className={`fa-solid ${uploadingGallery ? "fa-spinner animate-spin" : "fa-images"} text-violet-400 text-sm`} />
          <span className="font-montserrat text-xs text-zinc-400">
            {uploadingGallery ? "Caricamento..." : "Aggiungi immagini"}
          </span>
          <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
        </label>

        {/* Upload video */}
        <label className={`flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-violet-500/30 bg-violet-900/10 px-4 py-3 transition hover:border-violet-400/50 ${uploadingGalleryVideo ? "opacity-50 pointer-events-none" : ""}`}>
          <i className={`fa-solid ${uploadingGalleryVideo ? "fa-spinner animate-spin" : "fa-film"} text-violet-400 text-sm`} />
          <span className="font-montserrat text-xs text-zinc-400">
            {uploadingGalleryVideo ? "Caricamento..." : "Aggiungi video"}
          </span>
          <input type="file" accept="video/*" multiple onChange={handleGalleryVideoUpload} className="hidden" />
        </label>
      </div>

      {/* ── FOOTER ── */}
      <div className="flex items-center justify-between rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 px-5 py-4">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => setPublished(!published)}
              className={`relative h-6 w-11 rounded-full transition-colors ${published ? "bg-violet-500" : "bg-zinc-700"}`}>
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${published ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
            <span className="font-montserrat text-xs text-zinc-300">{published ? "Pubblicato" : "Bozza"}</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => setFeatured(!featured)}
              className={`relative h-6 w-11 rounded-full transition-colors ${featured ? "bg-amber-500" : "bg-zinc-700"}`}>
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${featured ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
            <span className="font-montserrat text-xs text-zinc-300">Progetto in evidenza</span>
          </label>
        </div>

        <button type="submit" disabled={saving || !title}
          className="inline-flex items-center gap-2 rounded-full bg-violet-400 px-6 py-2.5 font-montserrat text-xs font-semibold uppercase tracking-wide text-[#050211] shadow-[0_0_20px_rgba(167,139,250,0.5)] transition hover:bg-violet-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {saving ? (
            <><i className="fa-solid fa-spinner animate-spin text-xs" />Salvataggio...</>
          ) : (
            <><i className="fa-solid fa-floppy-disk text-xs" />Salva progetto</>
          )}
        </button>
      </div>

    </form>
  );
}