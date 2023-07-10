import VerifikatorDetail from "@/components/VerifikatorDetail";
import FormVerifikasiBerkas from "@/components/form/verifikator/FormVerifikasiBerkas";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import React from "react";

interface VerifikasiBerkasProps {
  params: {
    id: string;
  };
}

export default function VerifikasiBerkas({ params }: VerifikasiBerkasProps) {
  const id = +params.id;

  return (
    <DashboardShell>
      <DashboardHeader heading="Verifikasi Berkas Cuti" />
      <div className="grid gap-8">
        <VerifikatorDetail />
        <FormVerifikasiBerkas id={id} />
      </div>
    </DashboardShell>
  );
}
