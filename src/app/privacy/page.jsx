export const metadata = {
    title: "Privacy Policy — Future Frames",
    description: "Informativa sul trattamento dei dati personali di Future Frames.",
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-3xl mx-auto space-y-10">

                <div>
                    <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.4em] text-violet-400 mb-3">Documento legale</p>
                    <h1 className="font-antonio text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
                    <p className="font-montserrat text-xs text-zinc-500">
                        Ultimo aggiornamento: marzo 2025 · Titolare: Future Frames di Gloria Margarino e Ivan Scrofani — Pomezia (RM)
                    </p>
                </div>

                <div className="h-px w-full"
                    style={{ background: "linear-gradient(to right, transparent, #6366f1, transparent)" }} />

                {[
                    {
                        title: "1. Titolare del trattamento",
                        content: `Il titolare del trattamento è Future Frames, con sede a Pomezia (RM). Per qualsiasi richiesta relativa ai dati personali è possibile scrivere a: futureframes.info@gmail.com`
                    },
                    {
                        title: "2. Dati raccolti e finalità",
                        content: null,
                        list: [
                            {
                                sub: "Modulo di contatto",
                                text: "Attraverso il form nella pagina Contatti raccogliamo nome, indirizzo email, numero di telefono (facoltativo) e il testo del messaggio. I dati sono utilizzati esclusivamente per rispondere alla richiesta dell'utente."
                            },
                            {
                                sub: "Richiesta portfolio PDF",
                                text: "Attraverso il form di download del portfolio raccogliamo nome, indirizzo email, numero di telefono (facoltativo) e azienda/professione (facoltativo). I dati sono utilizzati per inviare il materiale richiesto e tenere traccia delle richieste."
                            },
                            {
                                sub: "Commenti del blog",
                                text: "Nella sezione commenti degli articoli del blog l'utente può inserire volontariamente il proprio nome e indirizzo email. Questi dati sono visibili pubblicamente insieme al commento. L'email non viene pubblicata ma può essere utilizzata per notifiche relative al commento."
                            },
                        ]
                    },
                    {
                        title: "3. Base giuridica del trattamento",
                        content: `Il trattamento dei dati si basa sul consenso dell'utente (art. 6, par. 1, lett. a del GDPR) e sull'esecuzione di misure precontrattuali su richiesta dell'interessato (art. 6, par. 1, lett. b del GDPR).`
                    },
                    {
                        title: "4. Modalità di trattamento e conservazione",
                        content: `I dati sono trattati con strumenti elettronici. I messaggi inviati tramite i form vengono recapitati via email attraverso il servizio Web3Forms (web3forms.com). I commenti del blog sono conservati nel database Supabase (supabase.com), ospitato su server in Europa. I dati non vengono ceduti a terzi a fini commerciali. I dati vengono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti.`
                    },
                    {
                        title: "5. Diritti dell'interessato",
                        content: `In qualità di interessato hai diritto di: accedere ai tuoi dati personali, richiederne la rettifica o la cancellazione, opporti al trattamento, richiedere la limitazione del trattamento, proporre reclamo all'Autorità Garante per la protezione dei dati personali (www.garanteprivacy.it). Per esercitare questi diritti scrivi a: futureframes.info@gmail.com`
                    },
                    {
                        title: "6. Cookie e tecnologie di tracciamento",
                        content: `Il sito utilizza cookie tecnici necessari al funzionamento e cookie di terze parti (Google Maps) soggetti al consenso dell'utente. Per maggiori informazioni consulta la Cookie Policy.`
                    },
                    {
                        title: "7. Modifiche alla presente policy",
                        content: `Future Frames si riserva il diritto di modificare questa informativa in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con aggiornamento della data in cima al documento.`
                    },
                ].map((section) => (
                    <div key={section.title} className="space-y-3">
                        <h2 className="font-antonio text-xl text-violet-300">{section.title}</h2>
                        {section.content && (
                            <p className="font-montserrat text-sm text-zinc-400 leading-relaxed">{section.content}</p>
                        )}
                        {section.list && (
                            <div className="space-y-4">
                                {section.list.map((item) => (
                                    <div key={item.sub} className="pl-4 border-l border-violet-500/30">
                                        <p className="font-montserrat text-xs font-semibold text-violet-400 uppercase tracking-[0.15em] mb-1">{item.sub}</p>
                                        <p className="font-montserrat text-sm text-zinc-400 leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                <div className="h-px w-full"
                    style={{ background: "linear-gradient(to right, transparent, #6366f1, transparent)" }} />

                <p className="font-montserrat text-xs text-zinc-600 text-center">
                    Future Frames · Pomezia (RM) · futureframes.info@gmail.com
                </p>
            </div>
        </div>
    );
}