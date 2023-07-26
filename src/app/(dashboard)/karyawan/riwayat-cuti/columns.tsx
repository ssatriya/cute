"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/Badge";
import { StatusCuti } from "@prisma/client";
import ActionButtonCog from "@/components/ActionButtonCog";
import { firstWordCapitalize } from "@/lib/stringFormatter";
import DialogBadge from "@/components/DialogBadge";

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

      return <DialogBadge status={status} />;
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
        return null;
      }
    },
  },
];
