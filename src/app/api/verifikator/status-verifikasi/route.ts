import { db } from "@/lib/db";
import { addDays, subDays } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await db.verifikasiBerkas.findMany({
      select: {
        id: true,
        nipVerifikator: true,
        verifikator: {
          select: {
            namaLengkap: true,
          },
        },
        cuti: {
          select: {
            tanggalPengajuan: true,
            tanggalMulai: true,
            lamaCuti: true,
            jenisCuti: {
              select: {
                namaCuti: true,
              },
            },
            keterangan: true,
          },
        },
        tanggalVerifikasi: true,
        statusVerifikasi: true,
      },
    });

    const data = response.map((verifikasi) => ({
      id: verifikasi.id,
      nip: verifikasi.nipVerifikator,
      nama: verifikasi.verifikator.namaLengkap,
      tanggalPengajuan: verifikasi.cuti.tanggalPengajuan,
      tanggalMulai: subDays(verifikasi.cuti.tanggalMulai, 1),
      lamaCuti: verifikasi.cuti.lamaCuti,
      jenisCuti: verifikasi.cuti.jenisCuti.namaCuti,
      keteranganCuti: verifikasi.cuti.keterangan,
      statusVerifikasi: verifikasi.statusVerifikasi,
      tanggalVerifikasi: addDays(verifikasi.tanggalVerifikasi, 1),
    }));

    return NextResponse.json({
      result: data,
    });
  } catch (error: any) {
    return new Response("Failed to fetch data", { status: 400 });
  }
}
