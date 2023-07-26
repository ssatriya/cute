import * as z from "zod";

export const EditJabatanValidator = z.object({
  id: z.number(),
  idJabatan: z.number(),
});
export type EditJabatanPayload = z.infer<typeof EditJabatanValidator>;
