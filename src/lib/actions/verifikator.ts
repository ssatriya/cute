import { addDays, format, subDays } from "date-fns";
import { db } from "../db";
import { StatusVerifikasiBerkas } from "@/app/(dashboard)/verifikator/(verifikasi)/status-verifikasi/columns";
import { DataVerifikasiBerkas } from "@/app/(dashboard)/verifikator/(verifikasi)/data-pengajuan-cuti/columns";

export async function getStatusVerifikasiBerkas(): Promise<
  StatusVerifikasiBerkas[]
> {
  try {
    const response = await db.verifikasiBerkas.findMany({
      select: {
        id: true,
        nipVerifikator: true,
        verifikator: {
          select: {
            namaLengkap: true,
          },
        },
        cuti: {
          select: {
            tanggalPengajuan: true,
            tanggalMulai: true,
            lamaCuti: true,
            jenisCuti: {
              select: {
                namaCuti: true,
              },
            },
            keterangan: true,
            pemohon: {
              select: {
                namaLengkap: true,
                nip: true,
              },
            },
          },
        },
        tanggalVerifikasi: true,
        statusVerifikasi: true,
      },
    });

    const data = response.map((verifikasi) => ({
      id: verifikasi.id,
      nip: verifikasi.cuti.pemohon.nip!,
      namaLengkap: verifikasi.cuti.pemohon.namaLengkap!,
      tanggalPengajuan: format(verifikasi.cuti.tanggalPengajuan, "MM/dd/yyyy"),
      tanggalMulai: format(
        subDays(verifikasi.cuti.tanggalMulai, 1),
        "MM/dd/yyyy"
      ),
      lamaCuti: verifikasi.cuti.lamaCuti,
      jenisCuti: verifikasi.cuti.jenisCuti.namaCuti,
      keteranganCuti: verifikasi.cuti.keterangan,
      statusVerifikasi: verifikasi.statusVerifikasi!,
      tanggalVerifikasi: format(
        addDays(verifikasi.tanggalVerifikasi, 1),
        "MM/dd/yyyy"
      ),
    }));

    return data;
  } catch (error: any) {
    return [];
  }
}

export async function getDataPengajuanCuti(): Promise<DataVerifikasiBerkas[]> {
  try {
    const response = await db.cuti.findMany({
      select: {
        id: true,
        nip: true,
        namaLengkap: true,
        tanggalPengajuan: true,
        tanggalMulai: true,
        lamaCuti: true,
        keterangan: true,
        jenisCuti: {
          select: {
            namaCuti: true,
          },
        },
      },
      where: {
        tahapVerifikasi: 1,
        statusAkhir: "proses",
      },
    });

    const data = response.map((cuti) => ({
      id: cuti.id,
      nip: cuti.nip,
      nama: cuti.namaLengkap,
      tanggalPengajuan: format(cuti.tanggalPengajuan, "MM/dd/yyyy"),
      mulaiCuti: format(subDays(cuti.tanggalMulai, 1), "MM/dd/yyyy"),
      lamaCuti: cuti.lamaCuti,
      jenisCuti: cuti.jenisCuti.namaCuti,
      keteranganCuti: cuti.keterangan,
    }));

    return data;
  } catch (error: any) {
    return [];
  }
}
