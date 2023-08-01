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
} from "@/app/(dashboard)/verifikator/(verifikasi)/status-verifikasi/columns";
import { getStatusVerifikasiBerkas } from "@/lib/actions/verifikator";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Status Verifikasi",
};

export default async function StatusVerifikasiBerkas() {
  const data = await getStatusVerifikasiBerkas();

  return (
    <DashboardShell>
      <DashboardHeader heading="Verifikasi Berkas"></DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Status Verifikasi Berkas</CardTitle>
          <CardDescription>
            Daftar permohonan cuti yang sudah diverifikasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
