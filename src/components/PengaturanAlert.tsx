import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import Link from "next/link";

export default function PengaturanAlert({ path }: { path: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil Belum Dilengkapi</CardTitle>
        <CardDescription>
          Anda harus melengkapi data profil terlebih dahulu sebelum mengajukan
          permohonan cuti
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        Silahkan lengkapi profil Anda terlebih dahulu melalui menu{" "}
        <Link href={path} className="font-semibold">
          Pengaturan
        </Link>
      </CardContent>
    </Card>
  );
}
