"use client";

import { useState, useEffect } from "react";

export default function PortfolioModal({ isOpen, onClose }) {
    const [form, setForm] = useState({ nome: "", email: "", telefono: "", azienda: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        if (isOpen) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
            document.body.setAttribute("data-modal", "open");
        } else {
            const scrollY = document.body.style.top;
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.removeAttribute("data-modal");
            if (scrollY) window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }
        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.removeAttribute("data-modal");
        };
    }, [isOpen]);

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSending(true);
        setError("");
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: "1b0d0f54-1851-43e7-a0dd-1259cfb5c549",
                    subject: "Richiesta Portfolio Completo — Future Frames",
                    from_name: form.nome,
                    email: form.email,
                    message: `Nome: ${form.nome}\nEmail: ${form.email}\nTelefono: ${form.telefono || "Non fornito"}\nAzienda/Professione: ${form.azienda || "Non fornita"}`,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setSent(true);
                const link = document.createElement("a");
                link.href = "/documents/future-frames-portfolio.pdf";
                link.download = "future-frames-portfolio.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                setError("Qualcosa è andato storto. Riprova.");
            }
        } catch {
            setError("Errore di connessione. Riprova.");
        }
        setSending(false);
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

            {/* Modal — scrollabile internamente su mobile */}
            <div className="relative z-10 w-full max-w-sm md:max-w-2xl max-h-[90dvh] flex flex-col rounded-3xl border border-violet-500/20 bg-gradient-to-br from-[#0d0b2a] via-[#0a0820] to-black shadow-[0_0_80px_rgba(124,58,237,0.3)] overflow-hidden">

                {/* Glow */}
                <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-violet-600/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-fuchsia-600/10 blur-3xl" />

                {/* Header — fisso */}
                <div className="relative flex-shrink-0 px-6 md:px-8 pt-6 pb-4 border-b border-zinc-800/60">
                    <button onClick={onClose}
                        className="absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-500 transition">
                        <i className="fa-solid fa-xmark text-xs" />
                    </button>

                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-900/40">
                            <i className="fa-solid fa-file-pdf text-violet-400 text-xs" />
                        </div>
                        <p className="font-montserrat text-[0.5rem] uppercase tracking-[0.4em] text-violet-400">Portfolio Completo</p>
                    </div>

                    <h2 className="font-antonio text-xl md:text-2xl text-white leading-tight">
                        Scarica il portfolio
                        <span className="block text-violet-300">completo.</span>
                    </h2>
                    <p className="font-montserrat text-[0.65rem] text-zinc-400 mt-1.5 leading-relaxed">
                        Inserisci i tuoi dati per accedere a tutti i nostri progetti, inclusi quelli non pubblicati sul sito.
                    </p>
                </div>

                {/* Body — scrollabile */}
                <div className="relative flex-1 overflow-y-auto px-6 md:px-8 py-5">
                    {!sent ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-montserrat text-[0.58rem] uppercase tracking-[0.2em] text-violet-400">
                                        Nome <span className="text-violet-400">*</span>
                                    </label>
                                    <input type="text" name="nome" value={form.nome} onChange={handleChange} required
                                        placeholder="Il tuo nome"
                                        className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-3 py-2 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60 focus:bg-violet-900/20" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-montserrat text-[0.58rem] uppercase tracking-[0.2em] text-violet-400">
                                        Email <span className="text-violet-400">*</span>
                                    </label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} required
                                        placeholder="La tua email"
                                        className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-3 py-2 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60 focus:bg-violet-900/20" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-montserrat text-[0.58rem] uppercase tracking-[0.2em] text-zinc-500">Telefono</label>
                                    <input type="tel" name="telefono" value={form.telefono} onChange={handleChange}
                                        placeholder="+39 000 000 0000"
                                        className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-3 py-2 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60 focus:bg-violet-900/20" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-montserrat text-[0.58rem] uppercase tracking-[0.2em] text-zinc-500">Azienda / Professione</label>
                                    <input type="text" name="azienda" value={form.azienda} onChange={handleChange}
                                        placeholder="La tua azienda o professione"
                                        className="w-full rounded-xl border border-violet-500/25 bg-violet-900/10 px-3 py-2 font-montserrat text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-400/60 focus:bg-violet-900/20" />
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-xl border border-red-500/30 bg-red-900/20 px-3 py-2">
                                    <p className="font-montserrat text-xs text-red-300">{error}</p>
                                </div>
                            )}

                            <button type="submit" disabled={sending}
                                className="w-full rounded-full bg-violet-400 py-2.5 font-montserrat text-xs font-semibold uppercase tracking-wide text-[#050211] shadow-[0_0_26px_rgba(167,139,250,0.6)] transition hover:bg-violet-300 hover:shadow-[0_0_40px_rgba(167,139,250,0.9)] disabled:opacity-50 disabled:cursor-not-allowed">
                                {sending ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <i className="fa-solid fa-spinner animate-spin text-xs" />Invio in corso...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <i className="fa-solid fa-download text-xs" />Scarica il portfolio
                                    </span>
                                )}
                            </button>

                            <p className="font-montserrat text-[0.52rem] text-zinc-600 text-center pb-2">
                                I tuoi dati non verranno condivisi con terze parti.
                            </p>
                        </form>
                    ) : (
                        <div className="py-8 text-center space-y-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/30 bg-violet-900/40 mx-auto">
                                <i className="fa-solid fa-check text-violet-400 text-lg" />
                            </div>
                            <div>
                                <h3 className="font-antonio text-xl text-white">Download avviato!</h3>
                                <p className="font-montserrat text-xs text-zinc-400 mt-2 leading-relaxed">
                                    Il portfolio è in download. Se non parte automaticamente,{" "}
                                    <a href="/documents/future-frames-portfolio.pdf" download
                                        className="text-violet-400 hover:text-violet-300 underline transition">
                                        clicca qui
                                    </a>.
                                </p>
                            </div>
                            <button onClick={onClose}
                                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-2 font-montserrat text-xs text-zinc-300 hover:border-zinc-500 hover:text-white transition">
                                Chiudi
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}