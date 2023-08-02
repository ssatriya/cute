import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next/types";
import PersetujuanAlert from "@/components/PersetujuanAlert";
import ProfilAlert from "@/components/ProfilAlert";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function KaryawanPage() {
  const session = await getAuthSession();

  if (!session) {
    return <p>Not authorized</p>;
  }

  const numberId = parseInt(session.user.id, 10);

  const pengganti = await db.cuti.findFirst({
    select: {
      id: true,
      persetujuanPengganti: true,
      namaLengkap: true,
    },
    where: {
      idPengganti: numberId,
      statusAkhir: "proses",
      tahapVerifikasi: 0,
      persetujuanPengganti: null,
    },
  });

  const userProfil = await db.user.findUnique({
    select: {
      id: true,
      setup: true,
      role: true,
    },
    where: {
      id: numberId,
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" />
      <ProfilAlert path="karyawan" />
      {pengganti && <PersetujuanAlert id={pengganti.id} />}
    </DashboardShell>
  );
}
