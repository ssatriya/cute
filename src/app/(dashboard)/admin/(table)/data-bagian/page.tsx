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
import {
  BagianType,
  columns,
} from "@/app/(dashboard)/admin/(table)/data-bagian/columns";
import { DataTable } from "@/components/ui/DataTable";

async function getData(): Promise<BagianType[]> {
  try {
    const response = await fetch("http://localhost:3000/api/admin/bagian", {
      cache: "no-store",
    });
    const { result } = await response.json();
    return result;
  } catch (error: any) {
    return [];
  }
}

export default async function TableBagian() {
  const data = await getData();

  return (
    <DashboardShell>
      <DashboardHeader heading="Data Bagian">
        <DataAddButton buttonName="Tambah Data" url="/admin/form-bagian" />
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Data Setiap Bagian</CardTitle>
          <CardDescription>Daftar semua data bagian di kantor</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
