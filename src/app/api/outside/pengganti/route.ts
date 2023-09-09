import { db } from "@/lib/db";
import { tandaTanganPenggantiValidator } from "@/lib/validators/karyawan/tangaTanganPengganti";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { idCuti, tangaTanganPengganti, tahapVerifikasi } =
      tandaTanganPenggantiValidator.parse(body);

    const dataPengganti = await db.cuti.findUniqueOrThrow({
      select: {
        idPengganti: true,
        pengganti: {
          select: {
            namaLengkap: true,
          },
        },
      },
      where: {
        id: +idCuti,
      },
    });

    let idPersetujuan = 0;
    if (dataPengganti.pengganti.namaLengkap === tangaTanganPengganti) {
      idPersetujuan = 1;
    }

    const response = await db.cuti.update({
      data: {
        persetujuanPengganti: idPersetujuan,
        tahapVerifikasi: tahapVerifikasi,
      },
      where: {
        id: idCuti,
      },
    });

    return new Response("Success", { status: 201 });
  } catch (error: any) {
    return new Response("Something went wrong!", { status: 500 });
  }
}
