"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Badge } from "./ui/Badge";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "./Providers";

interface DataCuti {
  alamatSelamaCuti: string;
  berkas: string;
  id: number;
  idJenisCuti: number;
  idPemohon: number;
  idPengganti: number;
  keterangan: string;
  lamaCuti: number;
  namaLengkap: string;
  nip: string;
  persetujuanPengganti: number;
  statusAkhir: string;
  tahapVerifikasi: number;
  tanggalArray: string;
  tanggalMulai: string;
  tanggalPengajuan: string;
  tanggalSelesai: string;
}

export default function DialogBadge({
  status,
  id,
  title,
}: {
  status: string;
  id: number;
  title: string;
}) {
  // const [dataC, setData] = React.useState<DataCuti | undefined>(undefined);
  const [enable, setEnable] = useState<boolean>(false);

  const { data: dataCuti, isLoading } = useQuery({
    queryKey: ["dataCuti", id],
    queryFn: async (): Promise<DataCuti> => {
      const {
        data: { data },
      } = await axios.get("/api/data-cuti", {
        params: { id: id },
      });
      return data;
    },
    enabled: enable,
  });

  let statusText: React.JSX.Element = (
    <Badge className="cursor-pointer" variant="outline">
      Proses
    </Badge>
  );

  if (status === "ditolak") {
    statusText = (
      <Badge className="cursor-pointer" variant="destructive">
        Ditolak
      </Badge>
    );
  }
  if (status === "diterima") {
    statusText = (
      <Badge className="cursor-pointer" variant="default">
        Diterima
      </Badge>
    );
  }

  let content = <p>Loading...</p>;

  if (dataCuti) {
    content = (
      <div className="flex justify-between max-w-lg gap-10">
        <div>
          <p>Nama lengkap</p>
          <p>Jenis cuti</p>
          <p>Tanggal pengajuan</p>
          <p>Tanggal mulai</p>
          <p>Tanggal selesai</p>
          <p>Lama cuti</p>
          <p>Keterangan</p>
        </div>
        <div className="flex gap-5">
          <div>
            <p>:</p>
            <p>:</p>
            <p>:</p>
            <p>:</p>
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
          <div>
            <p>{dataCuti && dataCuti.namaLengkap}</p>
            <p>{dataCuti && dataCuti.idJenisCuti}</p>
            <p>{dataCuti && dataCuti.tanggalPengajuan}</p>
            <p>{dataCuti && dataCuti.tanggalMulai}</p>
            <p>{dataCuti && dataCuti.tanggalSelesai}</p>
            <p>{dataCuti && dataCuti.lamaCuti} hari</p>
            <p>{dataCuti && dataCuti.keterangan}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger onClick={() => setEnable(true)}>
          {statusText}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle className="mb-4">{title}</DialogTitle>
            <DialogDescription asChild>{content}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
