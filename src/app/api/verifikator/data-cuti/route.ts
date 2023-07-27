import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Id is required.", { status: 404 });
    }

    const response = await db.cuti.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        idJenisCuti: true,
        nip: true,
        namaLengkap: true,
        pemohon: {
          select: {
            jabatan: {
              select: {
                namaJabatan: true,
              },
            },
          },
        },
        keterangan: true,
        lamaCuti: true,
        tanggalMulai: true,
        tanggalSelesai: true,
        alamatSelamaCuti: true,
      },
    });

    if (!response) {
      return new Response("Cuti tidak ditemukan.", { status: 404 });
    }

    const data = {
      idCuti: response.id,
      idJenisCuti: response.idJenisCuti,
      nip: response.nip,
      namaLengkap: response.namaLengkap,
      namaJabatan: response.pemohon.jabatan?.namaJabatan,
      keteranganCuti: response.keterangan,
      lamaCuti: response.lamaCuti,
      tanggalMulai: response.tanggalMulai,
      tanggalSelesai: response.tanggalSelesai,
      alamatSelamatCuti: response.alamatSelamaCuti,
    };

    return NextResponse.json({ result: data });
  } catch (error) {}
}
