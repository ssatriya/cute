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
    <DashboardShell>
      <DashboardHeader heading="Data Jabatan">
        <DataAddButton buttonName="Tambah Data" url="/admin/form-jabatan" />
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Data Jabatan</CardTitle>
          <CardDescription>Daftar data jabatan yang tersedia</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
