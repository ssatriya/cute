
-- Pasang di verifikasi berkas untuk trigger status verifikasi berkas
BEGIN IF (
  new.suratCuti = 1 
  AND new.formulirCuti = 1 
  AND new.beritaAcara = 1 
  AND new.idJenisCuti = 1
) THEN 
set 
  new.statusVerifikasi = 'diterima';
ELSEIF (
  new.suratCuti = 2 
  OR new.formulirCuti = 2 
  OR new.beritaAcara = 2
) THEN 
set 
  new.statusVerifikasi = 'proses';
ELSEIF (
  new.suratCuti = 1 
  AND new.formulirCuti = 1 
  AND new.beritaAcara = 1 
  AND new.berkasCuti = 1 
  AND new.idJenisCuti > 1
) THEN 
set 
  new.statusVerifikasi = 'diterima';
ELSEIF (
  new.suratCuti = 1 
  AND new.formulirCuti = 1 
  AND new.beritaAcara = 1 
  AND new.berkasCuti = 2 
  AND new.idJenisCuti > 1
) THEN 
set 
  new.statusVerifikasi = 'proses';
ELSE 
set 
  new.statusVerifikasi = 'ditolak';
END IF;
END



-- pasang di verifikasi berkas untuk trigger status akhir di tabel cuti
BEGIN
	IF NEW.statusVerifikasi = 'ditolak' THEN
		UPDATE cuti
		SET cuti.statusAkhir = 'ditolak'
		WHERE cuti.id = NEW.idCuti;
	END IF;
END;

-- Pasang di verifikasi kepala untuk trigger status akhir di cuti berdasarkan statusverifikasi kepala
BEGIN
	IF NEW.statusVerifikasi = 'ditolak' THEN
		UPDATE cuti
		SET cuti.statusAkhir = 'ditolak'
		WHERE cuti.id = NEW.idCuti;
	ELSEIF NEW.statusVerifikasi = 'diterima' THEN
		UPDATE cuti
		SET cuti.statusAkhir = 'diterima'
		WHERE cuti.id = NEW.idCuti;
	END IF;
END;