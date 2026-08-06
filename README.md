# Project Web Publikasi dan Dashboard Admin

Aplikasi web berbasis Next.js App Router untuk halaman publik, autentikasi, dan dashboard admin. Project ini menggunakan Supabase sebagai backend untuk auth, database PostgreSQL, storage, session, dan realtime profile update.

README ini bersifat generik agar project dapat digunakan untuk kebutuhan web profil, publikasi konten, dan pengelolaan data tanpa bergantung pada nama organisasi tertentu.

## Tech Stack

- Next.js 16.2.7
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- Shadcn UI, Radix UI, Lucide React, Hugeicons
- Supabase SSR dan Supabase JS
- TanStack React Query
- TanStack Table
- Zustand
- React Hook Form dan Zod
- Recharts
- MapLibre GL
- Sonner

## Fitur Utama

Area publik:
- Landing page di `/`
- Halaman berita di `/news`
- Navbar, footer, hero section, FAQ, preview berita, peta, dan language switcher
- Metadata dan Open Graph untuk kebutuhan SEO

Area admin:
- Login di `/login`
- Dashboard di `/dashboard`
- Manajemen berita di `/all-news`
- Tambah berita di `/add-news`
- Manajemen kategori di `/categories`
- Manajemen pengguna di `/user-management`
- Permission page di `/permissions`
- Upload gambar berita dan avatar user ke Supabase Storage

## Struktur Project

```text
.
|-- docs/
|-- note/
|-- public/
|   |-- flag/
|   `-- logo/
|-- src/
|   |-- actions/
|   |-- app/
|   |   |-- (admin)/
|   |   |-- (auth)/
|   |   |-- (public)/
|   |   |-- _components/
|   |   `-- api/
|   |-- components/
|   |   |-- common/
|   |   `-- ui/
|   |-- configs/
|   |-- constants/
|   |-- hooks/
|   |-- lib/
|   |   `-- supabase/
|   |-- migrations/
|   |-- providers/
|   |-- stores/
|   |-- types/
|   |-- validations/
|   `-- proxy.ts
|-- env.example
|-- next.config.ts
|-- package.json
`-- tsconfig.json
```

Folder penting:
- `src/app`: route utama Next.js App Router.
- `src/app/(public)`: route group halaman publik.
- `src/app/(auth)`: route group autentikasi.
- `src/app/(admin)`: route group dashboard admin.
- `src/actions`: Server Actions global.
- `src/components/ui`: komponen UI dasar.
- `src/components/common`: komponen reusable domain aplikasi.
- `src/lib/supabase`: Supabase client, server client, dan session middleware.
- `src/migrations`: SQL schema dan trigger Supabase.
- `src/validations`: schema validasi Zod.
- `src/proxy.ts`: proteksi route admin dan sinkronisasi session.

## Environment Variables

Buat `.env.local` di root project. Contoh variable tersedia di `env.example`.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
ALIBABA_ACCESS_KEY_ID=
ALIBABA_ACCESS_KEY_SECRET=
```

Keterangan:
- `NEXT_PUBLIC_SUPABASE_URL`: URL project Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon key Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: service role key untuk operasi admin server-side.
- `NEXT_PUBLIC_SITE_URL`: base URL metadata. Jika kosong, fallback ke `http://localhost:3000`.
- `ALIBABA_ACCESS_KEY_ID` dan `ALIBABA_ACCESS_KEY_SECRET`: variable integrasi eksternal jika fitur bahasa/terjemahan digunakan.

Jangan commit `.env.local`. Jangan expose `SUPABASE_SERVICE_ROLE_KEY` ke client.

## Menjalankan Project di Local

1. Install dependency:

```bash
npm install
```

2. Buat `.env.local` dari `env.example`, lalu isi variable yang dibutuhkan.

3. Jalankan migration SQL di Supabase sesuai urutan:

```text
src/migrations/01-auth-profiles.sql
src/migrations/02-kategori.sql
src/migrations/03-berita.sql
```

