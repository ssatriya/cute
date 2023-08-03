"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/Sheet";

import { useMobileNav } from "@/hooks/use-mobileNav";
import { Icons } from "../Icons";
import { SidebarNavItem } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MobileNav {
  nav: SidebarNavItem[];
  navUser?: SidebarNavItem[];
}

export default function MobileNav({ nav, navUser }: MobileNav) {
  const { showMobileMenu, setShowMobileMenu } = useMobileNav();

  return (
    <Sheet
      open={showMobileMenu}
      onOpenChange={() => setShowMobileMenu(!showMobileMenu)}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center justify-start gap-2">
            <Icons.logo />
            <span className="font-bold">Cute</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between h-full">
          <div className="grid mt-6">
            {nav.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex w-full items-center rounded-md py-2 text-sm font-medium hover:underline",
                  item.disabled && "cursor-not-allowed opacity-60"
                )}
                onClick={() =>
                  !item.disabled && setShowMobileMenu(!showMobileMenu)
                }
              >
                {item.title}
              </Link>
            ))}
            <div className="grid mt-4">
              {navUser &&
                navUser.map((item, index) => (
                  <Link
                    key={index}
                    href={item.disabled ? "#" : item.href}
                    className={cn(
                      "flex w-full items-center rounded-md py-2 text-sm font-medium hover:underline",
                      item.disabled && "cursor-not-allowed opacity-60"
                    )}
                    onClick={() =>
                      !item.disabled && setShowMobileMenu(!showMobileMenu)
                    }
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
          </div>
          <SheetFooter>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Icons.logo />
              <p className="text-sm leading-loose text-center md:text-left">
                Built by{" "}
                <a
                  href="https://github.com/ssatriya/cute"
                  className="font-medium underline underline-offset-8"
                  target="__blank"
                >
                  ssatriya
                </a>
              </p>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
