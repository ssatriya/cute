import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";

import { Skeleton } from "@/components/ui/Skeleton";
import React from "react";

export default function PengajuanCutiVerifikatorLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Pengajuan Cuti" />
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <Skeleton className="w-[260px] h-6" />
            <Skeleton className="w-[260px] h-5" />
          </CardHeader>
          <CardContent className="mt-1">
            <div className="my-[22px]">
              <Skeleton className="w-32 h-[17px]" />
              <Skeleton className="w-full h-10 mt-[11px]" />
            </div>
            <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 lg:gap-6">
              <div className="">
                <Skeleton className="w-16 h-[17px]" />
                <Skeleton className="w-full h-10 mt-[11px]" />
              </div>
              <div className="mt-[22px] lg:mt-[0px]">
                <Skeleton className="w-20 h-[17px]" />
                <Skeleton className="w-full h-10 mt-[11px]" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 lg:gap-6">
              <div className="mt-[22px]">
                <Skeleton className="w-20 h-[17px]" />
                <Skeleton className="w-full h-20 mt-[11px]" />
              </div>
              <div className="mt-[22px]">
                <Skeleton className="h-[17px] w-11" />
                <Skeleton className="w-full h-20 mt-[11px]" />
              </div>
            </div>

            <div className="mt-[22px]">
              <Skeleton className="h-[17px] w-11" />
              <Skeleton className="w-full h-40 mt-[11px]" />
            </div>
            <div className="mt-[22px]">
              <Skeleton className="w-32 h-[17px]" />
              <Skeleton className="w-full h-10 mt-[11px]" />
            </div>
          </CardContent>
          <CardFooter className="mt-[2px]">
            <Skeleton className="w-20 h-10" />
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
}
