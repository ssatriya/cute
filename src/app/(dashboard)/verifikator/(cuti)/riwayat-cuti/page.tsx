import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import DashboardShell from "@/components/layout/DashboardShell";
import DashboardHeader from "@/components/layout/DashboardHeader";

import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Riwayat Cuti",
};

export default function page() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Riwayat Cuti" />
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pengajuan Cuti</CardTitle>
          <CardDescription>Daftar cuti yang pernah diajukan</CardDescription>
        </CardHeader>
        <CardContent>{/* <DataTable /> */}</CardContent>
      </Card>
    </DashboardShell>
  );
}
