BEGIN IF (
  new.surat_cuti = 1 
  AND new.formulir_cuti = 1 
  AND new.berita_acara = 1 
  AND new.id_jenis_cuti = 1
) THEN 
set 
  new.status_verifikasi = 1;
ELSEIF (
  new.surat_cuti = 2 
  OR new.formulir_cuti = 2 
  OR new.berita_acara = 2
) THEN 
set 
  new.status_verifikasi = 2;
ELSEIF (
  new.surat_cuti = 1 
  AND new.formulir_cuti = 1 
  AND new.berita_acara = 1 
  AND new.berkas_cuti = 1 
  AND new.id_jenis_cuti > 1
) THEN 
set 
  new.status_verifikasi = 1;
ELSEIF (
  new.surat_cuti = 1 
  AND new.formulir_cuti = 1 
  AND new.berita_acara = 1 
  AND new.berkas_cuti = 2 
  AND new.id_jenis_cuti > 1
) THEN 
set 
  new.status_verifikasi = 2;
ELSE 
set 
  new.status_verifikasi = 0;
END IF;
END
