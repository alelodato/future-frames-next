"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { fmSerif, fmCard, fmLabel, fmInput, fmUpload, fmButton } from "@/components/admin/fm-theme";

const BUCKET = "media";
const FOLDER = "future-memories";
const MAX_SIDE = 2000;
const QUALITY = 0.85;
const MAX_VIDEO_MB = 20;

const KINDS = [
  { id: "video", label: "Video" },
  { id: "foto", label: "Foto" },
];
const VIDEO_FORMATS = [
  { id: "trailer", label: "Wedding trailer" },
  { id: "film", label: "Film completo" },
];
const PHOTO_CATEGORIES = [
  { id: "matrimonio", label: "Matrimonio" },
  { id: "anniversario", label: "Anniversario" },
];

const thumbButtonClass =
  "flex h-7 w-7 items-center justify-center bg-[#2A1E16]/80 text-[#F7F2EA] transition hover:bg-[#2A1E16] disabled:pointer-events-none disabled:opacity-30";
const removeButtonClass =
  "inline-flex items-center gap-2 border border-[#D9C8B2] px-3 py-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.15em] text-[#5A4637] transition hover:border-red-300 hover:bg-red-50 hover:text-red-800";
const hintClass = "font-montserrat text-[0.65rem] leading-relaxed text-[#5A4637]";

const PICKER_SHAPES = {
  vertical: { aspect: "9 / 16", width: "max-w-[260px]" },
  horizontal: { aspect: "16 / 9", width: "max-w-[460px]" },
  portrait: { aspect: "4 / 5", width: "max-w-[320px]" },
};

// "Alessia e Valerio" + "2026-06-14" + "trailer" → "alessia-e-valerio-trailer-2026"
function slugify(names, date, suffix) {
  const year = date ? date.slice(0, 4) : "";
  return `${names} ${suffix} ${year}`
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function randomName(extension) {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
}

// Ridimensiona a MAX_SIDE px sul lato lungo, converte in JPEG e restituisce le dimensioni finali.
async function compressImage(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", QUALITY));
  return { blob, width: canvas.width, height: canvas.height };
}

async function uploadImage(supabase, file, subfolder) {
  const { blob, width, height } = await compressImage(file);
  if (!blob) return null;
  const filename = `${FOLDER}/${subfolder}/${randomName("jpg")}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, blob, { contentType: "image/jpeg" });
  if (error) return null;
  const url = supabase.storage.from(BUCKET).getPublicUrl(filename).data.publicUrl;
  return { url, width, height };
}

// Legge dimensioni e durata del video senza caricarlo.
function getVideoMeta(file) {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      resolve({ width: video.videoWidth, height: video.videoHeight, duration: video.duration });
      URL.revokeObjectURL(objectUrl);
    };
    video.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(objectUrl);
    };
    video.src = objectUrl;
  });
}

// Carica un video di anteprima controllando peso, durata e orientamento.
async function uploadTeaser(file, orientation) {
  if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
    return {
      error: `Il video pesa ${Math.round(file.size / 1024 / 1024)} MB: il massimo è ${MAX_VIDEO_MB} MB. Esportalo a 720p.`,
    };
  }

  const meta = await getVideoMeta(file);
  const warnings = [];
  if (meta) {
    const isVertical = meta.height > meta.width;
    if (orientation === "vertical" && !isVertical) warnings.push("il video non è verticale e sul sito verrà ritagliato");
    if (orientation === "horizontal" && isVertical) warnings.push("il video non è orizzontale e sul sito verrà ritagliato");
    if (meta.duration > 20) warnings.push(`dura ${Math.round(meta.duration)} secondi, consigliati 10-15`);
  }

  const supabase = createSupabaseBrowser();
  const extension = file.name.includes(".") ? file.name.split(".").pop().toLowerCase() : "mp4";
  const filename = `${FOLDER}/teasers/${randomName(extension)}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, { contentType: file.type || "video/mp4" });
  if (error) return { error: "Caricamento del video non riuscito. Riprova." };

  return {
    url: supabase.storage.from(BUCKET).getPublicUrl(filename).data.publicUrl,
    warning: warnings.length ? `Attenzione: ${warnings.join(" e ")}.` : "",
  };
}

