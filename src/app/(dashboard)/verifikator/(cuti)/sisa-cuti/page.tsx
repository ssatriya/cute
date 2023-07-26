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

export default function columns() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Sisa Cuti" />
      <Card>
        <CardHeader>
          <CardTitle>Sisa Cuti</CardTitle>
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
