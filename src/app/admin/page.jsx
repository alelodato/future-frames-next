import Link from "next/link";

const cards = [
  {
    href: "/admin/portfolio",
    icon: "fa-solid fa-film",
    title: "Portfolio",
    description: "Aggiungi, modifica o elimina i progetti del portfolio.",
    color: "from-violet-900/40",
  },
  {
    href: "/admin/blog",
    icon: "fa-solid fa-pen-nib",
    title: "Blog",
    description: "Gestisci gli articoli del blog: crea, pubblica o archivia.",
    color: "from-fuchsia-900/40",
  },
  {
    href: "/admin/commenti",
    icon: "fa-solid fa-comments",
    title: "Commenti",
    description: "Approva o elimina i commenti degli utenti.",
    color: "from-sky-900/40",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-antonio text-3xl text-white">Dashboard</h1>
        <p className="font-montserrat text-xs text-zinc-500 mt-1">
          Benvenuto nel pannello di gestione di Future Frames.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}
            className="group rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-900/20 via-[#0d0b2a] to-slate-950/80 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition hover:border-violet-500/35 hover:shadow-[0_8px_30px_rgba(89,28,135,0.2)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-900/40 mb-4">
              <i className={`${card.icon} text-violet-400 text-sm`} />
            </div>
            <h3 className="font-antonio text-lg text-white group-hover:text-violet-200 transition">
              {card.title}
            </h3>
            <p className="font-montserrat text-xs text-zinc-400 mt-1 leading-relaxed">
              {card.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-900/10 via-[#0d0b2a] to-slate-950/80 p-6">
        <h3 className="font-antonio text-lg text-white mb-1">Prossimi step</h3>
        <ul className="space-y-2 font-montserrat text-xs text-zinc-400 mt-3">
          {[
            "Aggiungi il primo progetto portfolio",
            "Scrivi il primo articolo blog",
            "Configura il dominio su Vercel",
            "Invita il cliente come admin su Supabase",
          ].map((step, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-violet-500/50" />
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}