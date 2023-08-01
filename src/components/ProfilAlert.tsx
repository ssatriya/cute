"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert";
import { Terminal } from "lucide-react";
import Link from "next/link";
import Holidays from "date-holidays";

export default function ProfilAlert({ path }: { path: string }) {
  return (
    <Alert>
      <Terminal className="w-4 h-4" />
      <AlertTitle>Lengkapi profil!</AlertTitle>
      <AlertDescription>
        Jangan lupa untuk melengkapi data profil Anda terlebih dahulu sebelum
        mengajukan cuti. Anda bisa mengisi data profile melalui menu{" "}
        <Link
          href={`/${path}/pengaturan`}
          className="font-medium underline underline-offset-8"
        >
          Pengaturan
        </Link>
      </AlertDescription>
    </Alert>
  );
}
