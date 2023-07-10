import DataAddButton from "@/components/DataAddButton";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { columns } from "@/app/(dashboard)/admin/(table)/data-cuti/columns";
import { DataTable } from "@/components/ui/DataTable";

async function getData() {
  try {
    const response = await fetch("http://localhost:3000/api/admin/cuti", {
      cache: "no-store",
    });
    const { result } = await response.json();

    return result;
  } catch (error) {
    return {};
  }
}

export default async function TableCuti() {
  const data = await getData();

  return (
    <DashboardShell>
      <DashboardHeader heading="Data Cuti">
        <DataAddButton buttonName="Tambah Data" url="/admin/form-cuti" />
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Data Jenis Cuti</CardTitle>
          <CardDescription>Daftar jenis cuti yang tersedia</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
