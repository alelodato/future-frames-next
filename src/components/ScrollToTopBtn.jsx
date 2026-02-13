"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollTop}
      aria-label="Torna su"
      className={`
        fixed bottom-6 right-6 z-[9999]
        h-12 w-12 rounded-full
        flex items-center justify-center
        backdrop-blur-md
        bg-black/40 border border-violet-300/40
        shadow-[0_0_20px_rgba(160,32,240,0.35)]
        text-violet-200
        transition-all duration-300
        hover:shadow-[0_0_35px_rgba(160,32,240,0.65)]
        hover:border-violet-300/60
        hover:text-white
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}
      `}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
