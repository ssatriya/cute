import { db } from "@/lib/db";
import { EditJabatanValidator } from "@/lib/validators/jabatan";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id, idJabatan } = EditJabatanValidator.parse(body);

    const response = await db.user.update({
      data: {
        idJabatan: idJabatan,
        setup: 2,
      },
      where: {
        id: id,
      },
    });

    return new Response("Success", { status: 201 });
  } catch (error: any) {
    return new Response("Something whent wrong", { status: 500 });
  }
}
