"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import WeddingEditor from "@/components/admin/WeddingEditor";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { saveWedding } from "@/lib/fm-weddings";
import { fmSerif, fmBackLink, fmNotice } from "@/components/admin/fm-theme";

export default function EditWeddingPage() {
    const { id } = useParams();
    const [wedding, setWedding] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState(null); // { type: "ok" | "warning" | "error", text }

    useEffect(() => {
        async function load() {
            const supabase = createSupabaseBrowser();
            const { data, error } = await supabase
                .from("fm_weddings")
                .select("*, fm_wedding_photos(url, width, height, sort_order)")
                .eq("id", id)
                .single();
            if (error) setNotice({ type: "error", text: "Matrimonio non trovato." });
            else setWedding(data);
            setLoading(false);
        }
        load();
    }, [id]);

    async function handleSave(payload) {
        setSaving(true);
        setNotice(null);
        try {
            const result = await saveWedding(payload, id);
            if (result.error) {
                setNotice({ type: "error", text: result.error });
            } else if (!result.siteUpdated) {
                setNotice({ type: "warning", text: "Salvato, ma il sito potrebbe impiegare qualche ora ad aggiornarsi." });
            } else {
                setNotice({ type: "ok", text: "Modifiche salvate e pubblicate sul sito." });
            }
        } catch (err) {
            console.error(err);
            setNotice({ type: "error", text: `Errore imprevisto durante il salvataggio: ${err.message}` });
        } finally {
            setSaving(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div>
                <Link href="/admin/future-memories" className={fmBackLink}>
                    ← Tutti i matrimoni
                </Link>
                <h1 className="mt-2 text-4xl text-[#2A1E16]" style={fmSerif}>
                    {wedding ? wedding.names : "Modifica matrimonio"}
                </h1>
            </div>

            {notice && (
                <p className={`border px-4 py-3 font-montserrat text-xs ${fmNotice[notice.type]}`}>
                    {notice.text}
                </p>
            )}

            {loading ? (
                <p className="font-montserrat text-sm text-[#5A4637]">
                    <i className="fa-solid fa-spinner mr-2 animate-spin" />
                    Caricamento...
                </p>
            ) : (
                wedding && <WeddingEditor key={wedding.id} initialData={wedding} onSave={handleSave} saving={saving} />
            )}
        </div>
    );
}