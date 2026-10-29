"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    createQuote,
    deleteQuote,
    formatDate,
    formatEuro,
    listQuotes,
    quoteLink,
    quoteStatus,
    renewQuote,
    whatsappShareUrl,
} from "@/lib/fm-quotes";
import { fmButton, fmCard, fmInput, fmLabel, fmNotice, fmSerif } from "@/components/admin/fm-theme";

const statusBadge = {
    inviato: { label: "In attesa", className: "bg-[#E2D4C1] text-[#5A4637]" },
    compilato: { label: "Compilato", className: "bg-[#2A1E16] text-[#F7F2EA]" },
    scaduto: { label: "Scaduto", className: "bg-red-50 text-red-800" },
};

const iconButtonClass =
    "flex h-9 w-9 shrink-0 items-center justify-center border border-[#D9C8B2] !text-[#2A1E16] transition hover:border-[#2A1E16] hover:bg-[#2A1E16] hover:!text-[#F7F2EA] disabled:opacity-50";

const EMPTY_FORM = { coupleNames: "", contactEmail: "", notes: "" };

function statusLine(quote, status) {
    if (status === "compilato") {
        const amount = quote.total != null ? formatEuro(quote.total) : "preventivo su misura";
        return `Compilato il ${formatDate(quote.submitted_at)} · ${amount}`;
    }
    if (status === "scaduto") return `Scaduto il ${formatDate(quote.expires_at)}`;
    return `Valido fino al ${formatDate(quote.expires_at)}`;
}

