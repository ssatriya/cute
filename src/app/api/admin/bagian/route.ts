import * as z from "zod";

import { TambahBagianValidator } from "@/lib/validators/admin/tambahBagian";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { namaBagian, idAtasan } = TambahBagianValidator.parse(body);

    await db.bagian.create({
      data: {
        namaBagian: namaBagian,
        idAtasan: idAtasan,
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

export async function GET() {
  try {
    const response = await db.bagian.findMany();

    const data = response.map((b) => ({
      id: b.id,
      namaBagian: b.namaBagian,
      kepalaBagian: b.nipAtasan,
    }));

    return NextResponse.json({
      result: data,
    });
  } catch (error) {}
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Id is required.", { status: 404 });
    }

    const numberId = parseInt(id, 10);

    await db.bagian.delete({
      where: { id: numberId },
    });

    return new Response("Success", { status: 200 });
  } catch (error) {
    return new Response("Something went wrong.", { status: 500 });
  }
}
