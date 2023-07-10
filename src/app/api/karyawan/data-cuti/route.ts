import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const response = await db.jenisCuti.findMany();

    const data = response.map((cuti: any) => ({
      id: cuti.id,
      namaCuti: cuti.nama_cuti,
      lamaCuti: cuti.lama_cuti,
    }));

    return NextResponse.json({ result: data });
  } catch (error) {}
}
