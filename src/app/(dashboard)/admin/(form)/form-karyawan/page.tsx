import FormTambahKaryawan from "@/components/form/admin/FormTambahKaryawan";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";

export default function FormKaryawan() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Pengajuan Cuti" />
      <div className="grid gap-8">
        <FormTambahKaryawan />
      </div>
    </DashboardShell>
  );
}
