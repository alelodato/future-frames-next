export const metadata = {
    title: "Cookie Policy — Future Frames",
    description: "Informativa sull'uso dei cookie di Future Frames.",
};

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-3xl mx-auto space-y-10">

                <div>
                    <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.4em] text-violet-400 mb-3">Documento legale</p>
                    <h1 className="font-antonio text-4xl md:text-5xl text-white mb-4">Cookie Policy</h1>
                    <p className="font-montserrat text-xs text-zinc-500">
                        Ultimo aggiornamento: marzo 2025 · Future Frames — Pomezia (RM)
                    </p>
                </div>

                <div className="h-px w-full"
                    style={{ background: "linear-gradient(to right, transparent, #6366f1, transparent)" }} />

                {[
                    {
                        title: "1. Cosa sono i cookie",
                        content: `I cookie sono piccoli file di testo che i siti web salvano sul dispositivo dell'utente durante la navigazione. Vengono utilizzati per far funzionare i siti in modo efficiente e per fornire informazioni ai proprietari del sito.`
                    },
                    {
                        title: "2. Cookie tecnici (sempre attivi)",
                        content: `Questo sito utilizza cookie tecnici strettamente necessari al funzionamento. Tra questi rientra il cookie che memorizza la tua preferenza sul consenso (cookie-consent), salvato in localStorage. Questi cookie non richiedono consenso in quanto necessari all'erogazione del servizio.`
                    },
                    {
                        title: "3. Cookie di terze parti — Google Maps",
                        content: `La pagina About utilizza il servizio Google Maps (Google LLC) per mostrare la posizione dello studio. Google Maps può impostare cookie di profilazione e tracciamento. Questi cookie vengono caricati solo previo consenso esplicito dell'utente tramite il banner cookie presente sul sito. In assenza di consenso, la mappa non viene caricata e nessun dato viene trasmesso a Google. Per maggiori informazioni: https://policies.google.com/privacy`
                    },
                    {
                        title: "4. Come gestire il consenso",
                        content: `Al primo accesso al sito viene mostrato un banner che permette di accettare o rifiutare i cookie non tecnici. La preferenza viene salvata in localStorage con la chiave "cookie-consent". Puoi modificare la tua scelta in qualsiasi momento svuotando la memoria locale del browser o contattandoci a futureframes.info@gmail.com.`
                    },
                    {
                        title: "5. Come disabilitare i cookie dal browser",
                        content: `Puoi disabilitare i cookie direttamente dalle impostazioni del tuo browser. Tieni presente che disabilitare i cookie tecnici potrebbe compromettere il corretto funzionamento del sito. Di seguito i link alle guide dei principali browser:\n• Chrome: chrome://settings/cookies\n• Firefox: about:preferences#privacy\n• Safari: Preferenze > Privacy\n• Edge: edge://settings/privacy`
                    },
                    {
                        title: "6. Modifiche alla presente policy",
                        content: `Future Frames si riserva il diritto di modificare questa Cookie Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con aggiornamento della data.`
                    },
                ].map((section) => (
                    <div key={section.title} className="space-y-3">
                        <h2 className="font-antonio text-xl text-violet-300">{section.title}</h2>
                        <p className="font-montserrat text-sm text-zinc-400 leading-relaxed whitespace-pre-line">{section.content}</p>
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