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
        verifikatorId: {
          select: {
            namaLengkap: true,
          },
        },
        cutiId: {
          select: {
            tanggalPengajuan: true,
            tanggalMulai: true,
            lamaCuti: true,
            jenisCutiId: {
              select: {
                namaCuti: true,
              },
            },
            keterangan: true,
            pemohonId: {
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
      nip: verifikasi.cutiId.pemohonId.nip!,
      namaLengkap: verifikasi.cutiId.pemohonId.namaLengkap!,
      tanggalPengajuan: format(
        verifikasi.cutiId.tanggalPengajuan,
        "MM/dd/yyyy"
      ),
      tanggalMulai: format(
        subDays(verifikasi.cutiId.tanggalMulai, 1),
        "MM/dd/yyyy"
      ),
      lamaCuti: verifikasi.cutiId.lamaCuti,
      jenisCuti: verifikasi.cutiId.jenisCutiId.namaCuti,
      keteranganCuti: verifikasi.cutiId.keterangan,
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
        jenisCutiId: {
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
      jenisCuti: cuti.jenisCutiId.namaCuti,
      keteranganCuti: cuti.keterangan,
    }));

    return data;
  } catch (error: any) {
    return [];
  }
}
