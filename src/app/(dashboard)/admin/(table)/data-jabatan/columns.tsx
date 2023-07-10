"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "../../../../../components/ActionButton";

export type JabatanType = {
  id: number;
  namaJabatan: string;
  namaBagian: string;
};

export const columns: ColumnDef<JabatanType>[] = [
  {
    accessorKey: "id",
    header: "Nomor",
  },
  {
    accessorKey: "namaJabatan",
    header: "Nama Jabatan",
  },
  {
    accessorKey: "namaBagian",
    header: "Nama Bagian",
  },
  {
    accessorKey: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const id = +row.original.id;

      return (
        <ActionButton
          rowId={id}
          editEndPoint=""
          deleteEndPoint="/api/admin/jabatan"
        />
      );
    },
  },
];
