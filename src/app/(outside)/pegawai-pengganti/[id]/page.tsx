import FormPegawaiPengganti from "@/components/form/FormPegawaiPengganti";
import SiteFooter from "@/components/layout/SiteFooter";
import { decryptId } from "@/lib/crypto";
import { db } from "@/lib/db";
import { format } from "date-fns";
import React from "react";

export default async function PegawaiPengganti({
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
      namaLengkap: true,
      nip: true,
      jenisCuti: {
        select: {
          namaCuti: true,
          id: true,
        },
      },
      lamaCuti: true,
      tanggalMulai: true,
      tanggalSelesai: true,
      keterangan: true,
      idPemohon: true,
      pemohon: {
        select: {
          role: true,
        },
      },
      pengganti: {
        select: {
          namaLengkap: true,
          nip: true,
        },
      },
    },
    where: {
      id: paramsInt,
    },
  });

  const data = {
    idCuti: dataCuti.id,
    idPemohon: dataCuti.idPemohon,
    rolePemohon: dataCuti.pemohon.role!,
    namaLengkap: dataCuti.namaLengkap,
    nip: dataCuti.nip,
    jenisCuti: dataCuti.jenisCuti.namaCuti,
    idJenisCuti: dataCuti.jenisCuti.id,
    lamaCuti: dataCuti.lamaCuti,
    tanggalMulai: format(new Date(dataCuti.tanggalMulai), "MM/dd/yyyy"),
    tanggalSelesai: format(new Date(dataCuti.tanggalSelesai), "MM/dd/yyyy"),
    keteranganCuti: dataCuti.keterangan,
    namaPengganti: dataCuti.pengganti.namaLengkap || "",
    nipPengganti: dataCuti.pengganti.nip || "",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <FormPegawaiPengganti
        user={{
          id: data.idPemohon,
          namaLengkap: data.namaLengkap,
          role: data.rolePemohon,
        }}
        idCuti={paramsInt}
      />
      <SiteFooter />
    </div>
  );
}
