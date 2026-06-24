-- ========================================================================
-- 📄 BERKAS: 01_profiles.sql
-- Deskripsi: Modul 01 - Akun Pengguna & Sinkronisasi Supabase Auth
-- Urutan Eksekusi: Pertama (1)
-- ========================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  role TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ⚡ Otomasi 1.1: Otomatis buat baris baru di tabel profiles saat user registrasi
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'name', NEW.raw_user_meta_data ->> 'role', NEW.raw_user_meta_data ->> 'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ⚡ Otomasi 1.2: Otomatis hapus baris di tabel profiles saat user dihapus dari auth
CREATE OR REPLACE FUNCTION public.handle_delete_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  DELETE FROM public.profiles WHERE id = OLD.id;
  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted AFTER DELETE ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_delete_user();