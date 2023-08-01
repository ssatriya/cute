import { DataTable } from "@/components/ui/DataTable";
import DashboardShell from "@/components/layout/DashboardShell";
import DashboardHeader from "@/components/layout/DashboardHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Sisa Cuti",
};

export default function columns() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Sisa Cuti" />
      <Card>
        <CardHeader>
          <CardTitle>Sisa Cuti Tahunan</CardTitle>
          <CardDescription>
            Sisa cuti tahunan Anda pada tahun berjalan
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <DataTable columns={columns} data={data} /> */}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
