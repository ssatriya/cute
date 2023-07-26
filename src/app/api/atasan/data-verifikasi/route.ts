import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await db.cuti.findMany({
      select: {
        id: true,
        nip: true,
        namaLengkap: true,
        tanggalPengajuan: true,
        tanggalMulai: true,
        lamaCuti: true,
        keterangan: true,
        jenisCutiId: {
          select: {
            namaCuti: true,
          },
        },
      },
      where: {
        tahapVerifikasi: 1,
      },
    });

    const data = response.map((cuti) => ({
      id: cuti.id,
      nip: cuti.nip,
      namaLengkap: cuti.namaLengkap,
      tanggalPengajuan: cuti.tanggalPengajuan,
      tanggalMulai: cuti.tanggalMulai,
      lamaCuti: cuti.lamaCuti,
      jenisCuti: cuti.jenisCutiId.namaCuti,
      keteranganCuti: cuti.keterangan,
    }));

    return NextResponse.json({ result: data });
  } catch (error: any) {
    return new Response("Failed to fetch data.", { status: 400 });
  }
}
