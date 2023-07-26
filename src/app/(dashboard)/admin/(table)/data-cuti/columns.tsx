"use client";

import { ColumnDef } from "@tanstack/react-table";

import ActionButton from "@/components/ActionButton";

export type CutiType = {
  id: number;
  namaCuti: string;
  lamaCuti: number;
};

export const columns: ColumnDef<CutiType>[] = [
  {
    accessorKey: "id",
    header: "Nomor",
  },
  {
    accessorKey: "namaCuti",
    header: "Nama Cuti",
  },
  {
    accessorKey: "lamaCuti",
    header: "Lama uti",
  },
  {
    accessorKey: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <ActionButton
          rowId={id}
          editEndPoint=""
          deleteEndPoint="/api/admin/cuti"
        />
      );
    },
  },
];
