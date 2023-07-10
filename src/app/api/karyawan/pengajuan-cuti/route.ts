import { NextResponse } from "next/server";
import { join } from "path";
import {
  format,
  intervalToDuration,
  addDays,
  eachDayOfInterval,
} from "date-fns";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from "mime";
import * as z from "zod";

import { PengajuanCutiValidator } from "@/lib/validators/karyawan/pengajuanCuti";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData);

  const berkas = formData.get("berkas") as File | null;

  if (!berkas) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  const buffer = Buffer.from(await berkas.arrayBuffer());
  const relativeUploadDir = `/upload/berkas/${format(Date.now(), "dd-MM-Y")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  const _nip = data.nip as string;
  const _nama = data.nama as string;
  const _jenisCuti = data.jenisCuti as string;
  const _tanggalMulai = data.tanggalMulai as string;
  const _tanggalSelesai = data.tanggalSelesai as string;
  const _keteranganCuti = data.keteranganCuti as string;
  const _alamatSelamaCuti = data.alamatSelamaCuti as string;
  const _pegawaiPengganti = data.pegawaiPengganti as string;

  const transformedData = {
    nip: _nip,
    nama: _nama,
    jenisCuti: +_jenisCuti,
    tanggalMulai: _tanggalMulai,
    tanggalSelesai: _tanggalSelesai,
    tanggalPengajuan: new Date(Date.now()).toISOString(),
    keteranganCuti: _keteranganCuti,
    alamatSelamaCuti: _alamatSelamaCuti,
    pegawaiPengganti: +_pegawaiPengganti,
  };

  const {
    nip,
    nama,
    jenisCuti,
    tanggalMulai,
    tanggalSelesai,
    tanggalPengajuan,
    keteranganCuti,
    alamatSelamaCuti,
    pegawaiPengganti,
  } = PengajuanCutiValidator.parse(transformedData);

  const date1 = addDays(new Date(tanggalMulai), 1);
  const date2 = addDays(new Date(tanggalSelesai), 1);

  const hitungLamaCuti = intervalToDuration({
    start: date1,
    end: date2,
  });

  if (!hitungLamaCuti.days)
    return new Response("Lama cuti tidak boleh 0.", { status: 400 });
  if (+hitungLamaCuti.days + 1 <= 1)
    return new Response("Lama cuti tidak boleh kurang dari 3 hari.", {
      status: 400,
    });
  const lamaCuti = +hitungLamaCuti.days + 1;
  console.log(lamaCuti);

  const arrayTanggalCuti = eachDayOfInterval({
    start: date1,
    end: date2,
  });

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${berkas.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(berkas.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);

    const fileUrl = `${relativeUploadDir}/${filename}`;

    console.log(jenisCuti);

    const response = await db.cuti.create({
      data: {
        nip: nip,
        nama: nama,
        id_jenis_cuti: jenisCuti,
        lama_cuti: lamaCuti,
        tanggal_pengajuan: tanggalPengajuan!,
        tanggal_mulai: date1,
        tanggal_selesai: date2,
        tanggal_array: JSON.stringify(arrayTanggalCuti),
        keterangan: keteranganCuti,
        alamat_selama_cuti: alamatSelamaCuti,
        berkas: fileUrl,
        id_pegawai_pengganti: pegawaiPengganti,
      },
    });
    console.log(response);

    return new Response("Success", { status: 201 });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
