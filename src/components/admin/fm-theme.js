// Stili condivisi della sezione Future Memories del gestionale.
// Il "!" sui colori serve a vincere sulle regole globali dei link in globals.css.
export const fmSerif = { fontFamily: "var(--font-fm-serif), Georgia, serif" };

export const fmCard = "space-y-4 border border-[#D9C8B2] bg-[#F7F2EA] p-5 sm:p-6";

export const fmLabel =
    "font-montserrat text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#5A4637]";

export const fmInput =
    "w-full border border-[#D9C8B2] bg-white/70 px-4 py-2.5 font-montserrat text-sm text-[#2A1E16] placeholder:text-[#5A4637]/50 outline-none transition focus:border-[#2A1E16]";

export const fmUpload =
    "flex items-center gap-3 cursor-pointer border border-dashed border-[#D9C8B2] bg-[#EFE6DA]/60 px-4 py-3 transition hover:border-[#5A4637]";

export const fmButton =
    "inline-flex items-center justify-center gap-2 border border-[#2A1E16] bg-[#2A1E16] px-6 py-3 font-montserrat text-xs font-semibold uppercase tracking-[0.2em] !text-[#F7F2EA] transition hover:border-[#5A4637] hover:bg-[#5A4637] hover:!text-[#F7F2EA] disabled:cursor-not-allowed disabled:opacity-50";

export const fmBackLink =
    "font-montserrat text-[0.65rem] font-semibold uppercase tracking-[0.2em] !text-[#5A4637] transition hover:!text-[#2A1E16]";

export const fmNotice = {
    ok: "border-[#D9C8B2] bg-[#F7F2EA] text-[#2A1E16]",
    warning: "border-amber-300 bg-amber-50 text-amber-900",
    error: "border-red-300 bg-red-50 text-red-800",
};