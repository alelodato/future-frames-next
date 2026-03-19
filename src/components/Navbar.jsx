"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/about", label: "ABOUT" },
  { href: "/servizi", label: "SERVIZI" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/blog", label: "BLOG" },
  { href: "/contact", label: "CONTATTACI" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isContact = pathname === "/contact";
  const isHome = pathname === "/";
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    if (isHome) {
      const timer = setTimeout(() => setNavReady(true), 5000);
      return () => clearTimeout(timer);
    } else {
      setNavReady(true);
    }
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setScrolled(window.scrollY > 8);
  }, [pathname]);

  const close = () => setOpen(false);

  const isVisible = isContact || scrolled;

  return (
    <>
      <header
        className={`
  fixed top-0 left-0 w-full z-[100]
  transition-all duration-500
  ${isContact
            ? "backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            : scrolled
              ? "backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
              : "bg-transparent"
          }
  ${(!isHome || navReady) ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
`}
        style={scrolled || isContact ? {
          background: "linear-gradient(to right, rgba(5,2,15,0.95) 0%, rgba(30,5,60,0.95) 40%, rgba(50, 6, 64, 0.925) 70%, rgba(100,5,60,0.92) 100%)"
        } : {}}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[72px] px-6 md:px-10 lg:px-16">

          {/* Logo */}
          <Link href="/" onClick={close} className="flex-shrink-0 z-10 my-6 group">
            <img
              src="/images/logo-gradient.png"
              alt="Future Frames"
              className="h-12 sm:h-14 md:h-15 w-auto transition-all duration-300
      drop-shadow-[0_0_8px_rgba(167,139,250,0.4)]
      group-hover:drop-shadow-[0_0_16px_rgba(167,139,250,0.9)]
      group-hover:brightness-110"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-10">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`
        relative font-montserrat font-semibold text-sm lg:text-md tracking-widest
        transition-all duration-300 group
        ${pathname === l.href
                    ? "text-violet-400"
                    : "text-white hover:text-violet-300"
                  }
      `}
              >
                {/* Glow neon dietro il testo all'hover */}
                <span
                  className={`
          absolute inset-0 rounded-sm blur-md transition-opacity duration-300
          bg-violet-500/30
          ${pathname === l.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
                />

                {/* Testo con neon glow */}
                <span
                  className={`
          relative transition-all duration-300
          ${pathname === l.href
                      ? "[text-shadow:0_0_8px_rgba(167,139,250,0.9),0_0_20px_rgba(167,139,250,0.6),0_0_40px_rgba(167,139,250,0.3)]"
                      : "group-hover:[text-shadow:0_0_8px_rgba(167,139,250,0.9),0_0_20px_rgba(167,139,250,0.6),0_0_40px_rgba(167,139,250,0.3)]"
                    }
        `}
                >
                  {l.label}
                </span>

                {/* Underline attivo */}
                {pathname === l.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/30 bg-violet-900/20 transition hover:bg-violet-900/40 z-10"
            aria-label="Menu"
          >
            <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"} text-white text-sm transition-all duration-300`} />
          </button>
        </div>
      </header>

      {/* Mobile menu fullscreen */}
      <div
        className={`
          fixed inset-0 z-[99] flex flex-col bg-[#02010b]
          transition-all duration-500
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Glow */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 right-0 h-64 w-64 rounded-full bg-fuchsia-600/10 blur-3xl" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 h-[72px] flex-shrink-0">
          <Link href="/" onClick={close}>
            <img src="/images/logo-viola.png" alt="Future Frames" className="h-10 w-auto" />
          </Link>
          <button onClick={close}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/30 bg-violet-900/20 transition hover:bg-violet-900/40">
            <i className="fa-solid fa-xmark text-white text-sm" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col justify-center flex-1 px-8 gap-1">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className={`
                group flex items-center justify-between py-5
                border-b border-violet-500/10
                transition-all duration-300
                ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
              `}
              style={{ transitionDelay: open ? `${i * 80 + 100}ms` : "0ms" }}
            >
              <div className="flex items-center gap-4">
                <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] text-violet-500/50 w-5">
                  0{i + 1}
                </span>
                <span className={`font-antonio text-4xl transition-colors duration-300 ${pathname === l.href ? "text-violet-300" : "text-white group-hover:text-violet-200"}`}>
                  {l.label}
                </span>
              </div>
              <i className={`fa-solid fa-arrow-right text-sm transition-all duration-300 ${pathname === l.href ? "text-violet-400 opacity-100" : "text-zinc-600 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`} />
            </Link>
          ))}
        </div>

        {/* Footer menu */}
        <div className="px-8 pb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-violet-500/30" />
            <span className="font-montserrat text-[0.55rem] uppercase tracking-[0.3em] text-zinc-600">
              Future Frames
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/futureframes" target="_blank" rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/25 bg-violet-900/15 text-zinc-400 transition hover:text-violet-300 hover:border-violet-400/40">
              <i className="fa-brands fa-instagram text-sm" />
            </a>
            <a href="https://www.vimeo.com" target="_blank" rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/25 bg-violet-900/15 text-zinc-400 transition hover:text-violet-300 hover:border-violet-400/40">
              <i className="fa-brands fa-vimeo-v text-sm" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}