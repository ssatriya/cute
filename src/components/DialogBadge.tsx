import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Badge } from "./ui/Badge";

export default function DialogBadge({ status }: { status: string }) {
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

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger>{statusText}</DialogTrigger>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Detail verifikasi</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you`&apos;`re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4"></div>
            <div className="grid items-center grid-cols-4 gap-4"></div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
