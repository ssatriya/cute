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

async function getData(): Promise<KaryawanType[]> {
  try {
    const response = await db.user.findMany({
      select: {
        id: true,
        nip: true,
        namaLengkap: true,
        email: true,
        role: true,
        jabatanId: {
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
      jabatan: k.jabatanId?.namaJabatan || "",
    }));

    return data;
  } catch (error: any) {
    return [];
  }
}

export default async function TableKaryawan() {
  const data = await getData();

  return (
    <DashboardShell>
      <DashboardHeader heading="Data Karyawan">
        <DataAddButton url="/admin/form-karyawan" buttonName="Tambah Data" />
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Data Karyaran</CardTitle>
          <CardDescription>Daftar data karyawan</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
