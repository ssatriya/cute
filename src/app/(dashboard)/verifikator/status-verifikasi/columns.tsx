"use client";

import { ColumnDef } from "@tanstack/react-table";

export type StatusVerifikasiBerkas = {
  id: number;
  nip: string;
  nama: string;
  tanggalPengajuan: string;
  tanggalMulai: string;
  lamaCuti: string;
  jenisCuti: string;
  keteranganCuti: string;
  statusVerifikasi: string;
};

export const columns: ColumnDef<StatusVerifikasiBerkas>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "tanggalPengajuan",
    header: "Tanggal Pengajuan",
  },
  {
    accessorKey: "tanggalMulai",
    header: "Tanggal Mulai",
  },
  {
    accessorKey: "lamaCuti",
    header: "Lama Cuti",
  },
  {
    accessorKey: "jenisCuti",
    header: "Jenis Cuti",
  },
  {
    accessorKey: "keteranganCuti",
    header: "Keterangan",
  },
  {
    accessorKey: "statusVerifikasi",
    header: "Status",
  },
];
