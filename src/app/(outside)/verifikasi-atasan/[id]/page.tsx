import DetailPengajuanCuti from "@/components/DetailPengajuanCuti";
import FormVerifikasiAtasan from "@/components/form/atasan/FormVerifikasiAtasan";
import FormVerifikasi from "@/components/form/atasan/outside/FormVerifikasi";
import SiteFooter from "@/components/layout/SiteFooter";
import { decryptId } from "@/lib/crypto";
import { db } from "@/lib/db";
import React from "react";

export default async function VerifikasiAtasan({
  params,
}: {
  params: { id: string };
}) {
  const encryptedParams = params.id;
  const id = decryptId(encryptedParams);

  const paramsInt = parseInt(id, 10);

  const dataCuti = await db.cuti.findUniqueOrThrow({
    select: {
      id: true,
      idJenisCuti: true,
      nip: true,
      idPemohon: true,
      namaLengkap: true,
      tanggalMulai: true,
      tanggalSelesai: true,
      lamaCuti: true,
      tahapVerifikasi: true,
      jenisCuti: {
        select: {
          namaCuti: true,
        },
      },
      keterangan: true,
      pengganti: {
        select: {
          namaLengkap: true,
          nip: true,
        },
      },
      pemohon: {
        select: {
          jabatan: {
            select: {
              bagian: {
                select: {
                  atasan: {
                    select: {
                      id: true,
                      nip: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    where: {
      id: paramsInt,
    },
  });

  const data = {
    idCuti: dataCuti.id,
    idJenisCuti: dataCuti.idJenisCuti,
    nip: dataCuti.nip,
    idPemohon: dataCuti.idPemohon!,
    namaLengkap: dataCuti.namaLengkap,
    tanggalMulai: dataCuti.tanggalMulai.toDateString(),
    tanggalSelesai: dataCuti.tanggalSelesai.toDateString(),
    lamaCuti: dataCuti.lamaCuti,
    jenisCuti: dataCuti.jenisCuti.namaCuti,
    keteranganCuti: dataCuti.keterangan,
    namaPengganti: dataCuti.pengganti.namaLengkap!,
    nipPengganti: dataCuti.pengganti.nip!,
  };

  const atasan = {
    id: dataCuti.pemohon.jabatan!.bagian.atasan.id!,
    nip: dataCuti.pemohon.jabatan!.bagian.atasan.nip!,
  };

  if (dataCuti.tahapVerifikasi === 3) {
    return <div>Cuti sudah diverifikasi</div>;
  }

  return (
    <div className="grid items-center justify-center w-full min-h-screen">
      <DetailPengajuanCuti cuti={data} />
      <FormVerifikasiAtasan cuti={data} atasanDetail={atasan} />
      <SiteFooter />
    </div>
  );
}
