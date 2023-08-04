import { db } from "@/lib/db";
import { profilValidator } from "@/lib/validators/karyawan/profil";
import { JenisKelamin } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Id not found", { status: 404 });
    }

    const numberId = parseInt(id, 10);

    const response = await db.user.findUnique({
      select: {
        namaLengkap: true,
        nip: true,
        idJabatan: true,
        tanggalLahir: true,
        tempatLahir: true,
        jenisKelamin: true,
        tandaTangan: true,
      },
      where: {
        id: numberId,
      },
    });

    if (!response) {
      return new Response("Failed to get data", { status: 400 });
    }

    const dob = new Date(response.tanggalLahir!).toLocaleDateString();
    const dobArr = dob.split("/");

    // prettier-ignore
    const formatDate = `${dobArr[2]}-${dobArr[0].padStart(2, "0")}-${dobArr[1].padStart(2,"0")}`;

    const data = {
      namaLengkap: response.namaLengkap,
      nip: response.nip,
      idJabatan: response.idJabatan ? response.idJabatan : undefined,
      tanggalLahir: response.tanggalLahir
        ? response.tanggalLahir.toDateString()
        : null,
      tempatLahir: response.tempatLahir,
      jenisKelamin: response.jenisKelamin,
      tandaTangan: response.tandaTangan,
    };

    return NextResponse.json({ result: data });
  } catch (error: any) {
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      namaLengkap,
      nip,
      tempatLahir,
      idJabatan,
      tanggalLahir,
      jenisKelamin,
      tandaTangan,
    } = profilValidator.parse(body);

    const response = await db.user.update({
      data: {
        namaLengkap: namaLengkap,
        nip: nip,
        setup: 1,
        idJabatan: idJabatan,
        tempatLahir: tempatLahir,
        tanggalLahir: new Date(tanggalLahir),
        jenisKelamin: JenisKelamin[jenisKelamin as keyof typeof JenisKelamin],
        tandaTangan: tandaTangan,
      },
      where: {
        id: +id,
      },
    });

    return new Response("Success", { status: 201 });
  } catch (error: any) {
    return new Response("Something went wrong", { status: 500 });
  }
}
