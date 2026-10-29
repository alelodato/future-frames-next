"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WeddingEditor from "@/components/admin/WeddingEditor";
import { saveWedding } from "@/lib/fm-weddings";
import { fmSerif, fmBackLink, fmNotice } from "@/components/admin/fm-theme";

export default function NewWeddingPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(payload) {
    setSaving(true);
    setError("");
    try {
      const result = await saveWedding(payload);
      if (result.error) {
        setError(result.error);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (!result.siteUpdated) {
        window.alert("Lavoro salvato, ma il sito potrebbe impiegare qualche ora ad aggiornarsi.");
      }
      router.push("/admin/future-memories");
    } catch (err) {
      console.error(err);
      setError(`Errore imprevisto durante il salvataggio: ${err.message}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href="/admin/future-memories" className={fmBackLink}>
          ← Tutti i lavori
        </Link>
        <h1 className="mt-2 text-4xl text-[#2A1E16]" style={fmSerif}>Nuovo lavoro</h1>
      </div>

      {error && (
        <p className={`border px-4 py-3 font-montserrat text-xs ${fmNotice.error}`}>
          {error}
        </p>
      )}

      <WeddingEditor onSave={handleSave} saving={saving} />
    </div>
  );
}
