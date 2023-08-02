import { db } from "@/lib/db";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Id not found", { status: 404 });
    }
    const numberId = parseInt(id, 10);

    const response = await db.cuti.findUnique({
      select: {
        id: true,
        namaLengkap: true,
        nip: true,
        jenisCuti: {
          select: {
            namaCuti: true,
            id: true,
          },
        },
        lamaCuti: true,
        tanggalMulai: true,
        tanggalSelesai: true,
        keterangan: true,
        pengganti: {
          select: {
            namaLengkap: true,
            nip: true,
          },
        },
      },
      where: {
        id: numberId,
      },
    });

    if (!response) {
      return new Response("Data cuti tidak ditemukan.", { status: 404 });
    }

    const data = {
      idCuti: response.id,
      namaLengkap: response.namaLengkap,
      nip: response.nip,
      jenisCuti: response.jenisCuti.namaCuti,
      idJenisCuti: response.jenisCuti.id,
      lamaCuti: response.lamaCuti,
      tanggalMulai: format(new Date(response.tanggalMulai), "MM/dd/yyyy"),
      tanggalSelesai: format(new Date(response.tanggalSelesai), "MM/dd/yyyy"),
      keteranganCuti: response.keterangan,
      namaPengganti: response.pengganti.namaLengkap,
      nipPengganti: response.pengganti.nip,
    };

    return NextResponse.json({ result: data });
  } catch (error) {
    return new Response("Somthing went wrong", { status: 500 });
  }
}
