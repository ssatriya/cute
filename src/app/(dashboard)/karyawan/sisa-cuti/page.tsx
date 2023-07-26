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
import { columns } from "@/app/(dashboard)/karyawan/sisa-cuti/columns";
import { Metadata } from "next/types";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const metadata: Metadata = {
  title: "Sisa Cuti Tahunan",
};

async function getData() {
  // const res = await fetch("http://localhost:3000/api/karyawan/data-cuti");
  // const data = await res.json();
  // return [];
}

export default async function SisaCutiKaryawan() {
  const currentUser = await getCurrentUser();
  const userId = parseInt(currentUser!.id, 10);

  const [userData, sisaCutiN, sisaCutiN1, sisaCutiN2] = await db.$transaction([
    db.user.findUnique({
      where: {
        id: userId,
      },
    }),
    db.sisacutin.findUnique({
      select: {
        sisaCuti: true,
        lamaCuti: true,
      },
      where: {
        userId: userId,
      },
    }),
    db.sisacutin1.findUnique({
      select: {
        sisaCuti: true,
        lamaCuti: true,
      },
      where: {
        userId: userId,
      },
    }),
    db.sisacutin2.findUnique({
      select: {
        sisaCuti: true,
        lamaCuti: true,
      },
      where: {
        userId: userId,
      },
    }),
  ]);

  // console.log(sisaCutiN, sisaCutiN1, sisaCutiN2);

  return (
    <DashboardShell>
      <DashboardHeader heading="Sisa Cuti Tahunan" />
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
