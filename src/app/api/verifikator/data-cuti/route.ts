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
        id_jenis_cuti: true,
        nip: true,
      },
    });

    const data = {
      idCuti: response?.id,
      idJenisCuti: response?.id_jenis_cuti,
      nip: response?.nip,
    };

    return NextResponse.json({ result: data });
  } catch (error) {}
}
