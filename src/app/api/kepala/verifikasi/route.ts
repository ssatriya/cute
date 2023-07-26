import { db } from "@/lib/db";
import { verifikasiKepalaValidator } from "@/lib/validators/kepala/verifikasiKepala";
import { StatusCuti, StatusVerifikasi } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      idJenisCuti,
      idCuti,
      nipKepala,
      idKepala,
      keteranganVerifikasi,
      statusVerifikasi,
    } = verifikasiKepalaValidator.parse(body);

    await db.verifikasiKepala.create({
      data: {
        idJenisCuti: idJenisCuti,
        idCuti: idCuti,
        nipKepala: nipKepala,
        idKepala: idKepala,
        tanggalVerifikasi: new Date(),
        keteranganVerifikasi: keteranganVerifikasi,
        statusVerifikasi:
          StatusVerifikasi[statusVerifikasi as keyof typeof StatusVerifikasi],
      },
    });

    await db.cuti.update({
      where: {
        id: idCuti,
      },
      data: {
        tahapVerifikasi: 4,
      },
    });

    return new Response("Success", { status: 201 });
  } catch (error: any) {
    return new Response("Something went wrong!", { status: 500 });
  }
}
