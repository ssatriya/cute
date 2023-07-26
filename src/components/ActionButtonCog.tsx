"use client";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { FileDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { PDFViewer } from "@react-pdf/renderer";
import SuratPermintaanCuti from "./pdf/surat-permintaan-cuti";
import BeritaSerahTerima from "./pdf/berita-serah-terima";
import FormulirPermintaanCuti from "./pdf/formulir-permintaan-cuti";
import Providers from "./Providers";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface ActionButtonProps {
  rowId: number;
  editEndPoint?: string;
  deleteEndPoint?: string;
}

export default function ActionButtonCog({
  rowId,
  editEndPoint,
  deleteEndPoint,
}: ActionButtonProps) {
  const router = useRouter();
  const [showPermintaanDialog, setShowPermintaanDialog] =
    React.useState<boolean>(false);

  const [showBeritaSerahTerimaDialog, setShowBeritaSerahTerimaDialog] =
    React.useState<boolean>(false);

  const [showFormulirPermintaanDialog, setShowFormulirPermintaan] =
    React.useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <FileDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              window.open(`/karyawan/surat-permintaan-cuti/${rowId}`);
            }}
          >
            Surat Permintaan Cuti
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            Berita Serah Terima
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            Formulir Permintaan Cuti
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <Dialog
        open={showPermintaanDialog}
        onOpenChange={setShowPermintaanDialog}
      >
        <DialogContent className="flex flex-col max-w-7xl h-[800px] sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Surat Permintaan Cuti</DialogTitle>
          </DialogHeader>
          <PDFViewer className="w-full h-full">
            <SuratPermintaanCuti />
          </PDFViewer>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showBeritaSerahTerimaDialog}
        onOpenChange={setShowBeritaSerahTerimaDialog}
      >
        <DialogContent className="flex flex-col max-w-7xl h-[800px] sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Berita Serah Terima Cuti</DialogTitle>
          </DialogHeader>
          <PDFViewer className="w-full h-full">
            <BeritaSerahTerima />
          </PDFViewer>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showFormulirPermintaanDialog}
        onOpenChange={setShowFormulirPermintaan}
      >
        <DialogContent className="flex flex-col max-w-7xl h-[800px] sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Formulir Permintaan Cuti</DialogTitle>
          </DialogHeader>
          <PDFViewer className="w-full h-full">
            <FormulirPermintaanCuti />
          </PDFViewer>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
