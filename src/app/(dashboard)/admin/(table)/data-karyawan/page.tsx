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
  KaryawanType,
  columns,
} from "@/app/(dashboard)/admin/(table)/data-karyawan/columns";
import { DataTable } from "@/components/ui/DataTable";

async function getData(): Promise<KaryawanType[]> {
  try {
    const response = await fetch("http://localhost:3000/api/admin/karyawan", {
      cache: "no-store",
    });
    const { result } = await response.json();
    return result;
  } catch (error: any) {
    return [];
  }
}

export default async function TableKaryawan() {
  const data = await getData();

  return (
    <DashboardShell>
      <DashboardHeader heading="Data Karyawan">
        <DataAddButton url="/admin/form-karyawan" buttonName="Tambah Data" />
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Data Karyaran</CardTitle>
          <CardDescription>Daftar data karyawan</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
