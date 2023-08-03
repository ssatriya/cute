import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { tandaTanganPenggantiValidator } from "@/lib/validators/karyawan/tangaTanganPengganti";
import { getAuthSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Id id required!", { status: 500 });
    }

    const numberId = parseInt(id, 10);

    const response = await db.user.findMany({
      select: {
        id: true,
        namaLengkap: true,
      },
      where: {
        NOT: [{ id: numberId }, { role: "admin" }],
      },
    });

    const data = response.map((d) => ({
      id: d.id,
      namaLengkap: d.namaLengkap,
    }));

    return NextResponse.json({ result: data });
  } catch (error) {}
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    const body = await req.json();

    const { idCuti, tangaTanganPengganti, tahapVerifikasi } =
      tandaTanganPenggantiValidator.parse(body);

    if (!session) {
      return new Response("Not authorized!", { status: 400 });
    }

    let idPersetujuan = 0;
    if (session.user.namaLengkap === tangaTanganPengganti) {
      idPersetujuan = 1;
    }

    const response = await db.cuti.update({
      data: {
        persetujuanPengganti: idPersetujuan,
        tahapVerifikasi: tahapVerifikasi,
      },
      where: {
        id: idCuti,
      },
    });

    return new Response("Success", { status: 201 });
  } catch (error: any) {
    return new Response("Something went wrong!", { status: 500 });
  }
}
