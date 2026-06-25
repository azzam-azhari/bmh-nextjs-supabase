-- 06. Trigger untuk sinkronisasi perubahan nama profil ke tabel berita

-- Buat fungsi untuk mengupdate tabel berita saat profile berubah
CREATE OR REPLACE FUNCTION handle_profile_name_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Cek jika nama benar-benar berubah
  IF OLD.name IS DISTINCT FROM NEW.name THEN
    -- Update semua berita yang ditulis oleh user ini
    UPDATE berita
    SET penulis_nama = NEW.name
    WHERE penulis_id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Pasang trigger pada tabel profiles
DROP TRIGGER IF EXISTS trg_profile_name_update ON profiles;
CREATE TRIGGER trg_profile_name_update
AFTER UPDATE OF name ON profiles
FOR EACH ROW EXECUTE FUNCTION handle_profile_name_update();
