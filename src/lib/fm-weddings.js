import { createSupabaseBrowser } from "@/lib/supabase-browser";

const BUCKET = "media";
const FOLDER = "future-memories/";
const MARKER = `/object/public/${BUCKET}/`;

// Dall'URL pubblico al percorso nel bucket, solo per i file di Future Memories.
function pathFromUrl(url) {
    if (!url) return null;
    const index = url.indexOf(MARKER);
    if (index === -1) return null;
    const path = decodeURIComponent(url.slice(index + MARKER.length));
    return path.startsWith(FOLDER) ? path : null;
}

async function removeFiles(supabase, urls) {
    const paths = urls.map(pathFromUrl).filter(Boolean);
    if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
}

function describeError(error) {
    if (error.code === "23505") {
        return "Esiste già un matrimonio con lo stesso indirizzo (stessi nomi e stesso anno). Distingui i nomi, ad esempio aggiungendo un cognome.";
    }
    return error.message;
}

// Avvisa il sito Future Memories di aggiornare il portfolio. Non blocca mai il salvataggio.
export async function notifySite() {
    try {
        const response = await fetch("/api/fm-revalidate", {
            method: "POST",
            signal: AbortSignal.timeout(8000),
        });
        return response.ok;
    } catch {
        return false;
    }
}

export async function saveWedding(payload, id = null) {
    const supabase = createSupabaseBrowser();
    const { _photos, ...fields } = payload;
    let weddingId = id;
    let oldPhotoIds = [];
    let oldUrls = [];

    if (id) {
        const { data: old } = await supabase
            .from("fm_weddings")
            .select("cover_url, teaser_url, fm_wedding_photos(id, url)")
            .eq("id", id)
            .single();
        if (old) {
            oldPhotoIds = old.fm_wedding_photos.map((photo) => photo.id);
            oldUrls = [old.cover_url, old.teaser_url, ...old.fm_wedding_photos.map((photo) => photo.url)].filter(Boolean);
        }

        const { error } = await supabase.from("fm_weddings").update(fields).eq("id", id);
        if (error) return { error: describeError(error) };
    } else {
        const { data, error } = await supabase.from("fm_weddings").insert(fields).select("id").single();
        if (error) return { error: describeError(error) };
        weddingId = data.id;
    }

    // Prima inserisce la nuova galleria, poi elimina la vecchia: se qualcosa va storto non si perde nulla.
    if (_photos.length) {
        const { error } = await supabase
            .from("fm_wedding_photos")
            .insert(_photos.map((photo) => ({ ...photo, wedding_id: weddingId })));
        if (error) return { error: describeError(error), id: weddingId };
    }

    if (oldPhotoIds.length) {
        await supabase.from("fm_wedding_photos").delete().in("id", oldPhotoIds);
    }

    // Elimina dallo storage i file che non sono più usati.
    const currentUrls = new Set([fields.cover_url, fields.teaser_url, ..._photos.map((photo) => photo.url)]);
    await removeFiles(supabase, oldUrls.filter((url) => !currentUrls.has(url)));

    const siteUpdated = await notifySite();
    return { id: weddingId, siteUpdated };
}

export async function deleteWedding(id) {
    const supabase = createSupabaseBrowser();
    const { data: old } = await supabase
        .from("fm_weddings")
        .select("cover_url, teaser_url, fm_wedding_photos(url)")
        .eq("id", id)
        .single();

    const { error } = await supabase.from("fm_weddings").delete().eq("id", id);
    if (error) return { error: describeError(error) };

    if (old) {
        await removeFiles(supabase, [old.cover_url, old.teaser_url, ...old.fm_wedding_photos.map((photo) => photo.url)]);
    }

    const siteUpdated = await notifySite();
    return { siteUpdated };
}