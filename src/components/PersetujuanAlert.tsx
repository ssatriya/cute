import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert";
import { HeartHandshake } from "lucide-react";

import Link from "next/link";

interface PersetujuanAlertProps {
  id: number;
}

export default function PersetujuanAlert({ id }: PersetujuanAlertProps) {
  return (
    <Alert>
      <HeartHandshake className="w-4 h-4" />
      <AlertTitle>Permintaan pengganti</AlertTitle>
      <AlertDescription>
        Terdapat permintaan persetujuan sebagai pegawai pengganti, lihat
        detailnya melalui menu{" "}
        <Link
          href={`/atasan/persetujuan-cuti/${id}`}
          className="font-medium underline underline-offset-8"
        >
          Persetujuan
        </Link>
      </AlertDescription>
    </Alert>
  );
}
