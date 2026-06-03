import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type LinkButtonProps = {
  to: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "glass" | "text";
};

export function LinkButton({ to, children, className, variant = "primary" }: LinkButtonProps) {
  return (
    <Link
      to={to as never}
      className={cn(
        "inline-flex items-center justify-center gap-2 text-sm font-semibold transition-transform",
        variant === "primary" &&
          "metal-cta rounded-full px-5 py-3 text-primary-foreground hover:scale-[1.03] md:px-7 md:py-3.5",
        variant === "glass" && "metal-ghost rounded-full px-5 py-3 hover:bg-white/10 md:px-7 md:py-3.5",
        variant === "text" && "font-medium text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}
