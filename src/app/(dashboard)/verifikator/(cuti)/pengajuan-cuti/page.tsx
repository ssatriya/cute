import FormPengajuanCuti from "@/components/form/FormPengajuanCuti";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAuthSession } from "@/lib/auth";
import React from "react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Pengajuan Cuti",
};

export default async function page() {
  const session = await getAuthSession();

  if (!session) {
    return <p>Not authorized</p>;
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
