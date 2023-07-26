import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import DashboardShell from "@/components/layout/DashboardShell";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { DataTable } from "@/components/ui/DataTable";

export default function page() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Riwayat Cuti" />
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pengajuan Cuti</CardTitle>
          <CardDescription>Daftar cuti yang pernah diajukan</CardDescription>
        </CardHeader>
        <CardContent>{/* <DataTable /> */}</CardContent>
      </Card>
    </DashboardShell>
  );
}
