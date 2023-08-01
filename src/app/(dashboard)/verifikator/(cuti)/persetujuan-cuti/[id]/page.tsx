import DetailPengajuanCuti from "@/components/DetailPengajuanCuti";
import FormPegawaiPengganti from "@/components/form/FormPegawaiPengganti";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { format } from "date-fns";
import React from "react";

interface PersetujuanPenggantiProps {
  params: {
    id: string;
  };
}

export default async function PersetujuanPengganti({
  params,
}: PersetujuanPenggantiProps) {
  const paramsId = parseInt(params.id, 10);
  const currentUser = await getCurrentUser();

  const userId = parseInt(currentUser!.id, 10);

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
      id: paramsId,
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

  return (
    <DashboardShell>
      <DashboardHeader heading="Form Persetujuan" />
      <DetailPengajuanCuti cuti={data} />
      {currentUser?.namaLengkap && currentUser.role && (
        <FormPegawaiPengganti
          user={{
            id: userId,
            namaLengkap: currentUser.namaLengkap,
            role: currentUser.role,
          }}
          idCuti={paramsId}
        />
      )}
    </DashboardShell>
  );
}
