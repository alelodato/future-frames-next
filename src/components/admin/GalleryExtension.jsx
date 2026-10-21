"use client";

import { useState } from "react";
import { Node, mergeAttributes, ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

// ─── Upload immagine su Supabase ───
export async function uploadImageFile(file) {
    const supabase = createSupabaseBrowser();
    const safeName = file.name.replace(/\s+/g, "-");
    const filename = `blog/${Date.now()}-${safeName}`;
    const { error } = await supabase.storage.from("media").upload(filename, file);
    if (error) return null;
    const { data } = supabase.storage.from("media").getPublicUrl(filename);
    return data.publicUrl;
}

// ─── Maniglia di trascinamento ───
function DragHandle() {
    return (
        <span data-drag-handle title="Trascina per spostare"
            className="flex h-7 w-7 cursor-grab active:cursor-grabbing items-center justify-center rounded-lg bg-black/60 text-zinc-300 hover:text-violet-300">
            <i className="fa-solid fa-grip-vertical text-xs" />
        </span>
    );
}

// ─── Vista immagine singola nell'editor ───
function ImageView({ node, deleteNode, selected }) {
    return (
        <NodeViewWrapper
            contentEditable={false}
            className={`image-editor group relative my-6 rounded-xl border p-2 transition ${selected ? "border-violet-400" : "border-transparent hover:border-violet-500/20"}`}
        >
            <img src={node.attrs.src} alt="" draggable={false} className="w-full rounded-lg" />
            <div className="absolute top-4 right-4 flex items-center gap-1 transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <DragHandle />
                <button type="button" onClick={deleteNode} title="Elimina immagine"
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-red-400/80 hover:bg-red-900/60 hover:text-red-400">
                    <i className="fa-solid fa-trash text-[0.6rem]" />
                </button>
            </div>
        </NodeViewWrapper>
    );
}

// ─── Vista galleria nell'editor ───
function GalleryView({ node, updateAttributes, deleteNode, selected }) {
    const images = node.attrs.images || [];
    const columns = node.attrs.columns || 2;
    const [uploading, setUploading] = useState(false);

    async function handleAdd(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        setUploading(true);
        const urls = [];
        for (const f of files) {
            const url = await uploadImageFile(f);
            if (url) urls.push(url);
        }
        updateAttributes({ images: [...images, ...urls] });
        setUploading(false);
        e.target.value = "";
    }

    function removeAt(i) {
        const next = images.filter((_, idx) => idx !== i);
        if (next.length === 0) deleteNode();
        else updateAttributes({ images: next });
    }

    function moveImage(i, dir) {
        const j = i + dir;
        if (j < 0 || j >= images.length) return;
        const next = [...images];
        [next[i], next[j]] = [next[j], next[i]];
        updateAttributes({ images: next });
    }

    return (
        <NodeViewWrapper
            contentEditable={false}
            className={`gallery-editor my-6 rounded-xl border p-3 bg-violet-900/10 transition ${selected ? "border-violet-400" : "border-violet-500/20"}`}
        >
            {/* Barra controlli */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                    <DragHandle />
                    <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.2em] text-violet-400">
                        Galleria · {images.length} foto
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    {[2, 3].map((n) => (
                        <button key={n} type="button" onClick={() => updateAttributes({ columns: n })}
                            className={`rounded-lg px-2.5 py-1.5 font-montserrat text-[0.6rem] uppercase tracking-[0.1em] transition ${columns === n
                                ? "bg-violet-600 text-white"
                                : "text-zinc-400 hover:bg-violet-900/30 hover:text-violet-300"}`}>
                            {n} col
                        </button>
                    ))}
                    <label className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 cursor-pointer text-zinc-400 hover:bg-violet-900/30 hover:text-violet-300 transition ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
                        <i className={`fa-solid ${uploading ? "fa-spinner animate-spin" : "fa-plus"} text-[0.6rem]`} />
                        <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.1em]">
                            {uploading ? "Caricamento..." : "Foto"}
                        </span>
                        <input type="file" accept="image/*" multiple onChange={handleAdd} className="hidden" />
                    </label>
                    <button type="button" onClick={deleteNode} title="Elimina galleria"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-red-400/70 hover:bg-red-900/30 hover:text-red-400 transition">
                        <i className="fa-solid fa-trash text-[0.6rem]" />
                    </button>
                </div>
            </div>

            {/* Griglia immagini */}
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                {images.map((src, i) => (
                    <div key={src + i} className="group relative aspect-[4/5] overflow-hidden rounded-lg">
                        <img src={src} alt="" draggable={false} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 flex items-end justify-between p-1.5 bg-black/40 transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                            <div className="flex gap-1">
                                <button type="button" onClick={() => moveImage(i, -1)} disabled={i === 0} title="Sposta a sinistra"
                                    className="flex h-6 w-6 items-center justify-center rounded-md bg-black/70 text-white disabled:opacity-30">
                                    <i className="fa-solid fa-chevron-left text-[0.55rem]" />
                                </button>
                                <button type="button" onClick={() => moveImage(i, 1)} disabled={i === images.length - 1} title="Sposta a destra"
                                    className="flex h-6 w-6 items-center justify-center rounded-md bg-black/70 text-white disabled:opacity-30">
                                    <i className="fa-solid fa-chevron-right text-[0.55rem]" />
                                </button>
                            </div>
                            <button type="button" onClick={() => removeAt(i)} title="Rimuovi foto"
                                className="flex h-6 w-6 items-center justify-center rounded-md bg-black/70 text-red-400 hover:bg-red-900/80">
                                <i className="fa-solid fa-xmark text-[0.6rem]" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </NodeViewWrapper>
    );
}

// ─── Immagine singola trascinabile ───
export const ImageBlock = Image.extend({
    draggable: true,
    addNodeView() {
        return ReactNodeViewRenderer(ImageView);
    },
});

// ─── Galleria ───
export const Gallery = Node.create({
    name: "gallery",
    group: "block",
    atom: true,
    draggable: true,

    addAttributes() {
        return {
            images: {
                default: [],
                parseHTML: (el) => Array.from(el.querySelectorAll("img")).map((img) => img.getAttribute("src")),
                renderHTML: () => ({}),
            },
            columns: {
                default: 2,
                parseHTML: (el) => Number(el.getAttribute("data-columns")) || 2,
                renderHTML: (attrs) => ({ "data-columns": attrs.columns }),
            },
        };
    },

    parseHTML() {
        return [{ tag: "div.article-gallery" }];
    },

    renderHTML({ node, HTMLAttributes }) {
        return [
            "div",
            mergeAttributes(HTMLAttributes, { class: "article-gallery" }),
            ...(node.attrs.images || []).map((src) => ["img", { src, alt: "", loading: "lazy" }]),
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(GalleryView);
    },
});