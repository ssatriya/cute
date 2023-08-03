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
import DashboardTableShell from "@/components/layout/DashboardTableShell";

export const metadata: Metadata = {
  title: "Status Verifikasi",
};

export default async function StatusVerifikasiBerkas() {
  const data = await getStatusVerifikasiBerkas();

  return (
    <DashboardTableShell
      title="Status Verifikasi Berkas"
      description="Daftar berkas cuti yang sudah diverifikasi"
    >
      <DataTable columns={columns} data={data} />
    </DashboardTableShell>
  );
}
