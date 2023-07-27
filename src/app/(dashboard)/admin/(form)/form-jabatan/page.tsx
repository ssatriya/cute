import FormTambahJabatan from "@/components/form/admin/FormTambahJabatan";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Input Data Jabatan",
};

export default function FormJabatan() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tambah Data Jabatan" />
      <div className="grid gap-8">
        <FormTambahJabatan />
      </div>
    </DashboardShell>
  );
}
