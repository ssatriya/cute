import FormPengajuanCuti from "@/components/form/FormPengajuanCuti";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAuthSession } from "@/lib/auth";
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

  return (
    <DashboardShell>
      <DashboardHeader heading="Pengajuan Cuti" />
      <div className="grid gap-8">
        <FormPengajuanCuti user={session.user} />
      </div>
    </DashboardShell>
  );
}
