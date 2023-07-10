import MainNav from "@/components/layout/MainNav";
import React from "react";
import { dashboardConfig } from "../../../../config/dashboardConfig";
import UserNav from "@/components/layout/UserNav";
import DashboardNav from "@/components/layout/SidebarNav";
import SiteFooter from "@/components/layout/SiteFooter";

export default function KaryawanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserNav user={{ email: "ssatriya@gmail.com", nama: "Satriyo" }} />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNavKaryawan} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
