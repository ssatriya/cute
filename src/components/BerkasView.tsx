"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { ExternalLink } from "lucide-react";

type Props = {
  berkas: string;
};

type Berkas = {
  fileKey: string;
  fileUrl: string;
}[];

export default function BerkasView({ berkas }: Props) {
  const router = useRouter();
  const parsedFileData: Berkas = JSON.parse(berkas);

  function handleClick(url: string) {
    window.open(url);
  }
  return (
    <div>
      {parsedFileData.map((file) => (
        <div key={file.fileKey}>
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleClick(file.fileUrl)}
          >
            <ExternalLink />
          </Button>
        </div>
      ))}
    </div>
  );
}
