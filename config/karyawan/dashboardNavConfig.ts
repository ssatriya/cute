import { DashboardConfig } from "@/types";

export const dashboardNavConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/karyawan",
      icon: "home",
    },
    {
      title: "Pengajuan Cuti",
      href: "/karyawan/pengajuan-cuti",
      icon: "post",
    },
    {
      title: "Riwayat Cuti",
      href: "/karyawan/riwayat-cuti",
      icon: "calendar",
    },
    {
      title: "Sisa Cuti",
      href: "/karyawan/sisa-cuti",
      icon: "barChart",
    },
  ],
};
