import * as z from "zod";

import { db } from "@/lib/db";

import { TambahCutiValidator } from "@/lib/validators/admin/tambahCuti";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { namaCuti, lamaCuti } = TambahCutiValidator.parse(body);

    await db.jenisCuti.create({
      data: {
        namaCuti: namaCuti,
        lamaCuti: +lamaCuti,
      },
    });

    return new Response("Success", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 402 });
    }

    return new Response("Could not create leave", { status: 500 });
  }
}

// export async function GET() {
//   try {
//     const response = await db.jenisCuti.findMany();

//     const data = response.map((cuti) => ({
//       id: cuti.id,
//       namaCuti: cuti.nama_cuti,
//       lamaCuti: cuti.lama_cuti,
//     }));

//     return NextResponse.json({ result: data });
//   } catch (error: any) {
//     return new Response("Something went wrong.", { status: 500 });
//   }
// }

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Id is required.", { status: 404 });
    }

    const numberId = parseInt(id, 10);

    await db.jenisCuti.delete({
      where: {
        id: numberId,
      },
    });

    return new Response("Success", { status: 200 });
  } catch (error: any) {
    return new Response("Something went wrong.", { status: 500 });
  }
}
