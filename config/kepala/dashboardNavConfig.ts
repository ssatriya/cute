import { DashboardConfig } from "@/types";

export const dashboardNavConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/kepala",
      icon: "home",
    },
    {
      title: "Data Pengajuan",
      href: "/kepala/data-pengajuan-cuti",
      icon: "post",
    },
    {
      title: "Status Verifikasi",
      href: "/kepala/status-verifikasi",
      icon: "barChart",
    },
  ],
  sidebarNavUser: [
    {
      title: "Pengajuan Cuti",
      href: "/kepala/pengajuan-cuti",
      icon: "post",
      disabled: true,
    },
    {
      title: "Riwayat Cuti",
      href: "/kepala/riwayat-cuti",
      icon: "calendar",
      disabled: true,
    },
    {
      title: "Sisa Cuti",
      href: "/kepala/sisa-cuti",
      icon: "barChart",
      disabled: true,
    },
  ],
};
