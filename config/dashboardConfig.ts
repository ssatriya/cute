import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [],
  mainNavKaryawan: [
    {
      title: "Settings",
      href: "/settings",
    },
  ],
  sidebarNavKaryawan: [
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
  sidebarNavAtasan: [
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
  sidebarNavAdmin: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: "home",
    },
    {
      title: "Data Karyawan",
      href: "/admin/data-karyawan",
      icon: "users2",
    },
    {
      title: "Data Cuti",
      href: "/admin/data-cuti",
      icon: "files",
    },
    {
      title: "Data Bagian",
      href: "/admin/data-bagian",
      icon: "network",
    },
    {
      title: "Data Jabatan",
      href: "/admin/data-jabatan",
      icon: "userCircle",
    },
    {
      title: "Laporan",
      href: "/admin/laporan",
      icon: "bookCopy",
    },
  ],
  siebarNavVerifikator: [
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
  siebarNavVerifikatorAsUser: [
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
  sidebarNavKepala: [
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
  sidebarNavKepalaAsUser: [
    {
      title: "Pengajuan Cuti",
      href: "/kepala/pengajuan-cuti",
      icon: "post",
    },
    {
      title: "Riwayat Cuti",
      href: "/kepala/riwayat-cuti",
      icon: "calendar",
    },
    {
      title: "Sisa Cuti",
      href: "/kepala/sisa-cuti",
      icon: "barChart",
    },
  ],
};
