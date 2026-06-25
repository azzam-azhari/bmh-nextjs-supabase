  -- ============================================================
  -- TAB 1: auth-profiles
  -- Jalankan PERTAMA
  -- ============================================================

  -- 1. Tabel profiles
  CREATE TABLE IF NOT EXISTS public.profiles (
    id         UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    name       TEXT,
    role       TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    PRIMARY KEY (id)
  );

  ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

  -- 2. Auto-insert profile saat user baru register
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER SET search_path = ''
  AS $$
  BEGIN
    INSERT INTO public.profiles (id, name, role, avatar_url)
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data ->> 'name',
      NEW.raw_user_meta_data ->> 'role',
      NEW.raw_user_meta_data ->> 'avatar_url'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
  END;
  $$;

  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

  -- 3. Auto-delete profile saat user dihapus
  CREATE OR REPLACE FUNCTION public.handle_delete_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER SET search_path = ''
  AS $$
  BEGIN
    DELETE FROM public.profiles WHERE id = OLD.id;
    RETURN OLD;
  END;
  $$;

  DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
  CREATE TRIGGER on_auth_user_deleted
    AFTER DELETE ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_delete_user();