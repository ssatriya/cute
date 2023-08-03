import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import React from "react";

export default function DataKaryawanLoading() {
  return (
    <div className="flex flex-col p-8 space-y-8 overflow-x-hidden border rounded-md">
      <div className="flex flex-col items-start gap-6 sm:flex-row xs:justify-between">
        <div className="flex flex-col w-full gap-2">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="w-full h-6 xs:w-80" />
        </div>
        <Skeleton className="w-[145px] h-10" />
      </div>
      <Skeleton className="h-32" />
    </div>
  );
}
