"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/about", label: "ABOUT" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/servizi", label: "SERVIZI" },
  { href: "/blog", label: "BLOG" },
  { href: "/contact", label: "CONTATTACI" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = () => setOpen(false);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-[100] transition-all duration-300
        ${scrolled
          ? "bg-[rgba(5,5,10,0.9)] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          : "bg-gradient-to-b from-[rgba(0,0,0,0.45)] to-[rgba(0,0,0,0)]"
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[72px] px-5">
        {/* Logo */}
        <Link
          href="/"
          onClick={close}
          className="
            font-orbitron font-bold tracking-[2.5px] text-[#A020F0]
            drop-shadow-[0_0_12px_rgba(160,32,240,0.8)]
          "
        >
          <img src="/images/logo-viola.png" alt="Future Frames Logo" className="h-20 w-auto py-4" />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className="
                font-orbitron font-semibold tracking-wide text-white text-sm
                transition duration-200
                drop-shadow-[0_0_10px_rgba(160,32,240,0.55)]
                hover:opacity-90 hover:drop-shadow-[0_0_16px_rgba(160,32,240,0.7)]
              "
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-11 h-11 flex flex-col justify-center items-center gap-[6px]"
          aria-label="Menu"
        >
          <span className="w-6 h-[2px] bg-white shadow-[0_0_8px_rgba(160,32,240,0.7)]"></span>
          <span className="w-6 h-[2px] bg-white shadow-[0_0_8px_rgba(160,32,240,0.7)]"></span>
          <span className="w-6 h-[2px] bg-white shadow-[0_0_8px_rgba(160,32,240,0.7)]"></span>
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 bg-[rgba(0,0,0,0.45)] z-[98]"
        />
      )}

      {/* Mobile Menu */}
      <nav
        className={`
          fixed top-[72px] left-0 right-0 z-[99]
          flex flex-col gap-3 px-5 py-4
          bg-[rgba(10,10,20,0.92)]
          border-b border-[rgba(160,32,240,0.35)]
          shadow-[0_14px_36px_rgba(0,0,0,0.45)]
          transition-all duration-300
          ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
        `}
      >
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={close}
            className="
              text-white font-orbitron tracking-wide py-2 rounded-lg
              drop-shadow-[0_0_10px_rgba(160,32,240,0.55)]
              hover:bg-[rgba(160,32,240,0.12)] transition
            "
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
