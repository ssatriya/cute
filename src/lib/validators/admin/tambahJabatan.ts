import * as z from "zod";

export const TambahJabatanValidator = z.object({
  namaJabatan: z.string(),
  idBagian: z.number(),
});
export type TambahJabatanPayload = z.infer<typeof TambahJabatanValidator>;
