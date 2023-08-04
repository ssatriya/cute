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

export default function PengaturanVerifikatorLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Pengaturan Profil" />
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <Skeleton className="w-full xs:w-[180px] h-6" />
            <Skeleton className="w-full xs:w-[340px] h-5" />
          </CardHeader>
          <CardContent className="mt-1">
            <div>
              <Skeleton className="w-24 h-[17px]" />
              <Skeleton className="w-full h-10 mt-[11px]" />
            </div>
            <div className="mt-[22px]">
              <Skeleton className="w-6 h-[17px]" />
              <Skeleton className="w-full h-10 mt-[11px]" />
            </div>
            <div className="mt-[22px]">
              <Skeleton className="w-14 h-[17px]" />
              <Skeleton className="w-full h-10 mt-[11px]" />
            </div>

            <div className="grid grid-cols-1 2xl:grid 2xl:grid-cols-2 2xl:gap-6">
              <div className="mt-[22px]">
                <Skeleton className="w-20 h-[17px]" />
                <Skeleton className="w-full h-10 mt-[11px]" />
              </div>
              <div className="mt-[22px]">
                <Skeleton className="h-[17px] w-20" />
                <Skeleton className="w-full h-10 mt-[11px]" />
              </div>
            </div>

            <div className="mt-[22px]">
              <Skeleton className="h-[17px] w-24" />
              <Skeleton className="w-full h-10 mt-[11px]" />
            </div>
            <div className="mt-[22px]">
              <Skeleton className="w-32 h-[17px]" />
              <div className="flex flex-col items-start gap-4 lg:flex lg:items-center lg:flex-row lg:gap-4">
                <Skeleton className="w-full sm:w-[348px] h-[148px] mt-[11px]" />
                <Skeleton className="w-20 h-10" />
                <Skeleton className="w-20 h-10" />
              </div>
              <Skeleton className="w-[full] sm:w-[375px] h-[15px] mt-4" />
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
