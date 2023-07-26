import VerifikatorDetail from "@/components/VerifikatorDetail";
import FormVerifikasiBerkas from "@/components/form/verifikator/FormVerifikasiBerkas";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { redirect } from "next/navigation";

import React from "react";

interface VerifikasiBerkasProps {
  params: {
    id: string;
  };
}

export default async function VerifikasiBerkas({
  params,
}: VerifikasiBerkasProps) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/");
  }

  const id = params.id;

  if (!id) {
    return null;
  }

  const numberId = parseInt(id, 10);

  const response = await db.cuti.findUnique({
    where: {
      id: numberId,
    },
    select: {
      id: true,
      idJenisCuti: true,
      nip: true,
      namaLengkap: true,
      pemohonId: {
        select: {
          jabatanId: {
            select: {
              namaJabatan: true,
            },
          },
        },
      },
      keterangan: true,
      lamaCuti: true,
      tanggalMulai: true,
      tanggalSelesai: true,
      alamatSelamaCuti: true,
      berkas: true,
    },
  });

  if (!response) {
    return <p>Cuti tidak ditemukan</p>;
  }

  const data = {
    idCuti: response.id,
    idJenisCuti: response.idJenisCuti,
    nip: response.nip,
    namaLengkap: response.namaLengkap,
    namaJabatan: response.pemohonId.jabatanId!.namaJabatan,
    keteranganCuti: response.keterangan,
    lamaCuti: response.lamaCuti,
    tanggalMulai: format(response.tanggalMulai, "MM/dd/yyyy"),
    tanggalSelesai: format(response.tanggalSelesai, "MM/dd/yyyy"),
    alamatSelamatCuti: response.alamatSelamaCuti,
    berkas: response.berkas || "",
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Verifikasi Berkas Cuti" />
      <div className="grid gap-8">
        <VerifikatorDetail cuti={data} />
        <FormVerifikasiBerkas cuti={data} session={session} />
      </div>
    </DashboardShell>
  );
}
