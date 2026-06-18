import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TagPill({
  children,
  className,
  dotClassName,
}: {
  children: ReactNode;
  className?: string;
  dotClassName?: string;
}) {
  return (
    <span
      className={cn(
        "metal-ghost pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/72 sm:left-5 sm:top-5 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.16em]",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full bg-primary", dotClassName)} aria-hidden />
      {children}
    </span>
  );
}
