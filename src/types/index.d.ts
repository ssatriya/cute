export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNavKaryawan: SidebarNavItem[];
  sidebarNavAtasan: SidebarNavItem[];
  sidebarNavAdmin: SidebarNavItem[];
  siebarNavVerifikator: SidebarNavItem[];
  sidebarNavAtasan: SidebarNavItem[];
};
