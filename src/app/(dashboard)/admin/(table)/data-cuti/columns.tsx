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
    header: () => {
      return <div className="text-center">No</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "namaCuti",
    header: "Nama Cuti",
  },
  {
    accessorKey: "lamaCuti",
    header: "Lama cuti",
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
