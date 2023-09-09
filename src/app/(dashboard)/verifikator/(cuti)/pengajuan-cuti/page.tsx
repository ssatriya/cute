import FormPengajuanCuti from "@/components/form/FormPengajuanCuti";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAuthSession } from "@/lib/auth";
import React from "react";
import { Metadata } from "next/types";
import ProfilAlert from "@/components/ProfilAlert";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Pengajuan Cuti",
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
          <ProfilAlert path="verifikator" />
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
