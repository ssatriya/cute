import { DashboardConfig } from "@/types";
import { BarChart, Calendar, FileText, Home } from "lucide-react";

export const dashboardConfig: DashboardConfig = {
  mainNav: [],
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
      title: "Data Pengajuan Cuti",
      href: "/atasan/data-pengajuan-cuti",
      icon: "post",
    },
    {
      title: "Status Verifikasi Cuti",
      href: "/atasan/status-verifikasi-cuti",
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
      icon: "home",
    },
    {
      title: "Data Jabatan",
      href: "/admin/data-jabatan",
      icon: "home",
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
};
