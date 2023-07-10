"use client";

import { ColumnDef } from "@tanstack/react-table";

import VerifikasiBerkasButton from "@/components/VerifikasiBerkasButton";

export type DataVerifikasiBerkas = {
  id: number;
  nip: string;
  nama: string;
  tanggalPengajuan: string;
  mulaiCuti: string;
  lamaCuti: number;
  jenisCuti: string;
  keteranganCuti: string;
};

export const columns: ColumnDef<DataVerifikasiBerkas>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "tanggalPengajuan",
    header: "Tanggal Pengajuan",
  },
  {
    accessorKey: "mulaiCuti",
    header: "Mulai Cuti",
  },
  {
    accessorKey: "lamaCuti",
    header: "Lama Cuti",
    cell: ({ row }) => {
      const lamaCuti = row.getValue("lamaCuti");

      return <div className="text-left">{`${lamaCuti} hari`}</div>;
    },
  },
  {
    accessorKey: "jenisCuti",
    header: "Jenis Cuti",
  },
  {
    accessorKey: "keteranganCuti",
    header: "Keterangan Cuti",
  },
  {
    accessorKey: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const id = row.original.id;

      return <VerifikasiBerkasButton id={id} />;
    },
  },
];
