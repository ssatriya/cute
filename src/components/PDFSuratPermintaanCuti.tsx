"use client";

import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import SuratPermintaanCuti from "./pdf/surat-permintaan-cuti";

interface PDFSuratPermintaanCutiProps {
  data: {
    nip: string;
    namaLengkap: string;
    tandaTangan: string;
    tanggalPengajuan: Date;
    keterangan: string;
    alamatSelamaCuti: string;
    lamaCuti: number;
    tanggalMulai: Date;
    namaKepala: string;
    tandaTanganKepala: string;
    nipKepala: string;
    namaAtasan: string;
    tandaTanganAtasan: string;
    nipAtasan: string;
    namaJabatan: string;
    dataCuti: {
      cutiTahunan?: {
        namaCuti: string;
        sisaCuti: number;
        lamaCuti: number;
      };
      cutiSakit?: {
        namaCuti: string;
        sisaCuti: number;
        lamaCuti: number;
      };
    };
  };
}

export default function PDFSuratPermintaanCuti({
  data,
}: PDFSuratPermintaanCutiProps) {
  return (
    <PDFViewer className="w-full h-full">
      <SuratPermintaanCuti
        data={{
          nip: data.nip,
          namaLengkap: data.namaLengkap,
          tandaTangan: data.tandaTangan,
          dataCuti: data.dataCuti,
          alamatSelamaCuti: data.alamatSelamaCuti,
          keterangan: data.keterangan,
          lamaCuti: data.lamaCuti,
          namaKepala: data.namaKepala,
          tandaTanganKepala: data.tandaTanganKepala,
          nipKepala: data.nipKepala,
          namaAtasan: data.namaAtasan,
          tandaTanganAtasan: data.tandaTanganAtasan,
          nipAtasan: data.nipAtasan,
          tanggalMulai: data.tanggalMulai,
          tanggalPengajuan: data.tanggalPengajuan,
          namaJabatan: data.namaJabatan,
        }}
      />
    </PDFViewer>
  );
}
