import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import DashboardShell from "@/components/layout/DashboardShell";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { DataTable } from "@/components/ui/DataTable";

import { columns } from "@/app/(dashboard)/karyawan/riwayat-cuti/columns";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Riwayat Cuti",
};

export default async function page() {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/");
  }

  const sessionId = parseInt(session?.user.id, 10);

  const response = await db.cuti.findMany({
    select: {
      id: true,
      nip: true,
      namaLengkap: true,
      tanggalPengajuan: true,
      tanggalMulai: true,
      lamaCuti: true,
      jenisCuti: {
        select: {
          namaCuti: true,
        },
      },
      statusAkhir: true,
    },
    where: {
      idPemohon: sessionId,
    },
  });

  const data = response.map((cuti) => ({
    id: cuti.id,
    nip: cuti.nip,
    namaLengkap: cuti.namaLengkap,
    tanggalPengajuan: cuti.tanggalPengajuan,
    tanggalMulai: cuti.tanggalMulai,
    lamaCuti: cuti.lamaCuti,
    jenisCuti: cuti.jenisCuti.namaCuti,
    statusAkhir: cuti.statusAkhir,
  }));

  return (
    <DashboardShell>
      <DashboardHeader heading="Riwayat Cuti" />
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pengajuan Cuti</CardTitle>
          <CardDescription>Daftar cuti yang pernah diajukan</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
