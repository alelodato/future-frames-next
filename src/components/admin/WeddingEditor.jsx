"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

const BUCKET = "media";
const FOLDER = "future-memories";
const MAX_SIDE = 2000;
const QUALITY = 0.85;

const cardClass =
    "rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-5 space-y-4";
const labelClass = "font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400";
const inputClass =
    "w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60";
const uploadClass =
    "flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-violet-500/30 bg-violet-900/10 px-4 py-3 transition hover:border-violet-400/50";
const thumbButtonClass =
    "flex h-7 w-7 items-center justify-center rounded-md bg-black/70 text-zinc-200 transition hover:bg-violet-600/80 disabled:opacity-30 disabled:pointer-events-none";

// "Giulia & Marco" + "2026-06-14" → "giulia-marco-2026"
function slugify(names, date) {
    const year = date ? date.slice(0, 4) : "";
    return `${names} ${year}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// Ridimensiona a MAX_SIDE px sul lato lungo e converte in JPEG.
async function compressImage(file) {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", QUALITY));
}

async function uploadImage(supabase, file, subfolder) {
    const blob = await compressImage(file);
    if (!blob) return null;
    const filename = `${FOLDER}/${subfolder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(filename, blob, { contentType: "image/jpeg" });
    if (error) return null;
    return supabase.storage.from(BUCKET).getPublicUrl(filename).data.publicUrl;
}

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
        <div className="space-y-2">
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden rounded-xl cursor-crosshair select-none border border-violet-500/25"
                style={{ aspectRatio: "6 / 5" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseEnd}
                onMouseLeave={handleMouseEnd}
            >
                <img
                    src={imageUrl}
                    alt="Posizione copertina"
                    className="w-full h-full pointer-events-none"
                    style={{ objectFit: "cover", objectPosition: `${posX}% ${posY}%` }}
                    draggable={false}
                />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 w-px bg-white/20 pointer-events-none" style={{ left: `${posX}%` }} />
                <div className="absolute left-0 right-0 h-px bg-white/20 pointer-events-none" style={{ top: `${posY}%` }} />
                <div
                    className="absolute pointer-events-none"
                    style={{ left: `${posX}%`, top: `${posY}%`, transform: "translate(-50%, -50%)" }}
                >
                    <div className="w-6 h-6 rounded-full border-2 border-white shadow-[0_0_8px_rgba(0,0,0,0.8)] bg-violet-500/40 backdrop-blur-sm" />
                </div>
                <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 pointer-events-none">
                    <span className="font-montserrat text-[0.5rem] text-zinc-300">
                        {posX}% · {posY}%
                    </span>
                </div>
            </div>
            <p className="font-montserrat text-[0.6rem] text-zinc-500">
                Trascina il mirino sul punto da tenere al centro. L’anteprima ha le proporzioni delle card del portfolio.
            </p>
        </div>
    );
}

