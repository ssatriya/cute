import { DashboardConfig } from "@/types";

export const dashboardNavConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/atasan",
      icon: "home",
    },
    {
      title: "Data Pengajuan",
      href: "/atasan/data-pengajuan-cuti",
      icon: "post",
    },
    {
      title: "Status Verifikasi",
      href: "/atasan/status-verifikasi",
      icon: "barChart",
    },
  ],
  sidebarNavUser: [
    {
      title: "Pengajuan Cuti",
      href: "/verifikator/pengajuan-cuti",
      icon: "post",
      disabled: true,
    },
    {
      title: "Riwayat Cuti",
      href: "/verifikator/riwayat-cuti",
      icon: "calendar",
      disabled: true,
    },
    {
      title: "Sisa Cuti",
      href: "/verifikator/sisa-cuti",
      icon: "barChart",
      disabled: true,
    },
  ],
};
