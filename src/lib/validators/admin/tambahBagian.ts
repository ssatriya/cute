import * as z from "zod";

export const TambahBagianValidator = z.object({
  namaBagian: z.string(),
  nipAtasanLangsung: z.string(),
});
export type TambahBagianPayload = z.infer<typeof TambahBagianValidator>;
