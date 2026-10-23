"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { deleteWedding } from "@/lib/fm-weddings";
import { fmSerif, fmLabel, fmButton, fmNotice } from "@/components/admin/fm-theme";

function formatDate(date) {
    return new Date(`${date}T12:00:00`).toLocaleDateString("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function FutureMemoriesAdminPage() {
    const [weddings, setWeddings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null); // { type, text }
    const [deletingId, setDeletingId] = useState(null);

    const load = useCallback(async () => {
        const supabase = createSupabaseBrowser();
        const { data, error } = await supabase
            .from("fm_weddings")
            .select("id, slug, names, location, wedding_date, cover_url, cover_position_x, cover_position_y, published, fm_wedding_photos(count)")
            .order("wedding_date", { ascending: false });
        if (error) setMessage({ type: "error", text: `Errore nel caricamento: ${error.message}` });
        else setWeddings(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    async function handleDelete(wedding) {
        const confirmed = window.confirm(
            `Eliminare definitivamente "${wedding.names}"? Verranno cancellate anche tutte le foto.`
        );
        if (!confirmed) return;

        setDeletingId(wedding.id);
        const result = await deleteWedding(wedding.id);
        setDeletingId(null);

        if (result.error) {
            setMessage({ type: "error", text: `Eliminazione non riuscita: ${result.error}` });
            return;
        }
        setWeddings((prev) => prev.filter((item) => item.id !== wedding.id));
        setMessage(
            result.siteUpdated
                ? { type: "ok", text: "Matrimonio eliminato." }
                : { type: "warning", text: "Matrimonio eliminato, ma il sito potrebbe impiegare qualche ora ad aggiornarsi." }
        );
    }

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className={fmLabel}>Portfolio</p>
                    <h1 className="mt-1 text-4xl text-[#2A1E16]" style={fmSerif}>I matrimoni</h1>
                </div>
                <Link href="/admin/future-memories/nuovo" className={fmButton}>
                    <i className="fa-solid fa-plus text-xs" />
                    Nuovo matrimonio
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
            ) : weddings.length === 0 ? (
                <div className="border border-dashed border-[#D9C8B2] bg-[#F7F2EA] p-10 text-center">
                    <p className="font-montserrat text-sm text-[#5A4637]">Nessun matrimonio ancora. Inizia dal pulsante in alto.</p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {weddings.map((wedding) => (
                        <li
                            key={wedding.id}
                            className="flex items-center gap-4 border border-[#D9C8B2] bg-[#F7F2EA] p-3"
                        >
                            <div className="h-16 w-20 shrink-0 overflow-hidden bg-[#D9C8B2]">
                                {wedding.cover_url ? (
                                    <img
                                        src={wedding.cover_url}
                                        alt=""
                                        className="h-full w-full"
                                        style={{
                                            objectFit: "cover",
                                            objectPosition: `${wedding.cover_position_x}% ${wedding.cover_position_y}%`,
                                        }}
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <i className="fa-solid fa-image text-[#5A4637]/50" />
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="truncate text-xl text-[#2A1E16]" style={fmSerif}>{wedding.names}</p>
                                    <span
                                        className={`px-2 py-0.5 font-montserrat text-[0.5rem] font-semibold uppercase tracking-wider ${wedding.published ? "bg-[#2A1E16] text-[#F7F2EA]" : "bg-[#E2D4C1] text-[#5A4637]"
                                            }`}
                                    >
                                        {wedding.published ? "Pubblicato" : "Bozza"}
                                    </span>
                                </div>
                                <p className="truncate font-montserrat text-xs text-[#5A4637]">
                                    {wedding.location} · {formatDate(wedding.wedding_date)}
                                </p>
                                <p className="font-montserrat text-[0.6rem] text-[#5A4637]/80">
                                    {wedding.fm_wedding_photos[0]?.count ?? 0} foto
                                </p>
                            </div>

                            <div className="flex shrink-0 gap-2">
                                <Link
                                    href={`/admin/future-memories/${wedding.id}`}
                                    aria-label={`Modifica ${wedding.names}`}
                                    className="flex h-9 w-9 items-center justify-center border border-[#D9C8B2] text-[#2A1E16] transition hover:border-[#2A1E16] hover:bg-[#2A1E16] hover:text-[#F7F2EA]"
                                >
                                    <i className="fa-solid fa-pen text-xs" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(wedding)}
                                    disabled={deletingId === wedding.id}
                                    aria-label={`Elimina ${wedding.names}`}
                                    className="flex h-9 w-9 items-center justify-center border border-[#D9C8B2] text-red-700 transition hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
                                >
                                    <i className={`fa-solid ${deletingId === wedding.id ? "fa-spinner animate-spin" : "fa-trash"} text-xs`} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}