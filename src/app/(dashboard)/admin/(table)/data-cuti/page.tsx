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
import DashboardTableShell from "@/components/layout/DashboardTableShell";

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
    <DashboardTableShell
      title="Data Jenis Cuti"
      description="Daftar jenis cuti yang tersedia"
      buttonPath="/admin/form-cuti"
    >
      <DataTable columns={columns} data={data} />
    </DashboardTableShell>
  );
}
