"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const scrollToTop = () => {
      try {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
      } catch (e) {}
    };

    // Check for hash in the URL
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start", behavior: "auto" });
        setTimeout(() => {
          const el2 = document.getElementById(id);
          if (el2) el2.scrollIntoView({ block: "start", behavior: "smooth" });
        }, 60);
        return;
      }
      scrollToTop();
      return;
    }

    scrollToTop();

    const t = setTimeout(scrollToTop, 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
