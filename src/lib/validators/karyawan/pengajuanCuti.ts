import * as z from "zod";

export const PengajuanCutiValidator = z.object({
  nip: z.string(),
  namaLengkap: z.string(),
  jenisCuti: z.number(),
  tanggalMulai: z.string().datetime(),
  tanggalSelesai: z.string().datetime(),
  tanggalPengajuan: z.string().datetime().optional(),
  keteranganCuti: z.string(),
  alamatSelamaCuti: z.string(),
  pegawaiPengganti: z.number(),
  berkas: z.string(),
  idPengguna: z.number(),
});
export type PengajuanCutiPayload = z.infer<typeof PengajuanCutiValidator>;
