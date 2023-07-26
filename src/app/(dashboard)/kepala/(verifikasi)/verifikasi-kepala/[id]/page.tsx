import DetailPengajuanCuti from "@/components/DetailPengajuanCuti";
import FormVerifikasiKepala from "@/components/form/kepala/FormVerifikasiKepala";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import React from "react";

interface VerifikasiKepalaProps {
  params: {
    id: string;
  };
}

export default async function VerifikasiKepala({
  params,
}: VerifikasiKepalaProps) {
  const id = params.id;
  const session = await getAuthSession();

  if (!session) {
    redirect("/");
  }

  const numberId = parseInt(id, 10);

  const response = await db.cuti.findUnique({
    select: {
      id: true,
      namaLengkap: true,
      nip: true,
      jenisCutiId: {
        select: {
          namaCuti: true,
          id: true,
        },
      },
      lamaCuti: true,
      tanggalMulai: true,
      tanggalSelesai: true,
      keterangan: true,
      penggantiId: {
        select: {
          namaLengkap: true,
          nip: true,
        },
      },
    },
    where: {
      id: numberId,
    },
  });

  if (!response) {
    return <p>Cuti tidak ditemukan</p>;
  }
  const data = {
    idCuti: response.id,
    namaLengkap: response.namaLengkap,
    nip: response.nip,
    jenisCuti: response.jenisCutiId.namaCuti,
    idJenisCuti: response.jenisCutiId.id,
    lamaCuti: response.lamaCuti,
    tanggalMulai: format(new Date(response.tanggalMulai), "MM/dd/yyyy"),
    tanggalSelesai: format(new Date(response.tanggalSelesai), "MM/dd/yyyy"),
    keteranganCuti: response.keterangan,
    namaPengganti: response.penggantiId.namaLengkap || "",
    nipPengganti: response.penggantiId.nip || "",
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Verifikasi Pengajuan Cuti" />
      <div className="grid gap-8">
        <DetailPengajuanCuti cuti={data} />
        <FormVerifikasiKepala cuti={data} session={session} />
      </div>
    </DashboardShell>
  );
}
