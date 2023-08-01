import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { verifikasiBerkasValidator } from "@/lib/validators/verifikator/verifikasiBerkas";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      idCuti,
      idJenisCuti,
      nipVerifikator,
      idVerifikator,
      tanggalVerifikasi,
      beritaAcaraCuti,
      berkasCuti,
      formulirCuti,
      suratPermintaanCuti,
      keteranganVerifikasiBerkas,
    } = verifikasiBerkasValidator.parse(body);

    const response = await db.verifikasiBerkas.create({
      data: {
        idCuti: idCuti,
        idJenisCuti: idJenisCuti,
        nipVerifikator: nipVerifikator,
        idVerifikator: +idVerifikator,
        tanggalVerifikasi: new Date(tanggalVerifikasi),
        beritaAcara: beritaAcaraCuti,
        berkasCuti: berkasCuti,
        formulirCuti: formulirCuti,
        suratCuti: suratPermintaanCuti,
        keteranganVerifikasi: keteranganVerifikasiBerkas,
      },
    });

    await db.cuti.update({
      where: {
        id: idCuti,
      },
      data: {
        tahapVerifikasi: 2,
      },
    });

    return NextResponse.json({ data: response, status: 201 });
    // return new Response("Success", { status: 201 });
  } catch (error: any) {
    return new Response("Failed", { status: 400 });
  }
}
