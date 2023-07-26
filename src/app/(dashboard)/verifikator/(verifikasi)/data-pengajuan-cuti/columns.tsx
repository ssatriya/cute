"use client";

import { ColumnDef } from "@tanstack/react-table";

import VerifikasiButton from "@/components/VerifikasiButton";
import { format } from "date-fns";

export type DataVerifikasiBerkas = {
  id: number;
  nip: string;
  nama: string;
  tanggalPengajuan: string;
  mulaiCuti: string;
  lamaCuti: number;
  jenisCuti: string;
};

export const columns: ColumnDef<DataVerifikasiBerkas>[] = [
  {
    accessorKey: "nomor",
    header: () => {
      return <div className="text-center">No</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
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
    cell: ({ row }) => {
      const formatTanggal = format(
        new Date(row.getValue("tanggalPengajuan")),
        "MM/dd/yyyy"
      );

      return <div>{formatTanggal}</div>;
    },
  },
  {
    accessorKey: "mulaiCuti",
    header: "Tanggal Mulai",
    cell: ({ row }) => {
      const formatTanggal = format(
        new Date(row.getValue("mulaiCuti")),
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

      return (
        <VerifikasiButton path="/verifikator/verifikasi-berkas/" id={id} />
      );
    },
  },
];
