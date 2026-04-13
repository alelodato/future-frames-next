"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BlogComingSoon() {
    const contentRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", delay: 0.3 }
        );
    }, []);

    return (
        <div
            className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
            style={{ background: "radial-gradient(ellipse at center, #000000 0%, #000000 8%, #1a0533 30%, #3d0b2d 50%, #1a0533 70%, #000000 88%, #000000 100%)" }}
        >
            {/* Glow sfondo */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-violet-700/25 blur-3xl" />
            <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-fuchsia-600/10 blur-3xl" />

            {/* Griglia decorativa */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

            <div ref={contentRef} className="relative z-10 text-center px-6 max-w-2xl mx-auto space-y-8">

                {/* Label */}
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-10 bg-violet-500/60" />
                    <span className="font-montserrat text-[0.6rem] uppercase tracking-[0.5em] text-violet-400">
                        Future Frames
                    </span>
                    <div className="h-px w-10 bg-violet-500/60" />
                </div>

                {/* Titolo */}
                <div className="space-y-2">
                    <h1 className="font-antonio text-6xl md:text-8xl text-white leading-none">
                        BLOG
                    </h1>
                    <h2 className="font-antonio text-3xl md:text-4xl text-violet-300 leading-tight">
                        Coming Soon.
                    </h2>
                </div>

                {/* Separatore */}
                <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

                {/* Testo */}
                <p className="font-montserrat text-md leading-relaxed text-zinc-300 max-w-xl mx-auto">
                    Stiamo preparando storie, consigli e dietro le quinte dei nostri progetti.
                    <br />
                    Torna presto, ne varrà la pena!
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-6 py-3 font-montserrat text-xs uppercase tracking-[0.2em] text-white transition">
                        Torna alla home
                        <i className="fa-solid fa-arrow-right text-[0.6rem]" />
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 px-6 py-3 font-montserrat text-xs uppercase tracking-[0.2em] text-violet-300 transition hover:bg-violet-900/30 hover:border-violet-400/70">
                        Contattaci
                    </Link>
                </div>

            </div>
        </div>
    );
}