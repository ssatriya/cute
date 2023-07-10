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
  DataVerifikasiBerkas,
  columns,
} from "@/app/(dashboard)/verifikator/data-pengajuan-cuti/columns";

async function getData(): Promise<DataVerifikasiBerkas[]> {
  try {
    const response = await fetch(
      "http://localhost:3000/api/verifikator/data-verifikasi",
      {
        cache: "no-store",
      }
    );
    const { result } = await response.json();

    return result;
  } catch (error: any) {
    return [];
  }
}

export default async function TablePengajuanCuti() {
  const data = await getData();

  return (
    <DashboardShell>
      <DashboardHeader heading="Data Pengajuan Cuti Verifikator"></DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Data Pengajuan Cuti</CardTitle>
          <CardDescription>Daftar semua pengajuan cuti</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
