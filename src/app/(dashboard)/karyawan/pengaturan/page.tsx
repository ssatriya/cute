import FormPengaturanProfil from "@/components/form/FormPengaturanProfil";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Pengaturan profil",
};

export default async function ProfilKaryawan() {
  const session = await getAuthSession();

  if (!session) {
    return;
  }

  const numberId = parseInt(session.user.id, 10);

  const userProfil = await db.user.findUnique({
    select: {
      id: true,
      setup: true,
      role: true,
    },
    where: {
      id: numberId,
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader heading="Pengaturan Profil" />
      <div className="grid gap-8">
        {userProfil && (
          <FormPengaturanProfil
            user={{
              id: userProfil?.id,
              role: userProfil?.role,
              setup: userProfil.setup,
            }}
          />
        )}
      </div>
    </DashboardShell>
  );
}
