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
  StatusVerifikasiBerkas,
  columns,
} from "@/app/(dashboard)/verifikator/status-verifikasi/columns";

async function getData(): Promise<StatusVerifikasiBerkas[]> {
  try {
    const response = await fetch(
      "http://localhost:3000/api/verifikator/status-verifikasi",
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

export default async function StatusVerifikasi() {
  const data = await getData();

  return (
    <DashboardShell>
      <DashboardHeader heading="Verifikasi Berkas"></DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Status Verifikasi Berkas</CardTitle>
          <CardDescription>Daftar semua verifikasi berkas</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
