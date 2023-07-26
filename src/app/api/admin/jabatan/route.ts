import { NextResponse } from "next/server";

import { TambahJabatanValidator } from "@/lib/validators/admin/tambahJabatan";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { namaJabatan, idBagian } = TambahJabatanValidator.parse(body);

    await db.jabatan.create({
      data: {
        namaJabatan: namaJabatan,
        idBagian: idBagian,
      },
    });

    return new Response("Success", { status: 201 });
  } catch (error) {}
}

// export async function GET() {
//   try {
//     const response = await db.jabatan.findMany({
//       select: {
//         id: true,
//         nama_jabatan: true,
//         bagianId: {
//           select: {
//             nama_bagian: true,
//           },
//         },
//       },
//     });

//     const data = response.map((j) => ({
//       id: j.id,
//       namaJabatan: j.nama_jabatan,
//       namaBagian: j.bagianId.nama_bagian,
//     }));

//     return NextResponse.json({
//       result: data,
//     });
//   } catch (error) {}
// }

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Id is required", { status: 404 });
    }

    const numberId = parseInt(id, 10);

    await db.jabatan.delete({
      where: {
        id: numberId,
      },
    });

    return new Response("Success", { status: 200 });
  } catch (error: any) {
    return new Response("Something went wrong.", { status: 500 });
  }
}
