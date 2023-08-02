import PersetujuanAlert from "@/components/PersetujuanAlert";
import ProfilAlert from "@/components/ProfilAlert";
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardShell from "@/components/layout/DashboardShell";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function AtasanPage() {
  const session = await getAuthSession();

  if (!session) {
    return <p>Not authorized</p>;
  }

  const numberId = parseInt(session.user.id, 10);

  const pengganti = await db.cuti.findFirst({
    select: {
      id: true,
      persetujuanPengganti: true,
      namaLengkap: true,
    },
    where: {
      idPengganti: numberId,
      statusAkhir: "proses",
      tahapVerifikasi: 0,
      persetujuanPengganti: null,
    },
  });

  const userProfil = await db.user.findUnique({
    select: {
      id: true,
      setup: true,
      role: true,
    },
    where: {
      id: +session.user.id,
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" />
      <ProfilAlert path="atasan" />
      {pengganti?.persetujuanPengganti == null && pengganti && (
        <PersetujuanAlert id={pengganti?.id} />
      )}
    </DashboardShell>
  );
}
