"use client";

import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

const categories = ["Fotografia", "Videomaking", "Dietro le quinte", "Consigli", "Progetti"];

function ToolbarButton({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition text-sm ${active
        ? "bg-violet-600 text-white"
        : "text-zinc-400 hover:bg-violet-900/30 hover:text-violet-300"
        }`}
    >
      {children}
    </button>
  );
}

export default function ArticleEditor({ initialData, onSave, saving }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [readTime, setReadTime] = useState(initialData?.read_time || 5);
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || "");
  const [published, setPublished] = useState(initialData?.published || false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Scrivi il contenuto dell'articolo..." }),
    ],
    content: initialData?.content || "",
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none min-h-[300px] focus:outline-none font-montserrat text-sm text-zinc-300 leading-relaxed",
      },
    },
  });

  async function handleCoverUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const supabase = createSupabaseBrowser();
    const filename = `blog/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("media").upload(filename, file);
    if (!error) {
      const { data: urlData } = supabase.storage.from("media").getPublicUrl(filename);
      setCoverImage(urlData.publicUrl);
    }
    setUploadingImage(false);
  }

  async function handleContentImageUpload(e) {
    const file = e.target.files[0];
    if (!file || !editor) return;
    const supabase = createSupabaseBrowser();
    const filename = `blog/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(filename, file);
    if (!error) {
      const { data: urlData } = supabase.storage.from("media").getPublicUrl(filename);
      editor.chain().focus().setImage({ src: urlData.publicUrl }).run();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      title,
      excerpt,
      category,
      author,
      read_time: readTime,
      cover_image: coverImage,
      content: editor?.getHTML() || "",
      published,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Titolo */}
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-5 space-y-4">
        <h3 className="font-antonio text-base text-violet-300">Informazioni base</h3>

        <div className="space-y-1.5">
          <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">
            Titolo *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Titolo dell'articolo"
            className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">
            Anteprima
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Breve descrizione mostrata nella lista articoli..."
            className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-violet-500/25 bg-[#0d0b2a] px-4 py-2.5 font-montserrat text-sm text-white outline-none transition focus:border-violet-400/60"
            >
              <option value="">Seleziona...</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5 w-32">
          <label className="font-montserrat text-[0.65rem] uppercase tracking-[0.2em] text-violet-400">
            Tempo lettura (min)
          </label>
          <input
            type="number"
            value={readTime}
            onChange={(e) => setReadTime(Number(e.target.value))}
            min={1}
            max={60}
            className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-4 py-2.5 font-montserrat text-sm text-white outline-none transition focus:border-violet-400/60"
          />
        </div>
      </div>

      {/* Immagine cover */}
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-5 space-y-3">
        <h3 className="font-antonio text-base text-violet-300">Immagine di copertina</h3>

        {coverImage && (
          <div className="relative h-40 overflow-hidden rounded-xl">
            <img src={coverImage} alt="Cover" className="h-full w-full object-cover" />
            <button type="button" onClick={() => setCoverImage("")}
              className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-900/80 transition">
              <i className="fa-solid fa-xmark text-xs" />
            </button>
          </div>
        )}

        <label className={`flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-violet-500/30 bg-violet-900/10 px-4 py-3 transition hover:border-violet-400/50 hover:bg-violet-900/20 ${uploadingImage ? "opacity-50 pointer-events-none" : ""}`}>
          <i className={`fa-solid ${uploadingImage ? "fa-spinner animate-spin" : "fa-upload"} text-violet-400 text-sm`} />
          <span className="font-montserrat text-xs text-zinc-400">
            {uploadingImage ? "Caricamento..." : "Carica immagine di copertina"}
          </span>
          <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
        </label>
      </div>

      {/* Editor contenuto */}
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-5 space-y-3">
        <h3 className="font-antonio text-base text-violet-300">Contenuto</h3>

        {/* Toolbar */}
        {editor && (
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-violet-500/15 bg-violet-900/10 p-2">
            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Grassetto">
              <i className="fa-solid fa-bold text-xs" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Corsivo">
              <i className="fa-solid fa-italic text-xs" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Titolo H2">
              <span className="text-xs font-bold">H2</span>
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Titolo H3">
              <span className="text-xs font-bold">H3</span>
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Lista">
              <i className="fa-solid fa-list text-xs" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Lista numerata">
              <i className="fa-solid fa-list-ol text-xs" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Citazione">
              <i className="fa-solid fa-quote-left text-xs" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Separatore">
              <i className="fa-solid fa-minus text-xs" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Annulla">
              <i className="fa-solid fa-rotate-left text-xs" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Ripeti">
              <i className="fa-solid fa-rotate-right text-xs" />
            </ToolbarButton>

            {/* Upload immagine nel contenuto */}
            <label className="flex h-8 w-8 items-center justify-center rounded-lg cursor-pointer text-zinc-400 hover:bg-violet-900/30 hover:text-violet-300 transition" title="Inserisci immagine">
              <i className="fa-solid fa-image text-xs" />
              <input type="file" accept="image/*" onChange={handleContentImageUpload} className="hidden" />
            </label>
          </div>
        )}

        {/* Area testo */}
        <div className="min-h-[300px] rounded-xl border border-violet-500/15 bg-black/20 px-4 py-3">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Footer — pubblica */}
      <div className="flex items-center justify-between rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 px-5 py-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setPublished(!published)}
            className={`relative h-6 w-11 rounded-full transition-colors ${published ? "bg-violet-500" : "bg-zinc-700"}`}
          >
            <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${published ? "translate-x-5" : "translate-x-0.5"}`} />
          </div>
          <span className="font-montserrat text-xs text-zinc-300">
            {published ? "Pubblicato" : "Bozza"}
          </span>
        </label>

        <button
          type="submit"
          disabled={saving || !title}
          className="inline-flex items-center gap-2 rounded-full bg-violet-400 px-6 py-2.5 font-montserrat text-xs font-semibold uppercase tracking-wide text-[#050211] shadow-[0_0_20px_rgba(167,139,250,0.5)] transition hover:bg-violet-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <i className="fa-solid fa-spinner animate-spin text-xs" />
              Salvataggio...
            </>
          ) : (
            <>
              <i className="fa-solid fa-floppy-disk text-xs" />
              Salva articolo
            </>
          )}
        </button>
      </div>

    </form>
  );
}