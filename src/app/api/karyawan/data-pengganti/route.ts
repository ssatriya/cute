import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const response = await db.pengguna.findMany();

    return NextResponse.json({ result: response });
  } catch (error) {}
}
