import * as z from "zod";

export const verifikasiBerkasValidator = z.object({
  idJenisCuti: z.number(),
  idCuti: z.number(),
  nip: z.string(),
  idPengguna: z.string(),
  tanggalVerifikasi: z.string(),
  suratPermintaanCuti: z.number(),
  formulirCuti: z.number(),
  beritaAcaraCuti: z.number(),
  berkasCuti: z.number(),
  keteranganVerifikasiBerkas: z.string(),
});
export type verifikasiBerkasPayload = z.infer<typeof verifikasiBerkasValidator>;
