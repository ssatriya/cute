import React from "react";
import { Badge } from "./ui/Badge";

export default function StatusVerifikasiBadge({
  statusId,
}: {
  statusId: number;
}) {
  if (statusId === 1) {
    return <Badge variant="default">Diterima</Badge>;
  } else {
    return <Badge variant="destructive">Ditolak</Badge>;
  }
}
