import * as z from "zod";

export const TambahKaryawanValidator = z.object({
  nip: z.string(),
  namaLengkap: z.string(),
  jabatan: z.number(),
  jenisKelamin: z.string(),
  tempatLahir: z.string(),
  tanggalLahir: z.string().datetime(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
});
export type TambahKaryawanPayload = z.infer<typeof TambahKaryawanValidator>;