4. Buat bucket Supabase Storage:

```text
images
```

5. Jalankan development server:

```bash
npm run dev
```

6. Buka aplikasi:

```text
http://localhost:3000
```

## Script

- `npm run dev`: menjalankan development server.
- `npm run build`: membuat production build.
- `npm run start`: menjalankan production server dari hasil build.
- `npm run lint`: menjalankan ESLint.

## Route Utama

- `/`: landing page publik.
- `/news`: daftar berita publik.
- `/login`: login admin.
- `/dashboard`: dashboard admin.
- `/all-news`: manajemen berita utama.
- `/add-news`: tambah berita.
- `/categories`: manajemen kategori.
- `/user-management`: manajemen pengguna.
- `/permissions`: permission page.
- `/api/test-db`: health check sederhana dengan response `OK`.

## Auth dan Hak Akses

Autentikasi memakai Supabase Auth. Setelah login sukses, data profile disimpan ke cookie `user_profile`.

Route admin yang dilindungi oleh `src/proxy.ts`:
- `/dashboard`
- `/user-management`
- `/permissions`
- `/all-news`
- `/add-news`
- `/categories`

Role yang tersedia di kode:
- `admin`
- `publikasi`
- `writer`
- `riset`
- `seklem`
- `user`

Proteksi route saat ini berbasis status login. Jika aplikasi membutuhkan pembatasan per role, tambahkan guard pada route, menu, dan Server Action terkait.

## Database

Database utama menggunakan Supabase PostgreSQL.

Tabel utama:
- `profiles`: profile user, role, avatar, dan timestamp.
- `kategori`: kategori konten, slug, dan jumlah konten published.
- `berita`: konten berita, slug, gambar, kategori, penulis, tags, status, dan tanggal publish.

Status berita:
- `draft`
- `published`
- `archived`

Migration juga berisi trigger untuk:
- Auto-create profile saat user dibuat.
- Auto-delete profile saat user auth dihapus.
- Generate slug berita.
- Sync nama penulis.
- Update jumlah berita per kategori.

## Supabase Storage

Bucket yang digunakan:
- `images`

Path upload:
- `users/`: avatar user.
- `berita/`: gambar berita.

Upload dan delete file ditangani oleh `src/actions/storage-action.ts`.

## Deployment

Project dapat dideploy ke Vercel atau server Node.js yang mendukung Next.js.

Checklist:
- Isi semua environment variable production.
- Jalankan migration database pada Supabase production.
- Buat bucket storage `images`.
- Sesuaikan policy database dan storage.
- Sesuaikan `images.remotePatterns` di `next.config.ts` dengan domain Supabase Storage production.
- Pastikan `SUPABASE_SERVICE_ROLE_KEY` hanya tersedia di server environment.
- Jalankan build sebelum deploy:

```bash
npm run build
```

Untuk server Node.js:

```bash
npm run build
npm run start
```

## Troubleshooting

Gagal login:
- Periksa `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Pastikan user tersedia di Supabase Auth.
- Pastikan tabel `profiles` memiliki data user.
- Periksa cookie dan redirect di `src/proxy.ts`.

Upload gagal:
- Pastikan bucket `images` tersedia.
- Periksa policy Supabase Storage.
- Pastikan ukuran file tidak melebihi limit Server Actions.

Gambar tidak tampil:
- Pastikan URL storage benar.
- Pastikan bucket public atau gunakan signed URL.
- Pastikan domain storage sudah diizinkan di `next.config.ts`.

Data tidak tampil:
- Periksa Row Level Security pada tabel Supabase.
- Pastikan migration sudah dijalankan.
- Periksa query Supabase pada komponen terkait.

Build gagal:
- Jalankan `npm run lint`.
- Periksa error TypeScript.
- Pastikan environment variable yang dibutuhkan tersedia.

## Dokumentasi Tambahan

Dokumentasi project yang lebih lengkap tersedia di:

```text
note/documentation.md
```

Catatan: folder `note/` saat ini di-ignore oleh Git.
