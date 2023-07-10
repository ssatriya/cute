import * as z from "zod";

export const TambahCutiValidator = z.object({
  namaCuti: z.string(),
  lamaCuti: z.string(),
});
export type TambahCutiPayload = z.infer<typeof TambahCutiValidator>;
