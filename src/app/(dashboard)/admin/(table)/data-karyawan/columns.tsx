"use client";

import ActionButton from "@/components/ActionButton";
import { ColumnDef } from "@tanstack/react-table";

export type KaryawanType = {
  id: number;
  nip: string;
  namaLengkap: string;
  role: string;
  jabatan: string;
  email: string;
};

export const columns: ColumnDef<KaryawanType>[] = [
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "namaLengkap",
    header: "Nama",
  },
  {
    accessorKey: "jabatan",
    header: "Jabatan",
  },
  {
    accessorKey: "email",
    header: "Email",
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
          deleteEndPoint="/api/admin/karyawan"
        />
      );
    },
  },
];
