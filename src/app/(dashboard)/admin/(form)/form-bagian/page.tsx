import FormTambahBagian from "@/components/form/admin/FormTambahBagian";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";

export default function FormBagian() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tambah Data Bagian" />
      <div className="grid gap-8">
        <FormTambahBagian />
      </div>
    </DashboardShell>
  );
}
