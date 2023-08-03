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
import {
  columns,
  SisaCutiType,
} from "@/app/(dashboard)/karyawan/sisa-cuti/columns";
import { Metadata } from "next/types";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const metadata: Metadata = {
  title: "Sisa Cuti Tahunan",
};

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

  const cutiTersedia =
    sisaCutiN?.sisaCuti! + sisaCutiN1?.sisaCuti! + sisaCutiN2?.sisaCuti!;

  const data: SisaCutiType[] = [
    {
      nama: userData?.namaLengkap!,
      cutiTersedia: cutiTersedia > 12 ? 12 : cutiTersedia,
      cutiDiambilN: sisaCutiN?.lamaCuti!,
      cutiDiambilN1: sisaCutiN1?.lamaCuti!,
      cutiDiambilN2: sisaCutiN2?.lamaCuti!,
      sisaCutiN: sisaCutiN?.sisaCuti!,
      sisaCutiN1: sisaCutiN1?.sisaCuti!,
      sisaCutiN2: sisaCutiN2?.sisaCuti!,
    },
  ];

  return (
    <div className="flex flex-col p-8 space-y-8 overflow-x-hidden border rounded-md md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Sisa Cuti Tahunan
          </h2>
          <p className="text-muted-foreground">
            Sisa cuti tahunan Anda pada tahun berjalan
          </p>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
