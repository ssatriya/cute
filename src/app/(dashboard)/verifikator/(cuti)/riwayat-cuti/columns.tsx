"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/Badge";

export type RiwayatType = {
  id: number;
  nip: string;
  nama: string;
  tanggalPengajuan: Date;
  tanggalMulai: Date;
  lamaCuti: number;
  jenisCuti: string;
  status: string;
  unduhBerkas: string;
};

export const columns: ColumnDef<RiwayatType>[] = [
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "nama",
    header: "Name",
  },
  {
    accessorKey: "tanggalPengajuan",
    header: "Tanggal Pengajuan",
    cell: ({ row }) => {
      const date = new Date(row.getValue("tanggalPengajuan"));
      const formatted = date.toLocaleDateString("id-ID", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "2-digit",
      });

      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "tanggalMulai",
    header: "Tanggal Mulai",
    cell: ({ row }) => {
      const date = new Date(row.getValue("tanggalMulai"));
      const formatted = date.toLocaleDateString("id-ID", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "2-digit",
      });

      return <div className="text-left">{formatted}</div>;
    },
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return <Badge variant="outline">{status}</Badge>;
    },
  },
  {
    accessorKey: "unduhBerkas",
    header: "Unduh Berkas",
  },
];
