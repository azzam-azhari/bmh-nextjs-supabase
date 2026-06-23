-- 05. Tambah kolom penulis_nama + update trigger function

-- 1. Tambah kolom penulis_nama ke tabel berita
ALTER TABLE berita
  ADD COLUMN IF NOT EXISTS penulis_nama TEXT;

-- 2. Replace function trigger (nama function & trigger SAMA seperti sebelumnya,
--    jadi tidak perlu DROP TRIGGER — CREATE OR REPLACE FUNCTION otomatis berlaku
--    untuk trigger yang sudah ada karena dia memanggil function ini by name)
CREATE OR REPLACE FUNCTION handle_berita_before_save()
RETURNS TRIGGER AS $$
DECLARE
  base_slug  TEXT;
  final_slug TEXT;
  counter    INTEGER := 1;
BEGIN
  -- ✅ Auto-fill penulis_id dari user yang login
  IF NEW.penulis_id IS NULL THEN
    NEW.penulis_id := auth.uid();
  END IF;

  -- ✅ Auto-fill penulis_nama dari profiles berdasarkan penulis_id
  IF NEW.penulis_nama IS NULL OR NEW.penulis_nama = '' THEN
    SELECT name INTO NEW.penulis_nama
    FROM profiles
    WHERE id = NEW.penulis_id;
  END IF;

  -- Auto-generate slug unik dari judul
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    base_slug  := generate_slug(NEW.judul);
    final_slug := base_slug;

    WHILE EXISTS (
      SELECT 1 FROM berita
      WHERE slug = final_slug
        AND id IS DISTINCT FROM NEW.id
    ) LOOP
      final_slug := base_slug || '-' || counter;
      counter    := counter + 1;
    END LOOP;

    NEW.slug := final_slug;
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;