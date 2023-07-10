"use client";

import ActionButton from "@/components/ActionButton";
import { ColumnDef } from "@tanstack/react-table";

export type KaryawanType = {
  id: string;
  nip: string;
  nama: string;
  role: string;
  jabatan: string;
  email: string;
  // status: string;
};

export const columns: ColumnDef<KaryawanType>[] = [
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  // {
  //   accessorKey: "bagian",
  //   header: "Bagian",
  // },
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
