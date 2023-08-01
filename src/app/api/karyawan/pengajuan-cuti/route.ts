import { NextResponse } from "next/server";
import { join } from "path";
import {
  format,
  intervalToDuration,
  addDays,
  eachDayOfInterval,
  eachWeekendOfInterval,
} from "date-fns";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from "mime";
import * as z from "zod";

import { PengajuanCutiValidator } from "@/lib/validators/karyawan/pengajuanCuti";
import { db } from "@/lib/db";
import Holidays from "date-holidays";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const data = Object.fromEntries(formData);

//   const berkas = formData.get("berkas") as File | null;

//   if (!berkas) {
//     return NextResponse.json({ error: "File is required." }, { status: 400 });
//   }

//   const buffer = Buffer.from(await berkas.arrayBuffer());
//   const relativeUploadDir = `/upload/berkas/${format(Date.now(), "dd-MM-Y")}`;
//   const uploadDir = join(process.cwd(), "public", relativeUploadDir);

//   const _nip = data.nip as string;
//   const _namaLengkap = data.namaLengkap as string;
//   const _jenisCuti = data.jenisCuti as string;
//   const _tanggalMulai = data.tanggalMulai as string;
//   const _tanggalSelesai = data.tanggalSelesai as string;
//   const _keteranganCuti = data.keteranganCuti as string;
//   const _alamatSelamaCuti = data.alamatSelamaCuti as string;
//   const _pegawaiPengganti = data.pegawaiPengganti as string;
//   const _idPengguna = data.idPengguna as string;

//   const transformedData = {
//     nip: _nip,
//     namaLengkap: _namaLengkap,
//     jenisCuti: +_jenisCuti,
//     tanggalMulai: _tanggalMulai,
//     tanggalSelesai: _tanggalSelesai,
//     tanggalPengajuan: new Date(Date.now()).toISOString(),
//     keteranganCuti: _keteranganCuti,
//     alamatSelamaCuti: _alamatSelamaCuti,
//     pegawaiPengganti: +_pegawaiPengganti,
//     idPengguna: +_idPengguna,
//   };

//   const {
//     nip,
//     namaLengkap,
//     jenisCuti,
//     tanggalMulai,
//     tanggalSelesai,
//     tanggalPengajuan,
//     keteranganCuti,
//     alamatSelamaCuti,
//     pegawaiPengganti,
//     idPengguna,
//   } = PengajuanCutiValidator.parse(transformedData);

//   const date1 = addDays(new Date(tanggalMulai), 1);
//   const date2 = addDays(new Date(tanggalSelesai), 1);

//   const hitungLamaCuti = intervalToDuration({
//     start: date1,
//     end: date2,
//   });

//   if (!hitungLamaCuti.days)
//     return new Response("Lama cuti tidak boleh 0.", { status: 400 });
//   if (+hitungLamaCuti.days + 1 <= 1)
//     return new Response("Lama cuti tidak boleh kurang dari 3 hari.", {
//       status: 400,
//     });
//   const lamaCuti = +hitungLamaCuti.days + 1;

//   const arrayTanggalCuti = eachDayOfInterval({
//     start: date1,
//     end: date2,
//   });

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
//     const filename = `${berkas.name.replace(
//       /\.[^/.]+$/,
//       ""
//     )}-${uniqueSuffix}.${mime.getExtension(berkas.type)}`;
//     await writeFile(`${uploadDir}/${filename}`, buffer);

//     const fileUrl = `${relativeUploadDir}/${filename}`;

//     const response = await db.cuti.create({
//       data: {
//         nip: nip,
//         idPemohon: idPengguna,
//         namaLengkap: namaLengkap,
//         idJenisCuti: jenisCuti,
//         lamaCuti: lamaCuti,
//         tanggalPengajuan: tanggalPengajuan!,
//         tanggalMulai: date1,
//         tanggalSelesai: date2,
//         tanggalArray: JSON.stringify(arrayTanggalCuti),
//         keterangan: keteranganCuti,
//         alamatSelamaCuti: alamatSelamaCuti,
//         berkas: fileUrl,
//         idPengganti: pegawaiPengganti,
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

export async function POST(req: Request) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData);

  const _nip = data.nip as string;
  const _namaLengkap = data.namaLengkap as string;
  const _jenisCuti = data.jenisCuti as string;
  const _tanggalMulai = data.tanggalMulai as string;
  const _tanggalSelesai = data.tanggalSelesai as string;
  const _keteranganCuti = data.keteranganCuti as string;
  const _alamatSelamaCuti = data.alamatSelamaCuti as string;
  const _pegawaiPengganti = data.pegawaiPengganti as string;
  const _idPengguna = data.idPengguna as string;
  const _berkas = data.berkas as string;

  const transformedData = {
    nip: _nip,
    namaLengkap: _namaLengkap,
    jenisCuti: +_jenisCuti,
    tanggalMulai: _tanggalMulai,
    tanggalSelesai: _tanggalSelesai,
    tanggalPengajuan: new Date(Date.now()).toISOString(),
    keteranganCuti: _keteranganCuti,
    alamatSelamaCuti: _alamatSelamaCuti,
    pegawaiPengganti: +_pegawaiPengganti,
    berkas: _berkas,
    idPengguna: +_idPengguna,
  };

  const {
    nip,
    namaLengkap,
    jenisCuti,
    tanggalMulai,
    tanggalSelesai,
    tanggalPengajuan,
    keteranganCuti,
    alamatSelamaCuti,
    pegawaiPengganti,
    idPengguna,
    berkas,
  } = PengajuanCutiValidator.parse(transformedData);

  // ===
  const dateFrom = new Date(tanggalMulai);
  const dateTo = new Date(tanggalSelesai);

  const addDateFrom = addDays(dateFrom, 1);
  const addDateTo = addDays(dateTo, 1);

  const intervalDate = eachDayOfInterval({
    start: dateFrom,
    end: dateTo,
  });

  const weekendArray = eachWeekendOfInterval({
    start: dateFrom,
    end: dateTo,
  });

  // +1 day operation
  const addDaysInterval = intervalDate.map((day) => day.toDateString());

  const addDaysWeekend = weekendArray.map((day) => day.toDateString());

  let newWeekendArray: Date[] = [];
  addDaysInterval.map((day, index) => {
    if (addDaysWeekend[index] !== day) {
      newWeekendArray.push(new Date(day));
    }
  });

  const holidays = new Holidays("ID");

  let holidaysArr: Date[] = [];
  newWeekendArray.map((day) => {
    if (!holidays.isHoliday(day)) {
      holidaysArr.push(day);
    }
  });

  const finalDateArr = holidaysArr.map((date) => addDays(date, 1));
  const lamaCuti = finalDateArr.length;

  //

  try {
    const response = await db.cuti.create({
      data: {
        nip: nip,
        idPemohon: idPengguna,
        namaLengkap: namaLengkap,
        idJenisCuti: jenisCuti,
        lamaCuti: lamaCuti,
        tanggalPengajuan: tanggalPengajuan!,
        tanggalMulai: addDateFrom,
        tanggalSelesai: addDateTo,
        tanggalArray: JSON.stringify(finalDateArr),
        keterangan: keteranganCuti,
        alamatSelamaCuti: alamatSelamaCuti,
        berkas: berkas,
        idPengganti: pegawaiPengganti,
      },
    });

    return NextResponse.json({ data: response, status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
