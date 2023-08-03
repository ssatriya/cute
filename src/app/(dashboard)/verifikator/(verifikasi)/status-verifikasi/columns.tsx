"use client";

import DialogBadge from "@/components/DialogBadge";
import { Button } from "@/components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

export type StatusVerifikasiBerkas = {
  id: number;
  nip: string;
  namaLengkap: string;
  tanggalPengajuan: string;
  tanggalMulai: string;
  lamaCuti: number;
  jenisCuti: string;
  keteranganCuti: string;
  statusVerifikasi: string;
  tanggalVerifikasi: string;
};

export const columns: ColumnDef<StatusVerifikasiBerkas>[] = [
  {
    accessorKey: "nomor",
    header: () => {
      return <div className="flex justify-center">No</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "namaLengkap",
    header: "Nama",
  },
  {
    accessorKey: "tanggalVerifikasi",
    header: "Tanggal Verifikasi",
    cell: ({ row }) => {
      const formatTanggal = format(
        new Date(row.getValue("tanggalVerifikasi")),
        "MM/dd/yyyy"
      );

      return <div>{formatTanggal}</div>;
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
    accessorKey: "statusVerifikasi",
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <span>Status</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const id = Number(row.original.id);
      const status: string = row.getValue("statusVerifikasi");

      return (
        <DialogBadge
          status={status}
          id={id}
          title="Detil status verifikasi berkas"
        />
      );
    },
  },
];
