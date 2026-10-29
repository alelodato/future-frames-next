"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatDate, formatEuro, getQuote, quoteStatus } from "@/lib/fm-quotes";
import { fmBackLink, fmCard, fmLabel, fmNotice, fmSerif } from "@/components/admin/fm-theme";

function Row({ label, children }) {
    return (
        <div className="flex flex-col gap-1 border-b border-[#D9C8B2] py-3 last:border-0 sm:flex-row sm:justify-between sm:gap-6">
            <dt className={fmLabel}>{label}</dt>
            <dd className="font-montserrat text-sm text-[#2A1E16] sm:text-right">{children}</dd>
        </div>
    );
}

export default function QuoteDetailPage() {
    const { id } = useParams();
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            const { data, error: loadError } = await getQuote(id);
            if (loadError) setError("Preventivo non trovato.");
            else setQuote(data);
            setLoading(false);
        }
        load();
    }, [id]);

    const s = quote?.submission;
    const status = quote ? quoteStatus(quote) : null;

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div>
                <Link href="/admin/future-memories/preventivi" className={fmBackLink}>
                    ← Tutti i preventivi
                </Link>
                <h1 className="mt-2 text-4xl text-[#2A1E16]" style={fmSerif}>
                    {quote ? quote.couple_names : "Preventivo"}
                </h1>
                {quote?.submitted_at && (
                    <p className="mt-1 font-montserrat text-xs text-[#5A4637]">Compilato il {formatDate(quote.submitted_at)}</p>
                )}
            </div>

            {error && <p className={`border px-4 py-3 font-montserrat text-xs ${fmNotice.error}`}>{error}</p>}

            {loading && (
                <p className="font-montserrat text-sm text-[#5A4637]">
                    <i className="fa-solid fa-spinner mr-2 animate-spin" />
                    Caricamento...
                </p>
            )}

            {quote && status !== "compilato" && (
                <div className={fmCard}>
                    <p className="font-montserrat text-sm text-[#5A4637]">La coppia non ha ancora compilato il preventivo.</p>
                </div>
            )}

            {quote && s && (
                <>
                    {(quote.contact_email || quote.notes) && (
                        <dl className={fmCard}>
                            {quote.contact_email && (
                                <Row label="Email">
                                    <a href={`mailto:${quote.contact_email}`} className="underline">{quote.contact_email}</a>
                                </Row>
                            )}
                            {quote.notes && <Row label="Note interne">{quote.notes}</Row>}
                        </dl>
                    )}

                    <section className={fmCard}>
                        <h2 className="text-2xl text-[#2A1E16]" style={fmSerif}>La giornata</h2>
                        <dl>
                            <Row label="Servizio">{s.service}</Row>
                            {s.day?.date && <Row label="Data">{formatDate(s.day.date)}</Row>}
                            {s.day?.start && s.day?.end && <Row label="Copertura">dalle {s.day.start} alle {s.day.end}</Row>}
                            {s.day?.guests && <Row label="Invitati">{s.day.guests}</Row>}
                            {s.day?.ceremony && <Row label="Rito">{s.day.ceremony}</Row>}
                            {s.phases?.length > 0 && <Row label="Fasi">{s.phases.join(", ")}</Row>}
                        </dl>
                    </section>

                    {s.locations?.length > 0 && (
                        <section className={fmCard}>
                            <h2 className="text-2xl text-[#2A1E16]" style={fmSerif}>Location</h2>
                            <dl>
                                {s.locations.map((item) => (
                                    <Row key={item.label} label={item.label}>{item.value}</Row>
                                ))}
                            </dl>
                        </section>
                    )}

                    <section className={fmCard}>
                        <h2 className="text-2xl text-[#2A1E16]" style={fmSerif}>Preventivo</h2>
                        {s.custom ? (
                            <p className="font-montserrat text-sm leading-relaxed text-[#2A1E16]">
                                Richiesta di <strong>preventivo su misura</strong>: rito e ricevimento non sono entrambi presenti, quindi
                                il prezzo non è stato calcolato.
                            </p>
                        ) : (
                            <>
                                <dl>
                                    {s.lines?.map((line) => (
                                        <Row key={line.label} label={line.label}>
                                            {line.listAmount && (
                                                <span className="mr-2 text-[#5A4637] line-through">{formatEuro(line.listAmount)}</span>
                                            )}
                                            {formatEuro(line.amount)}
                                        </Row>
                                    ))}
                                </dl>
                                <div className="flex items-baseline justify-between bg-[#2A1E16] px-4 py-3">
                                    <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#F7F2EA]">Totale</span>
                                    <span className="text-2xl text-[#F7F2EA]" style={fmSerif}>{formatEuro(s.total)}</span>
                                </div>
                                {s.installments?.length > 0 && (
                                    <dl>
                                        {s.installments.map((step) => (
                                            <Row key={step.label} label={step.label}>
                                                {formatEuro(step.amount)}
                                                <span className="block text-[0.65rem] text-[#5A4637]">
                                                    {step.dueDate ? `entro il ${formatDate(step.dueDate)}` : step.due}
                                                </span>
                                            </Row>
                                        ))}
                                    </dl>
                                )}
                            </>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}