import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await db.jabatan.findMany();

    const data = response.map((jabatan) => ({
      id: jabatan.id,
      namaJabatan: jabatan.namaJabatan,
    }));

    return NextResponse.json({ result: data });
  } catch (error: any) {
    return new Response("Something went wrong", { status: 500 });
  }
}
