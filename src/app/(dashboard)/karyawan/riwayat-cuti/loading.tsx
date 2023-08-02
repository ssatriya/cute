import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import React from "react";

export default function RiwayatCutiLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Riwayat Cuti" />
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <Skeleton className="w-[260px] h-6" />
            <Skeleton className="w-[200px] h-5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-36" />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
