"use client";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import { FileDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-8 h-8 p-0 data-[state=open]:bg-muted"
          >
            <FileDown className="w-4 h-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              window.open(`http://cute.ssatriya.codes/index.php?id=${rowId}`);
            }}
          >
            Surat Permintaan Cuti
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              window.open(
                `http://cute.ssatriya.codes/berita-serah-terima.php?id=${rowId}`
              );
            }}
          >
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
