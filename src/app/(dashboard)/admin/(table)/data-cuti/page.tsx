import {
  columns,
  CutiType,
} from "@/app/(dashboard)/admin/(table)/data-cuti/columns";
import { DataTable } from "@/components/ui/DataTable";
import { Metadata } from "next/types";
import DashboardTableShell from "@/components/layout/DashboardTableShell";
import Refresher from "@/components/Refresher";

export const metadata: Metadata = {
  title: "Data Cuti",
};

export const dynamic = "force-dynamic";

async function getData(): Promise<CutiType[]> {
  try {
    const request = await fetch("http://localhost:3000/api/admin/cuti", {
      cache: "no-store",
    });
    const dataFetch = await request.json();

    return dataFetch.result;
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
      <Refresher />
      <DataTable columns={columns} data={data} />
    </DashboardTableShell>
  );
}
