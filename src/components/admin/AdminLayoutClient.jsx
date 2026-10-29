"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "fa-solid fa-house" },
  { href: "/admin/portfolio", label: "Portfolio", icon: "fa-solid fa-film" },
  { href: "/admin/blog", label: "Blog", icon: "fa-solid fa-pen-nib" },
  { href: "/admin/commenti", label: "Commenti", icon: "fa-solid fa-comments" },
];

const FM_PATH = "/admin/future-memories";
const FM_QUOTES_PATH = "/admin/future-memories/preventivi";
const FM_SITE_URL = process.env.NEXT_PUBLIC_FM_SITE_URL || "https://future-memories-wheat.vercel.app";

const fmNavItems = [
  { href: FM_PATH, label: "Portfolio", icon: "fa-solid fa-film" },
  { href: FM_QUOTES_PATH, label: "Preventivi", icon: "fa-solid fa-file-invoice" },
];

// Classi complete per ciascun tema: niente classi costruite dinamicamente.
const themes = {
  frames: {
    root: "bg-[#02010b] text-white",
    aside: "border-violet-500/15 bg-[#05030f]",
    divider: "border-violet-500/10",
    eyebrow: "text-violet-400",
    title: "font-antonio text-lg text-white",
    email: "text-zinc-500",
    logout: "rounded-xl text-zinc-400 hover:bg-red-900/20 hover:text-red-300",
    viewSite: "rounded-xl text-zinc-500 hover:text-zinc-300",
    overlay: "bg-black/60",
    burger: "rounded-xl border-violet-500/20 bg-violet-900/20 text-violet-300",
  },
  memories: {
    root: "bg-[#EFE6DA] text-[#2A1E16]",
    aside: "border-[#D9C8B2] bg-[#F7F2EA]",
    divider: "border-[#D9C8B2]",
    eyebrow: "text-[#5A4637]",
    title: "text-2xl text-[#2A1E16]",
    email: "text-[#5A4637]",
    logout: "rounded-none text-[#5A4637] hover:bg-red-100 hover:text-red-800",
    viewSite: "rounded-none !text-[#5A4637] hover:!text-[#2A1E16]",
    overlay: "bg-[#2A1E16]/40",
    burger: "rounded-none border-[#D9C8B2] bg-[#F7F2EA] text-[#2A1E16]",
  },
};

const serifStyle = { fontFamily: "var(--font-fm-serif), Georgia, serif" };

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowser();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function handleLogout() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  // Non mostrare il layout nella pagina di login
  if (pathname === "/admin/login") return children;

  const isMemories = pathname.startsWith(FM_PATH);
  const t = isMemories ? themes.memories : themes.frames;
  const closeSidebar = () => setSidebarOpen(false);

  // Nella sezione Future Memories, "Portfolio" è attivo ovunque tranne nei preventivi.
  function isFmActive(href) {
    const inQuotes = pathname.startsWith(FM_QUOTES_PATH);
    return href === FM_QUOTES_PATH ? inQuotes : !inQuotes;
  }

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${t.root}`}>

      {/* ── SIDEBAR ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-60 flex flex-col border-r
        transition-[transform,background-color] duration-300
        ${t.aside}
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Intestazione */}
        <div className={`px-5 py-6 border-b ${t.divider}`}>
          <p className={`font-montserrat text-[0.6rem] uppercase tracking-[0.3em] ${t.eyebrow}`}>
            {isMemories ? "Future Memories" : "Future Frames"}
          </p>
          <p className={`mt-0.5 ${t.title}`} style={isMemories ? serifStyle : undefined}>
            Admin Panel
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {isMemories ? (
            <>
              {fmNavItems.map((item) => {
                const active = isFmActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 border px-4 py-2.5 font-montserrat text-xs uppercase tracking-[0.15em] transition ${active
                        ? "border-[#2A1E16] bg-[#2A1E16] !text-[#F7F2EA]"
                        : "border-transparent !text-[#5A4637] hover:bg-[#E2D4C1] hover:!text-[#2A1E16]"
                      }`}
                  >
                    <i className={`${item.icon} text-xs w-4 text-center ${active ? "text-[#F7F2EA]" : "text-[#5A4637]"}`} />
                    {item.label}
                  </Link>
                );
              })}

              {/* Ritorno a Future Frames */}
              <Link
                href="/admin"
                onClick={closeSidebar}
                className="group !mt-6 block rounded-xl border border-violet-500/30 bg-[#05030f] px-4 py-4 transition hover:border-violet-400/60"
              >
                <p className="flex items-center gap-2 font-montserrat text-[0.6rem] uppercase tracking-[0.3em] text-violet-400">
                  <i className="fa-solid fa-arrow-left text-[0.55rem] transition-transform group-hover:-translate-x-0.5" />
                  Torna a
                </p>
                <p className="mt-1 font-antonio text-lg text-white">Future Frames</p>
              </Link>
            </>
          ) : (
            <>
              {navItems.map((item) => {
                const active = pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 font-montserrat text-xs uppercase tracking-[0.15em] transition ${active
                        ? "bg-violet-600/30 border border-violet-500/30 text-violet-200"
                        : "text-zinc-400 hover:bg-violet-900/20 hover:text-zinc-200"
                      }`}
                  >
                    <i className={`${item.icon} text-xs w-4 text-center ${active ? "text-violet-400" : "text-zinc-500"}`} />
                    {item.label}
                  </Link>
                );
              })}

              {/* Card Future Memories */}
              <Link
                href={FM_PATH}
                onClick={closeSidebar}
                aria-label="Vai a Future Memories"
                className="!mt-5 flex items-center justify-center border border-[#D9C8B2] px-4 py-5 transition hover:border-[#2A1E16] hover:scale-[1.02]"
                style={{ backgroundColor: "#F7F2EA" }}
              >
                <img src="/LogoFutureMemories.png" alt="Future Memories" className="h-20 w-auto" />
              </Link>
            </>
          )}
        </nav>

        {/* User + logout */}
        <div className={`px-4 py-4 border-t space-y-3 ${t.divider}`}>
          {user && (
            <p className={`font-montserrat text-[0.6rem] truncate ${t.email}`}>
              {user.email}
            </p>
          )}
          <button
            onClick={handleLogout}
            className={`flex w-full items-center gap-2 px-4 py-2 font-montserrat text-xs uppercase tracking-[0.15em] transition ${t.logout}`}
          >
            <i className="fa-solid fa-arrow-right-from-bracket text-xs" />
            Esci
          </button>
          <Link
            href={isMemories ? FM_SITE_URL : "/"}
            target="_blank"
            className={`flex items-center gap-2 px-4 py-2 font-montserrat text-xs uppercase tracking-[0.15em] transition ${t.viewSite}`}
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
            Vedi il sito
          </Link>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className={`fixed inset-0 z-30 lg:hidden ${t.overlay}`}
          onClick={closeSidebar}
        />
      )}

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar mobile */}
        <header className={`lg:hidden flex items-center gap-4 px-4 py-4 border-b ${t.divider}`}>
          <button
            onClick={() => setSidebarOpen(true)}
            className={`flex h-9 w-9 items-center justify-center border ${t.burger}`}
          >
            <i className="fa-solid fa-bars text-sm" />
          </button>
          <p className={t.title} style={isMemories ? serifStyle : undefined}>
            {isMemories ? "Future Memories" : "Admin Panel"}
          </p>
        </header>

        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}