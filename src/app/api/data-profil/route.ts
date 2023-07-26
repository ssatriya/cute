import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Id not found!", { status: 404 });
    }

    const numberId = parseInt(id, 10);

    const response = await db.user.findUnique({
      select: {
        nip: true,
      },
      where: {
        id: numberId,
      },
    });

    console.log(response);

    return NextResponse.json({ result: response });
  } catch (error: any) {
    return new Response("Something went wrong.", { status: 500 });
  }
}
