import DataAddButton from "@/components/DataAddButton";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  KaryawanType,
  columns,
} from "@/app/(dashboard)/admin/(table)/data-karyawan/columns";
import { DataTable } from "@/components/ui/DataTable";
import { db } from "@/lib/db";
import { Metadata } from "next/types";
import DashboardTableShell from "@/components/layout/DashboardTableShell";

export const metadata: Metadata = {
  title: "Data Karyawan",
};

async function getData(): Promise<KaryawanType[]> {
  try {
    const response = await db.user.findMany({
      select: {
        id: true,
        nip: true,
        namaLengkap: true,
        email: true,
        role: true,
        jabatan: {
          select: {
            namaJabatan: true,
          },
        },
      },
    });

    const data = response.map((k) => ({
      id: k.id,
      nip: k.nip || "",
      namaLengkap: k.namaLengkap || "",
      email: k.email || "",
      role: k.role || "",
      jabatan: k.jabatan?.namaJabatan || "",
    }));

    return data;
  } catch (error: any) {
    return [];
  }
}

export default async function TableKaryawan() {
  const data = await getData();

  return (
    <DashboardTableShell
      title="Data Karyawan"
      description="Daftar data karyawan"
      buttonPath="/admin/form-bagian"
    >
      <DataTable columns={columns} data={data} />
    </DashboardTableShell>
  );
}
