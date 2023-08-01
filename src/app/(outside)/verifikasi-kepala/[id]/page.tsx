import DetailPengajuanCuti from "@/components/DetailPengajuanCuti";
import FormVerifikasiAtasan from "@/components/form/atasan/FormVerifikasiAtasan";
import SiteFooter from "@/components/layout/SiteFooter";
import { decryptId } from "@/lib/crypto";
import { db } from "@/lib/db";
import { format } from "date-fns";
import React from "react";

export default async function VerifikasiKepala({
  params,
}: {
  params: { id: string };
}) {
  const encryptedParams = params.id;
  const id = decryptId(encryptedParams);

  const paramsInt = parseInt(id, 10);

  const response = await db.cuti.findUniqueOrThrow({
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
    idCuti: response.id,
    namaLengkap: response.namaLengkap,
    nip: response.nip,
    jenisCuti: response.jenisCuti.namaCuti,
    idJenisCuti: response.jenisCuti.id,
    lamaCuti: response.lamaCuti,
    tanggalMulai: format(new Date(response.tanggalMulai), "MM/dd/yyyy"),
    tanggalSelesai: format(new Date(response.tanggalSelesai), "MM/dd/yyyy"),
    keteranganCuti: response.keterangan,
    namaPengganti: response.pengganti.namaLengkap || "",
    nipPengganti: response.pengganti.nip || "",
  };

  const kepala = {};

  return (
    <div className="grid items-center justify-center w-full min-h-screen">
      <DetailPengajuanCuti cuti={data} />
      {/* database tdk ada relasi dengan kepala || sementara hardcoded */}
      <FormVerifikasiAtasan
        cuti={data}
        atasanDetail={{ id: 5, nip: "111222" }}
      />
      <SiteFooter />
    </div>
  );
}
