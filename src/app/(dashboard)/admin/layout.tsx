import MainNav from "@/components/layout/MainNav";
import React from "react";
import { dashboardConfig } from "../../../../config/dashboardConfig";
import UserNav from "@/components/layout/UserNav";
import DashboardNav from "@/components/layout/SidebarNav";
import SiteFooter from "@/components/layout/SiteFooter";
import { getAuthSession } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex items-center justify-between h-16 py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserNav
            user={{
              email: session.user.email,
              nama: session.user.name,
              role: session.user.role?.toLowerCase(),
              settingPath: "/admin/pengaturan",
            }}
            nextAuthUser={{
              email: session.user.email,
              name: session.user.name,
              image: session.user.image,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNavAdmin} />
        </aside>
        <main className="flex flex-col flex-1 w-full overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
