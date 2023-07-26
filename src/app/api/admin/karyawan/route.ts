import { NextResponse } from "next/server";
import { join } from "path";
import { format } from "date-fns";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from "mime";

import { TambahKaryawanValidator } from "@/lib/validators/admin/tambahKaryawan";
import { db } from "@/lib/db";
import { JenisKelamin, RolePengguna } from "@prisma/client";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const data = Object.fromEntries(formData);

//   const foto = formData.get("foto") as File | null;

//   if (!foto) {
//     return NextResponse.json({ error: "Photo is required" }, { status: 400 });
//   }

//   const buffer = Buffer.from(await foto.arrayBuffer());
//   const relativeUploadDir = `/upload/foto/${format(Date.now(), "dd-MM-Y")}`;
//   const uploadDir = join(process.cwd(), "public", relativeUploadDir);

//   const _nip = data.nip as string;
//   const _namaLengkap = data.namaLengkap as string;
//   const _jabatan = data.jabatan as string;
//   const _jenisKelamin = data.jenisKelamin as string;
//   const _tempatLahir = data.tempatLahir as string;
//   const _tanggalLahir = data.tanggalLahir as string;
//   const _email = data.email as string;
//   const _password = data.password as string;
//   const _role = data.role as string;

//   const transformedData = {
//     nip: _nip,
//     namaLengkap: _namaLengkap,
//     jabatan: +_jabatan,
//     jenisKelamin: _jenisKelamin,
//     tempatLahir: _tempatLahir,
//     tanggalLahir: _tanggalLahir,
//     email: _email,
//     password: _password,
//     role: _role,
//   };

//   const {
//     nip,
//     namaLengkap,
//     jabatan,
//     jenisKelamin,
//     tempatLahir,
//     tanggalLahir,
//     email,
//     password,
//     role,
//   } = TambahKaryawanValidator.parse(transformedData);

//   try {
//     await stat(uploadDir);
//   } catch (e: any) {
//     if (e.code === "ENOENT") {
//       await mkdir(uploadDir, { recursive: true });
//     } else {
//       console.error(
//         "Error while trying to create directory when uploading a file\n",
//         e
//       );
//       return NextResponse.json(
//         { error: "Something went wrong." },
//         { status: 500 }
//       );
//     }
//   }

//   try {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const filename = `${foto.name.replace(
//       /\.[^/.]+$/,
//       ""
//     )}-${uniqueSuffix}.${mime.getExtension(foto.type)}`;
//     await writeFile(`${uploadDir}/${filename}`, buffer);

//     const fileUrl = `${relativeUploadDir}/${filename}`;

//     await db.pengguna.create({
//       data: {
//         nip: nip,
//         nama: namaLengkap,
//         id_jabatan: jabatan,
//         jenis_kelamin: JenisKelamin[jenisKelamin as keyof typeof JenisKelamin],
//         tempat_lahir: tempatLahir,
//         tanggal_lahir: tanggalLahir,
//         email: email,
//         password: password,
//         foto: fileUrl,
//         role: RolePengguna[role as keyof typeof RolePengguna],
//       },
//     });

//     return new Response("Success", { status: 201 });
//   } catch (e) {
//     console.error("Error while trying to upload a file\n", e);
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     const response = await db.user.findMany({
//       select: {
//         id: true,
//         nip: true,
//         nama_lengkap: true,
//         email: true,
//         role: true,
//         jabatanId: {
//           select: {
//             nama_jabatan: true,
//           },
//         },
//       },
//     });

//     const data = response.map((k) => ({
//       id: k.id,
//       nip: k.nip,
//       namaLengkap: k.nama_lengkap,
//       email: k.email,
//       role: k.role,
//       jabatan: k.jabatanId?.nama_jabatan,
//     }));

//     return NextResponse.json({ result: data });
//   } catch (error) {}
// }

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Id is required", { status: 404 });
    }

    await db.user.delete({
      where: {
        id: +id,
      },
    });

    return new Response("Success", { status: 200 });
  } catch (error: any) {
    return new Response("Something went wrong.", { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await db.user.findMany({
      select: {
        id: true,
        namaLengkap: true,
      },
    });

    return NextResponse.json({ data: response });
  } catch (error: any) {}
}