export default function WeddingEditor({ initialData, onSave, saving }) {
    const isNew = !initialData?.slug;

    const [names, setNames] = useState(initialData?.names || "");
    const [location, setLocation] = useState(initialData?.location || "");
    const [weddingDate, setWeddingDate] = useState(initialData?.wedding_date || "");
    const [vimeoUrl, setVimeoUrl] = useState(initialData?.vimeo_url || "");
    const [coverUrl, setCoverUrl] = useState(initialData?.cover_url || "");
    const [posX, setPosX] = useState(initialData?.cover_position_x ?? 50);
    const [posY, setPosY] = useState(initialData?.cover_position_y ?? 50);
    const [published, setPublished] = useState(initialData?.published || false);
    const [photos, setPhotos] = useState(() =>
        [...(initialData?.fm_wedding_photos || [])]
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((photo) => ({ url: photo.url }))
    );
    const [uploadingCover, setUploadingCover] = useState(false);
    const [galleryProgress, setGalleryProgress] = useState(null); // { done, total }
    const [uploadError, setUploadError] = useState("");

    // Lo slug si genera solo alla creazione: modificarlo dopo romperebbe i link già condivisi.
    const slug = isNew ? slugify(names, weddingDate) : initialData.slug;
    const uploading = uploadingCover || galleryProgress !== null;

    const handlePositionChange = useCallback((x, y) => {
        setPosX(x);
        setPosY(y);
    }, []);

    async function handleCoverUpload(e) {
        const file = e.target.files[0];
        e.target.value = "";
        if (!file) return;
        setUploadError("");
        setUploadingCover(true);
        const url = await uploadImage(createSupabaseBrowser(), file, "covers");
        if (url) {
            setCoverUrl(url);
            setPosX(50);
            setPosY(50);
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
            const url = await uploadImage(supabase, file, "gallery");
            if (url) setPhotos((prev) => [...prev, { url }]);
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
            names: names.trim(),
            location: location.trim(),
            wedding_date: weddingDate,
            vimeo_url: vimeoUrl.trim() || null,
            cover_url: coverUrl || null,
            cover_position_x: posX,
            cover_position_y: posY,
            published,
            _photos: photos.map((photo, i) => ({ url: photo.url, sort_order: i })),
        });
    }

    const canSave = names.trim() && location.trim() && weddingDate && !saving && !uploading;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* ── INFO BASE ── */}
            <div className={cardClass}>
                <h3 className="font-antonio text-base text-violet-300">Informazioni base</h3>

                <div className="space-y-1.5">
                    <label htmlFor="fm-names" className={labelClass}>Sposi *</label>
                    <input
                        id="fm-names"
                        type="text"
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                        required
                        placeholder="Giulia & Marco"
                        className={inputClass}
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                        <label htmlFor="fm-location" className={labelClass}>Location *</label>
                        <input
                            id="fm-location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            placeholder="Villa Aurelia, Roma"
                            className={inputClass}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="fm-date" className={labelClass}>Data del matrimonio *</label>
                        <input
                            id="fm-date"
                            type="date"
                            value={weddingDate}
                            onChange={(e) => setWeddingDate(e.target.value)}
                            required
                            className={`${inputClass} [color-scheme:dark]`}
                        />
                    </div>
                </div>

                <p className="font-montserrat text-[0.6rem] text-zinc-500">
                    Indirizzo della pagina: /portfolio/{slug || "…"}
                </p>
            </div>

            {/* ── MEDIA ── */}
            <div className={cardClass}>
                <h3 className="font-antonio text-base text-violet-300">Copertina e video</h3>

                <div className="space-y-2">
                    <span className={labelClass}>Immagine di copertina</span>
                    {coverUrl && (
                        <div className="space-y-3">
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setCoverUrl("")}
                                    className="inline-flex items-center gap-2 rounded-lg bg-black/40 px-3 py-1.5 font-montserrat text-[0.6rem] text-zinc-300 transition hover:bg-red-900/60"
                                >
                                    <i className="fa-solid fa-xmark text-xs" />
                                    Rimuovi copertina
                                </button>
                            </div>
                            <CoverPositionPicker imageUrl={coverUrl} posX={posX} posY={posY} onChange={handlePositionChange} />
                        </div>
                    )}
                    <label className={`${uploadClass} ${uploadingCover ? "opacity-50 pointer-events-none" : ""}`}>
                        <i className={`fa-solid ${uploadingCover ? "fa-spinner animate-spin" : "fa-image"} text-violet-400 text-sm`} />
                        <span className="font-montserrat text-xs text-zinc-400">
                            {uploadingCover ? "Caricamento..." : coverUrl ? "Sostituisci copertina" : "Carica copertina"}
                        </span>
                        <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                    </label>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="fm-vimeo" className={labelClass}>Link Vimeo (film o trailer)</label>
                    <input
                        id="fm-vimeo"
                        type="url"
                        value={vimeoUrl}
                        onChange={(e) => setVimeoUrl(e.target.value)}
                        placeholder="https://vimeo.com/123456789"
                        className={inputClass}
                    />
                </div>
            </div>

            {/* ── GALLERIA ── */}
            <div className={cardClass}>
                <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-antonio text-base text-violet-300">Galleria</h3>
                    <span className="font-montserrat text-[0.6rem] text-zinc-500">
                        {photos.length} foto · consigliate 15–30
                    </span>
                </div>

                {photos.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {photos.map((photo, i) => (
                            <div key={photo.url} className="relative aspect-square overflow-hidden rounded-xl">
                                <img src={photo.url} alt={`Foto ${i + 1}`} className="h-full w-full" style={{ objectFit: "cover" }} />
                                <span className="absolute top-1.5 left-1.5 rounded-md bg-black/70 px-1.5 py-0.5 font-montserrat text-[0.5rem] text-zinc-300">
                                    {i + 1}
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
                                        <i className="fa-solid fa-trash text-[0.6rem] text-red-400" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <label className={`${uploadClass} ${galleryProgress ? "opacity-50 pointer-events-none" : ""}`}>
                    <i className={`fa-solid ${galleryProgress ? "fa-spinner animate-spin" : "fa-images"} text-violet-400 text-sm`} />
                    <span className="font-montserrat text-xs text-zinc-400">
                        {galleryProgress
                            ? `Caricamento ${galleryProgress.done}/${galleryProgress.total}...`
                            : "Aggiungi foto (puoi selezionarne più di una)"}
                    </span>
                    <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
                </label>

                {uploadError && <p className="font-montserrat text-xs text-red-400">{uploadError}</p>}
            </div>

            {/* ── FOOTER ── */}
            <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 px-4 sm:px-5 py-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        onClick={() => setPublished(!published)}
                        aria-pressed={published}
                        className="flex items-center gap-3"
                    >
                        <span className={`relative h-6 w-11 rounded-full transition-colors ${published ? "bg-violet-500" : "bg-zinc-700"}`}>
                            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${published ? "translate-x-5" : "translate-x-0.5"}`} />
                        </span>
                        <span className="font-montserrat text-xs text-zinc-300">{published ? "Pubblicato" : "Bozza"}</span>
                    </button>

                    <button
                        type="submit"
                        disabled={!canSave}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-violet-400 px-6 py-3 sm:py-2.5 font-montserrat text-xs font-semibold uppercase tracking-wide text-[#050211] shadow-[0_0_20px_rgba(167,139,250,0.5)] transition hover:bg-violet-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <><i className="fa-solid fa-spinner animate-spin text-xs" />Salvataggio...</>
                        ) : (
                            <><i className="fa-solid fa-floppy-disk text-xs" />Salva matrimonio</>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}