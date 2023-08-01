import DetailPengajuanCuti from "@/components/DetailPengajuanCuti";
import FormVerifikasiAtasan from "@/components/form/atasan/FormVerifikasiAtasan";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import React from "react";

interface VerifikasiAtasanProps {
  params: {
    id: string;
  };
}

export default async function VerifikasiAtasan({
  params,
}: VerifikasiAtasanProps) {
  const id = params.id;

  const session = await getAuthSession();
  const currentUser = await getCurrentUser();

  if (!session) {
    redirect("/");
  }

  const numberId = parseInt(id, 10);

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
      id: numberId,
    },
  });

  const dataAtasan = await db.user.findUniqueOrThrow({
    select: {
      id: true,
      nip: true,
    },
    where: {
      id: Number(currentUser?.id),
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
      <DashboardHeader heading="Verifikasi Pengajuan Cuti" />
      <div className="grid gap-8">
        <DetailPengajuanCuti cuti={data} />
        <FormVerifikasiAtasan
          cuti={data}
          atasanDetail={{ id: dataAtasan.id, nip: dataAtasan.nip! }}
        />
      </div>
    </DashboardShell>
  );
}
