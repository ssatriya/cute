import ProfilAlert from "@/components/ProfilAlert";
import FormPengajuanCuti from "@/components/form/FormPengajuanCuti";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = {
  title: "Pengajuan Cuti",
  description: "Formulir pengajuan cuti.",
};

export default async function page() {
  const session = await getAuthSession();

  if (!session) {
    return <p>Not authorized</p>;
  }

  const checkSetup = await db.user.findUniqueOrThrow({
    where: {
      id: +session.user.id,
    },
  });

  if (checkSetup.setup === 0) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Pengajuan Cuti" />
        <div className="grid gap-8">
          <ProfilAlert path="karyawan" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Pengajuan Cuti" />
      <div className="grid gap-8">
        <FormPengajuanCuti user={session.user} />
      </div>
    </DashboardShell>
  );
}
