import { DashboardConfig } from "@/types";

export const dashboardNavConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/verifikator",
      icon: "home",
    },
    {
      title: "Data Pengajuan",
      href: "/verifikator/data-pengajuan-cuti",
      icon: "post",
    },
    {
      title: "Status Verifikasi",
      href: "/verifikator/status-verifikasi",
      icon: "barChart",
    },
  ],
  sidebarNavUser: [
    {
      title: "Pengajuan Cuti",
      href: "/verifikator/pengajuan-cuti",
      icon: "post",
    },
    {
      title: "Riwayat Cuti",
      href: "/verifikator/riwayat-cuti",
      icon: "calendar",
    },
    {
      title: "Sisa Cuti",
      href: "/verifikator/sisa-cuti",
      icon: "barChart",
    },
  ],
};