export default function QuotesAdminPage() {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(EMPTY_FORM);
    const [creating, setCreating] = useState(false);
    const [created, setCreated] = useState(null);
    const [message, setMessage] = useState(null); // { type, text }
    const [copiedId, setCopiedId] = useState(null);
    const [busyId, setBusyId] = useState(null);

    useEffect(() => {
        async function load() {
            const { data, error } = await listQuotes();
            if (error) setMessage({ type: "error", text: `Errore nel caricamento: ${error}` });
            setQuotes(data);
            setLoading(false);
        }
        load();
    }, []);

    function updateForm(e) {
        setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
    }

    async function handleCreate(e) {
        e.preventDefault();
        if (!form.coupleNames.trim()) return;
        setCreating(true);
        setMessage(null);
        const { data, error } = await createQuote(form);
        setCreating(false);
        if (error) {
            setMessage({ type: "error", text: `Link non creato: ${error}` });
            return;
        }
        setQuotes((prev) => [data, ...prev]);
        setCreated(data);
        setForm(EMPTY_FORM);
    }

    async function handleCopy(quote) {
        const link = quoteLink(quote.token);
        try {
            await navigator.clipboard.writeText(link);
            setCopiedId(quote.id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch {
            window.prompt("Copia il link:", link);
        }
    }

    async function handleRenew(quote) {
        setBusyId(quote.id);
        const { data, error } = await renewQuote(quote.id);
        setBusyId(null);
        if (error) {
            setMessage({ type: "error", text: `Rinnovo non riuscito: ${error}` });
            return;
        }
        setQuotes((prev) => prev.map((item) => (item.id === data.id ? data : item)));
        setMessage({ type: "ok", text: `Link di ${data.couple_names} rinnovato fino al ${formatDate(data.expires_at)}.` });
    }

    async function handleDelete(quote) {
        if (!window.confirm(`Eliminare il preventivo di "${quote.couple_names}"? Il link smetterà di funzionare.`)) return;
        setBusyId(quote.id);
        const { error } = await deleteQuote(quote.id);
        setBusyId(null);
        if (error) {
            setMessage({ type: "error", text: `Eliminazione non riuscita: ${error}` });
            return;
        }
        setQuotes((prev) => prev.filter((item) => item.id !== quote.id));
        if (created?.id === quote.id) setCreated(null);
    }

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div>
                <p className={fmLabel}>Preventivi</p>
                <h1 className="mt-1 text-4xl text-[#2A1E16]" style={fmSerif}>Link per le coppie</h1>
                <p className="mt-2 font-montserrat text-xs leading-relaxed text-[#5A4637]">
                    Ogni coppia riceve un link personale, valido 10 giorni e compilabile una sola volta.
                </p>
            </div>

            {message && (
                <p className={`border px-4 py-3 font-montserrat text-xs ${fmNotice[message.type]}`}>{message.text}</p>
            )}

            {/* ── NUOVO LINK ── */}
            <form onSubmit={handleCreate} className={fmCard}>
                <h2 className="text-2xl text-[#2A1E16]" style={fmSerif}>Nuovo preventivo</h2>

                <div className="space-y-1.5">
                    <label htmlFor="q-names" className={fmLabel}>Nomi della coppia *</label>
                    <input
                        id="q-names"
                        name="coupleNames"
                        type="text"
                        value={form.coupleNames}
                        onChange={updateForm}
                        required
                        placeholder="Giulia & Marco"
                        className={fmInput}
                    />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="q-email" className={fmLabel}>Email della coppia (facoltativa)</label>
                    <input
                        id="q-email"
                        name="contactEmail"
                        type="email"
                        value={form.contactEmail}
                        onChange={updateForm}
                        placeholder="giulia@email.it"
                        className={fmInput}
                    />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="q-notes" className={fmLabel}>Note interne (facoltative, la coppia non le vede)</label>
                    <textarea
                        id="q-notes"
                        name="notes"
                        rows={2}
                        value={form.notes}
                        onChange={updateForm}
                        placeholder="Es. contattati su Instagram, matrimonio a giugno"
                        className={`${fmInput} resize-none`}
                    />
                </div>

                <button type="submit" disabled={creating || !form.coupleNames.trim()} className={`${fmButton} w-full sm:w-auto`}>
                    {creating ? (
                        <><i className="fa-solid fa-spinner animate-spin text-xs" />Creazione...</>
                    ) : (
                        <><i className="fa-solid fa-link text-xs" />Crea link</>
                    )}
                </button>

                {created && (
                    <div className="space-y-3 border border-[#2A1E16] bg-white/60 p-4">
                        <p className="font-montserrat text-xs text-[#2A1E16]">
                            Link per <strong>{created.couple_names}</strong>, valido fino al {formatDate(created.expires_at)}:
                        </p>
                        <input
                            readOnly
                            value={quoteLink(created.token)}
                            onFocus={(e) => e.target.select()}
                            className={`${fmInput} font-mono text-xs`}
                        />
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button type="button" onClick={() => handleCopy(created)} className={`${fmButton} w-full sm:w-auto`}>
                                <i className={`fa-solid ${copiedId === created.id ? "fa-check" : "fa-copy"} text-xs`} />
                                {copiedId === created.id ? "Copiato" : "Copia link"}
                            </button>
                            <a
                                href={whatsappShareUrl(created)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${fmButton} w-full sm:w-auto`}
                            >
                                <i className="fa-brands fa-whatsapp text-sm" />
                                Invia su WhatsApp
                            </a>
                        </div>
                    </div>
                )}
            </form>

            {/* ── ELENCO ── */}
            {loading ? (
                <p className="font-montserrat text-sm text-[#5A4637]">
                    <i className="fa-solid fa-spinner mr-2 animate-spin" />
                    Caricamento...
                </p>
            ) : quotes.length === 0 ? (
                <div className="border border-dashed border-[#D9C8B2] bg-[#F7F2EA] p-10 text-center">
                    <p className="font-montserrat text-sm text-[#5A4637]">Nessun preventivo ancora.</p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {quotes.map((quote) => {
                        const status = quoteStatus(quote);
                        const badge = statusBadge[status];
                        const busy = busyId === quote.id;
                        return (
                            <li key={quote.id} className="space-y-3 border border-[#D9C8B2] bg-[#F7F2EA] p-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="text-xl text-[#2A1E16]" style={fmSerif}>{quote.couple_names}</p>
                                    <span className={`px-2 py-0.5 font-montserrat text-[0.5rem] font-semibold uppercase tracking-wider ${badge.className}`}>
                                        {badge.label}
                                    </span>
                                </div>
                                <div className="space-y-0.5">
                                    <p className="font-montserrat text-xs text-[#5A4637]">{statusLine(quote, status)}</p>
                                    {quote.contact_email && (
                                        <p className="font-montserrat text-[0.65rem] text-[#5A4637]/80">{quote.contact_email}</p>
                                    )}
                                    {quote.notes && (
                                        <p className="font-montserrat text-[0.65rem] italic text-[#5A4637]/80">{quote.notes}</p>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {status === "compilato" && (
                                        <Link
                                            href={`/admin/future-memories/preventivi/${quote.id}`}
                                            className="inline-flex h-9 items-center gap-2 border border-[#2A1E16] bg-[#2A1E16] px-3 font-montserrat text-[0.6rem] font-semibold uppercase tracking-[0.15em] !text-[#F7F2EA] transition hover:bg-[#5A4637]"
                                        >
                                            <i className="fa-solid fa-eye text-xs" />
                                            Vedi le scelte
                                        </Link>
                                    )}
                                    {status !== "compilato" && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleCopy(quote)}
                                                aria-label="Copia link"
                                                title="Copia link"
                                                className={iconButtonClass}
                                            >
                                                <i className={`fa-solid ${copiedId === quote.id ? "fa-check" : "fa-copy"} text-xs`} />
                                            </button>
                                            <a
                                                href={whatsappShareUrl(quote)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Invia su WhatsApp"
                                                title="Invia su WhatsApp"
                                                className={iconButtonClass}
                                            >
                                                <i className="fa-brands fa-whatsapp text-sm" />
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => handleRenew(quote)}
                                                disabled={busy}
                                                aria-label="Rinnova di 10 giorni"
                                                title="Rinnova di 10 giorni"
                                                className={iconButtonClass}
                                            >
                                                <i className="fa-solid fa-rotate-right text-xs" />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(quote)}
                                        disabled={busy}
                                        aria-label="Elimina"
                                        title="Elimina"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#D9C8B2] text-red-700 transition hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
                                    >
                                        <i className={`fa-solid ${busy ? "fa-spinner animate-spin" : "fa-trash"} text-xs`} />
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}