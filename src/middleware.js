import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // Proteggi solo le route admin
  if (!pathname.startsWith("/admin")) return response;

  // Permetti sempre la pagina di login
  if (pathname === "/admin/login") return response;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => response.cookies.set(name, value, options),
        remove: (name, options) => response.cookies.delete(name, options),
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // Non autenticato → redirect al login
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};