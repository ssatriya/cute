import FormTambahJabatan from "@/components/form/admin/FormTambahJabatan";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";

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
