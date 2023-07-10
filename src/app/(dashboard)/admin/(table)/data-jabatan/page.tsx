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
import { DataTable } from "@/components/ui/DataTable";
import {
  JabatanType,
  columns,
} from "@/app/(dashboard)/admin/(table)/data-jabatan/columns";

async function getData(): Promise<JabatanType[]> {
  try {
    const response = await fetch("http://localhost:3000/api/admin/jabatan", {
      cache: "no-store",
    });
    const { result } = await response.json();
    return result;
  } catch (error: any) {
    return [];
  }
}

export default async function TableJabatan() {
  const data = await getData();

  return (
    <DashboardShell>
      <DashboardHeader heading="Data Jabatan">
        <DataAddButton buttonName="Tambah Data" url="/admin/form-jabatan" />
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Data Jabatan</CardTitle>
          <CardDescription>Daftar data jabatan yang tersedia</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
