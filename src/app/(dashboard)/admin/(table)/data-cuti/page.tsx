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
  columns,
  CutiType,
} from "@/app/(dashboard)/admin/(table)/data-cuti/columns";
import { DataTable } from "@/components/ui/DataTable";
import { db } from "@/lib/db";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Data Cuti",
};

async function getData(): Promise<CutiType[]> {
  try {
    const response = await db.jenisCuti.findMany();

    const data = response.map((cuti) => ({
      id: cuti.id,
      namaCuti: cuti.namaCuti,
      lamaCuti: cuti.lamaCuti,
    }));

    return data;
  } catch (error) {
    return [];
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
