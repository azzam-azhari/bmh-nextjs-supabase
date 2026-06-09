import { environment } from '@/configs/environment';
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

// Fungsi utama middleware untuk mengelola sesi Supabase
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = environment;

  // Inisialisasi klien Supabase Server-Side untuk SSR
  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      // Ambil semua cookie dari request
      getAll() {
        return request.cookies.getAll();
      },
      // Set cookie ke response
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value)); // Update internal request cookies jika diperlukan (meskipun Next.js biasanya tidak perlu)
        supabaseResponse = NextResponse.next({ request }); // Buat ulang response untuk memastikan cookie terbaru
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  // Dapatkan informasi pengguna saat ini dari sesi Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Daftar path yang dapat diakses tanpa login (area publik)
  const publicPaths = ['/', '/tentang-kami', '/berita', '/artikel']; // Tambahkan path publik lainnya di sini jika perlu
  // Daftar awalan path untuk area yang memerlukan login (area admin)
  const protectedPathPrefixes = ['/dashboard', '/manajemen-berita', '/manajemen-artikel']; // Area admin

  // Cek apakah path saat ini berada dalam area yang dilindungi
  const isProtectedPath = protectedPathPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix));

  // Cek apakah path saat ini adalah path publik
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // Jika pengguna BELUM login dan mencoba mengakses area yang dilindungi
  if (!user && isProtectedPath) {
    // Redirect ke halaman login
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Jika pengguna SUDAH login dan mencoba mengakses halaman login
  if (user && request.nextUrl.pathname === '/login') {
    // Redirect ke dashboard
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Jika tidak ada aturan redirect yang cocok, kembalikan response asli dengan sesi yang sudah diperbarui
  return supabaseResponse;
}

// Konfigurasi matcher untuk menentukan path mana yang akan diproses oleh middleware ini
export const config = {
  matcher: [
    /*
     * Jalankan middleware pada semua path kecuali file statis dan API routes.
     * Sesuaikan dengan kebutuhan Anda.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// Ekspor fungsi utama middleware agar digunakan secara otomatis oleh Next.js
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
