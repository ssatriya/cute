import * as z from "zod";

export const profilValidator = z.object({
  id: z.number(),
  namaLengkap: z.string(),
  nip: z.string(),
  idJabatan: z.number().optional(),
  tempatLahir: z.string(),
  tanggalLahir: z.string(),
  jenisKelamin: z.string(),
  tandaTangan: z.string(),
});
export type ProfilPayload = z.infer<typeof profilValidator>;
