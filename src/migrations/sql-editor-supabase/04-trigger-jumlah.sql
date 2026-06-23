-- 04. Trigger Jumlah Kategori

CREATE OR REPLACE FUNCTION update_jumlah_kategori()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.kategori_id IS NOT NULL AND NEW.status = 'published' THEN
      UPDATE kategori SET jumlah = jumlah + 1 WHERE id = NEW.kategori_id;
    END IF;

  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.kategori_id IS NOT NULL AND OLD.status = 'published' THEN
      UPDATE kategori SET jumlah = jumlah - 1 WHERE id = OLD.kategori_id;
    END IF;

  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'published' AND NEW.status = 'published' AND NEW.kategori_id IS NOT NULL THEN
      UPDATE kategori SET jumlah = jumlah + 1 WHERE id = NEW.kategori_id;

    ELSIF OLD.status = 'published' AND NEW.status != 'published' AND OLD.kategori_id IS NOT NULL THEN
      UPDATE kategori SET jumlah = jumlah - 1 WHERE id = OLD.kategori_id;

    ELSIF OLD.status = 'published' AND NEW.status = 'published'
      AND OLD.kategori_id IS DISTINCT FROM NEW.kategori_id THEN
      IF OLD.kategori_id IS NOT NULL THEN
        UPDATE kategori SET jumlah = jumlah - 1 WHERE id = OLD.kategori_id;
      END IF;
      IF NEW.kategori_id IS NOT NULL THEN
        UPDATE kategori SET jumlah = jumlah + 1 WHERE id = NEW.kategori_id;
      END IF;
    END IF;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$;

-- DROP dulu baru CREATE
DROP TRIGGER IF EXISTS trg_jumlah_kategori ON berita;
CREATE TRIGGER trg_jumlah_kategori
AFTER INSERT OR DELETE OR UPDATE OF kategori_id, status
ON berita
FOR EACH ROW
EXECUTE FUNCTION update_jumlah_kategori();