import FormTambahCuti from "@/components/form/admin/FormTambahCuti";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Input Data Cuti",
};

export default function FormCuti() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tambah Data Cuti" />
      <div className="grid gap-8">
        <FormTambahCuti />
      </div>
    </DashboardShell>
  );
}
