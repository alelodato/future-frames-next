import { createSupabaseBrowser } from "@/lib/supabase-browser";

export const FM_SITE_URL = process.env.NEXT_PUBLIC_FM_SITE_URL || "https://www.futurememories.it";

const VALIDITY_DAYS = 10;
const LIST_FIELDS =
    "id, token, couple_names, contact_email, notes, expires_at, status, total, submitted_at, created_at";

function expiryFromNow() {
    return new Date(Date.now() + VALIDITY_DAYS * 24 * 60 * 60 * 1000).toISOString();
}

export function quoteLink(token) {
    return `${FM_SITE_URL}/il-vostro-preventivo/${token}`;
}

// Stato mostrato nel gestionale: "inviato" | "compilato" | "scaduto"
export function quoteStatus(quote) {
    if (quote.status === "compilato") return "compilato";
    return new Date(quote.expires_at) < new Date() ? "scaduto" : "inviato";
}

export function formatDate(value) {
    return new Date(value).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
}

const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });

export function formatEuro(value) {
    return euro.format(value);
}

// Apre WhatsApp con un messaggio già pronto: la cliente sceglie il contatto e può modificarlo prima di inviare.
export function whatsappShareUrl(quote) {
    const text =
        `Ciao ${quote.couple_names}! Ecco il link per comporre il vostro preventivo Future Memories:\n` +
        `${quoteLink(quote.token)}\n\n` +
        `Il link è valido fino al ${formatDate(quote.expires_at)}.`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export async function listQuotes() {
    const supabase = createSupabaseBrowser();
    const { data, error } = await supabase
        .from("fm_quotes")
        .select(LIST_FIELDS)
        .order("created_at", { ascending: false });
    return { data: data || [], error: error?.message };
}

export async function createQuote({ coupleNames, contactEmail, notes }) {
    const supabase = createSupabaseBrowser();
    const { data, error } = await supabase
        .from("fm_quotes")
        .insert({
            couple_names: coupleNames.trim(),
            contact_email: contactEmail.trim() || null,
            notes: notes.trim() || null,
            expires_at: expiryFromNow(),
        })
        .select(LIST_FIELDS)
        .single();
    return { data, error: error?.message };
}

export async function renewQuote(id) {
    const supabase = createSupabaseBrowser();
    const { data, error } = await supabase
        .from("fm_quotes")
        .update({ expires_at: expiryFromNow() })
        .eq("id", id)
        .select(LIST_FIELDS)
        .single();
    return { data, error: error?.message };
}

export async function deleteQuote(id) {
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.from("fm_quotes").delete().eq("id", id);
    return { error: error?.message };
}

export async function getQuote(id) {
    const supabase = createSupabaseBrowser();
    const { data, error } = await supabase.from("fm_quotes").select("*").eq("id", id).single();
    return { data, error: error?.message };
}