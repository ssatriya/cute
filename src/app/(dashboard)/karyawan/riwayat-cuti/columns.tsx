"use client";

import { ColumnDef } from "@tanstack/react-table";

import ActionButtonCog from "@/components/ActionButtonCog";
import DialogBadge from "@/components/DialogBadge";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown, FileDown } from "lucide-react";

export type RiwayatType = {
  id: number;
  nip: string;
  namaLengkap: string;
  tanggalPengajuan: Date;
  lamaCuti: number;
  jenisCuti: string;
  statusAkhir: string;
};

// RolePengguna[role as keyof typeof RolePengguna]

export const columns: ColumnDef<RiwayatType>[] = [
  {
    accessorKey: "no",
    header: () => {
      return <div className="text-center">No</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "nip",
    header: () => {
      return <div className="text-center">NIP</div>;
    },
  },
  {
    accessorKey: "namaLengkap",
    header: "Name",
  },
  {
    accessorKey: "tanggalPengajuan",
    header: ({ column }) => {
      return (
        <div className="text-left">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0 text-left hover:bg-transparent"
          >
            Tanggal Pengajuan
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      );
    },
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
    accessorKey: "statusAkhir",
    header: () => {
      return <div className="text-center">Status</div>;
    },
    cell: ({ row }) => {
      const status: string = row.getValue("statusAkhir");
      const id = row.original.id;

      return (
        <DialogBadge status={status} id={id} title="Detail Pengajuan Cuti" />
      );
    },
  },
  {
    accessorKey: "unduhBerkas",
    header: () => {
      return <div className="text-center">Unduh Berkas</div>;
    },
    cell: ({ row }) => {
      const id = row.original.id;
      const status: string = row.getValue("statusAkhir");

      if (status === "diterima") {
        return (
          <div className="flex items-center justify-center">
            <ActionButtonCog rowId={id} />
          </div>
        );
      } else {
        return (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              className="w-8 h-8 p-0 cursor-not-allowed opacity-40"
            >
              <FileDown className="w-4 h-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        );
      }
    },
  },
];
