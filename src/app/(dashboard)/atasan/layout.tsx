import UserNav from "@/components/layout/UserNav";
import MainNav from "@/components/layout/MainNav";
import DashboardNav from "@/components/layout/SidebarNav";
import SiteFooter from "@/components/layout/SiteFooter";
import { getAuthSession } from "@/lib/auth";
import { dashboardNavConfig } from "../../../../config/atasan/dashboardNavConfig";
import MobileNav from "@/components/layout/MobileNav";

export default async function LayoutAtasan({
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
          <MainNav items={dashboardNavConfig.mainNav} />
          <UserNav
            user={{
              email: session.user.email,
              name: session.user.name,
              settingPath: "/atasan/pengaturan",
            }}
            nextAuthUser={{
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col gap-4 md:flex">
          <MobileNav
            nav={dashboardNavConfig.sidebarNav}
            navUser={dashboardNavConfig.sidebarNavUser}
          />
          <DashboardNav items={dashboardNavConfig.sidebarNav} />
          <DashboardNav items={dashboardNavConfig.sidebarNavUser} />
        </aside>
        <main className="flex flex-col flex-1 w-full overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
