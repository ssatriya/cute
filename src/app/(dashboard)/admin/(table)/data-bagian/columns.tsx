"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "@/components/ActionButton";

export type BagianType = {
  id: number;
  namaBagian: string;
  atasan: string;
  nipAtasan: string;
};

export const columns: ColumnDef<BagianType>[] = [
  {
    accessorKey: "id",
    header: "Nomor",
  },
  {
    accessorKey: "namaBagian",
    header: "Nama Bagian",
  },
  {
    accessorKey: "atasan",
    header: "Atasan Langsung",
  },
  {
    accessorKey: "nipAtasan",
    header: "NIP",
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
          deleteEndPoint="/api/admin/bagian"
        />
      );
    },
  },
];
