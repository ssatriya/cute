"use client";

import { usePathname } from "next/navigation";

import { MainNavItem, SidebarNavItem } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "../Icons";
import MobileNav from "./MobileNav";

interface DashboardNavProps {
  items?: SidebarNavItem[];
  children?: React.ReactNode;
}

export default function DashboardNav({ items, children }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        // @ts-ignore
        const Icon = Icons[item.icon || "arrowRight"];

        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
