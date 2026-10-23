import { createSupabaseServer } from "@/lib/supabase-server";

export async function POST() {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ ok: false }, { status: 401 });

    try {
        const response = await fetch(`${process.env.FM_SITE_URL}/api/revalidate`, {
            method: "POST",
            headers: { "x-revalidate-secret": process.env.FM_REVALIDATE_SECRET },
        });
        return Response.json({ ok: response.ok }, { status: response.ok ? 200 : 502 });
    } catch {
        return Response.json({ ok: false }, { status: 502 });
    }
}