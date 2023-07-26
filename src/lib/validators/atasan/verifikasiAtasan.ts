import * as z from "zod";

export const verifikasiAtasanValidator = z.object({
  idJenisCuti: z.number(),
  idCuti: z.number(),
  nipAtasan: z.string(),
  idAtasan: z.number(),
  tanggalVerifikasi: z.string().datetime().optional(),
  keteranganVerifikasi: z.string(),
  statusVerifikasi: z.string(),
});
export type VerifikasiAtasanPayload = z.infer<typeof verifikasiAtasanValidator>;
