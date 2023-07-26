import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { Alert } from "@/components/ui/Alert";
import { Skeleton } from "@/components/ui/Skeleton";
import React from "react";

export default function DashboardKaryawanLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" />
      <Alert>
        <div className="flex gap-4">
          <Skeleton className="w-4 h-4" />
          <div className="flex flex-col w-full">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="w-[90%] h-4 mt-2" />
          </div>
        </div>
      </Alert>
    </DashboardShell>
  );
}
