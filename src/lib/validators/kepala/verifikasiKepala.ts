import * as z from "zod";

export const verifikasiKepalaValidator = z.object({
  idJenisCuti: z.number(),
  idCuti: z.number(),
  nipKepala: z.string(),
  idKepala: z.number(),
  tanggalVerifikasi: z.string().datetime().optional(),
  keteranganVerifikasi: z.string(),
  statusVerifikasi: z.string(),
});
export type VerifikasiKepalaPayload = z.infer<typeof verifikasiKepalaValidator>;
