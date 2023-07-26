"use client";

import VerifikasiButton from "@/components/VerifikasiButton";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type DataVerifikasiKepala = {
  id: number;
  nip: string;
  namaLengkap: string;
  tanggalPengajuan: string;
  tanggalMulai: string;
  lamaCuti: number;
  jenisCuti: string;
  keteranganCuti: string;
};

export const columns: ColumnDef<DataVerifikasiKepala>[] = [
  {
    accessorKey: "id",
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <span>No</span>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span>{row.index + 1}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "namaLengkap",
    header: "Nama",
  },
  {
    accessorKey: "tanggalPengajuan",
    header: "Tanggal Pengajuan",
    cell: ({ row }) => {
      const formatTanggal = format(
        new Date(row.getValue("tanggalPengajuan")),
        "MM/dd/yyyy"
      );

      return <div>{formatTanggal}</div>;
    },
  },
  {
    accessorKey: "tanggalMulai",
    header: "Tanggal Mulai",
    cell: ({ row }) => {
      const formatTanggal = format(
        new Date(row.getValue("tanggalMulai")),
        "MM/dd/yyyy"
      );

      return <div>{formatTanggal}</div>;
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
    accessorKey: "aksi",
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <span>Aksi</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const id = row.original.id;

      return <VerifikasiButton path="/kepala/verifikasi-kepala/" id={id} />;
    },
  },
];
