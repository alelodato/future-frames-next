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

  return (
    <div className="min-h-screen bg-[#02010b] text-white flex">

      {/* ── SIDEBAR ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-60 flex flex-col
        border-r border-violet-500/15 bg-[#05030f]
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="px-5 py-6 border-b border-violet-500/10">
          <p className="font-montserrat text-[0.6rem] uppercase tracking-[0.3em] text-violet-400">
            Future Frames
          </p>
          <p className="font-antonio text-lg text-white mt-0.5">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 font-montserrat text-xs uppercase tracking-[0.15em] transition ${
                  active
                    ? "bg-violet-600/30 border border-violet-500/30 text-violet-200"
                    : "text-zinc-400 hover:bg-violet-900/20 hover:text-zinc-200"
                }`}
              >
                <i className={`${item.icon} text-xs w-4 text-center ${active ? "text-violet-400" : "text-zinc-500"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="px-4 py-4 border-t border-violet-500/10 space-y-3">
          {user && (
            <p className="font-montserrat text-[0.6rem] text-zinc-500 truncate">
              {user.email}
            </p>
          )}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-2 font-montserrat text-xs uppercase tracking-[0.15em] text-zinc-400 hover:bg-red-900/20 hover:text-red-300 transition"
          >
            <i className="fa-solid fa-arrow-right-from-bracket text-xs" />
            Esci
          </button>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-xl px-4 py-2 font-montserrat text-xs uppercase tracking-[0.15em] text-zinc-500 hover:text-zinc-300 transition"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
            Vedi il sito
          </Link>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar mobile */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-4 border-b border-violet-500/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-900/20"
          >
            <i className="fa-solid fa-bars text-violet-300 text-sm" />
          </button>
          <p className="font-antonio text-lg text-white">Admin Panel</p>
        </header>

        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}