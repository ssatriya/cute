import * as z from "zod";

export const tandaTanganPenggantiValidator = z.object({
  idCuti: z.number(),
  tangaTanganPengganti: z.string(),
  tahapVerifikasi: z.number(),
});
export type tandaTanganPenggantiPayload = z.infer<
  typeof tandaTanganPenggantiValidator
>;
