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

export default function FormBagianLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tambah Data Bagian" />
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <Skeleton className="w-[240px] h-6" />
            <Skeleton className="w-[290px] h-5" />
          </CardHeader>
          <CardContent className="mt-1">
            <div>
              <Skeleton className="w-[88px] h-[17px]" />
              <Skeleton className="w-full h-10 mt-[11px]" />
            </div>
            <div className="mt-[22px]">
              <Skeleton className="w-40 h-[17px]" />
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
