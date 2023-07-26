import { db } from "@/lib/db";
import { verifikasiAtasanValidator } from "@/lib/validators/atasan/verifikasiAtasan";
import { StatusVerifikasi } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      idJenisCuti,
      idCuti,
      nipAtasan,
      idAtasan,
      keteranganVerifikasi,
      statusVerifikasi,
    } = verifikasiAtasanValidator.parse(body);

    await db.verifikasiAtasan.create({
      data: {
        idJenisCuti: idJenisCuti,
        idCuti: idCuti,
        nipAtasan: nipAtasan,
        idAtasan: idAtasan,
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
        tahapVerifikasi: 3,
      },
    });

    return new Response("Success", { status: 201 });
  } catch (error: any) {
    return new Response("Something went wrong!", { status: 500 });
  }
}
