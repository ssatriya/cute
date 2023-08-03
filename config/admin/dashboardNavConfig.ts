import { DashboardConfig } from "@/types";

export const dashboardNavConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Panduan",
      href: "/panduan",
      disabled: true,
    },
    {
      title: "Pengaturan",
      href: "/pengaturan",
      disabled: true,
    },
    {
      title: "Tentang",
      href: "/tentang",
      disabled: true,
    },
    {
      title: "Bantuan",
      href: "/bantuan",
      disabled: true,
    },
  ],
  sidebarNav: [
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
      disabled: true,
    },
  ],
};
