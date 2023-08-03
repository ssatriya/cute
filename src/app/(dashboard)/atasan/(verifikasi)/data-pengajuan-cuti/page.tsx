import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import {
  DataVerifikasiAtasan,
  columns,
} from "@/app/(dashboard)/atasan/(verifikasi)/data-pengajuan-cuti/columns";
import { db } from "@/lib/db";
import { format, subDays } from "date-fns";
import DashboardTableShell from "@/components/layout/DashboardTableShell";

async function getData(): Promise<DataVerifikasiAtasan[]> {
  try {
    const response = await db.cuti.findMany({
      select: {
        id: true,
        nip: true,
        namaLengkap: true,
        tanggalPengajuan: true,
        tanggalMulai: true,
        lamaCuti: true,
        keterangan: true,
        jenisCuti: {
          select: {
            namaCuti: true,
          },
        },
      },
      where: {
        tahapVerifikasi: 2,
        statusAkhir: "proses",
      },
    });

    const data = response.map((cuti) => ({
      id: cuti.id,
      nip: cuti.nip,
      namaLengkap: cuti.namaLengkap,
      tanggalPengajuan: format(cuti.tanggalPengajuan, "MM/dd/yyyy"),
      tanggalMulai: format(subDays(cuti.tanggalMulai, 1), "MM/dd/yyyy"),
      lamaCuti: cuti.lamaCuti,
      jenisCuti: cuti.jenisCuti.namaCuti,
      keteranganCuti: cuti.keterangan,
    }));
    return data;
  } catch (error: any) {
    return [];
  }
}

export default async function TablePengajuanCuti() {
  const data = await getData();

  return (
    <DashboardTableShell
      title="Data Pengajuan Cuti"
      description="Daftar pengajuan yang belum diverifikasi"
    >
      <DataTable columns={columns} data={data} />
    </DashboardTableShell>
  );
}
