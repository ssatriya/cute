"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Icons } from "../Icons";
import { useMobileNav } from "@/hooks/use-mobileNav";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export default function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const { showMobileMenu, setShowMobileMenu } = useMobileNav();

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="items-center hidden space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">Cute</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/80",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {/* {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )} */}
    </div>
  );
}
