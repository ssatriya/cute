import { DataTable } from "@/components/ui/DataTable";
import {
  StatusVerifikasiAtasan,
  columns,
} from "@/app/(dashboard)/atasan/(verifikasi)/status-verifikasi/columns";
import { getStatusVerifikasiAtasan } from "@/lib/actions/atasan";
import DashboardTableShell from "@/components/layout/DashboardTableShell";

export default async function StatusVerifikasiAtasan() {
  const data = await getStatusVerifikasiAtasan();

  return (
    <DashboardTableShell
      title="Status Verifikasi"
      description="Daftar pengajuan cuti yang telah diverifikasi"
    >
      <DataTable columns={columns} data={data} />
    </DashboardTableShell>
  );
}
