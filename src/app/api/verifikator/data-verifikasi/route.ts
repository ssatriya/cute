import { db } from "@/lib/db";
import { subDays } from "date-fns";
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
        jenisCuti: {
          select: {
            namaCuti: true,
          },
        },
      },
      where: {
        tahapVerifikasi: 0,
      },
    });

    const data = response.map((cuti) => ({
      id: cuti.id,
      nip: cuti.nip,
      nama: cuti.namaLengkap,
      tanggalPengajuan: cuti.tanggalPengajuan,
      mulaiCuti: subDays(cuti.tanggalMulai, 1),
      lamaCuti: cuti.lamaCuti,
      jenisCuti: cuti.jenisCuti.namaCuti,
      keteranganCuti: cuti.keterangan,
    }));

    return NextResponse.json({
      result: data,
    });
  } catch (error: any) {
    return new Response("Failed to fetch data", { status: 400 });
  }
}
