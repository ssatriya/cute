import { cn } from "@/lib/utils";
import ThemeModeToggle from "./ThemeModeToggle";
import { Icons } from "../Icons";

interface SiteFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer className={cn(className)}>
      <div className="container flex items-center justify-between gap-4 py-10 md:h-24 md:py-0">
        <div className="flex items-center gap-4 md:gap-2 md:px-0">
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
        <ThemeModeToggle />
      </div>
    </footer>
  );
}
