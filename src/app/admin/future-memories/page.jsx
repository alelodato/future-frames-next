"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { deleteWedding } from "@/lib/fm-weddings";
import { fmSerif, fmLabel, fmButton, fmNotice } from "@/components/admin/fm-theme";

const KIND_LABELS = {
  trailer: "Video · Wedding trailer",
  film: "Video · Film completo",
  matrimonio: "Foto · Matrimonio",
  anniversario: "Foto · Anniversario",
};

function kindLabel(work) {
  return work.kind === "foto"
    ? KIND_LABELS[work.photo_category] || KIND_LABELS.matrimonio
    : KIND_LABELS[work.video_format] || KIND_LABELS.film;
}

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function FutureMemoriesAdminPage() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null); // { type, text }
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    const supabase = createSupabaseBrowser();
    const { data, error } = await supabase
      .from("fm_weddings")
      .select(
        "id, slug, kind, video_format, photo_category, names, location, wedding_date, cover_url, cover_position_x, cover_position_y, published, fm_wedding_photos(count)"
      )
      .order("wedding_date", { ascending: false });
    if (error) setMessage({ type: "error", text: `Errore nel caricamento: ${error.message}` });
    else setWorks(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(work) {
    const confirmed = window.confirm(
      `Eliminare definitivamente "${work.names}" (${kindLabel(work)})? Verranno cancellati anche i file caricati.`
    );
    if (!confirmed) return;

    setDeletingId(work.id);
    const result = await deleteWedding(work.id);
    setDeletingId(null);

    if (result.error) {
      setMessage({ type: "error", text: `Eliminazione non riuscita: ${result.error}` });
      return;
    }
    setWorks((prev) => prev.filter((item) => item.id !== work.id));
    setMessage(
      result.siteUpdated
        ? { type: "ok", text: "Lavoro eliminato." }
        : { type: "warning", text: "Lavoro eliminato, ma il sito potrebbe impiegare qualche ora ad aggiornarsi." }
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={fmLabel}>Portfolio</p>
          <h1 className="mt-1 text-4xl text-[#2A1E16]" style={fmSerif}>I lavori</h1>
        </div>
        <Link href="/admin/future-memories/nuovo" className={fmButton}>
          <i className="fa-solid fa-plus text-xs" />
          Nuovo lavoro
        </Link>
      </div>

      {message && (
        <p className={`border px-4 py-3 font-montserrat text-xs ${fmNotice[message.type]}`}>
          {message.text}
        </p>
      )}

      {loading ? (
        <p className="font-montserrat text-sm text-[#5A4637]">
          <i className="fa-solid fa-spinner mr-2 animate-spin" />
          Caricamento...
        </p>
      ) : works.length === 0 ? (
        <div className="border border-dashed border-[#D9C8B2] bg-[#F7F2EA] p-10 text-center">
          <p className="font-montserrat text-sm text-[#5A4637]">Nessun lavoro ancora. Inizia dal pulsante in alto.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {works.map((work) => (
            <li key={work.id} className="flex items-center gap-4 border border-[#D9C8B2] bg-[#F7F2EA] p-3">
              <div className="h-16 w-20 shrink-0 overflow-hidden bg-[#D9C8B2]">
                {work.cover_url ? (
                  <img
                    src={work.cover_url}
                    alt=""
                    className="h-full w-full"
                    style={{
                      objectFit: "cover",
                      objectPosition: `${work.cover_position_x}% ${work.cover_position_y}%`,
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <i className={`fa-solid ${work.kind === "foto" ? "fa-image" : "fa-film"} text-[#5A4637]/50`} />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-montserrat text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[#5A4637]">
                  {kindLabel(work)}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-xl text-[#2A1E16]" style={fmSerif}>{work.names}</p>
                  <span
                    className={`px-2 py-0.5 font-montserrat text-[0.5rem] font-semibold uppercase tracking-wider ${
                      work.published ? "bg-[#2A1E16] text-[#F7F2EA]" : "bg-[#E2D4C1] text-[#5A4637]"
                    }`}
                  >
                    {work.published ? "Pubblicato" : "Bozza"}
                  </span>
                </div>
                <p className="truncate font-montserrat text-xs text-[#5A4637]">
                  {work.location} · {formatDate(work.wedding_date)}
                </p>
                {work.kind === "foto" && (
                  <p className="font-montserrat text-[0.6rem] text-[#5A4637]/80">
                    {work.fm_wedding_photos[0]?.count ?? 0} foto
                  </p>
                )}
              </div>

              <div className="flex shrink-0 gap-2">
                <Link
                  href={`/admin/future-memories/${work.id}`}
                  aria-label={`Modifica ${work.names}`}
                  className="flex h-9 w-9 items-center justify-center border border-[#D9C8B2] !text-[#2A1E16] transition hover:border-[#2A1E16] hover:bg-[#2A1E16] hover:!text-[#F7F2EA]"
                >
                  <i className="fa-solid fa-pen text-xs" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(work)}
                  disabled={deletingId === work.id}
                  aria-label={`Elimina ${work.names}`}
                  className="flex h-9 w-9 items-center justify-center border border-[#D9C8B2] text-red-700 transition hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
                >
                  <i className={`fa-solid ${deletingId === work.id ? "fa-spinner animate-spin" : "fa-trash"} text-xs`} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
