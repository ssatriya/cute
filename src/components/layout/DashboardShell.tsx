import { cn } from "@/lib/utils";

interface DashboardShell extends React.HTMLAttributes<HTMLDivElement> {}

export default function DashboardShell({
  children,
  className,
  ...props
}: DashboardShell) {
  return (
    <div className={cn("grid items-start gap-8", className)}>{children}</div>
  );
}
