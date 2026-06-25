-- 07. 

UPDATE berita b
SET penulis_nama = p.name
FROM profiles p
WHERE b.penulis_id = p.id;
