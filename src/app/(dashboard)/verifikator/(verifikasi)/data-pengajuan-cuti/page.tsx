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
import { columns } from "@/app/(dashboard)/verifikator/(verifikasi)/data-pengajuan-cuti/columns";
import { getDataPengajuanCuti } from "@/lib/actions/verifikator";
import { Metadata } from "next/types";
import DashboardTableShell from "@/components/layout/DashboardTableShell";

export const metadata: Metadata = {
  title: "Data Pengajuan",
};

export default async function TablePengajuanCuti() {
  const data = await getDataPengajuanCuti();

  return (
    <DashboardTableShell
      title="Data Pengajuan Cuti"
      description="Daftar pengajuan cuti yang belum diverifikasi"
    >
      <DataTable columns={columns} data={data} />
    </DashboardTableShell>
  );
}
