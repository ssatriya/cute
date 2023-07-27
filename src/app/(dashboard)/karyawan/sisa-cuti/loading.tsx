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

export default function SisaCutiLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Sisa Cuti Tahunan" />
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