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

export const metadata: Metadata = {
  title: "Data Pengajuan",
};

export default async function TablePengajuanCuti() {
  const data = await getDataPengajuanCuti();

  return (
    <DashboardShell>
      <DashboardHeader heading="Data Pengajuan Cuti Verifikator"></DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Data Pengajuan Cuti</CardTitle>
          <CardDescription>
            Daftar pengajuan cuti yang belum diverifikasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
