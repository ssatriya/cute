"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";

interface DetailPengajuanCutiProps {
  idCuti: number;
  nip: string;
  namaLengkap: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  lamaCuti: number;
  jenisCuti: string;
  keteranganCuti: string;
  namaPengganti: string;
  nipPengganti: string;
}

export default function DetailPengajuanCuti({
  cuti,
}: {
  cuti: DetailPengajuanCutiProps;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail Verifikasi</CardTitle>
        <CardDescription>Detail verifikasi cuti yang diajukan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-w-3xl space-y-2 text-sm text-primary">
          <div className="grid grid-cols-2">
            <div>Nama pemohon</div>
            <div className="flex gap-4">
              <div>:</div>
              <div>{cuti.namaLengkap}</div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>NIP pemohon</div>
            <div className="flex gap-4">
              <div>:</div>
              <div>{cuti.nip}</div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>Jenis cuti</div>
            <div className="flex gap-4">
              <div>:</div>
              <div>{cuti.jenisCuti}</div>
            </div>
          </div>
          <div className="grid w-full grid-cols-2">
            <div>Lama cuti</div>
            <div className="flex gap-4">
              <div>:</div>
              <div>
                {cuti.lamaCuti} hari. Mulai {cuti.tanggalMulai} sampai{" "}
                {cuti.tanggalSelesai}
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-2">
            <div>Keterangan cuti</div>
            <div className="flex gap-4">
              <div>:</div>
              <div>{cuti.keteranganCuti}</div>
            </div>
          </div>
        </div>
        <div className="my-8" />
        <div className="max-w-3xl space-y-2 text-sm text-primary">
          <div className="grid grid-cols-2">
            <div>Nama pegawai pengganti</div>
            <div className="flex gap-4">
              <div>:</div>
              <div>{cuti.namaPengganti}</div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>NIP pemohon</div>
            <div className="flex gap-4">
              <div>:</div>
              <div>{cuti.nipPengganti}</div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>Nomor hp pegawai pengganti</div>
            <div className="flex gap-4">
              <div>:</div>
              <div>08314442332</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
