import { db } from "@/lib/db";
import { verifikasiBerkasValidator } from "@/lib/validators/verifikator/verifikasiBerkas";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      idCuti,
      idJenisCuti,
      nip,
      idPengguna,
      tanggalVerifikasi,
      beritaAcaraCuti,
      berkasCuti,
      formulirCuti,
      suratPermintaanCuti,
      keteranganVerifikasiBerkas,
    } = verifikasiBerkasValidator.parse(body);

    const response = await db.verifikasiBerkas.create({
      data: {
        id_cuti: idCuti,
        id_jenis_cuti: idJenisCuti,
        nip: nip,
        id_pengguna: +idPengguna,
        tanggal_verifikasi: new Date(tanggalVerifikasi),
        berita_acara: beritaAcaraCuti,
        berkas_cuti: berkasCuti,
        formulir_cuti: formulirCuti,
        surat_cuti: suratPermintaanCuti,
        keterangan_verifikasi: keteranganVerifikasiBerkas,
      },
    });

    return new Response("Success", { status: 201 });
  } catch (error: any) {
    return new Response("Failed", { status: 400 });
  }
}
