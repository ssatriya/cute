import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await db.verifikasiBerkas.findMany({
      select: {
        id: true,
        nip: true,
        penggunaId: {
          select: {
            nama: true,
          },
        },
        cutiId: {
          select: {
            tanggal_pengajuan: true,
            tanggal_mulai: true,
            lama_cuti: true,
            jenisCutiId: {
              select: {
                nama_cuti: true,
              },
            },
            keterangan: true,
          },
        },
        status_verifikasi: true,
      },
    });

    const data = response.map((verifikasi) => ({
      id: verifikasi.id,
      nip: verifikasi.nip,
      nama: verifikasi.penggunaId.nama,
      tanggalPengajuan: verifikasi.cutiId.tanggal_pengajuan,
      tanggalMulai: verifikasi.cutiId.tanggal_mulai,
      lamaCuti: verifikasi.cutiId.lama_cuti,
      jenisCuti: verifikasi.cutiId.jenisCutiId.nama_cuti,
      keteranganCuti: verifikasi.cutiId.keterangan,
      statusVerifikasi: verifikasi.status_verifikasi,
    }));

    return NextResponse.json({
      result: data,
    });
  } catch (error: any) {
    return new Response("Failed to fetch data", { status: 400 });
  }
}
