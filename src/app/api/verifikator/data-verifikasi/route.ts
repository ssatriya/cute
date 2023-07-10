import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await db.cuti.findMany({
      select: {
        id: true,
        nip: true,
        nama: true,
        tanggal_pengajuan: true,
        tanggal_mulai: true,
        lama_cuti: true,
        keterangan: true,
        jenisCutiId: {
          select: {
            nama_cuti: true,
          },
        },
      },
      where: {
        VerifikasiBerkas: {
          every: {
            status_verifikasi: 0,
          },
        },
      },
    });

    const data = response.map((cuti) => ({
      id: cuti.id,
      nip: cuti.nip,
      nama: cuti.nama,
      tanggalPengajuan: new Date(cuti.tanggal_pengajuan).toLocaleDateString(
        "id-ID",
        { weekday: "short", day: "numeric", month: "long", year: "numeric" }
      ),
      mulaiCuti: new Date(cuti.tanggal_pengajuan).toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      lamaCuti: cuti.lama_cuti,
      jenisCuti: cuti.jenisCutiId.nama_cuti,
      keteranganCuti: cuti.keterangan,
    }));

    return NextResponse.json({
      result: data,
    });
  } catch (error: any) {
    return new Response("Failed to fetch data", { status: 400 });
  }
}
