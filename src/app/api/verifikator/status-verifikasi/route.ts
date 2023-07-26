import { db } from "@/lib/db";
import { addDays, subDays } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await db.verifikasiBerkas.findMany({
      select: {
        id: true,
        nipVerifikator: true,
        verifikatorId: {
          select: {
            namaLengkap: true,
          },
        },
        cutiId: {
          select: {
            tanggalPengajuan: true,
            tanggalMulai: true,
            lamaCuti: true,
            jenisCutiId: {
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
      nama: verifikasi.verifikatorId.namaLengkap,
      tanggalPengajuan: verifikasi.cutiId.tanggalPengajuan,
      tanggalMulai: subDays(verifikasi.cutiId.tanggalMulai, 1),
      lamaCuti: verifikasi.cutiId.lamaCuti,
      jenisCuti: verifikasi.cutiId.jenisCutiId.namaCuti,
      keteranganCuti: verifikasi.cutiId.keterangan,
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
