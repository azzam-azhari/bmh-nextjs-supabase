import { environment } from '@/configs/environment';
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = environment;

  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Daftar awalan path untuk area admin (wajib login)
  const protectedPathPrefixes = ['/dashboard', '/user-management', '/all-news', '/add-news'];
  const isProtectedPath = protectedPathPrefixes.some((prefix) => path.startsWith(prefix));

  // 1. Jika belum login & akses halaman admin -> Lempar ke Login
  if (!user && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Jika sudah login & akses halaman login -> Lempar ke Dashboard
  if (user && path === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return supabaseResponse;
}

export const config = {
  // Matcher diperbarui: Mengabaikan rute API, Next.js internal, dan SEMUA ekstensi file statis (gambar, dll)
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

export default updateSession;

// Catatan:

// import { environment } from '@/configs/environment';
// import { createServerClient } from '@supabase/ssr';
// import { NextRequest, NextResponse } from 'next/server';

// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({
//     request,
//   });

//   const { SUPABASE_URL, SUPABASE_ANON_KEY } = environment;

//   const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
//     cookies: {
//       getAll() {
//         return request.cookies.getAll();
//       },
//       setAll(cookiesToSet) {
//         cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
//         supabaseResponse = NextResponse.next({ request });
//         cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
//       },
//     },
//   });

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user && request.nextUrl.pathname !== '/login') {
//     const url = request.nextUrl.clone();
//     url.pathname = '/login';
//     return NextResponse.redirect(url);
//   }

//   if (user && request.nextUrl.pathname === '/login') {
//     const url = request.nextUrl.clone();
//     url.pathname = '/dashboard';
//     return NextResponse.redirect(url);
//   }

//   return supabaseResponse;
// }
