import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Id not found", { status: 404 });
    }

    const numberId = parseInt(id, 10);

    const response = await db.cuti.findUnique({
      where: {
        id: numberId,
      },
    });

    return NextResponse.json({ data: response });
  } catch (error: any) {
    return new Response("Something went wrong", { status: 500 });
  }
}
