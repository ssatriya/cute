import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import {
  StatusVerifikasiAtasan,
  columns,
} from "@/app/(dashboard)/atasan/(verifikasi)/status-verifikasi/columns";
import { getStatusVerifikasiAtasan } from "@/lib/actions/atasan";

export default async function StatusVerifikasiAtasan() {
  const data = await getStatusVerifikasiAtasan();

  return (
    <DashboardShell>
      <DashboardHeader heading="Verifikasi Atasan"></DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Status Verifikasi</CardTitle>
          <CardDescription>
            Daftar pengajuan cuti yang telah diverifikasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
