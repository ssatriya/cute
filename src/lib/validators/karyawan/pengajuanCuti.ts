import * as z from "zod";

export const PengajuanCutiValidator = z.object({
  nip: z.string(),
  nama: z.string(),
  jenisCuti: z.number(),
  tanggalMulai: z.string().datetime(),
  tanggalSelesai: z.string().datetime(),
  tanggalPengajuan: z.string().datetime().optional(),
  keteranganCuti: z.string(),
  alamatSelamaCuti: z.string(),
  pegawaiPengganti: z.number(),
});
export type PengajuanCutiPayload = z.infer<typeof PengajuanCutiValidator>;
