import * as z from "zod";

export const TambahBagianValidator = z.object({
  namaBagian: z.string(),
  idAtasan: z.number(),
});
export type TambahBagianPayload = z.infer<typeof TambahBagianValidator>;
