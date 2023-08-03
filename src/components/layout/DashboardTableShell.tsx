import React from "react";
import DataAddButton from "../DataAddButton";

interface DashboardTableShell {
  children: React.ReactNode;
  buttonPath?: string;
  title: string;
  description: string;
}

export default function DashboardTableShell({
  children,
  buttonPath,
  title,
  description,
}: DashboardTableShell) {
  return (
    <div className="flex flex-col p-8 space-y-8 overflow-x-hidden border rounded-md">
      <div className="flex flex-col items-start gap-6 sm:flex-row xs:justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {buttonPath && (
          <DataAddButton url={buttonPath} buttonName="Tambah Data" />
        )}
      </div>

      {children}
    </div>
  );
}
