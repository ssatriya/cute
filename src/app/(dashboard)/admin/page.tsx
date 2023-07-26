import PengaturanAlert from "@/components/PengaturanAlert";
import ProfilAlert from "@/components/ProfilAlert";
import FormPegawaiPengganti from "@/components/form/FormPegawaiPengganti";
import FormPengaturanProfil from "@/components/form/FormPengaturanProfil";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/");
  }

  const numberId = parseInt(session.user.id, 10);

  const pengganti = await db.cuti.findFirst({
    select: {
      id: true,
      persetujuanPengganti: true,
      penggantiId: {
        select: {
          namaLengkap: true,
        },
      },
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

  // if (userProfil?.setup === 0) {
  //   return redirect("/admin/pengaturan");
  // }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" />
      <ProfilAlert path="admin" />
    </DashboardShell>
  );
}
