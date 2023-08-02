import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const response = await db.jenisCuti.findMany();

    const data = response.map((cuti: any) => ({
      id: cuti.id,
      namaCuti: cuti.namaCuti,
      lamaCuti: cuti.lamaCuti,
    }));

    return NextResponse.json({ result: data });
  } catch (error) {
    return new Response("Somthing went wrong", { status: 500 });
  }
}
