import FormPengajuanCuti from "@/components/form/karyawan/FormPengajuanCuti";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import React from "react";

export default function page() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Pengajuan Cuti" />
      <div className="grid gap-8">
        <FormPengajuanCuti />
      </div>
    </DashboardShell>
  );
}
