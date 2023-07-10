"use client";

import { ColumnDef } from "@tanstack/react-table";

export type SisaCutiType = {
  id: number;
  nama: string;
  cutiTersedia: number;
  cutiDiambilN: number;
  cutiDiambilN1: number;
  cutiDiambilN2: number;
  sisaCutiN: number;
  sisaCutiN1: number;
  sisaCutiN2: number;
};

export const columns: ColumnDef<SisaCutiType>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "cutiTersedia",
    header: "Cuti Tersedia",
  },
  {
    accessorKey: "cutiDiambilN",
    header: "Cuti Diambil N",
  },
  {
    accessorKey: "cutiDiambilN1",
    header: "Cuti Diambil N1",
  },
  {
    accessorKey: "cutiDiambilN2",
    header: "Cuti Diambil N2",
  },
  {
    accessorKey: "sisaCutiN",
    header: "Sisa Cuti N",
  },
  {
    accessorKey: "sisaCutiN1",
    header: "Sisa Cuti N1",
  },
  {
    accessorKey: "sisaCutiN2",
    header: "Sisa Cuti N2",
  },
];
