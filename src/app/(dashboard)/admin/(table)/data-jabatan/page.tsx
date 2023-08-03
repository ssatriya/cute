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
import { DataTable } from "@/components/ui/DataTable";
import {
  JabatanType,
  columns,
} from "@/app/(dashboard)/admin/(table)/data-jabatan/columns";
import { db } from "@/lib/db";

import { Metadata } from "next/types";
import DashboardTableShell from "@/components/layout/DashboardTableShell";

export const metadata: Metadata = {
  title: "Data Jabatan",
};

async function getData(): Promise<JabatanType[]> {
  try {
    const response = await db.jabatan.findMany({
      select: {
        id: true,
        namaJabatan: true,
        bagian: {
          select: {
            namaBagian: true,
          },
        },
      },
    });

    const data = response.map((j) => ({
      id: j.id,
      namaJabatan: j.namaJabatan,
      namaBagian: j.bagian.namaBagian,
    }));
    return data;
  } catch (error: any) {
    return [];
  }
}

export default async function TableJabatan() {
  const data = await getData();

  return (
    <DashboardTableShell
      title="Daftar Data Jabatan"
      description="Daftar data jabatan yang tersedia"
      buttonPath="/admin/form-jabatan"
    >
      <DataTable columns={columns} data={data} />
    </DashboardTableShell>
  );
}
