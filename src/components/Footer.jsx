import Link from "next/link";
import GlowLine from "./GlowLine";

export default function Footer() {
  return (
    <footer className="bg-black">
      <GlowLine />
      <div className="max-w-7xl mx-auto px-5 py-10 md:py-12">
        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-10">
          {/* Logo + claim */}
          <div className="space-y-3 max-w-sm">
            <Link href="/">
              <img src="/images/logo-gradient.png" alt="Future Frames Logo" className="h-20 w-auto py-4" />
            </Link>
            <p className="font-montserrat text-xs text-zinc-300 leading-relaxed">
              Agenzia creativa specializzata in{" "}
              <span className="text-violet-300">fotografia</span> e{" "}
              <span className="text-violet-300">videomaking</span>.
            </p>
            <p className="font-montserrat text-[0.6rem] text-zinc-600">
              P. IVA: —
            </p>
          </div>

          {/* Link rapidi */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            <div className="space-y-3">
              <h4 className="font-orbitron tracking-[0.18em] text-zinc-200 uppercase">
                Navigazione
              </h4>
              <nav className="flex flex-col gap-1.5 font-montserrat text-zinc-300">
                <Link href="/about" className="hover:text-violet-300 transition-colors">About</Link>
                <Link href="/servizi" className="hover:text-violet-300 transition-colors">Servizi</Link>
                <Link href="/portfolio" className="hover:text-violet-300 transition-colors">Portfolio</Link>
                <Link href="/blog" className="hover:text-violet-300 transition-colors">Blog</Link>
                <Link href="/contact" className="hover:text-violet-300 transition-colors">Contattaci</Link>
              </nav>
            </div>

            <div className="space-y-3">
              <h4 className="font-orbitron tracking-[0.18em] text-zinc-200 uppercase">
                Contatti
              </h4>
              <div className="font-montserrat text-zinc-300 space-y-1.5">
                <p>Pomezia · RM</p>
                <a href="mailto:futureframes.info@gmail.com"
                  className="hover:text-violet-300 transition-colors block">
                  futureframes.info@gmail.com
                </a>
                <a href="tel:+390000000000"
                  className="hover:text-violet-300 transition-colors block">
                  +39 393 139 5785
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-orbitron tracking-[0.18em] text-zinc-200 uppercase">
                Social
              </h4>
              <div className="flex flex-wrap gap-2 font-montserrat text-zinc-300">
                <a href="#"
                  className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/40 px-3 py-1 hover:bg-violet-500/10 text-[11px] transition">
                  <i className="fa-brands fa-instagram text-violet-300" />
                  Instagram
                </a>
                <a href="#"
                  className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/40 px-3 py-1 hover:bg-violet-500/10 text-[11px] transition">
                  Linkedin
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-zinc-800/70 pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="font-montserrat text-[11px] text-zinc-500">
              © {new Date().getFullYear()} Future Frames. Tutti i diritti riservati.
            </p>
            <span className="hidden sm:inline text-zinc-700">·</span>
            <Link href="/privacy"
              className="font-montserrat text-[11px] text-zinc-500 hover:text-violet-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-zinc-700">·</span>
            <Link href="/cookie"
              className="font-montserrat text-[11px] text-zinc-500 hover:text-violet-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
          <p className="font-montserrat text-[11px] text-zinc-500">
            Sito Web By <span className="text-violet-300">Alessio Lodato</span>
          </p>
        </div>
      </div>
    </footer>
  );
}