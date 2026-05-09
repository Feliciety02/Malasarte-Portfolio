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
        "inline-flex items-center gap-2 text-sm font-semibold transition-transform",
        variant === "primary" &&
          "rounded-full bg-gradient-hero px-7 py-3.5 text-primary-foreground shadow-glow hover:scale-105",
        variant === "glass" && "rounded-full glass px-7 py-3.5 hover:bg-white/10",
        variant === "text" && "font-medium text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}