function ChoiceGroup({ label, options, value, onChange }) {
  return (
    <div className="space-y-2">
      <span className={fmLabel}>{label}</span>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => {
          const active = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={active}
              className={`border px-4 py-3 font-montserrat text-xs font-semibold uppercase tracking-[0.15em] transition ${
                active
                  ? "border-[#2A1E16] bg-[#2A1E16] text-[#F7F2EA]"
                  : "border-[#D9C8B2] bg-white/60 text-[#5A4637] hover:border-[#5A4637]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TeaserField({ label, hint, orientation, url, setUrl, uploading, setUploading, onError }) {
  const [warning, setWarning] = useState("");
  const vertical = orientation === "vertical";

  async function handleFile(e) {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    onError("");
    setWarning("");
    setUploading(true);
    const result = await uploadTeaser(file, orientation);
    setUploading(false);
    if (result.error) {
      onError(result.error);
      return;
    }
    setUrl(result.url);
    setWarning(result.warning);
  }

  return (
    <div className="space-y-2">
      <span className={fmLabel}>{label}</span>
      <p className={hintClass}>{hint}</p>
      {url && (
        <div className="space-y-3">
          <div
            className={`relative mx-auto w-full overflow-hidden border border-[#D9C8B2] bg-[#D9C8B2] ${
              vertical ? "max-w-[200px]" : "max-w-[420px]"
            }`}
            style={{ aspectRatio: vertical ? "9 / 16" : "16 / 9" }}
          >
            <video src={url} className="h-full w-full" style={{ objectFit: "cover" }} muted loop playsInline autoPlay />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => {
                setUrl("");
                setWarning("");
              }}
              className={removeButtonClass}
            >
              <i className="fa-solid fa-xmark text-xs" />
              Rimuovi video
            </button>
          </div>
        </div>
      )}
      {warning && <p className="font-montserrat text-xs text-amber-800">{warning}</p>}
      <label className={`${fmUpload} ${uploading ? "pointer-events-none opacity-50" : ""}`}>
        <i className={`fa-solid ${uploading ? "fa-spinner animate-spin" : "fa-video"} text-sm text-[#5A4637]`} />
        <span className="font-montserrat text-xs text-[#2A1E16]">
          {uploading
            ? "Caricamento del video..."
            : url
              ? "Sostituisci video"
              : `Carica video ${vertical ? "verticale" : "orizzontale"}`}
        </span>
        <input type="file" accept="video/mp4,video/webm" onChange={handleFile} className="hidden" />
      </label>
    </div>
  );
}

function CoverPositionPicker({ imageUrl, posX, posY, onChange, shape }) {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const { aspect, width } = PICKER_SHAPES[shape];

  function getPosition(e) {
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = Math.round(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
    const y = Math.round(Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100)));
    return { x, y };
  }

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onTouchStart(e) {
      e.preventDefault();
      isDragging.current = true;
      const { x, y } = getPosition(e);
      onChange(x, y);
    }

    function onTouchMove(e) {
      if (!isDragging.current) return;
      e.preventDefault();
      const { x, y } = getPosition(e);
      onChange(x, y);
    }

    function onTouchEnd() {
      isDragging.current = false;
    }

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [onChange]);

  function handleMouseDown(e) {
    isDragging.current = true;
    const { x, y } = getPosition(e);
    onChange(x, y);
  }

  function handleMouseMove(e) {
    if (!isDragging.current) return;
    const { x, y } = getPosition(e);
    onChange(x, y);
  }

  function handleMouseEnd() {
    isDragging.current = false;
  }

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-full cursor-crosshair select-none overflow-hidden border border-[#D9C8B2] ${width}`}
      style={{ aspectRatio: aspect }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseEnd}
      onMouseLeave={handleMouseEnd}
    >
      <img
        src={imageUrl}
        alt="Posizione copertina"
        className="pointer-events-none h-full w-full"
        style={{ objectFit: "cover", objectPosition: `${posX}% ${posY}%` }}
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-[#2A1E16]/15" />
      <div className="pointer-events-none absolute top-0 bottom-0 w-px bg-white/40" style={{ left: `${posX}%` }} />
      <div className="pointer-events-none absolute left-0 right-0 h-px bg-white/40" style={{ top: `${posY}%` }} />
      <div
        className="pointer-events-none absolute"
        style={{ left: `${posX}%`, top: `${posY}%`, transform: "translate(-50%, -50%)" }}
      >
        <div className="h-6 w-6 rounded-full border-2 border-white bg-[#2A1E16]/50 shadow-[0_0_8px_rgba(0,0,0,0.6)]" />
      </div>
      <div className="pointer-events-none absolute bottom-2 right-2 bg-[#2A1E16]/80 px-2 py-1">
        <span className="font-montserrat text-[0.5rem] text-[#F7F2EA]">
          {posX}% · {posY}%
        </span>
      </div>
    </div>
  );
}

export default function WeddingEditor({ initialData, onSave, saving }) {
  const isNew = !initialData?.slug;

  const [kind, setKind] = useState(initialData?.kind || "video");
  const [videoFormat, setVideoFormat] = useState(initialData?.video_format || "film");
  const [photoCategory, setPhotoCategory] = useState(initialData?.photo_category || "matrimonio");
  const [names, setNames] = useState(initialData?.names || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [weddingDate, setWeddingDate] = useState(initialData?.wedding_date || "");
  const [vimeoUrl, setVimeoUrl] = useState(initialData?.vimeo_url || "");
  const [teaserUrl, setTeaserUrl] = useState(initialData?.teaser_url || "");
  const [teaserLandscapeUrl, setTeaserLandscapeUrl] = useState(initialData?.teaser_landscape_url || "");
  const [coverUrl, setCoverUrl] = useState(initialData?.cover_url || "");
  const [posX, setPosX] = useState(initialData?.cover_position_x ?? 50);
  const [posY, setPosY] = useState(initialData?.cover_position_y ?? 50);
  const [posXDesktop, setPosXDesktop] = useState(initialData?.cover_position_x_desktop ?? 50);
  const [posYDesktop, setPosYDesktop] = useState(initialData?.cover_position_y_desktop ?? 50);
  const [published, setPublished] = useState(initialData?.published || false);
  const [photos, setPhotos] = useState(() =>
    [...(initialData?.fm_wedding_photos || [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((photo) => ({ url: photo.url, width: photo.width, height: photo.height }))
  );
  const [uploadingTeaser, setUploadingTeaser] = useState(false);
  const [uploadingTeaserLandscape, setUploadingTeaserLandscape] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [galleryProgress, setGalleryProgress] = useState(null); // { done, total }
  const [uploadError, setUploadError] = useState("");

  const isVideo = kind === "video";
  const slugSuffix = isVideo ? videoFormat : photoCategory === "anniversario" ? "anniversario" : "foto";

  // Lo slug si genera solo alla creazione: modificarlo dopo romperebbe i link già condivisi.
  const slug = isNew ? slugify(names, weddingDate, slugSuffix) : initialData.slug;
  const uploading =
    uploadingTeaser || uploadingTeaserLandscape || uploadingCover || galleryProgress !== null;

  const handlePositionChange = useCallback((x, y) => {
    setPosX(x);
    setPosY(y);
  }, []);

  const handlePositionChangeDesktop = useCallback((x, y) => {
    setPosXDesktop(x);
    setPosYDesktop(y);
  }, []);

  async function handleCoverUpload(e) {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setUploadError("");
    setUploadingCover(true);
    const result = await uploadImage(createSupabaseBrowser(), file, "covers");
    if (result) {
      setCoverUrl(result.url);
      setPosX(50);
      setPosY(50);
      setPosXDesktop(50);
      setPosYDesktop(50);
    } else {
      setUploadError("Caricamento della copertina non riuscito. Riprova.");
    }
    setUploadingCover(false);
  }

  async function handleGalleryUpload(e) {
    const files = Array.from(e.target.files);
    e.target.value = "";
    if (!files.length) return;
    setUploadError("");
    const supabase = createSupabaseBrowser();
    let failed = 0;
    setGalleryProgress({ done: 0, total: files.length });
    for (const [index, file] of files.entries()) {
      const result = await uploadImage(supabase, file, "gallery");
      if (result) setPhotos((prev) => [...prev, result]);
      else failed += 1;
      setGalleryProgress({ done: index + 1, total: files.length });
    }
    setGalleryProgress(null);
    if (failed) setUploadError(`${failed} foto non sono state caricate. Riprova con quelle mancanti.`);
  }

  function movePhoto(index, direction) {
    setPhotos((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function removePhoto(index) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      slug,
      kind,
      video_format: isVideo ? videoFormat : null,
      photo_category: isVideo ? null : photoCategory,
      names: names.trim(),
      location: location.trim(),
      wedding_date: weddingDate,
      vimeo_url: vimeoUrl.trim() || null,
      teaser_url: teaserUrl || null,
      teaser_landscape_url: teaserLandscapeUrl || null,
      cover_url: coverUrl || null,
      cover_position_x: posX,
      cover_position_y: posY,
      cover_position_x_desktop: posXDesktop,
      cover_position_y_desktop: posYDesktop,
      published,
      _photos: photos.map((photo, i) => ({
        url: photo.url,
        width: photo.width ?? null,
        height: photo.height ?? null,
        sort_order: i,
      })),
    });
  }

  const canSave = names.trim() && location.trim() && weddingDate && !saving && !uploading;

  const coverUploader = (
    <label className={`${fmUpload} ${uploadingCover ? "pointer-events-none opacity-50" : ""}`}>
      <i className={`fa-solid ${uploadingCover ? "fa-spinner animate-spin" : "fa-image"} text-sm text-[#5A4637]`} />
      <span className="font-montserrat text-xs text-[#2A1E16]">
        {uploadingCover ? "Caricamento..." : coverUrl ? "Sostituisci copertina" : "Carica copertina"}
      </span>
      <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
    </label>
  );

  const removeCoverButton = (
    <div className="flex justify-center">
      <button type="button" onClick={() => setCoverUrl("")} className={removeButtonClass}>
        <i className="fa-solid fa-xmark text-xs" />
        Rimuovi copertina
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* ── TIPO DI LAVORO ── */}
      <div className={fmCard}>
        <h3 className="text-2xl text-[#2A1E16]" style={fmSerif}>Tipo di lavoro</h3>
        <ChoiceGroup label="Il lavoro è" options={KINDS} value={kind} onChange={setKind} />
        {isVideo ? (
          <ChoiceGroup label="Formato" options={VIDEO_FORMATS} value={videoFormat} onChange={setVideoFormat} />
        ) : (
          <ChoiceGroup label="Categoria" options={PHOTO_CATEGORIES} value={photoCategory} onChange={setPhotoCategory} />
        )}
        <p className={hintClass}>
          {isVideo
            ? "Compare nella sezione Video del portfolio. Il formato viene mostrato sopra il titolo."
            : "Compare nella sezione Foto del portfolio, tra i matrimoni o gli anniversari."}
        </p>
      </div>

      {/* ── INFO BASE ── */}
      <div className={fmCard}>
        <h3 className="text-2xl text-[#2A1E16]" style={fmSerif}>Informazioni base</h3>

        <div className="space-y-1.5">
          <label htmlFor="fm-names" className={fmLabel}>Titolo mostrato *</label>
          <input
            id="fm-names"
            type="text"
            value={names}
            onChange={(e) => setNames(e.target.value)}
            required
            placeholder="Alessia e Valerio"
            className={fmInput}
          />
          <p className={hintClass}>
            Solo i nomi, senza "trailer" o "video completo": il formato si sceglie sopra.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="fm-location" className={fmLabel}>Location *</label>
            <input
              id="fm-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="Villa Aurelia, Roma"
              className={fmInput}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="fm-date" className={fmLabel}>
              {isVideo || photoCategory === "matrimonio" ? "Data del matrimonio *" : "Data dell’anniversario *"}
            </label>
            <input
              id="fm-date"
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              required
              className={`${fmInput} [color-scheme:light]`}
            />
          </div>
        </div>

        <p className="font-montserrat text-[0.6rem] text-[#5A4637]">
          Indirizzo della pagina: /portfolio/{slug || "…"}
        </p>
      </div>

      {isVideo ? (
        <>
          {/* ── VIDEO DI ANTEPRIMA ── */}
          <div className={fmCard}>
            <h3 className="text-2xl text-[#2A1E16]" style={fmSerif}>Video di anteprima</h3>
            <p className={hintClass}>
              Brevi video in loop senza audio: 10-15 secondi, MP4 a 720p, massimo {MAX_VIDEO_MB} MB ciascuno.
            </p>

            <TeaserField
              label="Verticale 9:16 · telefono e home"
              hint="Si vede nell’elenco del portfolio su telefono e nell’anteprima in home."
              orientation="vertical"
              url={teaserUrl}
              setUrl={setTeaserUrl}
              uploading={uploadingTeaser}
              setUploading={setUploadingTeaser}
              onError={setUploadError}
            />

            <div className="border-t border-[#D9C8B2] pt-4">
              <TeaserField
                label="Orizzontale 16:9 · computer"
                hint="Si vede nell’elenco del portfolio su schermi grandi. Se manca, al suo posto compare la copertina."
                orientation="horizontal"
                url={teaserLandscapeUrl}
                setUrl={setTeaserLandscapeUrl}
                uploading={uploadingTeaserLandscape}
                setUploading={setUploadingTeaserLandscape}
                onError={setUploadError}
              />
            </div>
          </div>

          {/* ── COPERTINA E VIDEO COMPLETO ── */}
          <div className={fmCard}>
            <h3 className="text-2xl text-[#2A1E16]" style={fmSerif}>Copertina e video completo</h3>

            <div className="space-y-2">
              <span className={fmLabel}>Immagine di copertina</span>
              <p className={hintClass}>
                Si vede mentre i video si caricano e quando un video manca. Scegli l’inquadratura per ciascun formato
                trascinando il mirino sul punto da tenere al centro.
              </p>
              {coverUrl && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className={`${fmLabel} text-center`}>Inquadratura telefono · 9:16</p>
                    <CoverPositionPicker
                      imageUrl={coverUrl}
                      posX={posX}
                      posY={posY}
                      onChange={handlePositionChange}
                      shape="vertical"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className={`${fmLabel} text-center`}>Inquadratura computer · 16:9</p>
                    <CoverPositionPicker
                      imageUrl={coverUrl}
                      posX={posXDesktop}
                      posY={posYDesktop}
                      onChange={handlePositionChangeDesktop}
                      shape="horizontal"
                    />
                  </div>
                  {removeCoverButton}
                </div>
              )}
              {coverUploader}
            </div>

            <div className="space-y-1.5 border-t border-[#D9C8B2] pt-4">
              <label htmlFor="fm-vimeo" className={fmLabel}>
                Link Vimeo ({videoFormat === "trailer" ? "wedding trailer" : "film completo"})
              </label>
              <input
                id="fm-vimeo"
                type="url"
                value={vimeoUrl}
                onChange={(e) => setVimeoUrl(e.target.value)}
                placeholder="https://vimeo.com/123456789"
                className={fmInput}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* ── COPERTINA FOTO ── */}
          <div className={fmCard}>
            <h3 className="text-2xl text-[#2A1E16]" style={fmSerif}>Copertina</h3>
            <p className={hintClass}>
              Si vede nella sezione Foto del portfolio, in formato verticale 4:5. Trascina il mirino sul punto da tenere al
              centro.
            </p>
            {coverUrl && (
              <div className="space-y-5">
                <CoverPositionPicker
                  imageUrl={coverUrl}
                  posX={posX}
                  posY={posY}
                  onChange={handlePositionChange}
                  shape="portrait"
                />
                {removeCoverButton}
              </div>
            )}
            {coverUploader}
          </div>

          {/* ── GALLERIA ── */}
          <div className={fmCard}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl text-[#2A1E16]" style={fmSerif}>Galleria</h3>
              <span className="font-montserrat text-[0.6rem] text-[#5A4637]">
                {photos.length} foto · consigliate 15–30
              </span>
            </div>
            <p className={hintClass}>
              Sul sito le foto vengono impaginate come un album: le orizzontali occupano tutta la riga, due verticali
              consecutive si affiancano. L’ordine qui decide il ritmo.
            </p>

            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {photos.map((photo, i) => (
                  <div key={photo.url} className="relative aspect-square overflow-hidden bg-[#D9C8B2]">
                    <img src={photo.url} alt={`Foto ${i + 1}`} className="h-full w-full" style={{ objectFit: "cover" }} />
                    <span className="absolute top-1.5 left-1.5 bg-[#2A1E16]/80 px-1.5 py-0.5 font-montserrat text-[0.5rem] text-[#F7F2EA]">
                      {i + 1}
                      {photo.width && photo.height ? (photo.height > photo.width ? " · V" : " · O") : ""}
                    </span>
                    <div className="absolute inset-x-1.5 bottom-1.5 flex justify-between">
                      <div className="flex gap-1">
                        <button type="button" onClick={() => movePhoto(i, -1)} disabled={i === 0} aria-label="Sposta prima" className={thumbButtonClass}>
                          <i className="fa-solid fa-chevron-left text-[0.6rem]" />
                        </button>
                        <button type="button" onClick={() => movePhoto(i, 1)} disabled={i === photos.length - 1} aria-label="Sposta dopo" className={thumbButtonClass}>
                          <i className="fa-solid fa-chevron-right text-[0.6rem]" />
                        </button>
                      </div>
                      <button type="button" onClick={() => removePhoto(i)} aria-label="Elimina foto" className={thumbButtonClass}>
                        <i className="fa-solid fa-trash text-[0.6rem]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <label className={`${fmUpload} ${galleryProgress ? "pointer-events-none opacity-50" : ""}`}>
              <i className={`fa-solid ${galleryProgress ? "fa-spinner animate-spin" : "fa-images"} text-sm text-[#5A4637]`} />
              <span className="font-montserrat text-xs text-[#2A1E16]">
                {galleryProgress
                  ? `Caricamento ${galleryProgress.done}/${galleryProgress.total}...`
                  : "Aggiungi foto (puoi selezionarne più di una)"}
              </span>
              <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
            </label>
          </div>
        </>
      )}

      {uploadError && (
        <p className="border border-red-300 bg-red-50 px-4 py-3 font-montserrat text-xs text-red-800">{uploadError}</p>
      )}

      {/* ── FOOTER ── */}
      <div className="border border-[#D9C8B2] bg-[#F7F2EA] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setPublished(!published)}
            aria-pressed={published}
            className="flex items-center gap-3"
          >
            <span className={`relative block h-6 w-11 shrink-0 rounded-full transition-colors ${published ? "bg-[#2A1E16]" : "bg-[#D9C8B2]"}`}>
              <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-[#F7F2EA] shadow transition-transform ${published ? "translate-x-5" : "translate-x-0.5"}`} />
            </span>
            <span className="font-montserrat text-xs text-[#2A1E16]">{published ? "Pubblicato" : "Bozza"}</span>
          </button>

          <button type="submit" disabled={!canSave} className={`${fmButton} w-full sm:w-auto`}>
            {saving ? (
              <><i className="fa-solid fa-spinner animate-spin text-xs" />Salvataggio...</>
            ) : (
              <><i className="fa-solid fa-floppy-disk text-xs" />Salva lavoro</>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
