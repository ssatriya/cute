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
  BagianType,
  columns,
} from "@/app/(dashboard)/admin/(table)/data-bagian/columns";
import { DataTable } from "@/components/ui/DataTable";
import { db } from "@/lib/db";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Data Bagian",
};

async function getData(): Promise<BagianType[]> {
  try {
    const response = await db.bagian.findMany({
      select: {
        id: true,
        namaBagian: true,
        atasan: {
          select: {
            namaLengkap: true,
            nip: true,
          },
        },
      },
    });

    const data = response.map((b) => ({
      id: b.id,
      namaBagian: b.namaBagian,
      atasan: b.atasan.namaLengkap!,
      nipAtasan: b.atasan.nip!,
    }));

    return data;
  } catch (error: any) {
    return [];
  }
}

export default async function TableBagian() {
  const data = await getData();

  return (
    <DashboardShell>
      <DashboardHeader heading="Data Bagian">
        <DataAddButton buttonName="Tambah Data" url="/admin/form-bagian" />
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Data Bagian</CardTitle>
          <CardDescription>Daftar semua data bagian di kantor</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
