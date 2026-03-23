"use client";

import { useState, useRef, useCallback } from "react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

const categories = ["Spot Aziendale", "Podcast", "Matrimonio", "Food", "Evento", "Videoclip", "Corporate", "Altro"];

function PatternAccordion({ label, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-violet-500/20 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-violet-900/10 hover:bg-violet-900/20 transition">
        <span className="font-montserrat text-[0.58rem] uppercase tracking-[0.2em] text-violet-400">{label}</span>
        <i className={`fa-solid fa-chevron-down text-violet-400 text-xs transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-3 py-3 bg-black/20">
          {content}
        </div>
      )}
    </div>
  );
}

// ─── Cover Position Picker ────────────────────────────────────
function CoverPositionPicker({ imageUrl, posX, posY, onChange }) {
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  function getPosition(e) {
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = Math.round(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
    const y = Math.round(Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100)));
    return { x, y };
  }

  function handleStart(e) {
    isDragging.current = true;
    const { x, y } = getPosition(e);
    onChange(x, y);
  }

  function handleMove(e) {
    if (!isDragging.current) return;
    const { x, y } = getPosition(e);
    onChange(x, y);
  }

  function handleEnd() {
    isDragging.current = false;
  }

  const imgStyle = { objectPosition: `${posX}% ${posY}%` };

  const slots = [
    { label: "Pattern A — Grande", ratio: "1/2", width: "w-1/3" },
    { label: "Pattern A — Piccolo", ratio: "1/1", width: "w-1/3" },
    { label: "Pattern C — Stretto", ratio: "1/3", width: "w-1/3" },
  ];

  return (
    <div className="space-y-3">
      <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">
        Posizione anteprima — trascina il mirino
      </label>

      {/* Picker principale */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl cursor-crosshair select-none border border-violet-500/25"
        style={{ height: "200px" }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <img src={imageUrl} alt="Picker"
          className="w-full h-full object-cover pointer-events-none"
          style={imgStyle} draggable={false} />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: `${posX}%` }} />
          <div className="absolute left-0 right-0 h-px bg-white/20" style={{ top: `${posY}%` }} />
        </div>
        <div className="absolute pointer-events-none"
          style={{ left: `${posX}%`, top: `${posY}%`, transform: "translate(-50%, -50%)" }}>
          <div className="w-6 h-6 rounded-full border-2 border-white shadow-[0_0_8px_rgba(0,0,0,0.8)] bg-violet-500/40 backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 pointer-events-none">
          <span className="font-montserrat text-[0.5rem] text-zinc-300">{posX}% · {posY}%</span>
        </div>
      </div>

      {/* Anteprime con proporzioni reali dei pattern */}
      <div className="space-y-2">
        <p className="font-montserrat text-[0.58rem] uppercase tracking-[0.2em] text-zinc-500">
          Anteprima nelle proporzioni reali del portfolio
        </p>

        {[
          {
            id: "A",
            label: "Pattern A — Grande + 2 piccoli",
            content: (
              <div className="flex gap-1 items-stretch" style={{ height: "160px" }}>
                <div style={{ width: "50%", aspectRatio: "1/2" }} className="overflow-hidden rounded-lg border border-violet-500/20 flex-shrink-0">
                  <img src={imageUrl} alt="A grande" className="w-full h-full object-cover" style={imgStyle} draggable={false} />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="overflow-hidden rounded-lg border border-violet-500/20 flex-1">
                    <img src={imageUrl} alt="A top" className="w-full h-full object-cover" style={imgStyle} draggable={false} />
                  </div>
                  <div className="overflow-hidden rounded-lg border border-violet-500/20 flex-1">
                    <img src={imageUrl} alt="A bottom" className="w-full h-full object-cover" style={imgStyle} draggable={false} />
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: "B",
            label: "Pattern B — Diagonale",
            content: (
              <div className="flex gap-1 justify-center">
                {/* Sinistra diagonale — w ~60% h-screen */}
                <div className="overflow-hidden rounded-lg border border-violet-500/20 relative flex-shrink-0"
                  style={{ width: "48%", aspectRatio: "1/2" }}>
                  <img src={imageUrl} alt="B sx" className="w-full h-full object-cover" style={imgStyle} draggable={false} />
                  <div className="absolute inset-0 bg-black pointer-events-none"
                    style={{ clipPath: "polygon(75% 0, 100% 0, 100% 100%, 62% 100%)" }} />
                  <p className="absolute bottom-1 left-1 font-montserrat text-[0.45rem] text-zinc-400">Sinistra</p>
                </div>
                {/* Destra diagonale — w ~60% h-screen */}
                <div className="overflow-hidden rounded-lg border border-violet-500/20 relative flex-shrink-0"
                  style={{ width: "48%", aspectRatio: "1/2" }}>
                  <img src={imageUrl} alt="B dx" className="w-full h-full object-cover" style={imgStyle} draggable={false} />
                  <div className="absolute inset-0 bg-black pointer-events-none"
                    style={{ clipPath: "polygon(0 0, 38% 0, 25% 100%, 0 100%)" }} />
                  <p className="absolute bottom-1 right-1 font-montserrat text-[0.45rem] text-zinc-400">Destra</p>
                </div>
              </div>
            ),
          },
          {
            id: "C",
            label: "Pattern C — Tre colonne",
            content: (
              <div className="flex gap-1 justify-center">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="overflow-hidden rounded-lg border border-violet-500/20"
                    style={{ width: "30%", aspectRatio: "1/3" }}>
                    <img src={imageUrl} alt={`C ${i}`} className="w-full h-full object-cover" style={imgStyle} draggable={false} />
                  </div>
                ))}
              </div>
            ),
          },
        ].map(({ id, label, content }) => (
          <PatternAccordion key={id} label={label} content={content} />
        ))}
      </div>

      {/* Pulsanti preset */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: "↖ Alto sx", x: 25, y: 25 },
          { label: "↑ Alto", x: 50, y: 20 },
          { label: "↗ Alto dx", x: 75, y: 25 },
          { label: "← Sinistra", x: 20, y: 50 },
          { label: "⊙ Centro", x: 50, y: 50 },
          { label: "→ Destra", x: 80, y: 50 },
          { label: "↙ Basso sx", x: 25, y: 75 },
          { label: "↓ Basso", x: 50, y: 80 },
          { label: "↘ Basso dx", x: 75, y: 75 },
        ].map((preset) => (
          <button key={preset.label} type="button"
            onClick={() => onChange(preset.x, preset.y)}
            className={`rounded-lg px-2 py-1.5 font-montserrat text-[0.55rem] transition
              ${posX === preset.x && posY === preset.y
                ? "bg-violet-500/40 border border-violet-400/60 text-violet-200"
                : "bg-violet-900/10 border border-violet-500/20 text-zinc-400 hover:border-violet-400/40 hover:text-zinc-300"
              }`}>
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProjectEditor({ initialData, onSave, saving }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [year, setYear] = useState(initialData?.year || new Date().getFullYear().toString());
  const [location, setLocation] = useState(initialData?.location || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || "");
  const [coverPosX, setCoverPosX] = useState(initialData?.cover_position_x ?? 50);
  const [coverPosY, setCoverPosY] = useState(initialData?.cover_position_y ?? 50);
  const [videoTeaserUrl, setVideoTeaserUrl] = useState(initialData?.video_teaser_url || "");
  const [videoFullUrl, setVideoFullUrl] = useState(initialData?.video_full_url || "");
  const [videoPlatform, setVideoPlatform] = useState(initialData?.video_platform || "vimeo");
  const [tagsInput, setTagsInput] = useState((initialData?.tags || []).join(", "));
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [published, setPublished] = useState(initialData?.published || false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingTeaser, setUploadingTeaser] = useState(false);
  const [images, setImages] = useState(initialData?.project_images || []);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingGalleryVideo, setUploadingGalleryVideo] = useState(false);

  const handlePositionChange = useCallback((x, y) => {
    setCoverPosX(x);
    setCoverPosY(y);
  }, []);

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
      cover_position_x: coverPosX,
      cover_position_y: coverPosY,
      video_teaser_url: videoTeaserUrl,
      video_full_url: videoFullUrl,
      video_platform: videoPlatform,
      tags, featured, published,
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

        <div className="space-y-1.5">
          <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">Tags (separati da virgola)</label>
          <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Corporate, Spot, Montaggio"
            className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60" />
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
              <img src={coverImage} alt="Cover"
                className="h-full w-full object-cover"
                style={{ objectPosition: `${coverPosX}% ${coverPosY}%` }} />
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

        {/* Position picker — solo se c'è un'immagine */}
        {coverImage && (
          <CoverPositionPicker
            imageUrl={coverImage}
            posX={coverPosX}
            posY={coverPosY}
            onChange={handlePositionChange}
          />
        )}

        {/* Video teaser */}
        <div className="space-y-2">
          <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">Video teaser (Anteprima)</label>
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

        <label className={`flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-violet-500/30 bg-violet-900/10 px-4 py-3 transition hover:border-violet-400/50 ${uploadingGallery ? "opacity-50 pointer-events-none" : ""}`}>
          <i className={`fa-solid ${uploadingGallery ? "fa-spinner animate-spin" : "fa-images"} text-violet-400 text-sm`} />
          <span className="font-montserrat text-xs text-zinc-400">
            {uploadingGallery ? "Caricamento..." : "Aggiungi immagini"}
          </span>
          <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
        </label>

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